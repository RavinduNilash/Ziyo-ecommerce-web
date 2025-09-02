import { 
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  updateProfile
} from 'firebase/auth';
import { doc, setDoc, getDoc } from 'firebase/firestore';
import { auth, db } from './firebase';

export interface UserData {
  uid: string;
  email: string;
  displayName: string;
  photoURL?: string;
  address?: {
    street: string;
    city: string;
    state: string;
    zipCode: string;
    country: string;
  };
  phone?: string;
  createdAt: Date;
}

export const signUp = async (email: string, password: string, displayName: string) => {
  if (!auth) {
    throw new Error('Firebase Auth is not initialized. Please configure your environment variables.');
  }
  
  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;
    
    // Update the user's profile
    await updateProfile(user, { displayName });
    
    // Create user document in Firestore
    if (db) {
      const userData: UserData = {
        uid: user.uid,
        email: user.email!,
        displayName,
        createdAt: new Date()
      };
      
      await setDoc(doc(db, 'users', user.uid), userData);
    }
    
    return user;
  } catch (error) {
    throw error;
  }
};

export const signIn = async (email: string, password: string) => {
  if (!auth) {
    throw new Error('Firebase Auth is not initialized. Please configure your environment variables.');
  }
  
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    return userCredential.user;
  } catch (error) {
    throw error;
  }
};

export const logOut = async () => {
  if (!auth) {
    throw new Error('Firebase Auth is not initialized. Please configure your environment variables.');
  }
  
  try {
    await signOut(auth);
  } catch (error) {
    throw error;
  }
};

export const getUserData = async (uid: string): Promise<UserData | null> => {
  if (!db) {
    console.warn('Firestore is not initialized. Please configure your environment variables.');
    return null;
  }
  
  try {
    const userDoc = await getDoc(doc(db, 'users', uid));
    if (userDoc.exists()) {
      return userDoc.data() as UserData;
    }
    return null;
  } catch (error) {
    console.error('Error fetching user data:', error);
    return null;
  }
};

export const updateUserData = async (uid: string, userData: Partial<UserData>) => {
  if (!db) {
    throw new Error('Firestore is not initialized. Please configure your environment variables.');
  }
  
  try {
    await setDoc(doc(db, 'users', uid), userData, { merge: true });
  } catch (error) {
    throw error;
  }
};