import { addDoc, collection, deleteDoc, doc, onSnapshot, orderBy, query, updateDoc } from 'firebase/firestore'
import { db } from '../config/firebase'

function matchesCollection(uid) {
  return collection(db, 'users', uid, 'partidos')
}

export function subscribeToMatches(uid, onChange) {
  const q = query(matchesCollection(uid), orderBy('fecha', 'desc'))
  return onSnapshot(q, (snapshot) => {
    onChange(snapshot.docs.map((docSnap) => ({ id: docSnap.id, ...docSnap.data() })))
  })
}

export async function addMatch(uid, match) {
  await addDoc(matchesCollection(uid), match)
}

export async function updateMatch(uid, matchId, match) {
  await updateDoc(doc(db, 'users', uid, 'partidos', matchId), match)
}

export async function deleteMatch(uid, matchId) {
  await deleteDoc(doc(db, 'users', uid, 'partidos', matchId))
}
