import FamilyTreeApp from './components/FamilyTreeApp.js';
import authService from './services/AuthService.js';
import firestoreFamilyService from './services/FirestoreFamilyService.js';
import './styles/main.css';

// UI Elements
let welcomeScreen;
let authSection;
let userSection;
let userAvatar;
let userName;
let userEmail;
let userDropdown;
let treesModal;
let createTreeModal;
let loadingOverlay;

// App instance
let app = null;

// Initialize the application
document.addEventListener('DOMContentLoaded', async () => {
    // Cache DOM elements
    cacheElements();

    // Bind auth event listeners
    bindAuthEvents();

    // Show loading
    showLoading();

    // Initialize auth and wait for state
    await authService.init();

    // Hide loading
    hideLoading();

    // Subscribe to auth state changes
    authService.onAuthStateChange(handleAuthStateChange);
});

function cacheElements() {
    welcomeScreen = document.getElementById('welcomeScreen');
    authSection = document.getElementById('authSection');
    userSection = document.getElementById('userSection');
    userAvatar = document.getElementById('userAvatar');
    userName = document.getElementById('userName');
    userEmail = document.getElementById('userEmail');
    userDropdown = document.getElementById('userDropdown');
    treesModal = document.getElementById('treesModal');
    createTreeModal = document.getElementById('createTreeModal');
    loadingOverlay = document.getElementById('loadingOverlay');
}

function bindAuthEvents() {
    // Google Sign In buttons
    document.getElementById('googleSignInBtn')?.addEventListener('click', handleSignIn);
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
    const result = await authService.signInWithGoogle();
    hideLoading();

    if (!result.success) {
        alert('Sign in failed: ' + result.error);
    }
}

async function handleSignOut() {
    userDropdown?.classList.add('hidden');
    showLoading();

    // Clear family service data
    firestoreFamilyService.clearLocalData();

    await authService.signOut();
    hideLoading();
}

async function handleAuthStateChange(user) {
    if (user) {
        // User is signed in
        showAuthenticatedUI(user);
        await loadUserTrees();
    } else {
        // User is signed out
        showUnauthenticatedUI();
    }
}

function showAuthenticatedUI(user) {
    // Hide welcome screen
    welcomeScreen?.classList.add('hidden');

    // Update header
    authSection?.classList.add('hidden');
    userSection?.classList.remove('hidden');

    // Update user info
    if (userAvatar) {
        userAvatar.src = user.photoURL || 'https://via.placeholder.com/32';
    }
    if (userName) {
        userName.textContent = user.displayName?.split(' ')[0] || 'User';
    }
    if (userEmail) {
        userEmail.textContent = user.email;
    }
}

function showUnauthenticatedUI() {
    // Show welcome screen
    welcomeScreen?.classList.remove('hidden');

    // Update header
    authSection?.classList.remove('hidden');
    userSection?.classList.add('hidden');

    // Destroy app if exists
    if (app) {
        app = null;
    }
}

async function loadUserTrees() {
    try {
        const trees = await firestoreFamilyService.getFamilyTrees();

        if (trees.length === 0) {
            // No trees - show create tree modal
            showCreateTreeModal();
        } else if (trees.length === 1) {
            // Single tree - load it directly
            await loadTree(trees[0].id);
        } else {
            // Multiple trees - show selection modal
            showTreesModal();
        }
    } catch (error) {
        console.error('Error loading trees:', error);
        // Show create tree modal as fallback
        showCreateTreeModal();
    }
}

async function loadTree(treeId) {
    showLoading();

    try {
        await firestoreFamilyService.loadFamilyTree(treeId);

        // Initialize app with Firestore service
        if (!app) {
            app = new FamilyTreeApp(firestoreFamilyService);
            app.initWithService();
        } else {
            app.render();
            app.updateStatistics();
        }

        hideTreesModal();
    } catch (error) {
        console.error('Error loading tree:', error);
        alert('Failed to load family tree');
    }

    hideLoading();
}

function toggleUserDropdown() {
    userDropdown?.classList.toggle('hidden');
}

function showTreesModal() {
    userDropdown?.classList.add('hidden');
    populateTreesList();
    treesModal?.classList.remove('hidden');
}

function hideTreesModal() {
    treesModal?.classList.add('hidden');
}

async function populateTreesList() {
    const treesList = document.getElementById('treesList');
    if (!treesList) return;

    try {
        const trees = await firestoreFamilyService.getFamilyTrees();

        if (trees.length === 0) {
            treesList.innerHTML = `
                <div class="trees-empty">
                    <svg viewBox="0 0 20 20" fill="currentColor">
                        <path d="M2 6a2 2 0 012-2h5l2 2h5a2 2 0 012 2v6a2 2 0 01-2 2H4a2 2 0 01-2-2V6z"/>
                    </svg>
                    <p>No family trees yet</p>
                </div>
            `;
            return;
        }

        treesList.innerHTML = trees.map(tree => `
            <div class="tree-item ${tree.id === firestoreFamilyService.currentTreeId ? 'active' : ''}"
                 data-tree-id="${tree.id}">
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
                loadTree(treeId);
            });
        });
    } catch (error) {
        console.error('Error populating trees list:', error);
    }
}

function showCreateTreeModal() {
    hideTreesModal();
    document.getElementById('treeName').value = '';
    createTreeModal?.classList.remove('hidden');
}

function hideCreateTreeModal() {
    createTreeModal?.classList.add('hidden');
}

async function handleCreateTree() {
    const treeNameInput = document.getElementById('treeName');
    const treeName = treeNameInput?.value.trim() || 'My Family Tree';

    showLoading();
    hideCreateTreeModal();

    try {
        const treeId = await firestoreFamilyService.createFamilyTree(treeName);
        await loadTree(treeId);
    } catch (error) {
        console.error('Error creating tree:', error);
        alert('Failed to create family tree');
        hideLoading();
    }
}

function showLoading() {
    loadingOverlay?.classList.remove('hidden');
}

function hideLoading() {
    loadingOverlay?.classList.add('hidden');
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
