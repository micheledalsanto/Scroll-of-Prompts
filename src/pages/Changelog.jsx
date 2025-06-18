import { useNavigate } from "react-router-dom"
import Layout from "../components/Layout"

export default function Changelog() {
  const navigate = useNavigate()

  return (
    <Layout>
      <div className="px-6 py-12 text-green-400 font-mono max-w-3xl text-sm md:text-base space-y-6">
        <h1 className="text-2xl md:text-3xl text-center mb-8">📜 Changelog</h1>

        <div>
          <h2 className="text-lg md:text-xl mb-2 text-green-300">🧾 Version 1.0.1 – June 2025</h2>
          <ul className="list-disc list-inside space-y-2">
            <li>Improved boss answer validation – now accepts multiple valid formats (e.g. <code>few-shots</code>, <code>few shots</code>, etc.)</li>
            <li>Refined fantasy copy in boss dialog and reward message</li>
            <li>Minor visual fixes and retro alignment polishing</li>
          </ul>
        </div>

        <div>
          <h2 className="text-lg md:text-xl mb-2 text-green-300">🧾 Version 1.0 – June 2025</h2>
          <ul className="list-disc list-inside space-y-2">
            <li>Introduced Chapter I with 5 themed trials + 1 epic boss fight</li>
            <li>Quiz-based challenge system with instant feedback</li>
            <li>Final boss with a riddle-like open question</li>
            <li>Retro-style sprites for each class and the boss</li>
            <li>Hero naming ritual with randomized fantasy name suggestions</li>
            <li>Victory reward screen after defeating the Echo Warden</li>
            <li>All other classes locked with “Coming Soon” messages</li>
            <li>UI upgrade with fantasy header, footer, and epic links</li>
            <li>Version badge now links to this changelog</li>
          </ul>
        </div>

        <div className="mt-10 border-t border-green-700 pt-6">
          <h2 className="text-lg md:text-xl mb-2 text-green-300">🔮 What’s Next</h2>
          <ul className="list-disc list-inside space-y-2">
            <li>⚔️ Chapter II – A darker land filled with branching prompts and multiple endings</li>
            <li>🧙‍♂️ Unlockable new classes with custom sprites and trials</li>
            <li>📦 Save progress across sessions</li>
            <li>🏅 Earnable digital badges and printable diplomas</li>
          </ul>
        </div>

        <div className="mt-8 text-center">
          <button
            onClick={() => navigate(-1)}
            className="underline text-green-400 hover:text-green-200"
          >
            ← Return to the adventure
          </button>
        </div>
      </div>
    </Layout>
  )
}
