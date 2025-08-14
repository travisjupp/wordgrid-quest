import { initializeApp } from 'firebase/app';
import Constants from 'expo-constants';

// Import the functions you need from the SDKs you need
import { getAnalytics, isSupported } from 'firebase/analytics';
import { getAuth, signInAnonymously } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
console.log('api key',Constants.expoConfig?.extra?.firebaseApiKey); 
// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: Constants.expoConfig?.extra?.firebaseApiKey,
  authDomain: Constants.expoConfig?.extra?.firebaseAuthDomain,
  projectId: "wordgrid-quest-dev",
  storageBucket: "wordgrid-quest-dev.firebasestorage.app",
  messagingSenderId: "186043510812",
  appId: "1:186043510812:web:d9705ae724fdb25a222fd9",
  measurementId: "G-631FYFBHPF"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Export services
// Initialize Analytics if supported in environment
isSupported().then(supported => {
  if (supported) {
    // Firebase Analytics only works for Web when using 
    // Firebase JS SDK, for iOS/Android support use React Native Firebase: 
    // https://docs.expo.dev/guides/using-firebase/#using-react-native-firebase
    console.log('Firebase Analytics supported, initializing..');
    const analytics = getAnalytics(app); 
  } else {
    console.log('Firebase Analytics not supported in this environment');
  };
});

export const auth = getAuth(app);
signInAnonymously(auth)
  .then(() => {
    console.log("Anonymous sign-in successful!");
  })
  .catch((e) => {
    console.error("Anonymous sign-in failed!", e);
  });

export default app;

