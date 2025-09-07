// Firebase utility functions for graceful fallback
import { isFirebaseAvailable } from './firebase';

export const withFirebaseFallback = async <T>(
  firebaseOperation: () => Promise<T>,
  fallbackOperation: () => Promise<T> | T,
  operationName: string = 'Firebase operation'
): Promise<T> => {
  // Check if Firebase is available first
  if (!isFirebaseAvailable()) {
    console.warn(`${operationName}: Firebase not available, using fallback`);
    return fallbackOperation();
  }

  try {
    return await firebaseOperation();
  } catch (error) {
    console.warn(`${operationName}: Firebase operation failed, using fallback:`, error);
    return fallbackOperation();
  }
};

export const silentFirebaseOperation = async <T>(
  firebaseOperation: () => Promise<T>,
  defaultValue: T,
  operationName: string = 'Firebase operation'
): Promise<T> => {
  // Check if Firebase is available first
  if (!isFirebaseAvailable()) {
    console.warn(`${operationName}: Firebase not available, returning default`);
    return defaultValue;
  }

  try {
    return await firebaseOperation();
  } catch (error) {
    console.warn(`${operationName}: Firebase operation failed, returning default:`, error);
    return defaultValue;
  }
};
