import { Link } from 'react-router-dom'
import Img from './Img'
import SplitText from './SplitText'
import Reveal from './Reveal'

/** 서브페이지 공용 헤더 — 대형 타이포 + 배경 이미지 + 브레드크럼 */
export default function PageHero({
  eyebrow,
  title,
  desc,
  image,
  seed = 'page-hero',
  crumbs = [],
  height = 'h-[62vh] min-h-[440px]',
  children,
}) {
  return (
    <header className={`relative w-full overflow-hidden ${height}`}>
      <Img
        src={image}
        seed={seed}
        alt=""
        loading="eager"
        className="absolute inset-0 h-full w-full"
        imgClassName="scale-105"
      />
      <div
        className="absolute inset-0"
        style={{
          background:
            'linear-gradient(to bottom, rgba(8,8,10,0.72) 0%, rgba(8,8,10,0.55) 45%, rgba(14,14,18,1) 100%)',
        }}
        aria-hidden
      />
      <div
        className="pointer-events-none absolute inset-0 mix-blend-soft-light"
        style={{
          background:
            'radial-gradient(80% 60% at 20% 100%, rgba(255,107,44,0.6) 0%, transparent 60%)',
        }}
        aria-hidden
      />

      <div className="relative mx-auto flex h-full max-w-[1400px] flex-col justify-end px-5 pb-14 md:px-10 md:pb-20">
        {crumbs.length > 0 && (
          <Reveal className="mb-6 flex items-center gap-2 text-[12px] text-white/45">
            {crumbs.map((c, i) => (
              <span key={c.label} className="flex items-center gap-2">
                {c.to ? (
                  <Link to={c.to} className="transition-colors hover:text-white">
                    {c.label}
                  </Link>
                ) : (
                  <span className="text-white/70">{c.label}</span>
                )}
                {i < crumbs.length - 1 && <span className="text-white/25">/</span>}
              </span>
            ))}
          </Reveal>
        )}

        {eyebrow && (
          <Reveal>
            <p className="eyebrow text-flare-1">{eyebrow}</p>
          </Reveal>
        )}

        <SplitText
          as="h1"
          text={title}
          start="top 95%"
          className="mt-4 block max-w-[900px] font-display text-[clamp(34px,6vw,72px)] font-black leading-[1.1] tracking-tight text-white"
        />

        {desc && (
          <Reveal delay={0.2}>
            <p className="mt-6 max-w-[560px] text-[15px] leading-relaxed text-white/65">{desc}</p>
          </Reveal>
        )}

        {children}
      </div>
    </header>
  )
}
