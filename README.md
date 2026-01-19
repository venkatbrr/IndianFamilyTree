# Indian Family Tree Enterprise

A professional, interactive family tree visualization application with Indian cultural features. Features Google Sign-In authentication and Firebase cloud storage.

## Features

- Interactive family tree visualization
- Google Sign-In authentication
- Cloud storage with Firebase Firestore
- Multiple family trees per user
- Support for Indian family relationships (gotras, kuldevta)
- Multiple viewing modes (tree, timeline, grid)
- Search and filter functionality
- Responsive design for all devices
- Print and export capabilities
- Cultural celebrations tracking

## Getting Started

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn
- Firebase project (for authentication and database)

### Firebase Setup

1. Create a Firebase project at [Firebase Console](https://console.firebase.google.com/)
2. Enable Google Sign-In in Authentication > Sign-in method
3. Create a Firestore database
4. Register a web app and get your config values
5. Copy `.env.example` to `.env` and fill in your Firebase config:

```bash
cp .env.example .env
```

Edit `.env` with your Firebase project values:
```
VITE_FIREBASE_API_KEY=your_api_key
VITE_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=your_project_id
VITE_FIREBASE_STORAGE_BUCKET=your_project.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
VITE_FIREBASE_APP_ID=your_app_id
```

### Installation

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

### Deploy to Firebase Hosting

```bash
# Install Firebase CLI
npm install -g firebase-tools

# Login to Firebase
firebase login

# Update .firebaserc with your project ID
# Then deploy
firebase deploy
```

## Project Structure

```
IndianFamilyTree/
├── src/
│   ├── components/      # UI components
│   ├── config/          # Firebase configuration
│   ├── services/        # Business logic & Firebase services
│   ├── utils/           # Utility functions
│   └── styles/          # CSS styles
├── public/              # Static assets
├── firebase.json        # Firebase hosting config
├── firestore.rules      # Firestore security rules
├── index.html           # Entry point
└── package.json         # Dependencies
```

## Technology Stack

- **Firebase** - Authentication, Firestore database, Hosting
- **D3.js** - Data visualization
- **Vite** - Build tool
- **Vanilla JavaScript** - Core logic
- **CSS3** - Styling and animations

## License

MIT
