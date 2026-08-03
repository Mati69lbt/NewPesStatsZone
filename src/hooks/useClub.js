import { useEffect, useState } from 'react'
import { subscribeToClub } from '../services/clubService'

function useClub(uid) {
  const [club, setClub] = useState('')

  useEffect(() => {
    if (!uid) {
      setClub('')
      return
    }
    return subscribeToClub(uid, setClub)
  }, [uid])

  return club
}

export default useClub
