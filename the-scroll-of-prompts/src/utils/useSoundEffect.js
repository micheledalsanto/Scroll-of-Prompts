import { useEffect } from "react"

export default function useSoundEffect(src, volume = 0.6) {
  useEffect(() => {
    const audio = new Audio(src)
    audio.volume = volume
    audio.play().catch(() => {/* autoplay blocked? ignore */})
    // cleanup se l’utente cambia pagina velocemente
    return () => { audio.pause(); audio.currentTime = 0 }
  }, [src, volume])
}
