import { collection, getDocs, getDoc, setDoc, doc, deleteDoc } from 'firebase/firestore'

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

export const fetchTasksNumbers = async () => {
  const numbers = []
  const response = await getDocs(collection(db, 'tasks'))
  response.forEach((doc) => {
    numbers.push(doc.data().id)
  })
  const lastNum = numbers.sort((a, b) => b - a)[0]
  return [numbers, lastNum]
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

export const writeTaskToFirestore = async ({ id, task }) => {
  const docRef = doc(db, 'tasks', id.toString())
  await setDoc(docRef, task, { merge: true })
}

export const deleteTaskFromFirestore = async ({ id }) => {
  const docRef = doc(db, 'tasks', id.toString())
  await deleteDoc(docRef)
}

export const listenToFirebase = async ({ id, time }) => {
  const docRef = doc(db, 'tasks', id.toString())
  const response = id && await getDoc(docRef)
  const data = response.data()
  return data
}
