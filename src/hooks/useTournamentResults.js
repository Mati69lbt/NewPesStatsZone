import { useEffect, useState } from 'react'
import { subscribeToTournamentResults } from '../services/tournamentsService'

function useTournamentResults(uid) {
  const [results, setResults] = useState({})

  useEffect(() => {
    if (!uid) {
      setResults({})
      return
    }
    return subscribeToTournamentResults(uid, setResults)
  }, [uid])

  return results
}

export default useTournamentResults
