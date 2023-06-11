import { db, auth } from './firebase'
import { useContext, createContext } from 'react'
import { getDoc, setDoc, doc } from 'firebase/firestore'
import {
  GoogleAuthProvider,
  signInWithPopup,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  sendPasswordResetEmail,
  signOut,
  sendEmailVerification
} from 'firebase/auth'

const googleProvider = new GoogleAuthProvider()

export const signInWithGoogle = async () => {
  try {
    const response = await signInWithPopup(auth, googleProvider)
    const {
      email,
      displayName: name,
      uid
    } = response.user
    const docs = await getDoc(doc(db, 'users', uid))
    if (docs.data() === undefined) {
      await setDoc(doc(db, 'users', uid), { name, email })
    }
  } catch (error: any) {
    console.error(error)
    alert(error.message)
  }
}

export const logInWithEmailAndPassword = async (email: string, password: string) => {
  try {
    await signInWithEmailAndPassword(auth, email, password)
  } catch (error: any) {
    console.error(error)
    alert(error.message)
  }
}

export const registerWithEmailAndPassword = async (
  name: string,
  email: string,
  password: string
) => {
  try {
    const response = await createUserWithEmailAndPassword(auth, email, password)
    const { uid } = response.user
    const data: { name: string; email: string } = { name, email }
    await setDoc(doc(db, 'users', uid), data)
  } catch (error: any) {
    console.error(error)
    alert(error.message)
  }
}

export const sendPasswordReset = async (email: string) => {
  try {
    await sendPasswordResetEmail(auth, email)
    alert('Password reset link sent!')
  } catch (error: any) {
    console.error(error)
    alert(error.message)
  }
}

export const verifyEmail = async () => {
  if (auth.currentUser) sendEmailVerification(auth.currentUser)
}

export const logout = () => {
  signOut(auth)
}

export function useAuthValue() {
  return useContext(AuthContext)
}

const AuthContext = createContext({})

type AuthProviderProps = {
  children: JSX.Element
  value: any
}

export function AuthProvider({ children }: AuthProviderProps) {
  return <AuthContext.Provider value={{}}>{children}</AuthContext.Provider>
}
