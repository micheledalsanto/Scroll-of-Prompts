import { useNavigate } from "react-router-dom"
import Layout from "../components/Layout"

export default function Home() {
  const navigate = useNavigate()

  const handleStart = () => {
    const audio = new Audio("/assets/sfx/start.mp3")
    audio.volume = 0.6
    audio.play()
    setTimeout(() => {
      navigate("/select-class")
    }, 300)
  }

  return (
    <Layout>
      <div className="flex flex-1 flex-col items-center justify-center text-center p-6 space-y-8 scanlines relative">
        <img
          src="/assets/logo.png"
          alt="Logo"
          className="w-60 md:w-96 bounce-animation"
        />

        <p className="text-sm md:text-base max-w-xl leading-relaxed">
          A retro RPG adventure where prompts are your weapons and logic is your magic. <br />
          Choose your class, name your hero, and master the lost art of Prompt Engineering.
        </p>

        <button
          onClick={handleStart}
          className="bg-green-600 text-black font-bold px-6 py-2 rounded hover:bg-green-500"
        >
          START THE JOURNEY
        </button>
      </div>
    </Layout>
  )
}
