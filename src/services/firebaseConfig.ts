import { getApp, getApps, initializeApp } from 'firebase/app';
import { getAnalytics, isSupported } from 'firebase/analytics';
import { browserLocalPersistence } from '@firebase/auth';
import { getReactNativePersistence, initializeAuth, getAuth } from 'firebase/auth';
import ReactNativeAsyncStorage from '@react-native-async-storage/async-storage';
import {
  connectFirestoreEmulator,
  doc,
  getFirestore,
  setDoc,
} from 'firebase/firestore';
import { Platform } from 'react-native';

const firebaseConfig = {
  apiKey: process.env.EXPO_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.EXPO_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.EXPO_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.EXPO_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.EXPO_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.EXPO_PUBLIC_FIREBASE_APP_ID,
  measurementId: process.env.EXPO_PUBLIC_FIREBASE_MEASUREMENT_ID,
};

// Initialize Firebase
const appInitialized = getApps().length > 0;
const app = appInitialized ? getApp() : initializeApp(firebaseConfig);
const db = getFirestore();

// Connect Emulators
const useEmulator = process.env.EXPO_PUBLIC_USE_EMULATOR === 'true';
if (useEmulator) {
  console.log('---=== USING FIREBASE EMULATORS ===---');
  const emulatorHost = Platform.OS === 'android' ? '10.0.2.2' : 'localhost';

  connectFirestoreEmulator(db, emulatorHost, 8086);
  console.log(`Connected to Firestore Emulator at ${emulatorHost}:8086`);
  (async () => {
    /* Test writing to emulator DB */
    try {
      await setDoc(doc(db, 'cities', 'LA'), {
        name: 'Los Angeles',
        state: 'CA',
        country: 'USA',
      });
    } catch (e: any) {
      console.log('Error writing to Firestore emulator: ', e.message);
    }
  })();
} else {
  console.log('---=== NOT USING FIREBASE EMULATORS ===---');
  (async () => {
    /* Test writing to remote DB */
    try {
      await setDoc(doc(db, 'cities', 'Baltimore'), {
        name: 'Baltimore',
        state: 'MD',
        country: 'USA',
      });
    } catch (e: any) {
      console.log('Error writing to remote Firestore: ', e.message);
    }
  })();
}

// EXPORT SERVICES
// -- Initialize Analytics if supported in environment
isSupported().then(supported => {
  if (supported) {
    // Firebase Analytics only works for Web when using
    // Firebase JS SDK, for iOS/Android support use React Native Firebase:
    // https://docs.expo.dev/guides/using-firebase/#using-react-native-firebase
    console.log('Firebase Analytics supported, initializing..');
    getAnalytics(app);
  } else {
    console.log('Firebase Analytics not supported in this environment');
  }
});

// -- Initialize Auth
const auth = (() => {
  // Setup persistence RN or Web platforms
  const persistence =
    Platform.OS === 'web' ?
      browserLocalPersistence
    : getReactNativePersistence(ReactNativeAsyncStorage);

  if (appInitialized) {
    try {
      return getAuth(app); /* Get existing instance */
    } catch (e) {
      console.log('Error getting existing auth instance: ', e);
      return initializeAuth(app, { persistence });
    }
  }
  // Fallback for standard initialization
  return initializeAuth(app, { persistence });
})();

export { auth };
export default app;
