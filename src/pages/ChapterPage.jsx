import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import Layout from "../components/Layout"
import chapter1 from "../data/chapter1"
import challengesByClass from "../data/challengesByClass.json"

export default function ChapterPage() {
  const navigate = useNavigate()
  const [heroName, setHeroName] = useState("")
  const [selectedClass, setSelectedClass] = useState("")
  const [step, setStep] = useState(1)
  const [input, setInput] = useState("")
  const [feedback, setFeedback] = useState("")
  const [selectedOption, setSelectedOption] = useState(null)
  const [completedSteps, setCompletedSteps] = useState({})
  const [questionData, setQuestionData] = useState(null)
  const [isValid, setIsValid] = useState(false)

  useEffect(() => {
    const name = localStorage.getItem("heroName")
    const cls = localStorage.getItem("selectedClass")
    if (!name || !cls) {
      navigate("/")
    } else {
      setHeroName(name)
      const normCls = cls.toLowerCase().replace(/\s+/g, "_")
      setSelectedClass(normCls)

      if (step < 6) {
        const challenge = challengesByClass[normCls]?.[step - 1]
        setQuestionData(challenge)
        setInput("")
        setFeedback("")
        setSelectedOption(completedSteps[step]?.answer ?? null)
        setIsValid(completedSteps[step]?.valid ?? false)
      } else {
        setQuestionData(null)
        setInput("")
        setFeedback("")
        setSelectedOption(null)
        setIsValid(false)
      }
    }
  }, [navigate, step])

  const handleOptionSelect = (index) => {
    if (completedSteps[step]) return
    setSelectedOption(index)
    const isCorrect = index === questionData.correct
    setFeedback(isCorrect ? "✅ Correct! Wisdom flows through you." : "❌ That is not the answer the elders sought.")
    setIsValid(isCorrect)
    setCompletedSteps((prev) => ({ ...prev, [step]: { answer: index, valid: isCorrect } }))
  }

  const handleInputSubmit = () => {
  const lower = input.toLowerCase().replace(/[^a-zA-Z]/g, "").trim()
  const acceptable = ["fewshots", "fewshot", "few shots", "few shot"]

  const isAccepted = acceptable.some((variant) => lower.includes(variant.replace(/\s/g, "")))

  if (input.trim().length < 5) {
    setFeedback("❌ Your answer is far too vague, adventurer.")
    return
  }

  setFeedback(
    isAccepted
      ? "✅ The Echo Warden nods solemnly. Your answer echoes with truth."
      : "❌ The Echo Warden frowns. That is not the wisdom they seek."
  )
  setIsValid(isAccepted)
}


  const handleNext = () => {
  if (step < 6) {
    setStep(step + 1)
  } else {
    navigate("/chapter-end")
  }
}


  const handleBack = () => {
    if (step > 1) {
      setStep(step - 1)
    } else {
      navigate(-1)
    }
  }

  const spriteClass = `/assets/sprites/${selectedClass}.png`
  const spriteBoss = `/assets/sprites/echo-warden.png`

  return (
    <Layout>
      <div className="text-center max-w-2xl px-4 py-10 text-green-400 font-mono">
        <h1 className="text-xl md:text-3xl mb-2">{chapter1.name}</h1>
        {step === 6 && (
          <h2 className="text-lg md:text-2xl animate-pulse text-green-200 mb-6">
            ⚔️ Final Boss: <span className="font-bold">{chapter1.bossName}</span>
          </h2>
        )}
        <p className="italic text-sm md:text-base mb-6">{chapter1.lore}</p>

        {step === 6 ? (
          <>
            <div className="flex items-center justify-center gap-8 mb-6">
              <img src={spriteClass} alt="hero" className="w-20 h-20" />
              <img src={spriteBoss} alt="boss" className="w-20 h-20" />
            </div>

            <p className="mb-4 text-green-300 italic">
              The Echo Warden whispers: <br />
              <q>{chapter1.bossQuestion}</q>
            </p>

            <textarea
              rows={4}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              className="w-full p-2 bg-black border border-green-400 text-green-100 rounded resize-none mb-4"
              placeholder="Your answer..."
            />
            <button
              onClick={handleInputSubmit}
              className="bg-green-600 text-black font-bold px-4 py-2 rounded hover:bg-green-500"
            >
              Answer the Warden
            </button>
          </>
        ) : questionData ? (
          <>
            <img src={spriteClass} alt="hero" className="w-16 h-16 mb-4 mx-auto" />
            <p className="mb-4 text-green-300 italic">{questionData.question}</p>
            <div className="space-y-2 mb-4">
              {questionData.options.map((opt, idx) => (
                <button
                  key={idx}
                  onClick={() => handleOptionSelect(idx)}
                  disabled={!!completedSteps[step]}
                  className={`block w-full border px-4 py-2 rounded ${
                    selectedOption === idx
                      ? idx === questionData.correct
                        ? "bg-green-700 border-green-400"
                        : "bg-red-700 border-red-400"
                      : "border-green-400 hover:bg-green-800"
                  }`}
                >
                  {opt}
                </button>
              ))}
            </div>
          </>
        ) : (
          <p>⚠️ Challenge not found for this step.</p>
        )}

        {feedback && (
          <div className="mt-4 border border-green-600 p-3 rounded text-sm bg-green-900 text-green-100">
            🧠 <strong>Evaluation:</strong> {feedback}
          </div>
        )}

        <div className="flex justify-between w-full max-w-lg mt-8 mx-auto">
          <button
            onClick={handleBack}
            className="underline text-green-400 hover:text-green-200"
          >
            ← Back
          </button>

          {isValid && (
            <button
              onClick={handleNext}
              className="underline text-green-400 hover:text-green-200"
            >
              {step === 6 ? "Continue your adventure →" : "Next →"}
            </button>
          )}
        </div>
      </div>
    </Layout>
  )
}
