import { useEffect, useState } from 'react'
import { subscribeToPlayers } from '../services/playersService'

function usePlayers(uid) {
  const [players, setPlayers] = useState([])

  useEffect(() => {
    if (!uid) {
      setPlayers([])
      return
    }
    return subscribeToPlayers(uid, setPlayers)
  }, [uid])

  return players
}

export default usePlayers
