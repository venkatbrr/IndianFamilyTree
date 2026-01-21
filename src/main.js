import FamilyTreeApp from './components/FamilyTreeApp.js';
import authService from './services/AuthService.js';
import firestoreFamilyService from './services/FirestoreFamilyService.js';
import './styles/main.css';

// UI Elements - Pages
let signInPage;
let dashboardPage;

// UI Elements - Dashboard
let userAvatar;
let userName;
let userEmail;
let userDropdown;
let treesModal;
let createTreeModal;
let loadingOverlay;
let currentTreeName;

// App instance
let app = null;

// Initialize the application
document.addEventListener('DOMContentLoaded', async () => {
    console.log('DOM loaded, initializing app...');

    // Cache DOM elements
    cacheElements();

    // Show loading overlay immediately
    showLoading();

    // Bind auth event listeners
    bindAuthEvents();

    // Subscribe to auth state changes. This handler will manage the UI.
    authService.onAuthStateChange(handleAuthStateChange);

    // Initialize auth. This will trigger the onAuthStateChange handler.
    try {
        console.log('Initializing auth service...');
        await authService.init();
        console.log('Auth initialization process started.');
    } catch (error) {
        console.error('Auth init error:', error);
        // As a fallback, show the unauthenticated UI.
        // The auth state handler will likely have been called with null anyway.
        showSignInPage();
    }
});

function cacheElements() {
    // Pages
    signInPage = document.getElementById('signInPage');
    dashboardPage = document.getElementById('dashboardPage');

    // Dashboard elements
    userAvatar = document.getElementById('userAvatar');
    userName = document.getElementById('userName');
    userEmail = document.getElementById('userEmail');
    userDropdown = document.getElementById('userDropdown');
    treesModal = document.getElementById('treesModal');
    createTreeModal = document.getElementById('createTreeModal');
    loadingOverlay = document.getElementById('loadingOverlay');
    currentTreeName = document.getElementById('currentTreeName');
}

function bindAuthEvents() {
    // Google Sign In button (on sign-in page)
    document.getElementById('welcomeSignInBtn')?.addEventListener('click', handleSignIn);

    // Sign Out button
    document.getElementById('signOutBtn')?.addEventListener('click', handleSignOut);

    // User menu toggle
    document.getElementById('userMenuBtn')?.addEventListener('click', toggleUserDropdown);

    // My Trees button
    document.getElementById('myTreesBtn')?.addEventListener('click', showTreesModal);

    // New Tree button (in dropdown)
    document.getElementById('newTreeBtn')?.addEventListener('click', () => {
        userDropdown?.classList.add('hidden');
        showCreateTreeModal();
    });

    // Trees Modal
    document.getElementById('closeTreesModal')?.addEventListener('click', hideTreesModal);
    document.getElementById('createTreeBtn')?.addEventListener('click', showCreateTreeModal);

    // Create Tree Modal
    document.getElementById('closeCreateTreeModal')?.addEventListener('click', hideCreateTreeModal);
    document.getElementById('cancelCreateTreeBtn')?.addEventListener('click', hideCreateTreeModal);
    document.getElementById('confirmCreateTreeBtn')?.addEventListener('click', handleCreateTree);

    // Close dropdown when clicking outside
    document.addEventListener('click', (e) => {
        if (!e.target.closest('.user-menu')) {
            userDropdown?.classList.add('hidden');
        }
    });

    // Close modals on backdrop click
    treesModal?.addEventListener('click', (e) => {
        if (e.target === treesModal) hideTreesModal();
    });
    createTreeModal?.addEventListener('click', (e) => {
        if (e.target === createTreeModal) hideCreateTreeModal();
    });
}

async function handleSignIn() {
    showLoading();
    try {
        const result = await authService.signInWithGoogle();
        if (!result.success) {
            hideLoading();
            alert('Sign in failed: ' + result.error);
        }
        // Auth state change handler will take care of the rest
    } catch (error) {
        hideLoading();
        console.error('Sign in error:', error);
        alert('Sign in failed: ' + error.message);
    }
}

async function handleSignOut() {
    userDropdown?.classList.add('hidden');
    showLoading();

    // Clear family service data
    firestoreFamilyService.clearLocalData();

    // Destroy app instance
    app = null;

    await authService.signOut();
    // handleAuthStateChange will be called with null, which will hide loading
}

async function handleAuthStateChange(user) {
    console.log('handleAuthStateChange called:', user ? user.email : 'signed out');

    // This is now the single point of truth for showing/hiding the main UI
    hideLoading();

    if (user) {
        // User is signed in
        console.log('User is signed in, showing dashboard');
        showDashboardPage(user);

        // Load trees in background
        try {
            await loadUserTrees();
        } catch (error) {
            console.error('Error in loadUserTrees:', error);
            showCreateTreeModal();
        }
    } else {
        // User is signed out
        console.log('User is signed out, showing sign-in page');
        showSignInPage();
    }
}

function showSignInPage() {
    console.log('Showing sign-in page');

    // Hide dashboard, show sign-in
    if (dashboardPage) {
        dashboardPage.classList.add('hidden');
    }
    if (signInPage) {
        signInPage.classList.remove('hidden');
    }

    // Hide any open modals
    hideTreesModal();
    hideCreateTreeModal();

    // Reset app
    if (app) {
        app = null;
    }

    // Make sure loading is hidden
    hideLoading();
}

function showDashboardPage(user) {
    console.log('Showing dashboard for:', user.displayName);

    // Hide sign-in, show dashboard
    if (signInPage) {
        signInPage.classList.add('hidden');
    }
    if (dashboardPage) {
        dashboardPage.classList.remove('hidden');
    }

    // Update user info in header
    if (userAvatar) {
        userAvatar.src = user.photoURL || 'https://ui-avatars.com/api/?name=' + encodeURIComponent(user.displayName || 'User');
    }
    if (userName) {
        userName.textContent = user.displayName?.split(' ')[0] || 'User';
    }
    if (userEmail) {
        userEmail.textContent = user.email;
    }
}

async function loadUserTrees() {
    showLoading();

    try {
        console.log('Loading user trees...');

        const timeoutPromise = new Promise((_, reject) =>
            setTimeout(() => reject(new Error('Timeout loading trees')), 10000)
        );

        const trees = await Promise.race([
            firestoreFamilyService.getFamilyTrees(),
            timeoutPromise
        ]);

        console.log('Found trees:', trees.length);

        hideLoading();

        if (trees.length === 0) {
            console.log('No trees found, auto-creating default tree');
            // Auto-create a default tree for the user instead of showing modal
            await autoCreateDefaultTree();
        } else if (trees.length === 1) {
            console.log('One tree found, loading:', trees[0].name);
            await loadTree(trees[0].id, trees[0].name);
            // Ensure button is enabled after loading
            enableAddMemberButton();
        } else {
            console.log('Multiple trees found, showing selection');
            showTreesModal();
        }
    } catch (error) {
        console.error('Error loading trees:', error);
        hideLoading();
        disableAddMemberButton();
        showCreateTreeModal();
    }
}

async function autoCreateDefaultTree() {
    showLoading();

    try {
        const user = authService.getCurrentUser();
        const treeName = user?.displayName ? `${user.displayName}'s Family Tree` : 'My Family Tree';

        console.log('Auto-creating tree:', treeName);
        const treeId = await firestoreFamilyService.createFamilyTree(treeName);
        console.log('Tree created:', treeId);
        await loadTree(treeId, treeName);

        // Auto-create the user's own tile as the first member
        if (user) {
            const nameParts = (user.displayName || 'User').split(' ');
            const firstName = nameParts[0] || 'User';
            const lastName = nameParts.slice(1).join(' ') || '';

            const memberData = {
                firstName: firstName,
                lastName: lastName,
                name: user.displayName || 'User',
                gender: 'male', // Default, user can edit later
                relationship: 'Self',
                photoURL: user.photoURL || null,
                email: user.email || null,
                isAlive: true,
                isCurrentUser: true // Mark this as the current user's tile
            };

            await firestoreFamilyService.addMember(memberData);
            console.log('Auto-created user tile for:', user.displayName);
        }

        enableAddMemberButton();
        hideLoading();
    } catch (error) {
        console.error('Error auto-creating tree:', error);
        hideLoading();
        // Fall back to showing the create modal if auto-create fails
        showCreateTreeModal();
    }
}

async function loadTree(treeId, treeName = 'My Family Tree') {
    showLoading();
    console.log('Loading tree:', treeId);

    try {
        await firestoreFamilyService.loadFamilyTree(treeId);

        if (currentTreeName) {
            currentTreeName.textContent = treeName;
        }

        if (!app) {
            console.log('Creating new FamilyTreeApp instance');
            app = new FamilyTreeApp(firestoreFamilyService);
            app.initWithService();
        } else {
            console.log('Refreshing existing app');
            app.render();
            app.updateStatistics();
        }

        enableAddMemberButton();
        hideTreesModal();
        hideCreateTreeModal();
    } catch (error) {
        console.error('Error loading tree:', error);
        alert('Failed to load family tree: ' + error.message);
    }

    hideLoading();
}

function toggleUserDropdown() {
    userDropdown?.classList.toggle('hidden');
}

function showTreesModal() {
    userDropdown?.classList.add('hidden');
    populateTreesList();
    if (treesModal) {
        treesModal.classList.remove('hidden');
        treesModal.classList.add('active');
        document.body.style.overflow = 'hidden';
    }
}

function hideTreesModal() {
    if (treesModal) {
        treesModal.classList.remove('active');
        treesModal.classList.add('hidden');
        document.body.style.overflow = '';
    }
}

async function populateTreesList() {
    const treesList = document.getElementById('treesList');
    if (!treesList) return;

    treesList.innerHTML = '<div class="trees-loading">Loading...</div>';

    try {
        const trees = await firestoreFamilyService.getFamilyTrees();

        if (trees.length === 0) {
            treesList.innerHTML = `
                <div class="trees-empty">
                    <svg viewBox="0 0 20 20" fill="currentColor">
                        <path d="M2 6a2 2 0 012-2h5l2 2h5a2 2 0 012 2v6a2 2 0 01-2 2H4a2 2 0 01-2-2V6z"/>
                    </svg>
                    <p>No family trees yet</p>
                    <p class="text-muted">Create your first family tree to get started</p>
                </div>
            `;
            return;
        }

        treesList.innerHTML = trees.map(tree => `
            <div class="tree-item ${tree.id === firestoreFamilyService.currentTreeId ? 'active' : ''}"
                 data-tree-id="${tree.id}" data-tree-name="${tree.name}">
                <div class="tree-item-info">
                    <span class="tree-item-name">${tree.name}</span>
                    <span class="tree-item-meta">Created ${formatDate(tree.createdAt)}</span>
                </div>
                <svg class="tree-item-arrow" viewBox="0 0 20 20" fill="currentColor">
                    <path fill-rule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clip-rule="evenodd"/>
                </svg>
            </div>
        `).join('');

        // Add click handlers
        treesList.querySelectorAll('.tree-item').forEach(item => {
            item.addEventListener('click', () => {
                const treeId = item.dataset.treeId;
                const treeName = item.dataset.treeName;
                loadTree(treeId, treeName);
            });
        });
    } catch (error) {
        console.error('Error populating trees list:', error);
        treesList.innerHTML = `
            <div class="trees-empty">
                <p>Error loading trees</p>
                <p class="text-muted">${error.message}</p>
            </div>
        `;
    }
}

function showCreateTreeModal() {
    hideTreesModal();
    const treeNameInput = document.getElementById('treeName');
    if (treeNameInput) {
        treeNameInput.value = '';
    }
    if (createTreeModal) {
        createTreeModal.classList.remove('hidden');
        createTreeModal.classList.add('active');
        document.body.style.overflow = 'hidden';
    }
}

function hideCreateTreeModal() {
    if (createTreeModal) {
        createTreeModal.classList.remove('active');
        createTreeModal.classList.add('hidden');
        document.body.style.overflow = '';
    }
}

async function handleCreateTree() {
    const treeNameInput = document.getElementById('treeName');
    const treeName = treeNameInput?.value.trim() || 'My Family Tree';

    showLoading();
    hideCreateTreeModal();

    try {
        console.log('Creating tree:', treeName);
        const treeId = await firestoreFamilyService.createFamilyTree(treeName);
        console.log('Tree created:', treeId);
        await loadTree(treeId, treeName);

        // Ensure button is enabled after tree creation
        enableAddMemberButton();
        console.log('Add Member button should now be enabled');
        hideLoading();
    } catch (error) {
        console.error('Error creating tree:', error);
        hideLoading();
        alert('Failed to create family tree: ' + error.message);
    }
}

function showLoading() {
    if (loadingOverlay) {
        loadingOverlay.classList.remove('hidden');
    }
}

function hideLoading() {
    if (loadingOverlay) {
        loadingOverlay.classList.add('hidden');
    }
}

function formatDate(timestamp) {
    if (!timestamp) return 'Unknown';

    const date = timestamp.toDate ? timestamp.toDate() : new Date(timestamp);
    return date.toLocaleDateString('en-IN', {
        day: 'numeric',
        month: 'short',
        year: 'numeric'
    });
}

function disableAddMemberButton() {
    const addMemberBtn = document.getElementById('addMemberBtn');
    if (addMemberBtn) {
        addMemberBtn.disabled = true;
        addMemberBtn.style.opacity = '0.5';
        addMemberBtn.style.cursor = 'not-allowed';
        addMemberBtn.title = 'Please create a family tree first';
    }
}

function enableAddMemberButton() {
    const addMemberBtn = document.getElementById('addMemberBtn');
    if (addMemberBtn) {
        addMemberBtn.disabled = false;
        addMemberBtn.style.opacity = '1';
        addMemberBtn.style.cursor = 'pointer';
        addMemberBtn.title = 'Add a new family member';
    }
}
