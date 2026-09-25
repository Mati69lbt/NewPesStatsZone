import { addDoc, collection, deleteDoc, doc, getDocs, onSnapshot, updateDoc, writeBatch } from 'firebase/firestore'
import { db } from '../config/firebase'

function formationsCollection(uid) {
  return collection(db, 'users', uid, 'formaciones')
}

export function subscribeToFormations(uid, onChange) {
  return onSnapshot(formationsCollection(uid), (snapshot) => {
    onChange(snapshot.docs.map((docSnap) => ({ id: docSnap.id, ...docSnap.data() })))
  })
}

export async function addFormation(uid, formation) {
  await addDoc(formationsCollection(uid), formation)
}

export async function updateFormation(uid, formationId, formation) {
  await updateDoc(doc(db, 'users', uid, 'formaciones', formationId), formation)
}

export async function deleteFormation(uid, formationId) {
  await deleteDoc(doc(db, 'users', uid, 'formaciones', formationId))
}

export async function deleteAllFormations(uid) {
  const snapshot = await getDocs(formationsCollection(uid))
  const batch = writeBatch(db)
  snapshot.docs.forEach((docSnap) => batch.delete(docSnap.ref))
  await batch.commit()
}
