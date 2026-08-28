import { useEffect, useState } from 'react'
import { scrollToId } from '../lib/scroll'

/** 우측 세로 섹션 인디케이터 — 표시 여부는 CSS(lg:flex)가 담당 */
export default function SectionDots({ sections = [] }) {
  const [active, setActive] = useState(sections[0]?.id)

  useEffect(() => {
    if (sections.length === 0) return

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0]
        if (visible) setActive(visible.target.id)
      },
      { threshold: [0.25, 0.5, 0.75], rootMargin: '-20% 0px -35% 0px' }
    )

    sections.forEach(({ id }) => {
      const el = document.getElementById(id)
      if (el) observer.observe(el)
    })

    return () => observer.disconnect()
  }, [sections])

  return (
    <nav
      className="fixed right-7 top-1/2 z-50 hidden -translate-y-1/2 flex-col items-end gap-4 lg:flex"
      aria-label="섹션 이동"
    >
      {sections.map(({ id, label }) => {
        const on = active === id
        return (
          <button
            key={id}
            onClick={() => scrollToId(id)}
            className="group flex items-center gap-3"
            aria-current={on ? 'true' : undefined}
            aria-label={label}
          >
            <span
              className={`eyebrow whitespace-nowrap text-[9px] transition-all duration-500 ${
                on
                  ? 'text-white opacity-100'
                  : 'text-white/50 opacity-0 group-hover:opacity-100'
              }`}
            >
              {label}
            </span>
            <span className="relative flex h-[10px] w-[10px] items-center justify-center">
              <span
                className={`absolute rounded-full transition-all duration-500 ${
                  on ? 'h-[10px] w-[10px] bg-flare' : 'h-[5px] w-[5px] bg-white/35'
                }`}
              />
              {on && (
                <span className="absolute h-[20px] w-[20px] rounded-full border border-flare-1/50" />
              )}
            </span>
          </button>
        )
      })}
    </nav>
  )
}
