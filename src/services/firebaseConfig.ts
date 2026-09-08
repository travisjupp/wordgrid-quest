import { getApp, getApps, initializeApp } from 'firebase/app';
import { getAnalytics, isSupported } from 'firebase/analytics';
// import { initializeAuth, browserLocalPersistence } from '@firebase/auth';
import {
  initializeAuth,
  getReactNativePersistence,
  getAuth,
  // @ts-ignore
  browserLocalPersistence,
} from 'firebase/auth';
import ReactNativeAsyncStorage from '@react-native-async-storage/async-storage';
import {
  connectFirestoreEmulator,
  doc,
  getFirestore,
  setDoc,
} from 'firebase/firestore';
import { Platform } from 'react-native';
import Constants from 'expo-constants';

const firebaseConfig = {
  apiKey: Constants.expoConfig?.extra?.firebaseApiKey,
  authDomain: Constants.expoConfig?.extra?.firebaseAuthDomain,
  projectId: 'wordgrid-quest-dev',
  storageBucket: 'wordgrid-quest-dev.firebasestorage.app',
  messagingSenderId: '186043510812',
  appId: '1:186043510812:web:d9705ae724fdb25a222fd9',
  measurementId: 'G-631FYFBHPF',
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
