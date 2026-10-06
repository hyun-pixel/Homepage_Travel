import { Link, useParams, useNavigate, Navigate } from 'react-router-dom'
import { getTour, TOURS, DIFFICULTY_LABEL, formatPrice } from '../data/tours'
import { GALLERY } from '../data/gallery'
import PageHero from '../components/PageHero'
import Reveal from '../components/Reveal'
import Img from '../components/Img'
import TourCard from '../components/TourCard'
import { DifficultyStars } from '../components/TourCard'
import Seo from '../components/Seo'
import { scrollToId } from '../lib/scroll'

function Spec({ label, value }) {
  return (
    <div className="border-t border-white/12 pt-4">
      <p className="eyebrow text-[9px] text-white/35">{label}</p>
      <p className="mt-2 text-[15px] font-medium text-white">{value}</p>
    </div>
  )
}

export default function TourDetail() {
  const { slug } = useParams()
  const navigate = useNavigate()
  const tour = getTour(slug)

  if (!tour) return <Navigate to="/tours" replace />

  const related = TOURS.filter((t) => t.slug !== tour.slug).slice(0, 3)
  const shots = GALLERY.slice(0, 6)

  return (
    <>
      <Seo
        title={`${tour.title} ${tour.days}일`}
        description={`${tour.country} · 최고 고도 ${tour.maxAltitude} · ${DIFFICULTY_LABEL[tour.difficulty]}. ${tour.summary}`}
        image={tour.hero}
      />
      <PageHero
        eyebrow={tour.subtitle}
        title={tour.title}
        desc={tour.summary}
        image={tour.hero}
        seed={tour.seed}
        height="h-[76vh] min-h-[520px]"
        crumbs={[
          { label: 'HOME', to: '/' },
          { label: 'TOURS', to: '/tours' },
          { label: tour.title },
        ]}
      >
        <Reveal delay={0.3} className="mt-9 flex flex-wrap gap-2">
          {tour.tags.map((t) => (
            <span
              key={t}
              className="rounded-full border border-white/25 bg-black/25 px-4 py-1.5 text-[12px] text-white/85 backdrop-blur-md"
            >
              {t}
            </span>
          ))}
        </Reveal>
      </PageHero>

      <section className="relative bg-ink-800 pb-28 pt-16 md:pb-36">
        <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
          <div
            className="orb -right-40 top-20 h-[520px] w-[520px] opacity-20"
            style={{ background: 'radial-gradient(circle,#e8348b,transparent 65%)' }}
          />
        </div>

        <div className="relative mx-auto max-w-[1400px] px-5 md:px-10">
          {/* 스펙 요약 */}
          <Reveal className="grid grid-cols-2 gap-x-6 gap-y-7 lg:grid-cols-5">
            <Spec label="Country" value={tour.country} />
            <Spec label="Duration" value={`${tour.days}일`} />
            <Spec label="Max Altitude" value={tour.maxAltitude} />
            <Spec label="Best Season" value={tour.season} />
            <Spec
              label="Difficulty"
              value={
                <span className="flex items-center gap-2">
                  {DIFFICULTY_LABEL[tour.difficulty]}
                  <DifficultyStars level={tour.difficulty} />
                </span>
              }
            />
          </Reveal>

          <div className="mt-20 grid grid-cols-1 gap-14 lg:grid-cols-[1.55fr_1fr] lg:gap-16">
            {/* 본문 */}
            <div>
              {/* 하이라이트 */}
              <Reveal>
                <p className="eyebrow text-flare-1">Highlights</p>
                <h2 className="mt-4 font-display text-[clamp(24px,3.2vw,38px)] font-bold leading-snug text-white">
                  이 코스에서만 가능한 것
                </h2>
              </Reveal>
              <ul className="mt-8 flex flex-col gap-4">
                {tour.highlights.map((h, i) => (
                  <Reveal
                    as="li"
                    key={h}
                    delay={i * 0.08}
                    className="flex gap-5 rounded-[16px] border border-white/10 bg-ink-700/50 p-5"
                  >
                    <span className="num shrink-0 text-[13px] font-semibold text-flare-1">
                      {String(i + 1).padStart(2, '0')}
                    </span>
                    <p className="text-[14.5px] leading-relaxed text-white/80">{h}</p>
                  </Reveal>
                ))}
              </ul>

              {/* 일정 타임라인 */}
              <Reveal className="mt-20">
                <p className="eyebrow text-flare-1">Itinerary</p>
                <h2 className="mt-4 font-display text-[clamp(24px,3.2vw,38px)] font-bold leading-snug text-white">
                  {tour.days}일의 흐름
                </h2>
              </Reveal>
              <ol className="relative mt-9 border-l border-white/12 pl-7">
                {tour.itinerary.map((step, i) => (
                  <Reveal as="li" key={step.d} delay={i * 0.07} className="relative pb-10 last:pb-0">
                    <span className="absolute -left-[35px] top-1.5 flex h-4 w-4 items-center justify-center">
                      <span className="h-2.5 w-2.5 rounded-full bg-flare" />
                      <span className="absolute h-4 w-4 rounded-full border border-flare-1/40" />
                    </span>
                    <p className="num text-[11px] tracking-[0.18em] text-flare-3">{step.d}</p>
                    <h3 className="mt-2 font-display text-[19px] font-bold text-white">{step.t}</h3>
                    <p className="mt-2 max-w-[520px] text-[14px] leading-relaxed text-white/60">
                      {step.c}
                    </p>
                  </Reveal>
                ))}
              </ol>

              {/* 포함 / 불포함 */}
              <div className="mt-20 grid grid-cols-1 gap-6 sm:grid-cols-2">
                <Reveal className="rounded-[18px] border border-white/10 bg-ink-700/50 p-6">
                  <p className="eyebrow text-[9px] text-flare-3">Included</p>
                  <ul className="mt-5 flex flex-col gap-3">
                    {tour.includes.map((x) => (
                      <li key={x} className="flex gap-3 text-[13.5px] leading-relaxed text-white/75">
                        <span className="mt-[7px] h-1.5 w-1.5 shrink-0 rounded-full bg-flare-1" />
                        {x}
                      </li>
                    ))}
                  </ul>
                </Reveal>
                <Reveal delay={0.1} className="rounded-[18px] border border-white/10 bg-ink-700/30 p-6">
                  <p className="eyebrow text-[9px] text-white/35">Not Included</p>
                  <ul className="mt-5 flex flex-col gap-3">
                    {tour.excludes.map((x) => (
                      <li key={x} className="flex gap-3 text-[13.5px] leading-relaxed text-white/45">
                        <span className="mt-[7px] h-1.5 w-1.5 shrink-0 rounded-full bg-white/20" />
                        {x}
                      </li>
                    ))}
                  </ul>
                </Reveal>
              </div>

              {/* 현장 사진 */}
              <Reveal className="mt-20">
                <p className="eyebrow text-flare-1">Field Shots</p>
                <h2 className="mt-4 font-display text-[clamp(24px,3.2vw,38px)] font-bold leading-snug text-white">
                  지난 시즌의 기록
                </h2>
              </Reveal>
              <div className="mt-9 grid grid-cols-2 gap-4 md:grid-cols-3">
                {shots.map((g, i) => (
                  <Reveal key={g.id} delay={(i % 3) * 0.08}>
                    <Img
                      src={g.src}
                      seed={g.seed}
                      alt={g.caption}
                      className="group h-[150px] rounded-[14px] border border-white/10 md:h-[190px]"
                      imgClassName="transition-transform duration-1000 hover:scale-110"
                    />
                  </Reveal>
                ))}
              </div>
            </div>

            {/* 예약 사이드바 */}
            <aside>
              <Reveal className="lg:sticky lg:top-28">
                <div className="overflow-hidden rounded-[22px] border border-white/12 bg-ink-700/70 backdrop-blur-xl">
                  <div className="bg-flare px-7 py-5">
                    <p className="text-[12px] text-white/85">1인 기준 · {tour.groupSize}</p>
                    <p className="num mt-1 text-[30px] font-bold leading-none text-white">
                      {formatPrice(tour.price)}
                    </p>
                  </div>

                  <div className="flex flex-col gap-4 px-7 py-7">
                    <div className="flex items-center justify-between border-b border-white/10 pb-3">
                      <span className="text-[13px] text-white/50">기간</span>
                      <span className="num text-[14px] text-white">{tour.days}일</span>
                    </div>
                    <div className="flex items-center justify-between border-b border-white/10 pb-3">
                      <span className="text-[13px] text-white/50">최고 고도</span>
                      <span className="num text-[14px] text-white">{tour.maxAltitude}</span>
                    </div>
                    <div className="flex items-center justify-between border-b border-white/10 pb-3">
                      <span className="text-[13px] text-white/50">권장 시즌</span>
                      <span className="text-[14px] text-white">{tour.season}</span>
                    </div>
                    <div className="flex items-center justify-between pb-1">
                      <span className="text-[13px] text-white/50">난이도</span>
                      <DifficultyStars level={tour.difficulty} />
                    </div>

                    <button
                      type="button"
                      onClick={() => {
                        navigate('/')
                        setTimeout(() => scrollToId('contact'), 750)
                      }}
                      className="mt-3 rounded-full bg-white px-6 py-3.5 text-center text-[15px] font-medium text-black transition-transform duration-300 hover:scale-[1.03]"
                    >
                      이 코스로 상담 신청
                    </button>
                    <button
                      type="button"
                      onClick={() => scrollToId('related')}
                      className="rounded-full border border-white/20 px-6 py-3.5 text-[14px] text-white/80 transition-colors hover:border-white hover:text-white"
                    >
                      다른 코스 비교하기
                    </button>

                    <p className="mt-2 text-[11.5px] leading-relaxed text-white/35">
                      가격은 항공 유류할증료 및 환율에 따라 변동될 수 있습니다.
                      정확한 견적은 상담 시 안내드립니다.
                    </p>
                  </div>
                </div>
              </Reveal>
            </aside>
          </div>

          {/* 관련 코스 */}
          <div id="related" className="mt-28">
            <Reveal>
              <p className="eyebrow text-flare-1">Related Routes</p>
              <h2 className="mt-4 font-display text-[clamp(24px,3.2vw,38px)] font-bold text-white">
                함께 많이 본 코스
              </h2>
            </Reveal>
            <div className="mt-10 grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">
              {related.map((t, i) => (
                <Reveal key={t.slug} delay={i * 0.08}>
                  <TourCard tour={t} index={i} />
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
