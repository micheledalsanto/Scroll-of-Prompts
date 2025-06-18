import { Routes, Route } from "react-router-dom"
import Home from "./pages/Home"
import SelectClass from "./pages/SelectClass"
import ChooseName from "./pages/ChooseName"
import ChapterPage from "./pages/ChapterPage"

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/select-class" element={<SelectClass />} />
      <Route path="/choose-name" element={<ChooseName />} />
      {/* Prossime pagine: */}
      <Route path="/chapter/:id" element={<ChapterPage />} />
      {/* <Route path="/reward" element={<RewardPage />} /> */}
    </Routes>
  )
}
