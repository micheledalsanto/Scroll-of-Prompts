import { useLocation, useNavigate } from "react-router-dom"

export default function Layout({ children }) {
  const location = useLocation()
  const navigate = useNavigate()
  const isHome = location.pathname === "/"

  return (
    <div className="min-h-screen bg-black text-green-400 font-mono flex flex-col">
      {/* HEADER */}
      <header className="px-4 py-3 bg-green-900 text-white italic text-sm shadow-md">
        <div className="max-w-5xl mx-auto flex justify-between items-center">
          {isHome ? (
            <span>Welcome, adventurer!</span>
          ) : (
            <button
              onClick={() => navigate("/")}
              className="text-white hover:text-green-200 italic"
            >
              ← Return Home
            </button>
          )}
          <button
            onClick={() => navigate("/changelog")}
            className="text-xs text-green-100 italic underline hover:text-green-200"
          >
            v1.0.2
          </button>
        </div>
      </header>

      {/* PAGE CONTENT */}
      <main className="flex-1 flex flex-col items-center">{children}</main>

      {/* FOOTER */}
      <footer className="px-4 py-2 bg-green-900 text-xs text-green-200 text-center mt-10">
        © {new Date().getFullYear()}{" "}
        <a
          href="https://github.com/micheledalsanto/Scroll-of-Prompt"
          target="_blank"
          rel="noopener noreferrer"
          className="underline hover:text-green-100"
        >
          The Scroll of Prompts
        </a>{" "}
        · Crafted by{" "}
        <a
          href="https://github.com/micheledalsanto"
          target="_blank"
          rel="noopener noreferrer"
          className="underline hover:text-green-100"
        >
          🧙 Michele the Promptforger
        </a>
      </footer>
    </div>
  )
}
