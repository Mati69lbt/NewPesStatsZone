import { useEffect, useState } from 'react'
import { subscribeToFormations } from '../services/formationsService'

function useFormations(uid) {
  const [formations, setFormations] = useState([])

  useEffect(() => {
    if (!uid) {
      setFormations([])
      return
    }
    return subscribeToFormations(uid, setFormations)
  }, [uid])

  return formations
}

export default useFormations
