import Layout from "../components/Layout"

export default function RewardPage() {
  return (
    <Layout>
      <div className="min-h-screen text-green-400 font-mono flex flex-col items-center justify-center px-6 py-20 space-y-8 text-center">
        <h1 className="text-3xl md:text-4xl">🏆 Victory!</h1>
        <p className="text-lg max-w-2xl">
          You have bested the Echo Warden and proven your prompt prowess. The Scroll of Prompts recognizes your strength.
        </p>
        <p className="italic text-green-300">
          New lands await... but they are not yet revealed to mortal eyes.
        </p>
        <p className="text-sm mt-4 text-green-500">
          🔒 <strong>Chapter II:</strong> Coming Soon. A new arc shall test your mind even further...
        </p>

        <button
          className="mt-6 px-4 py-2 bg-green-600 text-black font-bold rounded hover:bg-green-500"
          onClick={() => {
            localStorage.removeItem("heroName")
            localStorage.removeItem("selectedClass")
            window.location.href = "/select-class"
          }}
        >
          🔁 Begin a New Journey
        </button>
      </div>
    </Layout>
  )
}
