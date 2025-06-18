import { useNavigate } from "react-router-dom"
import Layout from "../components/Layout"

const classes = [
  {
    id: "copy-knight",
    name: "Copy Knight",
    icon: "🛡️",
    description: "Master of persuasive prompts and ad copy",
    available: true,
  },
  {
    id: "code-mage",
    name: "Code Mage",
    icon: "🧠",
    description: "🔒 The runes of code are still being forged. Return when the circuits hum with magic…",
    available: false,
  },
  {
    id: "knowledge-seeker",
    name: "Knowledge Seeker",
    icon: "📚",
    description: "🔒 The Grand Library remains sealed. Only when the stars realign shall its secrets be revealed…",
    available: false,
  },
  {
    id: "logic-paladin",
    name: "Logic Paladin",
    icon: "⚖️",
    description: "🔒 The Order of Logic awaits your oath. Soon, you shall uphold reason with your blade of clarity…",
    available: false,
  },
  {
    id: "imaginarium",
    name: "Imaginarium",
    icon: "🎨",
    description: "🔒 The Dreamforge sleeps. When imagination bursts into flames once more, your path shall appear…",
    available: false,
  },
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
              disabled={!cls.available}
              onClick={() => handleSelect(cls.id)}
              className={`border-2 p-6 rounded text-left transition space-y-2 ${
                cls.available
                  ? "border-green-500 hover:bg-green-700"
                  : "border-gray-600 bg-black text-gray-500 cursor-not-allowed"
              }`}
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
