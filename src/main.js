import FamilyTreeApp from './components/FamilyTreeApp.js';
import './styles/main.css';

// Initialize the application
document.addEventListener('DOMContentLoaded', () => {
    const app = new FamilyTreeApp();
    app.init();
});
