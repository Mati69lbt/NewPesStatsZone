import { collection, doc, onSnapshot, setDoc } from 'firebase/firestore'
import { db } from '../config/firebase'

function tournamentDoc(uid, torneo) {
  return doc(db, 'users', uid, 'torneos', torneo)
}

export async function updateTournamentResult(uid, torneo, resultado) {
  await setDoc(tournamentDoc(uid, torneo), { resultado }, { merge: true })
}

export async function updateTournamentTipo(uid, torneo, tipo) {
  await setDoc(tournamentDoc(uid, torneo), { tipo }, { merge: true })
}

export function subscribeToTournamentResults(uid, onChange) {
  return onSnapshot(collection(db, 'users', uid, 'torneos'), (snapshot) => {
    onChange(
      Object.fromEntries(
        snapshot.docs.map((docSnap) => [
          docSnap.id,
          { resultado: docSnap.data().resultado ?? '', tipo: docSnap.data().tipo ?? 'europeo' },
        ])
      )
    )
  })
}
