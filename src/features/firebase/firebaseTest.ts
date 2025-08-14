import React, { useEffect } from "react";
import { auth } from "../../services/firebaseConfig";
import { signInAnonymously, getAuth, signInWithEmailAndPassword } from "firebase/auth";

export default function FirebaseTest() {
  useEffect(() => {
    console.log("Attempting anonymous sign-in...");
    signInAnonymously(auth)
      .then(() => {
        console.log("Anonymous sign-in successful!");
      })
      .catch((e) => {
        console.error("Anonymous sign-in failed!", e);
      });
  }, []);
    // useEffect(() => {
    // console.log("Attempting email sign-in...");
    // signInWithEmailAndPassword(auth, 'travisjupp@gmail.com', 'testPass')
    //   .then((userCredential) => {
    //     console.log("Email sign-in successful!");
    //     const user = userCredential.user;
    //   })
    //   .catch((e) => {
    //     console.error("Email sign-in failed!", e);
    //   });
    // }, []);
  return null;
}

