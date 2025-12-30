"use client"

import { useEffect, useState } from "react"
import { collection, getDocs, doc, setDoc } from "firebase/firestore"
import { onAuthStateChanged } from "firebase/auth"
import { db, auth } from "@/lib/firebase"
import { useRouter } from "next/navigation"

type ContactItem = {
  id: string
  title: string
  subtitle: string
  url: string
  icon: string
  order: number
  published: boolean
}

export default function AdminContactPage() {
  const router = useRouter()
  const [loading, setLoading] = useState(true)
  const [items, setItems] = useState<ContactItem[]>([])

  // 🔐 Protect route
  useEffect(() => {
    const unsub = onAuthStateChanged(auth, user => {
      if (!user) router.push("/login")
    })
    return () => unsub()
  }, [router])

  // 🔄 Load contact data
  useEffect(() => {
    async function load() {
      const snap = await getDocs(collection(db, "contact"))
      const data = snap.docs.map(doc => ({
        id: doc.id,
        ...(doc.data() as Omit<ContactItem, "id">),
      }))
      setItems(data)
      setLoading(false)
    }

    load()
  }, [])

  async function saveItem(item: ContactItem) {
    const ref = doc(db, "contact", item.id)
    await setDoc(ref, {
      title: item.title,
      subtitle: item.subtitle,
      url: item.url,
      icon: item.icon,
      order: item.order,
      published: item.published,
    })
    alert("Saved")
  }

  if (loading) {
    return <div className="p-8 text-white">Loading contact settings...</div>
  }

  return (
    <div className="p-8 max-w-4xl mx-auto text-white space-y-6">
      <h1 className="text-3xl font-bold">Admin – Contact</h1>

      {items.map((item, index) => (
        <div
          key={item.id}
          className="border border-white/10 rounded-xl p-6 space-y-3 bg-black"
        >
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-semibold">{item.title}</h2>
            <label className="flex items-center gap-2 text-sm">
              <input
                type="checkbox"
                checked={item.published}
                onChange={e => {
                  const copy = [...items]
                  copy[index].published = e.target.checked
                  setItems(copy)
                }}
              />
              Published
            </label>
          </div>

          <input
            className="w-full bg-black border p-2"
            placeholder="Title"
            value={item.title}
            onChange={e => {
              const copy = [...items]
              copy[index].title = e.target.value
              setItems(copy)
            }}
          />

          <input
            className="w-full bg-black border p-2"
            placeholder="Subtitle"
            value={item.subtitle}
            onChange={e => {
              const copy = [...items]
              copy[index].subtitle = e.target.value
              setItems(copy)
            }}
          />

          <input
            className="w-full bg-black border p-2"
            placeholder="URL"
            value={item.url}
            onChange={e => {
              const copy = [...items]
              copy[index].url = e.target.value
              setItems(copy)
            }}
          />

          <input
            className="w-full bg-black border p-2"
            placeholder="Icon (external / mail / message)"
            value={item.icon}
            onChange={e => {
              const copy = [...items]
              copy[index].icon = e.target.value
              setItems(copy)
            }}
          />

          <input
            type="number"
            className="w-full bg-black border p-2"
            placeholder="Order"
            value={item.order}
            onChange={e => {
              const copy = [...items]
              copy[index].order = Number(e.target.value)
              setItems(copy)
            }}
          />

          <button
            onClick={() => saveItem(item)}
            className="bg-green-600 px-4 py-2 rounded font-semibold"
          >
            Save
          </button>
        </div>
      ))}
    </div>
  )
}
