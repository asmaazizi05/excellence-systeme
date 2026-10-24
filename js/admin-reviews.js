/* ==========================================================================
   EXCELLENCE SYSTÈME - ESPACE D'ADMINISTRATION & MODÉRATION DES AVIS CLIENTS
   ========================================================================== */

(function () {
    'use strict';

    // 1. CONFIGURATION DE SÉCURITÉ & AUTHENTIFICATION
    const AUTH_CONFIG = {
        sessionKey: 'exsys_admin_auth_token_v1',
        lockoutKey: 'exsys_admin_lockout_info',
        // Hash SHA-256 pour 'Excellence@2026!'
        defaultHash: '43a771d53fb4963abb25cbe68d22d82ab484e2aef50e5d8bd6479c82c3166045',
        allowedUsers: ['admin', 'contact@excellencesysteme.ma', 'excellencesysteme@gmail.com'],
        maxAttempts: 5,
        lockoutDurationMs: 30000 // 30 secondes de blocage temporaire
    };

    async function hashPassword(str) {
        if (window.crypto && crypto.subtle) {
            try {
                const msgBuffer = new TextEncoder().encode(str);
                const hashBuffer = await crypto.subtle.digest('SHA-256', msgBuffer);
                const hashArray = Array.from(new Uint8Array(hashBuffer));
                return hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
            } catch (err) {}
        }
        // Fallback standard
        return 'fallback_' + btoa(unescape(encodeURIComponent(str)));
    }

    function checkLockout() {
        try {
            const raw = localStorage.getItem(AUTH_CONFIG.lockoutKey);
            if (!raw) return { locked: false, remainingSec: 0 };
            const data = JSON.parse(raw);
            const now = Date.now();
            if (data.lockoutUntil && data.lockoutUntil > now) {
                const remainingSec = Math.ceil((data.lockoutUntil - now) / 1000);
                return { locked: true, remainingSec: remainingSec, attempts: data.attempts || 0 };
            }
            return { locked: false, remainingSec: 0, attempts: data.attempts || 0 };
        } catch (e) {
            return { locked: false, remainingSec: 0 };
        }
    }

    function recordFailedAttempt() {
        const info = checkLockout();
        const attempts = (info.attempts || 0) + 1;
        const now = Date.now();
        const data = {
            attempts: attempts,
            lastFailed: now,
            lockoutUntil: attempts >= AUTH_CONFIG.maxAttempts ? now + AUTH_CONFIG.lockoutDurationMs : 0
        };
        localStorage.setItem(AUTH_CONFIG.lockoutKey, JSON.stringify(data));
        return data;
    }

    function resetFailedAttempts() {
        localStorage.removeItem(AUTH_CONFIG.lockoutKey);
    }

    function isAuthenticated() {
        const token = sessionStorage.getItem(AUTH_CONFIG.sessionKey);
        if (!token) return false;
        try {
            const parsed = JSON.parse(token);
            // Session valide pendant 4 heures
            if (parsed && parsed.expiry && parsed.expiry > Date.now()) {
                return true;
            }
        } catch (e) {}
        sessionStorage.removeItem(AUTH_CONFIG.sessionKey);
        return false;
    }

    function setSession(user) {
        const tokenData = {
            user: user,
            created: Date.now(),
            expiry: Date.now() + (4 * 60 * 60 * 1000) // 4h
        };
        sessionStorage.setItem(AUTH_CONFIG.sessionKey, JSON.stringify(tokenData));
    }

    function clearSession() {
        sessionStorage.removeItem(AUTH_CONFIG.sessionKey);
    }

    // 2. ÉTAT DU DASHBOARD
    let currentTabFilter = 'all'; // 'all', 'pending', 'approved', 'rejected'
    let searchQuery = '';
    let ratingFilter = 'all'; // 'all', '5', '4', '3', '2', '1'

    // 3. INITIALISATION AU CHARGEMENT DU DOM
    document.addEventListener('DOMContentLoaded', () => {
        initAuthUI();
        initDashboardUI();
        initModals();

        // Écouter les mises à jour en direct (multi-onglets & actions publiques)
        window.addEventListener('storage', (e) => {
            if (e.key === 'exsys_customer_reviews_v2' && isAuthenticated()) {
                renderDashboard();
            }
        });
        window.addEventListener('exsys_reviews_changed', () => {
            if (isAuthenticated()) {
                renderDashboard();
            }
        });
    });

    // 4. LOGIQUE D'AUTHENTIFICATION & VUE
    function initAuthUI() {
        const loginSection = document.getElementById('adminLoginSection');
        const dashboardSection = document.getElementById('adminDashboardSection');
        const loginForm = document.getElementById('adminLoginForm');
        const userInput = document.getElementById('adminLoginUser');
        const passInput = document.getElementById('adminLoginPass');
        const togglePwdBtn = document.getElementById('togglePasswordBtn');
        const alertBox = document.getElementById('adminLoginAlert');
        const logoutBtn = document.getElementById('btnAdminLogout');

        // Toggle mot de passe masqué/visible
        if (togglePwdBtn && passInput) {
            togglePwdBtn.addEventListener('click', () => {
                const isPassword = passInput.type === 'password';
                passInput.type = isPassword ? 'text' : 'password';
                togglePwdBtn.innerHTML = isPassword ? '<i class="fa-regular fa-eye-slash"></i>' : '<i class="fa-regular fa-eye"></i>';
            });
        }

        // Vérification de la session
        if (isAuthenticated()) {
            showDashboard();
        } else {
            showLogin();
        }

        // Soumission du formulaire de connexion
        if (loginForm) {
            loginForm.addEventListener('submit', async (e) => {
                e.preventDefault();

                // Vérifier si lockout actif
                const lock = checkLockout();
                if (lock.locked) {
                    showLoginAlert(`Accès temporairement verrouillé pour des raisons de sécurité. Réessayez dans ${lock.remainingSec} secondes.`, 'danger');
                    return;
                }

                const user = (userInput.value || '').trim().toLowerCase();
                const pass = (passInput.value || '').trim();

                const isUserValid = AUTH_CONFIG.allowedUsers.includes(user);
                const passHash = await hashPassword(pass);
                const isPassValid = (passHash === AUTH_CONFIG.defaultHash) || (pass === 'Excellence@2026!');

                if (isUserValid && isPassValid) {
                    resetFailedAttempts();
                    setSession(user);
                    showLoginAlert('Authentification réussie. Accès au tableau de bord...', 'success');
                    setTimeout(() => {
                        showDashboard();
                    }, 500);
                } else {
                    const failData = recordFailedAttempt();
                    if (failData.lockoutUntil > Date.now()) {
                        showLoginAlert(`Nombre maximal de tentatives dépassé. Compte verrouillé pour 30 secondes.`, 'danger');
                    } else {
                        const remaining = AUTH_CONFIG.maxAttempts - (failData.attempts || 0);
                        showLoginAlert(`Identifiant ou mot de passe incorrect. (${remaining} tentative${remaining > 1 ? 's' : ''} restante${remaining > 1 ? 's' : ''})`, 'danger');
                    }
                }
            });
        }

        // Bouton de déconnexion
        if (logoutBtn) {
            logoutBtn.addEventListener('click', () => {
                clearSession();
                showLogin();
                showLoginAlert('Vous avez été déconnecté avec succès.', 'info');
            });
        }

        function showLoginAlert(msg, type) {
            if (!alertBox) return;
            alertBox.style.display = 'block';
            alertBox.textContent = msg;
            if (type === 'danger') {
                alertBox.style.background = 'rgba(239, 68, 68, 0.15)';
                alertBox.style.border = '1px solid rgba(239, 68, 68, 0.35)';
                alertBox.style.color = '#F87171';
            } else if (type === 'success') {
                alertBox.style.background = 'rgba(16, 185, 129, 0.15)';
                alertBox.style.border = '1px solid rgba(16, 185, 129, 0.35)';
                alertBox.style.color = '#34D399';
            } else {
                alertBox.style.background = 'rgba(99, 196, 196, 0.15)';
                alertBox.style.border = '1px solid rgba(99, 196, 196, 0.35)';
                alertBox.style.color = '#73D3D3';
            }
        }
    }

    function showLogin() {
        const loginSection = document.getElementById('adminLoginSection');
        const dashboardSection = document.getElementById('adminDashboardSection');
        if (loginSection) loginSection.style.display = 'flex';
        if (dashboardSection) dashboardSection.style.display = 'none';
    }

    function showDashboard() {
        const loginSection = document.getElementById('adminLoginSection');
        const dashboardSection = document.getElementById('adminDashboardSection');
        if (loginSection) loginSection.style.display = 'none';
        if (dashboardSection) {
            dashboardSection.style.display = 'flex';
            renderDashboard();
        }
    }

    // 5. GESTION DU TABLEAU DE BORD DES AVIS
    function initDashboardUI() {
        // Bouton Actualiser
        const refreshBtn = document.getElementById('btnRefreshAdmin');
        if (refreshBtn) {
            refreshBtn.addEventListener('click', () => {
                const icon = refreshBtn.querySelector('i');
                if (icon) icon.classList.add('fa-spin');
                renderDashboard();
                setTimeout(() => {
                    if (icon) icon.classList.remove('fa-spin');
                }, 500);
            });
        }

        // Onglets de filtre (Tous, En attente, Publiés, Refusés)
        const tabs = document.querySelectorAll('#adminFilterTabs .admin-tab-btn');
        tabs.forEach(tab => {
            tab.addEventListener('click', () => {
                tabs.forEach(t => t.classList.remove('active'));
                tab.classList.add('active');
                currentTabFilter = tab.getAttribute('data-filter') || 'all';
                renderDashboard();
            });
        });

        // Champ de recherche dynamique
        const searchInput = document.getElementById('adminSearchInput');
        if (searchInput) {
            searchInput.addEventListener('input', (e) => {
                searchQuery = e.target.value.trim().toLowerCase();
                renderDashboard();
            });
        }

        // Filtre par note
        const ratingSelect = document.getElementById('adminRatingSelect');
        if (ratingSelect) {
            ratingSelect.addEventListener('change', (e) => {
                ratingFilter = e.target.value;
                renderDashboard();
            });
        }

        // Bouton Ouvrir Modale Ajout
        const btnOpenAdd = document.getElementById('btnOpenAddModal');
        if (btnOpenAdd) {
            btnOpenAdd.addEventListener('click', () => {
                openModal('addReviewModal');
            });
        }
    }

    function renderDashboard() {
        const container = document.getElementById('adminReviewsList');
        if (!container || typeof window.ExSysReviewsManager === 'undefined') return;

        const allReviews = window.ExSysReviewsManager.getAll();

        // 1. Calcul et affichage des statistiques
        let countApproved = 0;
        let countPending = 0;
        let countRejected = 0;
        let approvedScoreSum = 0;

        allReviews.forEach(r => {
            const st = r.status || 'approved';
            if (st === 'approved' || st === 'verified') {
                countApproved++;
                approvedScoreSum += (parseInt(r.rating, 10) || 5);
            } else if (st === 'pending') {
                countPending++;
            } else if (st === 'rejected') {
                countRejected++;
            }
        });

        const avgScore = countApproved > 0 ? (approvedScoreSum / countApproved).toFixed(1) : '5.0';

        // Mise à jour des cartes KPI
        const statTotal = document.getElementById('statTotalCount');
        const statApproved = document.getElementById('statApprovedCount');
        const statPending = document.getElementById('statPendingCount');
        const statRejected = document.getElementById('statRejectedCount');
        const statAvg = document.getElementById('statAvgRating');

        if (statTotal) statTotal.textContent = allReviews.length;
        if (statApproved) statApproved.textContent = countApproved;
        if (statPending) statPending.textContent = countPending;
        if (statRejected) statRejected.textContent = countRejected;
        if (statAvg) statAvg.textContent = `${avgScore} / 5`;

        // Mise à jour des badges d'onglets
        const badgeAll = document.getElementById('tabBadgeAll');
        const badgePending = document.getElementById('tabBadgePending');
        const badgeApproved = document.getElementById('tabBadgeApproved');
        const badgeRejected = document.getElementById('tabBadgeRejected');

        if (badgeAll) badgeAll.textContent = allReviews.length;
        if (badgePending) badgePending.textContent = countPending;
        if (badgeApproved) badgeApproved.textContent = countApproved;
        if (badgeRejected) badgeRejected.textContent = countRejected;

        // 2. Filtrage de la liste
        let filtered = allReviews.filter(r => {
            const st = r.status || 'approved';
            const isApproved = st === 'approved' || st === 'verified';
            const isPending = st === 'pending';
            const isRejected = st === 'rejected';

            if (currentTabFilter === 'pending' && !isPending) return false;
            if (currentTabFilter === 'approved' && !isApproved) return false;
            if (currentTabFilter === 'rejected' && !isRejected) return false;

            // Filtre par note
            if (ratingFilter !== 'all') {
                if (parseInt(r.rating, 10) !== parseInt(ratingFilter, 10)) return false;
            }

            // Filtre de recherche textuelle
            if (searchQuery) {
                const combined = `${r.name || ''} ${r.role || ''} ${r.city || ''} ${r.comment || ''}`.toLowerCase();
                if (!combined.includes(searchQuery)) return false;
            }

            return true;
        });

        // 3. Rendu HTML
        container.innerHTML = '';

        if (filtered.length === 0) {
            container.innerHTML = `
                <div class="admin-empty-state">
                    <div class="admin-empty-icon"><i class="fa-solid fa-folder-open"></i></div>
                    <h3 style="color:#fff; margin:0 0 8px 0; font-size:1.2rem;">Aucun avis ne correspond à vos filtres</h3>
                    <p style="margin:0; font-size:0.92rem;">Modifiez vos critères de recherche ou ajoutez un nouvel avis.</p>
                </div>
            `;
            return;
        }

        filtered.forEach(rev => {
            const card = buildAdminReviewCard(rev);
            container.appendChild(card);
        });
    }

    function buildAdminReviewCard(rev) {
        const card = document.createElement('div');
        card.className = 'admin-review-card';
        card.setAttribute('data-id', rev.id);

        const st = rev.status || 'approved';
        const isApproved = st === 'approved' || st === 'verified';
        const isPending = st === 'pending';
        const isRejected = st === 'rejected';

        let statusBadgeHtml = '';
        if (isPending) {
            statusBadgeHtml = `<span class="admin-status-badge status-pending"><i class="fa-solid fa-clock"></i> En attente de validation</span>`;
        } else if (isApproved) {
            statusBadgeHtml = `<span class="admin-status-badge status-approved"><i class="fa-solid fa-circle-check"></i> Publié sur le site</span>`;
        } else {
            statusBadgeHtml = `<span class="admin-status-badge status-rejected"><i class="fa-solid fa-circle-xmark"></i> Refusé</span>`;
        }

        // Étoiles
        let starsHtml = '';
        for (let i = 1; i <= 5; i++) {
            if (i <= rev.rating) {
                starsHtml += '<i class="fa-solid fa-star"></i>';
            } else {
                starsHtml += '<i class="fa-regular fa-star" style="color:var(--admin-text-muted);"></i>';
            }
        }

        // Initiales avatar
        const initials = (rev.name || 'C')
            .replace(/^(M\.|Mme\.|Dr\.)\s*/i, '')
            .split(' ')
            .map(n => n[0])
            .join('')
            .substring(0, 2)
            .toUpperCase();

        // Traçabilité des modifications
        let traceHtml = '';
        if (rev.lastModified) {
            traceHtml = `
                <div class="admin-traceability-log">
                    <i class="fa-solid fa-clock-rotate-left" style="color:var(--admin-accent);"></i>
                    <span>Dernière modification le <strong>${escapeHtml(rev.lastModified)}</strong> par <strong>${escapeHtml(rev.lastModifiedBy || 'Admin')}</strong></span>
                </div>
            `;
        } else if (rev.moderatedAt) {
            traceHtml = `
                <div class="admin-traceability-log">
                    <i class="fa-solid fa-shield-halved" style="color:var(--admin-accent);"></i>
                    <span>Modéré le <strong>${escapeHtml(rev.moderatedAt)}</strong> par <strong>${escapeHtml(rev.moderatedBy || 'Admin')}</strong></span>
                </div>
            `;
        }

        // Boutons d'action contextuels
        let actionButtonsHtml = '';
        if (isPending) {
            actionButtonsHtml += `
                <button type="button" class="admin-btn-action btn-approve" data-action="approve" data-id="${rev.id}">
                    <i class="fa-solid fa-check"></i> Valider & Publier
                </button>
                <button type="button" class="admin-btn-action btn-reject" data-action="reject" data-id="${rev.id}">
                    <i class="fa-solid fa-xmark"></i> Refuser
                </button>
            `;
        } else if (isApproved) {
            actionButtonsHtml += `
                <button type="button" class="admin-btn-action btn-reject" data-action="demote" data-id="${rev.id}" title="Retirer du site et remettre en attente">
                    <i class="fa-solid fa-pause"></i> Dépublier
                </button>
            `;
        } else if (isRejected) {
            actionButtonsHtml += `
                <button type="button" class="admin-btn-action btn-approve" data-action="approve" data-id="${rev.id}">
                    <i class="fa-solid fa-rotate-left"></i> Réapprouver
                </button>
            `;
        }

        actionButtonsHtml += `
            <button type="button" class="admin-btn-action btn-edit" data-action="edit" data-id="${rev.id}">
                <i class="fa-solid fa-pen"></i> Modifier
            </button>
            <button type="button" class="admin-btn-action btn-delete" data-action="delete" data-id="${rev.id}">
                <i class="fa-solid fa-trash-can"></i> Supprimer
            </button>
        `;

        card.innerHTML = `
            <div class="admin-card-header">
                <div class="admin-author-info">
                    <div class="admin-author-avatar">${initials}</div>
                    <div class="admin-author-details">
                        <h3>${escapeHtml(rev.name)}</h3>
                        <div class="role">${escapeHtml(rev.role)} ${rev.city ? `• <span style="color:var(--admin-accent);">${escapeHtml(rev.city)}</span>` : ''}</div>
                    </div>
                </div>
                <div>${statusBadgeHtml}</div>
            </div>

            <div class="admin-rating-row">
                <div class="admin-stars">${starsHtml}</div>
                <span class="admin-rating-num">${rev.rating} / 5</span>
                <span class="admin-date-badge"><i class="fa-regular fa-calendar"></i> ${escapeHtml(rev.date || 'Récemment')}</span>
            </div>

            <div class="admin-review-body">
                "${escapeHtml(rev.comment)}"
            </div>

            ${rev.commentEn ? `
                <div style="font-size:0.85rem; color:var(--admin-text-muted); font-style:italic; margin-bottom:12px; padding-left:12px; border-left:2px solid rgba(255,255,255,0.15);">
                    <strong>EN :</strong> "${escapeHtml(rev.commentEn)}"
                </div>
            ` : ''}

            ${traceHtml}

            <div class="admin-card-actions">
                ${actionButtonsHtml}
            </div>
        `;

        // Écouteurs d'actions sur la carte
        card.querySelectorAll('[data-action]').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const action = btn.getAttribute('data-action');
                const id = btn.getAttribute('data-id');
                handleCardAction(action, id, rev);
            });
        });

        return card;
    }

    function handleCardAction(action, id, rev) {
        if (!window.ExSysReviewsManager) return;

        if (action === 'approve') {
            const ok = window.ExSysReviewsManager.approve(id);
            if (ok) {
                showAdminToast(`L'avis de ${rev.name} a été validé et publié immédiatement sur le site !`, 'success');
                renderDashboard();
            }
        } else if (action === 'reject') {
            const ok = window.ExSysReviewsManager.reject(id, 'Refusé par administrateur');
            if (ok) {
                showAdminToast(`L'avis de ${rev.name} a été refusé et masqué du site.`, 'warning');
                renderDashboard();
            }
        } else if (action === 'demote') {
            const ok = window.ExSysReviewsManager.update(id, { status: 'pending' });
            if (ok) {
                showAdminToast(`L'avis de ${rev.name} a été dépublié et placé en attente.`, 'info');
                renderDashboard();
            }
        } else if (action === 'edit') {
            openEditModal(rev);
        } else if (action === 'delete') {
            openDeleteModal(rev);
        }
    }

    // 6. GESTION DES MODALES (Modifier, Supprimer, Ajouter)
    function initModals() {
        // Fermeture des modales par bouton close ou fond
        document.querySelectorAll('[data-close]').forEach(btn => {
            btn.addEventListener('click', () => {
                const modalId = btn.getAttribute('data-close');
                closeModal(modalId);
            });
        });

        document.querySelectorAll('.admin-modal-overlay').forEach(modal => {
            modal.addEventListener('click', (e) => {
                if (e.target === modal) {
                    closeModal(modal.id);
                }
            });
        });

        // Gestion du star picker pour modification
        setupStarPicker('editStarPicker', 'editRatingValue');
        // Gestion du star picker pour ajout
        setupStarPicker('addStarPicker', 'addRatingValue');

        // Formulaire Modification
        const formEdit = document.getElementById('formEditReview');
        if (formEdit) {
            formEdit.addEventListener('submit', (e) => {
                e.preventDefault();
                const id = document.getElementById('editReviewId').value;
                const name = document.getElementById('editAuthorName').value;
                const role = document.getElementById('editAuthorRole').value;
                const city = document.getElementById('editAuthorCity').value;
                const rating = parseInt(document.getElementById('editRatingValue').value, 10) || 5;
                const status = document.getElementById('editReviewStatus').value;
                const comment = document.getElementById('editCommentText').value;
                const commentEn = document.getElementById('editCommentTextEn').value;

                const ok = window.ExSysReviewsManager.update(id, {
                    name: name,
                    role: role,
                    city: city,
                    rating: rating,
                    status: status,
                    comment: comment,
                    commentEn: commentEn
                });

                if (ok) {
                    closeModal('editReviewModal');
                    showAdminToast(`L'avis de ${name} a été mis à jour avec traçabilité et synchronisé sur le site.`, 'success');
                    renderDashboard();
                } else {
                    showAdminToast("Erreur lors de la mise à jour de l'avis.", 'danger');
                }
            });
        }

        // Formulaire Confirmation Suppression
        const btnConfirmDelete = document.getElementById('btnConfirmDeleteReview');
        if (btnConfirmDelete) {
            btnConfirmDelete.addEventListener('click', () => {
                const id = document.getElementById('deleteTargetId').value;
                const ok = window.ExSysReviewsManager.delete(id);
                if (ok) {
                    closeModal('deleteReviewModal');
                    showAdminToast(`L'avis a été définitivement supprimé du site.`, 'success');
                    renderDashboard();
                } else {
                    showAdminToast("Erreur lors de la suppression.", 'danger');
                }
            });
        }

        // Formulaire Ajout Administrateur
        const formAdd = document.getElementById('formAddReviewAdmin');
        if (formAdd) {
            formAdd.addEventListener('submit', (e) => {
                e.preventDefault();
                const name = document.getElementById('addAuthorName').value.trim();
                const role = document.getElementById('addAuthorRole').value.trim();
                const city = document.getElementById('addAuthorCity').value.trim();
                const rating = parseInt(document.getElementById('addRatingValue').value, 10) || 5;
                const status = document.getElementById('addReviewStatus').value;
                const comment = document.getElementById('addCommentText').value.trim();
                const commentEn = document.getElementById('addCommentTextEn').value.trim();

                const isApproved = status === 'approved';
                const created = window.ExSysReviewsManager.add({
                    name: name,
                    role: role,
                    roleEn: role,
                    city: city,
                    rating: rating,
                    status: status,
                    comment: comment,
                    commentEn: commentEn || comment
                }, isApproved);

                if (created) {
                    formAdd.reset();
                    setupStarPicker('addStarPicker', 'addRatingValue', 5);
                    closeModal('addReviewModal');
                    showAdminToast(`L'avis de ${name} a été ajouté (${isApproved ? 'publié sur le site' : 'en attente'}).`, 'success');
                    renderDashboard();
                } else {
                    showAdminToast("Erreur lors de l'enregistrement de l'avis.", 'danger');
                }
            });
        }
    }

    function setupStarPicker(pickerId, inputId, defaultVal = 5) {
        const picker = document.getElementById(pickerId);
        const input = document.getElementById(inputId);
        if (!picker || !input) return;

        const updateStars = (val) => {
            input.value = val;
            const stars = picker.querySelectorAll('i');
            stars.forEach(s => {
                const sVal = parseInt(s.getAttribute('data-val'), 10);
                if (sVal <= val) {
                    s.classList.remove('inactive');
                    s.className = 'fa-solid fa-star';
                } else {
                    s.classList.add('inactive');
                    s.className = 'fa-regular fa-star inactive';
                }
            });
        };

        picker.querySelectorAll('i').forEach(star => {
            star.addEventListener('click', () => {
                const val = parseInt(star.getAttribute('data-val'), 10);
                updateStars(val);
            });
        });

        updateStars(defaultVal);
    }

    function openEditModal(rev) {
        document.getElementById('editReviewId').value = rev.id;
        document.getElementById('editAuthorName').value = rev.name || '';
        document.getElementById('editAuthorRole').value = rev.role || '';
        document.getElementById('editAuthorCity').value = rev.city || '';
        document.getElementById('editReviewStatus').value = (rev.status === 'verified' ? 'approved' : (rev.status || 'approved'));
        document.getElementById('editCommentText').value = rev.comment || '';
        document.getElementById('editCommentTextEn').value = rev.commentEn || '';

        setupStarPicker('editStarPicker', 'editRatingValue', rev.rating || 5);
        openModal('editReviewModal');
    }

    function openDeleteModal(rev) {
        document.getElementById('deleteTargetId').value = rev.id;
        document.getElementById('deleteAuthorName').textContent = rev.name;
        document.getElementById('deleteQuotePreview').textContent = `"${rev.comment}"`;
        openModal('deleteReviewModal');
    }

    function openModal(modalId) {
        const modal = document.getElementById(modalId);
        if (modal) modal.classList.add('active');
    }

    function closeModal(modalId) {
        const modal = document.getElementById(modalId);
        if (modal) modal.classList.remove('active');
    }

    // 7. NOTIFICATIONS TOAST
    function showAdminToast(msg, type = 'info') {
        if (typeof window.showToast === 'function') {
            window.showToast(msg, type === 'danger' ? 'error' : type);
            return;
        }

        let container = document.getElementById('toastContainer');
        if (!container) {
            container = document.createElement('div');
            container.id = 'toastContainer';
            container.className = 'toast-container';
            document.body.appendChild(container);
        }

        const toast = document.createElement('div');
        toast.className = `toast toast-${type === 'danger' ? 'error' : type}`;
        toast.innerHTML = `
            <i class="fa-solid ${type === 'success' ? 'fa-circle-check' : (type === 'danger' ? 'fa-circle-exclamation' : 'fa-circle-info')}"></i>
            <span>${escapeHtml(msg)}</span>
        `;
        container.appendChild(toast);
        setTimeout(() => toast.classList.add('show'), 10);
        setTimeout(() => {
            toast.classList.remove('show');
            setTimeout(() => toast.remove(), 400);
        }, 4000);
    }

    function escapeHtml(str) {
        if (!str) return '';
        return String(str)
            .replace(/&/g, '&amp;')
            .replace(/</g, '&lt;')
            .replace(/>/g, '&gt;')
            .replace(/"/g, '&quot;')
            .replace(/'/g, '&#039;');
    }

})();
