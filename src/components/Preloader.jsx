import { useEffect, useRef, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { SITE } from '../data/site'
import { lockScroll, prefersReducedMotion } from '../lib/scroll'

/**
 * 진입 로딩 인트로.
 * 0 → 100 카운터가 끝나면 커튼이 좌우로 갈라지며 히어로가 드러난다.
 */
export default function Preloader({ onDone }) {
  const [count, setCount] = useState(0)
  const [open, setOpen] = useState(false)
  const [gone, setGone] = useState(false)
  const doneRef = useRef(false)

  useEffect(() => {
    if (prefersReducedMotion()) {
      setGone(true)
      onDone?.()
      return
    }

    lockScroll(true)

    const start = performance.now()
    const DURATION = 1900
    let raf

    const tick = (now) => {
      const t = Math.min(1, (now - start) / DURATION)
      // ease-out-expo
      const eased = t === 1 ? 1 : 1 - Math.pow(2, -10 * t)
      setCount(Math.round(eased * 100))
      if (t < 1) {
        raf = requestAnimationFrame(tick)
      } else if (!doneRef.current) {
        doneRef.current = true
        setOpen(true)
        setTimeout(() => {
          setGone(true)
          lockScroll(false)
          onDone?.()
        }, 1150)
      }
    }

    raf = requestAnimationFrame(tick)
    return () => {
      cancelAnimationFrame(raf)
      lockScroll(false)
    }
  }, [onDone])

  const panel = {
    initial: { y: 0 },
    open: (dir) => ({
      y: dir * -100 + '%',
      transition: { duration: 1.05, ease: [0.83, 0, 0.17, 1] },
    }),
  }

  return (
    <AnimatePresence>
      {!gone && (
        <motion.div
          className="fixed inset-0 z-[100] flex"
          exit={{ opacity: 0 }}
          aria-hidden
        >
          {/* 좌우로 갈라지는 커튼 */}
          <motion.div
            className="relative h-full w-1/2 bg-ink-900"
            variants={panel}
            custom={1}
            initial="initial"
            animate={open ? 'open' : 'initial'}
          />
          <motion.div
            className="relative h-full w-1/2 bg-ink-900"
            variants={panel}
            custom={-1}
            initial="initial"
            animate={open ? 'open' : 'initial'}
          />

          {/* 중앙 콘텐츠 */}
          <motion.div
            className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center gap-6 px-6"
            animate={{ opacity: open ? 0 : 1, scale: open ? 1.06 : 1 }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          >
            <div
              className="orb h-[420px] w-[420px] opacity-40"
              style={{ background: 'radial-gradient(circle,#ff6b2c,transparent 65%)' }}
            />
            <p className="eyebrow relative text-white/45">Adventure Travel Since 2016</p>
            <h1 className="relative font-display text-[clamp(2.5rem,9vw,5.5rem)] font-black leading-none tracking-tight">
              <span className="text-flare">{SITE.brand}</span>
            </h1>
            <div className="relative flex w-full max-w-[320px] flex-col gap-3">
              <div className="h-px w-full bg-white/10">
                <div
                  className="h-full bg-flare"
                  style={{ width: `${count}%`, transition: 'width 80ms linear' }}
                />
              </div>
              <div className="flex items-baseline justify-between">
                <span className="eyebrow text-white/40">Loading</span>
                <span className="num text-[28px] font-semibold leading-none text-white">
                  {String(count).padStart(3, '0')}
                </span>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
