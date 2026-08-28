import { REVIEWS } from '../data/reviews'
import Img from '../components/Img'
import Reveal from '../components/Reveal'

export function ReviewCard({ r, fluid = false }) {
  const width = fluid ? 'w-full h-full' : 'w-[85vw] shrink-0 sm:w-[420px]'
  return (
    <article
      className={`flex flex-col justify-between rounded-[20px] border border-white/10 bg-ink-700/70 p-7 backdrop-blur-sm transition-colors duration-500 hover:border-flare-1/50 ${width}`}
    >
      <div>
        <div className="flex items-center justify-between">
          <span className="num text-[13px] tracking-[0.14em] text-flare-3">
            {'★'.repeat(r.rating)}
          </span>
          <span className="eyebrow text-[9px] text-white/35">{r.tour}</span>
        </div>
        <p className="mt-5 text-[14.5px] leading-relaxed text-white/80">{r.text}</p>
      </div>

      <div className="mt-7 flex items-center gap-3 border-t border-white/10 pt-5">
        <Img
          src={r.avatar}
          seed={r.seed}
          alt={r.name}
          className="h-11 w-11 shrink-0 rounded-full"
        />
        <div>
          <p className="text-[14px] font-medium text-white">{r.name}</p>
          <p className="text-[12px] text-white/45">{r.age}</p>
        </div>
      </div>
    </article>
  )
}

export default function Reviews() {
  const doubled = [...REVIEWS, ...REVIEWS]

  return (
    <section
      id="reviews"
      className="relative overflow-hidden border-y border-white/10 bg-ink-800 py-28 md:py-36"
    >
      <div
        className="orb -left-24 bottom-0 h-[480px] w-[480px] opacity-20"
        style={{ background: 'radial-gradient(circle,#ff6b2c,transparent 65%)' }}
      />

      <div className="relative mx-auto mb-14 max-w-[1400px] px-5 text-center md:px-10">
        <Reveal>
          <p className="eyebrow text-flare-1">05 — Traveler Voices</p>
        </Reveal>
        <Reveal delay={0.08}>
          <h2 className="mx-auto mt-5 max-w-[720px] font-display text-[clamp(30px,4.4vw,54px)] font-bold leading-[1.18] text-white">
            돌아온 사람들이 남긴 말
          </h2>
        </Reveal>
        <Reveal delay={0.16}>
          <p className="mx-auto mt-5 max-w-[460px] text-[14px] leading-relaxed text-white/55">
            귀국 후 2주 내 작성된 실제 후기입니다. 편집 없이 그대로 싣습니다.
          </p>
        </Reveal>
      </div>

      <div className="marquee-pause edge-fade-x relative overflow-hidden">
        <div className="marquee-track gap-5 px-5" style={{ '--marquee-duration': '70s' }}>
          {doubled.map((r, i) => (
            <ReviewCard key={`${r.id}-${i}`} r={r} />
          ))}
        </div>
      </div>
    </section>
  )
}
