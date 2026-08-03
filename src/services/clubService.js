import { doc, onSnapshot, setDoc } from 'firebase/firestore'
import { db } from '../config/firebase'

export async function updateClub(uid, club) {
  await setDoc(doc(db, 'users', uid), { club }, { merge: true })
}

export function subscribeToClub(uid, onChange) {
  return onSnapshot(doc(db, 'users', uid), (snapshot) => {
    onChange(snapshot.data()?.club ?? '')
  })
}
