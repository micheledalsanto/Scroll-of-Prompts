import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import Layout from "../components/Layout"

const namePools = {
  "copy-knight": ["Sir Clicksworth", "Bannerius the Bold", "Dame Hashtagia", "Scrollius Maximus", "CTAhammer"],
  "code-mage": ["Hex Bugborn", "Algozeth the Segfaulter", "Byte Whisperer", "Stackbeard", "Nullius Pointer"],
  "knowledge-seeker": ["Quizzar the Wise", "Edunor Scrollface", "Sage Markdown", "Sir Googlor", "Mentora the Quoter"],
  "logic-paladin": ["Justicar Looplaw", "Statwyn of IF-ELSE", "Lex the Validator", "Valen Booleanheart", "Decrethon the Parser"],
  "imaginarium": ["Dreemor of Promptia", "Fantalor the Italic", "Myrren Dreamloop", "Colorwyn Brushhand", "Artoya the Absurd"]
}

const classMessages = {
  "copy-knight": "Your banner is raised, your CTA sharpened. Choose a name to write history in bold italics.",
  "code-mage": "The compiler of destiny awaits. Choose your alias and conjure code from pure thought.",
  "knowledge-seeker": "The Scroll whispers... but only to the one who dares to name the mind behind it.",
  "logic-paladin": "Truth is your sword, logic your shield. Select the title that shall echo in debates eternal.",
  "imaginarium": "A swirl of colors and chaos surrounds you. Name the dreamer who shall shape the impossible."
}

export default function ChooseName() {
  const navigate = useNavigate()
  const [selectedClass, setSelectedClass] = useState(null)
  const [names, setNames] = useState([])

  useEffect(() => {
    const storedClass = localStorage.getItem("selectedClass")
    if (!storedClass) {
      navigate("/select-class")
    } else {
      setSelectedClass(storedClass)
      const pool = namePools[storedClass]
      const shuffled = [...pool].sort(() => 0.5 - Math.random()).slice(0, 5)
      setNames(shuffled)
    }
  }, [])

  const handleChoose = (name) => {
    localStorage.setItem("heroName", name)
    navigate("/chapter/1")
  }

  const classMessage = classMessages[selectedClass]

  return (
    <Layout>
      <div className="px-4 py-10 space-y-10 md:space-y-16 flex flex-col items-center">
        <div className="text-center space-y-6 md:space-y-8 max-w-2xl">
          <h2 className="text-xl md:text-3xl tracking-wide">A new scribe enters the Scroll...</h2>
          <p className="text-sm md:text-base italic leading-relaxed">{classMessage}</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mb-10">
          {names.map((name) => (
            <button
              key={name}
              onClick={() => handleChoose(name)}
              className="bg-green-700 text-black px-4 py-2 rounded hover:bg-green-500 font-bold tracking-widest transition"
            >
              {name}
            </button>
          ))}
        </div>

        <button
          onClick={() => navigate("/select-class")}
          className="text-sm underline hover:text-green-200"
        >
          ← Back to class selection
        </button>
      </div>
    </Layout>
  )
}
