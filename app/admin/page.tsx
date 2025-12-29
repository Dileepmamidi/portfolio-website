"use client"

import { onAuthStateChanged, signOut } from "firebase/auth"
import { auth } from "@/lib/firebase"
import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"

export default function AdminPage() {
  const [user, setUser] = useState<any>(null)
  const router = useRouter()

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, currentUser => {
      if (!currentUser) {
        router.push("/login")
      } else {
        setUser(currentUser)
      }
    })

    return () => unsub()
  }, [router])

  if (!user) return null

  return (
    <div style={{ padding: 40 }}>
      <h1>Admin Dashboard</h1>
      <p>Logged in as: {user.email}</p>

      <button onClick={() => signOut(auth)}>
        Logout
      </button>
    </div>
  )
}
