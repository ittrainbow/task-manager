import { db, auth } from './firebase'
import { useContext, createContext } from 'react'
import { getDoc, setDoc, doc, DocumentSnapshot } from 'firebase/firestore'
import {
  GoogleAuthProvider,
  signInWithPopup,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  sendPasswordResetEmail,
  signOut,
  sendEmailVerification,
  UserCredential
} from 'firebase/auth'

const googleProvider = new GoogleAuthProvider()

export const signInWithGoogle = async () => {
  try {
    const response: UserCredential = await signInWithPopup(auth, googleProvider)
    const { email, displayName: name, uid } = response.user
    const docs: DocumentSnapshot = await getDoc(doc(db, 'users', uid))
    if (docs.data() === undefined) {
      await setDoc(doc(db, 'users', uid), { name, email })
    }
  } catch (error) {
    if (error instanceof Error) {
      alert(error.message)
      console.error(error)
    }
  }
}

export const logInWithEmailAndPassword = async (email: string, password: string) => {
  try {
    await signInWithEmailAndPassword(auth, email, password)
  } catch (error) {
    if (error instanceof Error) {
      alert(error.message)
      console.error(error)
    }
  }
}

export const registerWithEmailAndPassword = async (
  name: string,
  email: string,
  password: string
) => {
  try {
    const response: UserCredential = await createUserWithEmailAndPassword(auth, email, password)
    const { uid } = response.user
    await setDoc(doc(db, 'users', uid), { name, email })
  } catch (error) {
    if (error instanceof Error) {
      alert(error.message)
      console.error(error)
    }
  }
}

export const sendPasswordReset = async (email: string) => {
  try {
    await sendPasswordResetEmail(auth, email)
    alert('Password reset link sent!')
  } catch (error) {
    if (error instanceof Error) {
      alert(error.message)
      console.error(error)
    }
  }
}

export const verifyEmail = async () => {
  auth.currentUser && sendEmailVerification(auth.currentUser)
}

export const logout = () => {
  signOut(auth)
}

export function useAuthValue() {
  return useContext(AuthContext)
}

const AuthContext = createContext({})

type AuthProviderProps = {
  children: React.ReactNode
}

export function AuthProvider({ children }: AuthProviderProps) {
  return <AuthContext.Provider value={{}}>{children}</AuthContext.Provider>
}
