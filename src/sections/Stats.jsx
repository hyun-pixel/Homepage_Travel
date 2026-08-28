import { useEffect, useRef, useState } from 'react'
import { STATS } from '../data/site'
import Reveal from '../components/Reveal'
import { prefersReducedMotion } from '../lib/scroll'

function Counter({ value, decimals = 0, suffix = '' }) {
  const ref = useRef(null)
  const [display, setDisplay] = useState(0)
  const started = useRef(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    if (prefersReducedMotion()) {
      setDisplay(value)
      return
    }

    const io = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting || started.current) return
        started.current = true

        const DURATION = 2000
        const start = performance.now()
        const tick = (now) => {
          const t = Math.min(1, (now - start) / DURATION)
          const eased = 1 - Math.pow(1 - t, 4)
          setDisplay(value * eased)
          if (t < 1) requestAnimationFrame(tick)
        }
        requestAnimationFrame(tick)
        io.unobserve(el)
      },
      { threshold: 0.4 }
    )
    io.observe(el)
    return () => io.disconnect()
  }, [value])

  const shown =
    decimals > 0
      ? display.toFixed(decimals)
      : Math.round(display).toLocaleString('ko-KR')

  return (
    <span ref={ref} className="num">
      {shown}
      <span className="text-[0.45em] font-normal text-white/50">{suffix}</span>
    </span>
  )
}

export default function Stats() {
  return (
    <section
      id="stats"
      className="relative overflow-hidden border-y border-white/10 bg-ink-900 py-24 md:py-28"
    >
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.55]"
        style={{
          background:
            'radial-gradient(60% 120% at 50% 0%, rgba(255,107,44,0.16) 0%, transparent 60%)',
        }}
        aria-hidden
      />

      <div className="relative mx-auto max-w-[1400px] px-5 md:px-10">
        <Reveal className="mb-14 text-center">
          <p className="eyebrow text-flare-1">02 — By the Numbers</p>
          <h2 className="mx-auto mt-5 max-w-[620px] font-display text-[clamp(26px,3.4vw,40px)] font-bold leading-[1.28] text-white">
            숫자로 증명되는 열 번째 시즌
          </h2>
        </Reveal>

        <div className="grid grid-cols-2 gap-x-6 gap-y-12 lg:grid-cols-4">
          {STATS.map((s, i) => (
            <Reveal
              key={s.label}
              delay={i * 0.1}
              className="group relative text-center lg:text-left"
            >
              <div className="mb-4 h-px w-full bg-white/12">
                <div className="h-full w-0 bg-flare transition-all duration-1000 ease-out group-hover:w-full" />
              </div>
              <p className="font-display text-[clamp(34px,5vw,58px)] font-black leading-none text-white">
                <Counter value={s.value} decimals={s.decimals} suffix={s.suffix} />
              </p>
              <p className="mt-3 text-[14px] font-medium text-white">{s.label}</p>
              <p className="mt-1 text-[12px] leading-relaxed text-white/45">{s.desc}</p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
