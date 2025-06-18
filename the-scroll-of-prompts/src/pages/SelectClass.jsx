import { useNavigate } from "react-router-dom"
import Layout from "../components/Layout"

const classes = [
  { id: "copy-knight", name: "Copy Knight", icon: "🛡️", description: "Master of persuasive prompts and ad copy" },
  { id: "code-mage", name: "Code Mage", icon: "🧠", description: "Wields powerful code-generating incantations" },
  { id: "knowledge-seeker", name: "Knowledge Seeker", icon: "📚", description: "Explains the world one prompt at a time" },
  { id: "logic-paladin", name: "Logic Paladin", icon: "⚖️", description: "Defends truth with structured logic" },
  { id: "imaginarium", name: "Imaginarium", icon: "🎨", description: "Turns dreams into stories with prompts" },
]

export default function SelectClass() {
  const navigate = useNavigate()

  const handleSelect = (classId) => {
    localStorage.setItem("selectedClass", classId)
    navigate("/choose-name")
  }

  return (
    <Layout>
      <div className="px-4 py-10 space-y-12 md:space-y-16 flex flex-col items-center">
        <div className="text-center space-y-6">
          <h2 className="text-2xl md:text-4xl tracking-wider">CHOOSE YOUR CLASS</h2>
          <p className="text-sm md:text-base italic max-w-xl mx-auto">
            Each path holds ancient powers. Choose your calling wisely.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 max-w-4xl">
          {classes.map((cls) => (
            <button
              key={cls.id}
              className="border-2 border-green-500 p-6 rounded text-left hover:bg-green-700 transition space-y-2"
              onClick={() => handleSelect(cls.id)}
            >
              <div className="text-3xl">{cls.icon}</div>
              <div className="text-lg font-bold tracking-wide">{cls.name}</div>
              <p className="text-sm">{cls.description}</p>
            </button>
          ))}
        </div>

        <button
          className="mt-4 px-4 py-2 bg-green-600 text-black font-bold rounded shadow hover:bg-green-500 transition"
          onClick={() => navigate("/")}
        >
          ← BACK TO TITLE
        </button>
      </div>
    </Layout>
  )
}
