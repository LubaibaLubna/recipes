

// import React, { createContext, useEffect, useState } from 'react';
// import { 
//     createUserWithEmailAndPassword, 
//     getAuth, 
//     onAuthStateChanged, 
//     signInWithEmailAndPassword, 
//     signOut, 
//     updateProfile, 
//     GoogleAuthProvider, 
//     signInWithPopup 
// } from "firebase/auth";
// import app from "../firebase/firebase.config";

// export const AuthContext = createContext();
// const auth = getAuth(app);
// const googleProvider = new GoogleAuthProvider();

// const AuthProvider = ({ children }) => {
//     const [user, setUser] = useState(null);
//     const [loading, setLoading] = useState(true);

//     const createUser = (email, password) => {
//         setLoading(true);
//         return createUserWithEmailAndPassword(auth, email, password);
//     };

//     const signIn = (email, password) => {
//         setLoading(true);
//         return signInWithEmailAndPassword(auth, email, password);
//     };

//     const signInWithGoogle = () => {
//         setLoading(true);
//         return signInWithPopup(auth, googleProvider);
//     };

//     const updateUser = (updatedData) => {
//         return updateProfile(auth.currentUser, updatedData);
//     };

//     const logOut = () => {
//         setLoading(true);
//         return signOut(auth);
//     };

//     useEffect(() => {
//         const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
//             setUser(currentUser);
//             setLoading(false);
//         });
//         return () => unsubscribe();
//     }, []);

//     const authData = {
//         user,
//         setUser,
//         createUser,
//         signIn,
//         signInWithGoogle,
//         updateUser,
//         logOut,
//         loading,
//         setLoading,
//     };

//     return <AuthContext.Provider value={authData}>{children}</AuthContext.Provider>;
// };

// export default AuthProvider;





// src/provider/AuthProvider.jsx
import React, { createContext, useEffect, useState } from "react";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider,
  updateProfile,
  signOut,
  onAuthStateChanged,
} from "firebase/auth";
import app from "../firebase/firebase.config";


export const AuthContext = createContext();
const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const createUser = (email, password) => {
    setLoading(true);
    return createUserWithEmailAndPassword(auth, email, password);
  };

  const signIn = (email, password) => {
    setLoading(true);
    return signInWithEmailAndPassword(auth, email, password);
  };

  const signInWithGoogle = () => {
    setLoading(true);
    return signInWithPopup(auth, googleProvider);
  };

  const updateUser = (profile) => {
    if (!auth.currentUser) return Promise.reject("No user logged in");
    return updateProfile(auth.currentUser, profile);
  };

  const logOut = () => {
    setLoading(true);
    return signOut(auth);
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        createUser,
        signIn,
        signInWithGoogle,
        updateUser,
        logOut,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
