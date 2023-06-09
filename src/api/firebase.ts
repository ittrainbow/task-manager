import { collection, getDocs, getDoc, setDoc, doc, deleteDoc } from 'firebase/firestore'

import { db } from '../db/firebase'
import { Task, User } from '../interfaces'

interface UserFromUserlist extends User {
  uid: string
}

export const fetchNameFromFirestore = async (uid: string | null) => {
  if (typeof uid === 'string') {
    const response = await getDoc(doc(db, 'users', uid))
    const data = response.data()
    if (data) return data.name
  }
}

export const fetchTasks = async () => {
  const tasklist: Task[] = []
  const response = await getDocs(collection(db, 'tasks'))
  response.forEach((doc) => {
    const task: Task = doc.data()
    tasklist.push(task)
  })
  return tasklist
}

export const fetchTasksNumbers = async () => {
  const numbers: number[] = []
  const response = await getDocs(collection(db, 'tasks'))
  response.forEach((doc) => {
    numbers.push(doc.data().id)
  })
  const lastNum = numbers.sort((a, b) => b - a)[0]
  return [numbers, lastNum]
}

export const fetchUserList = async () => {
  const userlist: UserFromUserlist[] = []
  const response = await getDocs(collection(db, 'users'))
  response.forEach((doc) => {
    const { name, email } = doc.data()
    const uid = doc.id
    userlist.push({ uid, name, email })
  })
  return userlist
}

export const writeNameToFirestore = async ({ uid, name }: UserFromUserlist) => {
  const docRef = doc(db, 'users', uid)
  await setDoc(docRef, { name }, { merge: true })
}

export const writeTaskToFirestore = async (task: Task) => {
  const { id = 0 } = task // TODO
  const docRef = doc(db, 'tasks', id.toString())
  await setDoc(docRef, task, { merge: true })
}

export const deleteTaskFromFirestore = async (id = 0) => {
  // TODO
  const docRef = doc(db, 'tasks', id.toString())
  await deleteDoc(docRef)
}

export const listenToFirebase = async ({ id = 0 }) => {
  const docRef = doc(db, 'tasks', id.toString())
  const response = await getDoc(docRef)
  const data = response.data()
  return data
}
