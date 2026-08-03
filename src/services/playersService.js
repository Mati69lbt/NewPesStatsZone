import { addDoc, collection, deleteDoc, doc, onSnapshot, orderBy, query, updateDoc } from 'firebase/firestore'
import { db } from '../config/firebase'

function playersCollection(uid) {
  return collection(db, 'users', uid, 'jugadores')
}

export function subscribeToPlayers(uid, onChange) {
  const q = query(playersCollection(uid), orderBy('nombre'))
  return onSnapshot(q, (snapshot) => {
    onChange(snapshot.docs.map((docSnap) => ({ id: docSnap.id, ...docSnap.data() })))
  })
}

export async function addPlayer(uid, player) {
  await addDoc(playersCollection(uid), player)
}

export async function updatePlayer(uid, playerId, player) {
  await updateDoc(doc(db, 'users', uid, 'jugadores', playerId), player)
}

export async function deletePlayer(uid, playerId) {
  await deleteDoc(doc(db, 'users', uid, 'jugadores', playerId))
}
