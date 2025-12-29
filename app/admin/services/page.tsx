"use client"

import { useEffect, useState } from "react"
import { collection, getDocs, addDoc, updateDoc, deleteDoc, doc, query, orderBy } from "firebase/firestore"
import { db } from "@/lib/firebase"
import { auth } from "@/lib/firebase"
import { onAuthStateChanged } from "firebase/auth"
import { useRouter } from "next/navigation"

type Service = {
  id?: string
  title: string
  description: string
  features: string
  icon: string
  order: number
}

export default function AdminServicesPage() {
  const [services, setServices] = useState<Service[]>([])
  const [loading, setLoading] = useState(true)
  const router = useRouter()

  // Protect route
  useEffect(() => {
    const unsub = onAuthStateChanged(auth, user => {
      if (!user) router.push("/login")
    })
    return () => unsub()
  }, [router])

  async function loadServices() {
    const q = query(collection(db, "services"), orderBy("order", "asc"))
    const snap = await getDocs(q)

    const data = snap.docs.map(d => ({
      id: d.id,
      ...d.data(),
      features: (d.data().features || []).join(", "),
    })) as Service[]

    setServices(data)
    setLoading(false)
  }

  useEffect(() => {
    loadServices()
  }, [])

  async function addService() {
    await addDoc(collection(db, "services"), {
      title: "New Service",
      description: "",
      features: [],
      icon: "scissors",
      order: services.length + 1,
    })
    loadServices()
  }

  async function saveService(s: Service) {
    if (!s.id) return

    await updateDoc(doc(db, "services", s.id), {
      title: s.title,
      description: s.description,
      features: s.features.split(",").map(f => f.trim()).filter(Boolean),
      icon: s.icon,
      order: s.order,
    })

    alert("Service saved")
  }

  async function removeService(id?: string) {
    if (!id) return
    if (!confirm("Delete this service?")) return

    await deleteDoc(doc(db, "services", id))
    loadServices()
  }

  if (loading) return <p className="p-8">Loading services...</p>

  return (
    <div className="p-8 max-w-4xl mx-auto text-white">
      <h1 className="text-3xl font-bold mb-6">Admin – Services</h1>

      <button
        onClick={addService}
        className="mb-8 rounded bg-white text-black px-4 py-2 font-semibold"
      >
        + Add Service
      </button>

      <div className="space-y-8">
        {services.map((s, i) => (
          <div key={s.id} className="border border-white/20 rounded-lg p-6 space-y-3">

            <input
              className="w-full bg-black border p-2"
              value={s.title}
              onChange={e => {
                const copy = [...services]
                copy[i].title = e.target.value
                setServices(copy)
              }}
              placeholder="Service title"
            />

            <textarea
              className="w-full bg-black border p-2"
              value={s.description}
              onChange={e => {
                const copy = [...services]
                copy[i].description = e.target.value
                setServices(copy)
              }}
              placeholder="Service description"
            />

            <input
              className="w-full bg-black border p-2"
              value={s.features}
              onChange={e => {
                const copy = [...services]
                copy[i].features = e.target.value
                setServices(copy)
              }}
              placeholder="Features (comma separated)"
            />

            <select
              className="w-full bg-black border p-2"
              value={s.icon}
              onChange={e => {
                const copy = [...services]
                copy[i].icon = e.target.value
                setServices(copy)
              }}
            >
              <option value="scissors">Scissors (Video Editing)</option>
              <option value="sparkles">Sparkles (Motion Graphics)</option>
              <option value="video">Video (Graphic Videos)</option>
            </select>

            <label className="flex items-center gap-3">
              Order:
              <input
                type="number"
                className="w-20 bg-black border p-1"
                value={s.order}
                onChange={e => {
                  const copy = [...services]
                  copy[i].order = Number(e.target.value)
                  setServices(copy)
                }}
              />
            </label>

            <div className="flex gap-4">
              <button
                onClick={() => saveService(s)}
                className="bg-green-600 px-4 py-2 rounded"
              >
                Save
              </button>

              <button
                onClick={() => removeService(s.id)}
                className="bg-red-600 px-4 py-2 rounded"
              >
                Delete
              </button>
            </div>

          </div>
        ))}
      </div>
    </div>
  )
}
