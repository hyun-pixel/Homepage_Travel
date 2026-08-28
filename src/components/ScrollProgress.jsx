import { useEffect, useState } from 'react'

/** 상단 고정 스크롤 진행 바 */
export default function ScrollProgress() {
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    let raf = 0
    const update = () => {
      const doc = document.documentElement
      const max = doc.scrollHeight - window.innerHeight
      setProgress(max > 0 ? Math.min(1, Math.max(0, window.scrollY / max)) : 0)
      raf = 0
    }
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update)
    }
    update()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll)
    return () => {
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
      if (raf) cancelAnimationFrame(raf)
    }
  }, [])

  return (
    <div className="fixed inset-x-0 top-0 z-[70] h-[2px] bg-white/5" aria-hidden>
      <div
        className="h-full origin-left bg-flare"
        style={{
          transform: `scaleX(${progress})`,
          boxShadow: '0 0 18px rgba(255,107,44,0.75)',
        }}
      />
    </div>
  )
}
