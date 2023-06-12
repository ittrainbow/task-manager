import {
  collection,
  getDocs,
  getDoc,
  setDoc,
  doc,
  deleteDoc,
  DocumentData,
  DocumentReference,
  QuerySnapshot,
  QueryDocumentSnapshot,
  DocumentSnapshot
} from 'firebase/firestore'

import { db } from '../db/firebase'
import { Task, TaskFetch, User } from '../interfaces'

interface UserFromUserlist extends User {
  uid: string
}

export const fetchNameFromFirestore = async (uid: string | null) => {
  if (typeof uid === 'string') {
    const response: DocumentSnapshot<DocumentData> = await getDoc(doc(db, 'users', uid))
    const data: DocumentData | undefined = response.data()
    if (data) return data.name
  }
}

export const fetchTasks = async () => {
  const tasklist: (Task | TaskFetch)[] = []
  const response: QuerySnapshot<DocumentData> = await getDocs(collection(db, 'tasks'))
  response.forEach((doc: QueryDocumentSnapshot<DocumentData>) => {
    const task: TaskFetch = doc.data()
    tasklist.push(task)
  })
  return tasklist
}

export const fetchUserList = async () => {
  const userlist: UserFromUserlist[] = []
  const response: QuerySnapshot<DocumentData> = await getDocs(collection(db, 'users'))
  response.forEach((doc: QueryDocumentSnapshot<DocumentData>) => {
    const { name, email } = doc.data()
    userlist.push({ uid: doc.id, name, email })
  })
  return userlist
}

export const writeNameToFirestore = async ({ uid, name }: UserFromUserlist) => {
  const docRef: DocumentReference<DocumentData> = doc(db, 'users', uid)
  await setDoc(docRef, { name }, { merge: true })
}

export const writeTaskToFirestore = async (task: Task) => {
  const id: number = task.id
  const docRef: DocumentReference<DocumentData> = doc(db, 'tasks', id.toString())
  await setDoc(docRef, task, { merge: true })
}

export const deleteTaskFromFirestore = async (id = 0) => {
  const docRef: DocumentReference<DocumentData> = doc(db, 'tasks', id.toString())
  await deleteDoc(docRef)
}

export const listenToFirebase = async ({ id = 0 }) => {
  const docRef: DocumentReference<DocumentData> = doc(db, 'tasks', id.toString())
  const response: DocumentSnapshot<DocumentData> = await getDoc(docRef)
  const data = response.data()
  return data
}
