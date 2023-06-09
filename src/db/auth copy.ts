// import { db, auth } from './firebase'
// import React, { useContext } from 'react'
// import { getDoc, setDoc, doc } from 'firebase/firestore'
// import {
//   GoogleAuthProvider,
//   signInWithPopup,
//   signInWithEmailAndPassword,
//   createUserWithEmailAndPassword,
//   sendPasswordResetEmail,
//   signOut,
//   sendEmailVerification
// } from 'firebase/auth'

// import { Login } from '../interfaces'

// const googleProvider = new GoogleAuthProvider()

// export const signInWithGoogle = async () => {
//   try {
//     const response = await signInWithPopup(auth, googleProvider)
//     const { email, displayName: name, uid } = response.user
//     const docs = await getDoc(doc(db, 'users', uid))
//     if (docs.data() === undefined) {
//       await setDoc(doc(db, 'users', uid), { name, email })
//     }
//   } catch (error: Error) {
//     console.error(error)
//     alert(error.message)
//   }
// }

// export const logInWithEmailAndPassword = async ({ email, password }: Login) => {
//   try {
//     await signInWithEmailAndPassword(auth, email, password)
//   } catch (error: Error) {
//     console.error(error)
//     alert(error.message)
//   }
// }

// export const registerWithEmailAndPassword = async ({ name, email, password }: Login) => {
//   try {
//     const response = await createUserWithEmailAndPassword(auth, email, password)
//     const { uid } = response.user
//     const data = { name, email }
//     await setDoc(doc(db, 'users', uid), data)
//   } catch (error: Error) {
//     console.error(error)
//     alert(error.message)
//   }
// }

// export const sendPasswordReset = async ({ email }: Login) => {
//   try {
//     await sendPasswordResetEmail(auth, email)
//     alert('Password reset link sent!')
//   } catch (error: Error) {
//     console.error(error)
//     alert(error.message)
//   }
// }

// export const verifyEmail = async () => {
//   sendEmailVerification(auth.currentUser)
// }

// export const logout = () => {
//   signOut(auth)
// }

// export function useAuthValue() {
//   return useContext(AuthContext)
// }

// const AuthContext = React.createContext()

// export function AuthProvider = ({ children, value }) {
//   return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
// }
