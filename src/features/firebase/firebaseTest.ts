import { useEffect } from 'react';
import { auth } from '../../services/firebaseConfig';
import { signInAnonymously } from 'firebase/auth';

export function FirebaseTest() {
  useEffect(() => {
    console.log('Attempting anonymous sign-in...');
    signInAnonymously(auth)
      .then(() => {
        console.log('Anonymous sign-in successful!');
      })
      .catch(e => {
        console.error('Anonymous sign-in failed!', e);
      });
  }, []);
  return null;
}
