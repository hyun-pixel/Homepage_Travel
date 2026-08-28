import { useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import { STRIP_A, STRIP_B } from '../data/gallery'
import Img from '../components/Img'
import Reveal from '../components/Reveal'
import { gsap, prefersReducedMotion } from '../lib/scroll'

function Strip({ items, reverse = false, duration = 60 }) {
  const doubled = [...items, ...items]
  return (
    <div className="marquee-pause edge-fade-x w-full overflow-hidden">
      <div
        className="marquee-track gap-5"
        data-reverse={reverse ? 'true' : 'false'}
        style={{ '--marquee-duration': `${duration}s` }}
      >
        {doubled.map((g, i) => (
          <figure
            key={`${g.id}-${i}`}
            className="group relative w-[74vw] shrink-0 sm:w-[46vw] lg:w-[28vw]"
          >
            <Img
              src={g.src}
              seed={g.seed}
              alt={g.caption}
              className="h-[230px] rounded-[16px] border border-white/10 md:h-[300px]"
              imgClassName="transition-transform duration-[1400ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-110"
            />
            <div
              className="pointer-events-none absolute inset-0 rounded-[16px] opacity-0 transition-opacity duration-700 group-hover:opacity-100"
              style={{
                background:
                  'linear-gradient(to top, rgba(8,8,10,0.9) 0%, transparent 60%)',
              }}
            />
            <figcaption className="pointer-events-none absolute bottom-4 left-4 right-4 translate-y-3 opacity-0 transition-all duration-700 group-hover:translate-y-0 group-hover:opacity-100">
              <p className="eyebrow text-[9px] text-flare-3">{g.place}</p>
              <p className="mt-1 text-[13px] text-white">{g.caption}</p>
            </figcaption>
          </figure>
        ))}
      </div>
    </div>
  )
}

export default function FullBleedGallery() {
  const rootRef = useRef(null)

  // 섹션 진입 시 두 스트립을 반대 방향으로 살짝 밀어 깊이감 부여
  useEffect(() => {
    if (prefersReducedMotion()) return
    const ctx = gsap.context(() => {
      gsap.fromTo(
        '[data-strip="a"]',
        { xPercent: 4 },
        {
          xPercent: -4,
          ease: 'none',
          scrollTrigger: { trigger: rootRef.current, start: 'top bottom', end: 'bottom top', scrub: 1 },
        }
      )
      gsap.fromTo(
        '[data-strip="b"]',
        { xPercent: -4 },
        {
          xPercent: 4,
          ease: 'none',
          scrollTrigger: { trigger: rootRef.current, start: 'top bottom', end: 'bottom top', scrub: 1 },
        }
      )
    }, rootRef)
    return () => ctx.revert()
  }, [])

  return (
    <section
      id="gallery"
      ref={rootRef}
      className="relative overflow-hidden bg-ink-900 py-28 md:py-36"
    >
      <div
        className="orb left-1/2 top-0 h-[520px] w-[520px] -translate-x-1/2 opacity-20"
        style={{ background: 'radial-gradient(circle,#e8348b,transparent 65%)' }}
      />

      <div className="relative mx-auto mb-14 max-w-[1400px] px-5 md:px-10">
        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <div>
            <Reveal>
              <p className="eyebrow text-flare-1">04 — Field Archive</p>
            </Reveal>
            <Reveal delay={0.08}>
              <h2 className="mt-5 max-w-[640px] font-display text-[clamp(30px,4.4vw,54px)] font-bold leading-[1.18] text-white">
                우리가 실제로 걸은 곳,
                <br />
                실제로 찍은 사진
              </h2>
            </Reveal>
          </div>
          <Reveal delay={0.16}>
            <Link
              to="/gallery"
              className="group inline-flex items-center gap-3 text-[14px] text-white/75 transition-colors hover:text-white"
            >
              전체 아카이브
              <span className="flex h-9 w-9 items-center justify-center rounded-full border border-white/25 transition-all duration-500 group-hover:border-transparent group-hover:bg-flare">
                <svg width="13" height="13" viewBox="0 0 16 16" fill="none" aria-hidden>
                  <path
                    d="M3 13L13 3M13 3H5.5M13 3V10.5"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </span>
            </Link>
          </Reveal>
        </div>
      </div>

      <div className="relative flex flex-col gap-5">
        <div data-strip="a">
          <Strip items={STRIP_A} duration={64} />
        </div>
        <div data-strip="b">
          <Strip items={STRIP_B} reverse duration={78} />
        </div>
      </div>
    </section>
  )
}
