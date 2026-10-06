import { useMemo, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { TOURS, REGIONS, DIFFICULTY_LABEL } from '../data/tours'
import TourCard from '../components/TourCard'
import PageHero from '../components/PageHero'
import Reveal from '../components/Reveal'
import Seo from '../components/Seo'

const SORTS = [
  { key: 'popular', label: '추천순' },
  { key: 'price-asc', label: '가격 낮은순' },
  { key: 'price-desc', label: '가격 높은순' },
  { key: 'days-asc', label: '기간 짧은순' },
  { key: 'difficulty-asc', label: '난이도 낮은순' },
]

const DIFF_FILTERS = [
  { key: 0, label: '전체' },
  { key: 2, label: '입문 · 초급' },
  { key: 3, label: '중급' },
  { key: 4, label: '상급 이상' },
]

export default function Tours() {
  const [region, setRegion] = useState('전체')
  const [diff, setDiff] = useState(0)
  const [sort, setSort] = useState('popular')

  const list = useMemo(() => {
    let out = TOURS.filter((t) => region === '전체' || t.region === region)

    if (diff === 2) out = out.filter((t) => t.difficulty <= 2)
    else if (diff === 3) out = out.filter((t) => t.difficulty === 3)
    else if (diff === 4) out = out.filter((t) => t.difficulty >= 4)

    const sorted = [...out]
    if (sort === 'price-asc') sorted.sort((a, b) => a.price - b.price)
    else if (sort === 'price-desc') sorted.sort((a, b) => b.price - a.price)
    else if (sort === 'days-asc') sorted.sort((a, b) => a.days - b.days)
    else if (sort === 'difficulty-asc') sorted.sort((a, b) => a.difficulty - b.difficulty)
    return sorted
  }, [region, diff, sort])

  const chip = (on) =>
    `rounded-full border px-4 py-2 text-[13px] transition-all duration-400 ${
      on
        ? 'border-transparent bg-flare text-white shadow-[0_10px_28px_-12px_rgba(232,52,139,0.9)]'
        : 'border-white/15 text-white/60 hover:border-white/45 hover:text-white'
    }`

  return (
    <>
      <Seo
        title="전체 코스"
        description="안나푸르나·에베레스트·파타고니아·킬리만자로 등 8개 트레킹 코스를 지역과 난이도로 비교해 보세요."
      />
      <PageHero
        eyebrow="All Routes"
        title="여덟 개의 길, 하나의 기준"
        desc="지역과 난이도로 좁혀 보세요. 모든 코스는 한국인 인솔자가 동행하며, 고소 구간은 적응 일정을 하루 이상 확보합니다."
        image="https://images.unsplash.com/photo-1483728642387-6c3bdd6c93e5?auto=format&fit=crop&w=1920&q=80"
        seed="tours-hero"
        crumbs={[{ label: 'HOME', to: '/' }, { label: 'TOURS' }]}
      />

      <section className="relative bg-ink-800 pb-28 pt-14 md:pb-36">
        <div
          className="orb -left-40 top-40 h-[480px] w-[480px] opacity-20"
          style={{ background: 'radial-gradient(circle,#ff6b2c,transparent 65%)' }}
        />

        <div className="relative mx-auto max-w-[1400px] px-5 md:px-10">
          {/* 필터 바 */}
          <Reveal className="sticky top-[76px] z-40 -mx-5 mb-12 border-y border-white/10 bg-ink-800/80 px-5 py-5 backdrop-blur-xl md:-mx-10 md:px-10">
            <div className="flex flex-col gap-5">
              <div className="flex flex-wrap items-center gap-2">
                <span className="eyebrow mr-2 text-[9px] text-white/35">Region</span>
                {REGIONS.map((r) => (
                  <button key={r} type="button" onClick={() => setRegion(r)} className={chip(region === r)}>
                    {r}
                  </button>
                ))}
              </div>

              <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="eyebrow mr-2 text-[9px] text-white/35">Level</span>
                  {DIFF_FILTERS.map((d) => (
                    <button key={d.key} type="button" onClick={() => setDiff(d.key)} className={chip(diff === d.key)}>
                      {d.label}
                    </button>
                  ))}
                </div>

                <div className="flex items-center gap-3">
                  <span className="num text-[12px] text-white/40">{list.length}개 코스</span>
                  <select
                    aria-label="코스 정렬"
                    value={sort}
                    onChange={(e) => setSort(e.target.value)}
                    className="appearance-none rounded-full border border-white/15 bg-white/[0.04] px-4 py-2 text-[13px] text-white outline-none transition-colors focus:border-flare-1"
                  >
                    {SORTS.map((s) => (
                      <option key={s.key} value={s.key} className="bg-ink-800">
                        {s.label}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </div>
          </Reveal>

          {/* 결과 그리드 */}
          <AnimatePresence mode="popLayout">
            {list.length > 0 ? (
              <motion.div
                key={`${region}-${diff}-${sort}`}
                className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3"
              >
                {list.map((tour, i) => (
                  <motion.div
                    key={tour.slug}
                    layout
                    initial={{ opacity: 0, y: 40 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.65, delay: (i % 3) * 0.07, ease: [0.16, 1, 0.3, 1] }}
                  >
                    <TourCard tour={tour} index={i} />
                  </motion.div>
                ))}
              </motion.div>
            ) : (
              <motion.div
                key="empty"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="flex min-h-[320px] flex-col items-center justify-center gap-4 rounded-[20px] border border-dashed border-white/15 text-center"
              >
                <p className="font-display text-[22px] font-bold text-white">
                  조건에 맞는 코스가 없습니다
                </p>
                <p className="text-[14px] text-white/50">필터를 조금 넓혀보시거나 상담을 신청해 주세요.</p>
                <button
                  type="button"
                  onClick={() => {
                    setRegion('전체')
                    setDiff(0)
                  }}
                  className="mt-2 rounded-full border border-white/25 px-6 py-3 text-[13px] text-white transition-colors hover:bg-white hover:text-black"
                >
                  필터 초기화
                </button>
              </motion.div>
            )}
          </AnimatePresence>

          {/* 난이도 안내 */}
          <Reveal className="mt-16 rounded-[20px] border border-white/10 bg-ink-700/50 p-7 md:p-10">
            <p className="eyebrow text-flare-1">Difficulty Guide</p>
            <h3 className="mt-4 font-display text-[22px] font-bold text-white">난이도 기준 안내</h3>
            <div className="mt-7 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-5">
              {Object.entries(DIFFICULTY_LABEL).map(([level, label]) => (
                <div key={level} className="border-t border-white/12 pt-4">
                  <p className="num text-[12px] tracking-[0.14em]">
                    <span className="text-flare-3">{'★'.repeat(Number(level))}</span>
                    <span className="text-white/20">{'☆'.repeat(5 - Number(level))}</span>
                  </p>
                  <p className="mt-2 text-[14px] font-medium text-white">{label}</p>
                  <p className="mt-1 text-[12px] leading-relaxed text-white/45">
                    {
                      [
                        '일 3~4시간, 특별한 체력 준비 없이 가능',
                        '일 5시간 내외, 주 1회 등산 경험 권장',
                        '일 6~7시간, 4천 미터급 고소 구간 포함',
                        '일 8시간 이상, 연속 종주와 급경사 포함',
                        '5천 미터 이상, 자정 출발 정상 공략 포함',
                      ][Number(level) - 1]
                    }
                  </p>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </section>
    </>
  )
}
