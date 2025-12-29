"use client"

import { useEffect, useState } from "react"
import { doc, getDoc, setDoc } from "firebase/firestore"
import { db, auth } from "@/lib/firebase"
import { onAuthStateChanged } from "firebase/auth"
import { useRouter } from "next/navigation"

type Skill = {
  name: string
  percentage: number
}

export default function AdminAboutPage() {
  const router = useRouter()

  const [loading, setLoading] = useState(true)

  const [name, setName] = useState("")
  const [role, setRole] = useState("")
  const [bio, setBio] = useState("")
  const [experience, setExperience] = useState(0)
  const [profileImage, setProfileImage] = useState("")
  const [tools, setTools] = useState<string[]>([])
  const [skills, setSkills] = useState<Skill[]>([])

  // 🔐 Protect route
  useEffect(() => {
    const unsub = onAuthStateChanged(auth, user => {
      if (!user) router.push("/login")
    })
    return () => unsub()
  }, [router])

  // 🔄 Load Firestore data
  useEffect(() => {
    async function load() {
      const ref = doc(db, "about", "main")
      const snap = await getDoc(ref)

      if (snap.exists()) {
        const data = snap.data()
        setName(data.name || "")
        setRole(data.role || "")
        setBio(data.bio || "")
        setExperience(data.experience || 0)
        setProfileImage(data.profileImage || "")
        setTools(data.tools || [])
        setSkills(data.skills || [])
      }

      setLoading(false)
    }

    load()
  }, [])

  // 💾 Save (MERGE is CRITICAL)
  async function save() {
    const ref = doc(db, "about", "main")

    await setDoc(
      ref,
      {
        name,
        role,
        bio,
        experience,
        profileImage,
        tools,
        skills,
      },
      { merge: true }
    )

    alert("About section updated")
  }

  if (loading) {
    return <div className="p-8 text-white">Loading...</div>
  }

  return (
    <div className="p-8 max-w-4xl mx-auto text-white space-y-6">
      <h1 className="text-3xl font-bold">Admin – About</h1>

      <input
        className="w-full bg-black border p-3"
        placeholder="Name"
        value={name}
        onChange={e => setName(e.target.value)}
      />

      <input
        className="w-full bg-black border p-3"
        placeholder="Role"
        value={role}
        onChange={e => setRole(e.target.value)}
      />

      <input
        type="number"
        className="w-full bg-black border p-3"
        placeholder="Years of experience"
        value={experience}
        onChange={e => setExperience(Number(e.target.value))}
      />

      <input
        className="w-full bg-black border p-3"
        placeholder="Profile image URL"
        value={profileImage}
        onChange={e => setProfileImage(e.target.value)}
      />

      <textarea
        className="w-full bg-black border p-3 min-h-[120px]"
        placeholder="Bio"
        value={bio}
        onChange={e => setBio(e.target.value)}
      />

      {/* TOOLS */}
      <div>
        <h2 className="text-xl font-semibold mb-2">Tools</h2>
        {tools.map((tool, i) => (
          <div key={i} className="flex gap-2 mb-2">
            <input
              className="flex-1 bg-black border p-2"
              value={tool}
              onChange={e => {
                const copy = [...tools]
                copy[i] = e.target.value
                setTools(copy)
              }}
            />
            <button
              onClick={() => setTools(tools.filter((_, idx) => idx !== i))}
              className="bg-red-600 px-3"
            >
              X
            </button>
          </div>
        ))}
        <button
          onClick={() => setTools([...tools, ""])}
          className="bg-gray-700 px-4 py-2"
        >
          Add Tool
        </button>
      </div>

      {/* SKILLS */}
      <div>
        <h2 className="text-xl font-semibold mb-2">Skills</h2>
        {skills.map((skill, i) => (
          <div key={i} className="grid grid-cols-3 gap-2 mb-2">
            <input
              className="bg-black border p-2"
              placeholder="Skill name"
              value={skill.name}
              onChange={e => {
                const copy = [...skills]
                copy[i].name = e.target.value
                setSkills(copy)
              }}
            />
            <input
              type="number"
              className="bg-black border p-2"
              placeholder="%"
              value={skill.percentage}
              onChange={e => {
                const copy = [...skills]
                copy[i].percentage = Number(e.target.value)
                setSkills(copy)
              }}
            />
            <button
              onClick={() => setSkills(skills.filter((_, idx) => idx !== i))}
              className="bg-red-600"
            >
              X
            </button>
          </div>
        ))}
        <button
          onClick={() => setSkills([...skills, { name: "", percentage: 0 }])}
          className="bg-gray-700 px-4 py-2"
        >
          Add Skill
        </button>
      </div>

      <button
        onClick={save}
        className="bg-green-600 px-6 py-3 rounded font-semibold"
      >
        Save All
      </button>
    </div>
  )
}
