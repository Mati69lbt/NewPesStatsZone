import { useEffect, useState } from 'react'
import { onAuthStateChanged } from 'firebase/auth'
import { auth } from '../config/firebase'

function useCurrentUser() {
  const [user, setUser] = useState(auth.currentUser)

  useEffect(() => onAuthStateChanged(auth, setUser), [])

  return user
}

export default useCurrentUser
