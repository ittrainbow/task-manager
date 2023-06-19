import {
  collection,
  getDocs,
  getDoc,
  setDoc,
  doc,
  deleteDoc,
  DocumentReference,
  QuerySnapshot,
  DocumentSnapshot
} from 'firebase/firestore'

import { db } from '../db/firebase'
import { ITask, IUser } from '../interfaces'

export const fetchNameFromFirestore = async (uid: string) => {
  try {
    const response: DocumentSnapshot = await getDoc(doc(db, 'users', uid))
    return response.data()?.name
  } catch (error) {
    if (error instanceof Error) console.error(error.message)
  }
}

export const fetchTasks = async () => {
  try {
    const response: QuerySnapshot = await getDocs(collection(db, 'tasks'))
    return response.docs.map((el) => el.data())
  } catch (error) {
    if (error instanceof Error) console.error(error.message)
  }
}

export const fetchUserList = async () => {
  try {
    const response: QuerySnapshot = await getDocs(collection(db, 'users'))
    const userlist: Omit<IUser, 'email'>[] = response.docs.map((el) => {
      return { uid: el.id, name: el.data().name }
    })
    return userlist
  } catch (error) {
    if (error instanceof Error) console.error(error.message)
  }
}

export const writeNameToFirestore = async ({ uid, name }: Omit<IUser, 'email'>) => {
  try {
    const docRef: DocumentReference = doc(db, 'users', uid)
    return await setDoc(docRef, { name }, { merge: true })
  } catch (error) {
    if (error instanceof Error) console.error(error.message)
  }
}

export const writeTaskToFirestore = async (task: ITask) => {
  try {
    const id: number = task.id
    const docRef: DocumentReference = doc(db, 'tasks', id.toString())
    return await setDoc(docRef, task, { merge: true })
  } catch (error) {
    if (error instanceof Error) console.error(error.message)
  }
}

export const deleteTaskFromFirestore = async (id: number = 0) => {
  try {
    const docRef: DocumentReference = doc(db, 'tasks', id.toString())
    return await deleteDoc(docRef)
  } catch (error) {
    if (error instanceof Error) console.error(error.message)
  }
}

export const listenToFirebase = async ({ id }: { id: number }) => {
  try {
    const docRef: DocumentReference = doc(db, 'tasks', id.toString())
    const response: DocumentSnapshot = await getDoc(docRef)
    return response.data()
  } catch (error) {
    if (error instanceof Error) console.error(error.message)
  }
}
