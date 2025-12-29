"use client"

import { useEffect, useState } from "react"
import { collection, getDocs, addDoc, updateDoc, deleteDoc, doc, query, orderBy } from "firebase/firestore"
import { db } from "@/lib/firebase"
import { onAuthStateChanged } from "firebase/auth"
import { auth } from "@/lib/firebase"
import { useRouter } from "next/navigation"

type Project = {
  id?: string
  title: string
  description: string
  tools: string
  videoUrl: string
  thumbnailUrl: string
  order: number
  published: boolean
}

export default function AdminProjectsPage() {
  const [projects, setProjects] = useState<Project[]>([])
  const [loading, setLoading] = useState(true)
  const router = useRouter()

  // Protect route
  useEffect(() => {
    const unsub = onAuthStateChanged(auth, user => {
      if (!user) router.push("/login")
    })
    return () => unsub()
  }, [router])

  async function loadProjects() {
    const q = query(collection(db, "projects"), orderBy("order", "asc"))
    const snap = await getDocs(q)
    const data = snap.docs.map(d => ({
      id: d.id,
      ...d.data(),
      tools: (d.data().tools || []).join(", "),
    })) as Project[]
    setProjects(data)
    setLoading(false)
  }

  useEffect(() => {
    loadProjects()
  }, [])

  async function addProject() {
    await addDoc(collection(db, "projects"), {
      title: "New Project",
      description: "",
      tools: [],
      videoUrl: "",
      thumbnailUrl: "",
      order: projects.length + 1,
      published: false,
    })
    loadProjects()
  }

  async function saveProject(p: Project) {
    if (!p.id) return

    await updateDoc(doc(db, "projects", p.id), {
      title: p.title,
      description: p.description,
      tools: p.tools.split(",").map(t => t.trim()).filter(Boolean),
      videoUrl: p.videoUrl,
      thumbnailUrl: p.thumbnailUrl,
      order: p.order,
      published: p.published,
    })

    alert("Saved")
  }

  async function removeProject(id?: string) {
    if (!id) return
    if (!confirm("Delete this project?")) return
    await deleteDoc(doc(db, "projects", id))
    loadProjects()
  }

  if (loading) return <p className="p-8">Loading projects...</p>

  return (
    <div className="p-8 max-w-5xl mx-auto text-white">
      <h1 className="text-3xl font-bold mb-6">Admin – Projects</h1>

      <button
        onClick={addProject}
        className="mb-8 rounded bg-white text-black px-4 py-2 font-semibold"
      >
        + Add Project
      </button>

      <div className="space-y-8">
        {projects.map((p, i) => (
          <div key={p.id} className="border border-white/20 rounded-lg p-6 space-y-3">
            <input
              className="w-full bg-black border p-2"
              value={p.title}
              onChange={e => {
                const copy = [...projects]
                copy[i].title = e.target.value
                setProjects(copy)
              }}
              placeholder="Title"
            />

            <textarea
              className="w-full bg-black border p-2"
              value={p.description}
              onChange={e => {
                const copy = [...projects]
                copy[i].description = e.target.value
                setProjects(copy)
              }}
              placeholder="Description"
            />

            <input
              className="w-full bg-black border p-2"
              value={p.tools}
              onChange={e => {
                const copy = [...projects]
                copy[i].tools = e.target.value
                setProjects(copy)
              }}
              placeholder="Tools (comma separated)"
            />

            <input
              className="w-full bg-black border p-2"
              value={p.videoUrl}
              onChange={e => {
                const copy = [...projects]
                copy[i].videoUrl = e.target.value
                setProjects(copy)
              }}
              placeholder="Video URL"
            />

            <input
              className="w-full bg-black border p-2"
              value={p.thumbnailUrl}
              onChange={e => {
                const copy = [...projects]
                copy[i].thumbnailUrl = e.target.value
                setProjects(copy)
              }}
              placeholder="Thumbnail URL"
            />

            <div className="flex gap-4 items-center">
              <label>
                Order:
                <input
                  type="number"
                  className="ml-2 w-20 bg-black border p-1"
                  value={p.order}
                  onChange={e => {
                    const copy = [...projects]
                    copy[i].order = Number(e.target.value)
                    setProjects(copy)
                  }}
                />
              </label>

              <label className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={p.published}
                  onChange={e => {
                    const copy = [...projects]
                    copy[i].published = e.target.checked
                    setProjects(copy)
                  }}
                />
                Published
              </label>
            </div>

            <div className="flex gap-4">
              <button
                onClick={() => saveProject(p)}
                className="bg-green-600 px-4 py-2 rounded"
              >
                Save
              </button>

              <button
                onClick={() => removeProject(p.id)}
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
