"use client"

import { useEffect, useState } from "react"
import { collection, getDocs, doc, setDoc } from "firebase/firestore"
import { onAuthStateChanged } from "firebase/auth"
import { db, auth } from "@/lib/firebase"
import { useRouter } from "next/navigation"

type Testimonial = {
  id: string
  name: string
  role: string
  message: string
  avatar: string
  rating: number
  order: number
  published: boolean
}

export default function AdminTestimonialsPage() {
  const router = useRouter()
  const [loading, setLoading] = useState(true)
  const [items, setItems] = useState<Testimonial[]>([])

  // 🔐 Protect route
  useEffect(() => {
    const unsub = onAuthStateChanged(auth, user => {
      if (!user) router.push("/login")
    })
    return () => unsub()
  }, [router])

  // 🔄 Load testimonials
  useEffect(() => {
    async function load() {
      const snap = await getDocs(collection(db, "testimonials"))
      const data = snap.docs.map(doc => ({
        id: doc.id,
        ...(doc.data() as Omit<Testimonial, "id">),
      }))
      setItems(data)
      setLoading(false)
    }

    load()
  }, [])

  async function saveItem(item: Testimonial) {
    const ref = doc(db, "testimonials", item.id)
    await setDoc(ref, {
      name: item.name,
      role: item.role,
      message: item.message,
      avatar: item.avatar,
      rating: item.rating,
      order: item.order,
      published: item.published,
    })
    alert("Saved")
  }

  if (loading) {
    return <div className="p-8 text-white">Loading testimonials...</div>
  }

  return (
    <div className="p-8 max-w-4xl mx-auto text-white space-y-6">
      <h1 className="text-3xl font-bold">Admin – Testimonials</h1>

      {items.map((item, index) => (
        <div
          key={item.id}
          className="border border-white/10 rounded-xl p-6 space-y-3 bg-black"
        >
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-semibold">
              {item.name || "New Testimonial"}
            </h2>
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
            placeholder="Client name"
            value={item.name}
            onChange={e => {
              const copy = [...items]
              copy[index].name = e.target.value
              setItems(copy)
            }}
          />

          <input
            className="w-full bg-black border p-2"
            placeholder="Role (e.g. YouTube Creator)"
            value={item.role}
            onChange={e => {
              const copy = [...items]
              copy[index].role = e.target.value
              setItems(copy)
            }}
          />

          <textarea
            className="w-full bg-black border p-2 min-h-[100px]"
            placeholder="Testimonial message"
            value={item.message}
            onChange={e => {
              const copy = [...items]
              copy[index].message = e.target.value
              setItems(copy)
            }}
          />

          <input
            className="w-full bg-black border p-2"
            placeholder="Avatar image URL"
            value={item.avatar}
            onChange={e => {
              const copy = [...items]
              copy[index].avatar = e.target.value
              setItems(copy)
            }}
          />

          <input
            type="number"
            min={1}
            max={5}
            className="w-full bg-black border p-2"
            placeholder="Rating (1–5)"
            value={item.rating}
            onChange={e => {
              const copy = [...items]
              copy[index].rating = Number(e.target.value)
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
