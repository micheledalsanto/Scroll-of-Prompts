import { Routes, Route } from "react-router-dom"
import Home from "./pages/Home"
import SelectClass from "./pages/SelectClass"
import ChooseName from "./pages/ChooseName"
import ChapterPage from "./pages/ChapterPage"
import RewardPage from "./pages/RewardPage"
import Changelog from "./pages/Changelog"

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/select-class" element={<SelectClass />} />
      <Route path="/choose-name" element={<ChooseName />} />
      {/* Prossime pagine: */}
      <Route path="/chapter/:id" element={<ChapterPage />} />
      <Route path="/chapter-end" element={<RewardPage />} />
      <Route path="/changelog" element={<Changelog />} />
    </Routes>
  )
}
