import { Link } from 'react-router-dom'
import { TOURS } from '../data/tours'
import TourCard from '../components/TourCard'
import Reveal from '../components/Reveal'
import SplitText from '../components/SplitText'

export default function PopularTours() {
  const featured = TOURS.slice(0, 6)

  return (
    <section id="tours" className="relative overflow-hidden bg-ink-800 py-28 md:py-36">
      <div
        className="orb -left-40 top-20 h-[520px] w-[520px] opacity-25"
        style={{ background: 'radial-gradient(circle,#ff6b2c,transparent 65%)' }}
      />
      <div
        className="orb -right-32 bottom-0 h-[460px] w-[460px] opacity-20"
        style={{ background: 'radial-gradient(circle,#e8348b,transparent 65%)' }}
      />

      <div className="relative mx-auto max-w-[1400px] px-5 md:px-10">
        <div className="flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
          <div>
            <Reveal>
              <p className="eyebrow text-flare-1">01 — Signature Routes</p>
            </Reveal>
            <SplitText
              as="h2"
              text="가장 많이 선택한 여덟 개의 길"
              className="mt-5 block max-w-[720px] font-display text-[clamp(30px,4.4vw,54px)] font-bold leading-[1.18] text-white"
            />
          </div>
          <Reveal delay={0.15} className="md:pb-3">
            <p className="max-w-[340px] text-[14px] leading-relaxed text-white/60">
              전 코스 한국인 인솔자가 동행하고, 고소 적응 일정을 하루 이상 확보합니다.
              혼자 신청해도 팀이 되도록 설계했습니다.
            </p>
          </Reveal>
        </div>

        <div className="mt-14 grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">
          {featured.map((tour, i) => (
            <Reveal key={tour.slug} delay={(i % 3) * 0.09} y={56}>
              <TourCard tour={tour} index={i} />
            </Reveal>
          ))}
        </div>

        <Reveal delay={0.1} className="mt-14 flex justify-center">
          <Link
            to="/tours"
            className="group relative inline-flex items-center gap-3 overflow-hidden rounded-full border border-white/25 px-8 py-4 text-[14px] font-medium text-white transition-colors duration-500 hover:border-transparent"
          >
            <span className="absolute inset-0 -translate-y-full bg-flare transition-transform duration-600 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:translate-y-0" />
            <span className="relative">전체 8개 코스 보기</span>
            <span className="num relative text-white/60">(08)</span>
          </Link>
        </Reveal>
      </div>
    </section>
  )
}
