import { initializeApp, FirebaseApp } from 'firebase/app';
import { getAuth, Auth } from 'firebase/auth';
import { getFirestore, Firestore } from 'firebase/firestore';
import { getStorage, FirebaseStorage } from 'firebase/storage';

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY || 'demo-api-key',
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN || 'demo-project.firebaseapp.com',
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID || 'demo-project',
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET || 'demo-project.appspot.com',
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID || '123456789',
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID || 'demo-app-id',
  measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID || 'demo-measurement-id'
};

// Initialize Firebase only if we have valid config
let app: FirebaseApp | null = null;
let auth: Auth | null = null;
let db: Firestore | null = null;
let storage: FirebaseStorage | null = null;

try {
  // Only initialize if we have a real API key (not demo)
  if (firebaseConfig.apiKey !== 'demo-api-key') {
    app = initializeApp(firebaseConfig);
    auth = getAuth(app);
    db = getFirestore(app);
    storage = getStorage(app);
  } else {
    // Mock Firebase services for demo/development
    console.warn('Using mock Firebase services. Please configure your environment variables.');
  }
} catch (error) {
  console.warn('Firebase initialization failed. Using mock services.', error);
}

// Helper function to check if Firebase is available and properly configured
export const isFirebaseAvailable = (): boolean => {
  return db !== null && auth !== null && firebaseConfig.apiKey !== 'demo-api-key';
};

// Helper function to safely get Firestore instance
export const getSafeFirestore = () => {
  if (!isFirebaseAvailable()) {
    throw new Error('Firebase not available');
  }
  return db!;
};

// Helper function to safely get Storage instance
export const getSafeStorage = () => {
  if (!isFirebaseAvailable()) {
    throw new Error('Firebase not available');
  }
  return storage!;
};

export { auth, db, storage };
export default app;