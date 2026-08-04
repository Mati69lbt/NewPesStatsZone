import { useEffect, useState } from 'react'
import { subscribeToMatches } from '../services/matchesService'

function useMatches(uid) {
  const [matches, setMatches] = useState([])

  useEffect(() => {
    if (!uid) {
      setMatches([])
      return
    }
    return subscribeToMatches(uid, setMatches)
  }, [uid])

  return matches
}

export default useMatches
