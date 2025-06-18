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

  const handleRetry = () => {
    setSelectedOption(null)
    setFeedback("")
    setIsValid(false)
    setCompletedSteps((prev) => {
      const updated = { ...prev }
      delete updated[step]
      return updated
    })
  }

  const handleInputSubmit = () => {
    const normalized = input.toLowerCase().replace(/[^a-z]/g, "").trim()
    const accepted = chapter1.bossAnswerAccepted.map(ans => ans.replace(/[^a-z]/g, ""))
    const isAccepted = accepted.includes(normalized)

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
      <div className="text-center max-w-2xl px-4 py-12 text-green-400 font-mono">
        <h1 className="text-2xl md:text-3xl mb-4">{chapter1.name}</h1>
        {step === 6 && (
          <h2 className="text-xl md:text-2xl text-green-200 mb-8 animate-pulse">
            ⚔️ Final Boss:
            <br />
            <span className="font-bold tracking-wide uppercase">{chapter1.bossName}</span>
          </h2>
        )}
        <p className="italic text-sm md:text-base mb-10 leading-relaxed">{chapter1.lore}</p>

        {step === 6 ? (
          <>
            <div className="flex items-center justify-center gap-10 mb-10">
              <img src={spriteClass} alt="hero" className="w-24 h-24 animate-breathing origin-bottom" />
              <img src={spriteBoss} alt="boss" className="w-24 h-24" />
            </div>

            <p className="mb-10 text-green-300 italic text-lg leading-relaxed animate-fade-in-slow">
              <span className="block text-green-500 text-sm uppercase tracking-wide mb-2">The Echo Warden whispers:</span>
              <span className="text-green-100 font-semibold italic">"{chapter1.bossQuestion}"</span>
            </p>

            <textarea
              rows={4}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              className="w-full p-3 bg-black border border-green-400 text-green-100 rounded resize-none mb-6"
              placeholder="Your answer..."
            />
            <button
              onClick={handleInputSubmit}
              className="bg-green-600 text-black font-bold px-5 py-3 rounded hover:bg-green-500 transition"
            >
              Answer the Warden
            </button>
          </>
        ) : questionData ? (
          <>
            <img src={spriteClass} alt="hero" className="w-16 h-16 mb-6 mx-auto animate-breathing origin-bottom" />
            <p className="mb-6 text-green-300 italic">{questionData.question}</p>
            <div className="space-y-3 mb-6">
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
          <div className="mt-6 border border-green-600 p-4 rounded text-sm bg-green-900 text-green-100">
            🧠 <strong>Evaluation:</strong> {feedback}
          </div>
        )}

        <div className="flex justify-between w-full max-w-lg mt-10 mx-auto">
          <button
            onClick={handleBack}
            className="underline text-green-400 hover:text-green-200"
          >
            ← Back
          </button>

          {step < 6 && !isValid && feedback && (
            <button
              onClick={handleRetry}
              className="underline text-red-400 hover:text-red-200"
            >
              Retry 🔁
            </button>
          )}

          {step === 6 && !isValid && feedback && (
            <button
              onClick={() => setInput("")}
              className="underline text-red-400 hover:text-red-200"
            >
              Retry ✍️
            </button>
          )}

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
