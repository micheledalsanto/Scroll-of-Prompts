import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import chapter1 from "../data/chapter1"
import { getRandomPrompt } from "../data/promptsByClass"
import challengesByClass from "../data/challengesByClass.json"
import Layout from "../components/Layout"

export default function ChapterPage() {
  const navigate = useNavigate()
  const [heroName, setHeroName] = useState("")
  const [selectedClass, setSelectedClass] = useState("")
  const [input, setInput] = useState("")
  const [feedback, setFeedback] = useState("")
  const [isValid, setIsValid] = useState(false)
  const [step, setStep] = useState(1)
  const [questionData, setQuestionData] = useState(null)
  const [selectedOption, setSelectedOption] = useState(null)

  useEffect(() => {
    const name = localStorage.getItem("heroName")
    const cls = localStorage.getItem("selectedClass")
    if (!name || !cls) {
      navigate("/")
    } else {
      const normalizedClass = cls.toLowerCase().replace(/\s+/g, "_")
      setHeroName(name)
      setSelectedClass(normalizedClass)

      if (step === 6) {
        setQuestionData({
          type: "boss",
          question:
            "I am the spirit of clarity, yet I vanish with vagueness. You must craft me to instruct the arcane AI. What am I?",
          answer: "a good prompt"
        })
      } else {
        const challenges = challengesByClass[normalizedClass]
        if (challenges && challenges[step - 1]) {
          setQuestionData(challenges[step - 1])
        } else {
          setQuestionData(null)
        }
      }

      setInput("")
      setFeedback("")
      setIsValid(false)
      setSelectedOption(null)
    }
  }, [navigate, step])

  const handleOptionSelect = (index) => {
    setSelectedOption(index)
    if (index === questionData.correct) {
      setFeedback("✅ Correct! Wisdom flows through you.")
      setIsValid(true)
    } else {
      setFeedback("❌ That is not the answer the elders sought.")
      setIsValid(false)
    }
  }

  const handleTextSubmit = () => {
    const userAnswer = input.trim().toLowerCase()
    const correctAnswer = questionData.answer.trim().toLowerCase()

    if (userAnswer === correctAnswer) {
      setFeedback("✅ Correct! The riddle has been unraveled.")
      setIsValid(true)
    } else {
      setFeedback("❌ The riddle remains unsolved...")
      setIsValid(false)
    }
  }

  const handleNext = () => {
    if (step < 6) {
      setStep(step + 1)
    } else {
      navigate("/chapter-end")
    }
  }

  const handleBack = () => {
    if (step > 1) setStep(step - 1)
    else navigate(-1)
  }

  const heroSprite = `/assets/sprites/${selectedClass}.png`
  const bossSprite = "/assets/sprites/echo-warden.png"

  return (
    <Layout>
      <div className="min-h-screen bg-black text-green-400 font-mono flex flex-col items-center px-4 py-10 space-y-10 md:space-y-16">
        <h1 className="text-xl md:text-3xl text-center">{chapter1.name}</h1>
        {step === 6 && (
          <h2 className="text-lg md:text-2xl text-center epic-boss-title mt-2">
            Final Boss: {chapter1.bossName}
          </h2>
        )}

        <p className="text-sm md:text-base max-w-2xl text-center italic leading-relaxed">
          {chapter1.lore}
        </p>

        {step === 6 ? (
          <div className="flex items-center justify-center gap-12 mt-4">
            <img src={heroSprite} alt="hero" className="w-24 h-24 pixelated" />
            <img src={bossSprite} alt="boss" className="w-24 h-24 pixelated" />
          </div>
        ) : (
          <img src={heroSprite} alt="hero" className="w-24 h-24 pixelated" />
        )}

        <div className="text-center max-w-xl space-y-4">
          {questionData && step < 6 && (
            <>
              <p>
                <strong>{heroName}</strong>, choose wisely:
              </p>
              <p className="text-green-300 italic">{questionData.question}</p>
              <div className="space-y-2">
                {questionData.options.map((opt, idx) => (
                  <button
                    key={idx}
                    onClick={() => handleOptionSelect(idx)}
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
          )}

          {step === 6 && (
            <>
              <p>
                <strong>{heroName}</strong>, the riddle awaits:
              </p>
              <p className="text-green-300 italic">{questionData.question}</p>
              <textarea
                rows={3}
                value={input}
                onChange={(e) => setInput(e.target.value)}
                className="w-full p-2 bg-black border border-green-400 text-green-100 rounded resize-none"
                placeholder="Speak your truth..."
              />
              <button
                onClick={handleTextSubmit}
                className="bg-green-600 text-black font-bold px-4 py-2 rounded hover:bg-green-500"
              >
                Submit
              </button>
            </>
          )}

          {feedback && (
            <div className="mt-4 border border-green-600 p-3 rounded text-sm bg-green-900 text-green-100">
              🧠 <strong>Evaluation:</strong> {feedback}
            </div>
          )}
        </div>

        <div className="flex justify-between w-full max-w-lg mt-8">
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
              Next →
            </button>
          )}
        </div>
      </div>
    </Layout>
  )
}
