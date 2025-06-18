export default function Layout({ children }) {
  return (
    <div className="min-h-screen bg-black text-green-400 font-mono flex flex-col">
      {/* HEADER */}
      <header className="px-4 py-3 bg-green-900 text-black font-bold text-sm shadow-md">
        <div className="max-w-5xl mx-auto flex justify-between items-center">
          <span>📜 The Scroll of Prompts</span>
          <span className="text-xs text-green-100 italic">v1.0</span>
        </div>
      </header>

      {/* PAGE CONTENT */}
      <main className="flex-1 flex flex-col items-center">{children}</main>

      {/* FOOTER */}
      <footer className="px-4 py-2 bg-green-900 text-xs text-green-200 text-center mt-10">
        © {new Date().getFullYear()} The Scroll of Prompts · Created by Michele
      </footer>
    </div>
  )
}
