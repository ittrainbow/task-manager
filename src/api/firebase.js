import { collection, getDocs, getDoc, setDoc, doc } from 'firebase/firestore'

import { db } from '../db/firebase'

export const fetchNameFromFirestore = async (uid) => {
  const response = await getDoc(doc(db, 'users', uid))
  const { name } = response.data()
  return name
}

export const fetchTasks = async () => {
  const tasklist = []
  const response = await getDocs(collection(db, 'tasks'))
  response.forEach((doc) => {
    tasklist.push(doc.data())
  })
  return tasklist
}

export const fetchUserList = async () => {
  const userlist = []
  const response = await getDocs(collection(db, 'users'))
  response.forEach((doc) => {
    const { name, email } = doc.data()
    const uid = doc.id
    userlist.push({ uid, name, email })
  })
  return userlist
}

export const writeNameToFirestore = async ({ uid, name }) => {
  const docRef = doc(db, 'users', uid)
  await setDoc(docRef, { name }, { merge: true })
}

export const writeTaskToFirestore = async ({ task }) => {
  const { id } = task
  const docRef = doc(db, 'tasks', id.toString())
  await setDoc(docRef, task, { merge: true })
}
