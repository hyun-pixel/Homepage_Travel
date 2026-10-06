import { useEffect, useRef, useState } from 'react'
import Img from '../components/Img'
import Reveal from '../components/Reveal'
import SplitText from '../components/SplitText'
import { SITE } from '../data/site'

const PILLARS = [
  {
    no: '01',
    title: '완주율이 아니라\n안전율을 말합니다',
    body: '전속 가이드 26명 전원이 야외응급처치(WFR) 자격을 보유합니다. 고산 코스는 산소포화도를 하루 두 번 기록하고, 수치가 기준을 벗어나면 일정보다 하산을 먼저 선택합니다.',
    meta: ['WFR 자격 100%', '헬기 후송 보험 기본 포함', '일일 산소포화도 기록'],
    img: 'https://images.unsplash.com/photo-1533692328991-08159ff19fca?auto=format&fit=crop&w=1400&q=80',
    seed: 'pillar-1',
  },
  {
    no: '02',
    title: '혼자 신청해도\n혼자 걷지 않습니다',
    body: '한 팀은 최대 8~12명. 출발 6주 전부터 온라인 사전 모임을 열고, 장비 목록부터 체력 훈련 계획까지 함께 준비합니다. 실제 참가자의 71%가 1인 신청자입니다.',
    meta: ['1인 신청 비율 71%', '출발 전 사전 모임 3회', '팀 최대 12명'],
    img: 'https://images.unsplash.com/photo-1551632811-561732d1e306?auto=format&fit=crop&w=1400&q=80',
    seed: 'pillar-2',
  },
  {
    no: '03',
    title: '현지에 남는 돈이\n다음 길을 만듭니다',
    body: '포터와 가이드에게 국제 트레킹 기준 이상의 임금을 지급하고, 매출의 1%를 트레일 정비 기금으로 적립합니다. 우리가 걸은 길이 다음 사람에게도 남아 있도록.',
    meta: ['현지 임금 기준 상회', '매출 1% 트레일 기금', '무단 폐기물 제로 원칙'],
    img: 'https://images.unsplash.com/photo-1470240731273-7821a6eeb6bd?auto=format&fit=crop&w=1400&q=80',
    seed: 'pillar-3',
  },
]

export default function BrandStory() {
  const [active, setActive] = useState(0)
  const itemRefs = useRef([])

  useEffect(() => {
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActive(Number(entry.target.dataset.index))
          }
        })
      },
      { threshold: 0.5, rootMargin: '-20% 0px -20% 0px' }
    )
    itemRefs.current.forEach((el) => el && io.observe(el))
    return () => io.disconnect()
  }, [])

  return (
    <section id="story" className="relative overflow-hidden bg-ink-800 py-28 md:py-36">
      <div
        className="orb right-0 top-1/3 h-[560px] w-[560px] opacity-20"
        style={{ background: 'radial-gradient(circle,#ffb443,transparent 65%)' }}
      />

      <div className="relative mx-auto max-w-[1400px] px-5 md:px-10">
        <div className="max-w-[820px]">
          <Reveal>
            <p className="eyebrow text-flare-1">03 — {SITE.brand}의 약속</p>
          </Reveal>
          <SplitText
            as="h2"
            text="어떻게 걷게 할 것인가를 먼저 정합니다"
            className="mt-5 block font-display text-[clamp(30px,4.4vw,54px)] font-bold leading-[1.18] text-white"
          />
          <Reveal delay={0.15}>
            <p className="mt-6 max-w-[560px] text-[15px] leading-relaxed text-white/60">
              {SITE.brand}는 2016년 안나푸르나 한 팀에서 시작했습니다. 열 번째 시즌을 지나는 지금도
              기준은 같습니다 — 무리하지 않고, 남기지 않고, 다시 오고 싶게.
            </p>
          </Reveal>
        </div>

        <div className="mt-20 grid grid-cols-1 gap-14 lg:grid-cols-2 lg:gap-20">
          {/* 좌측 — 스티키 이미지 스택 */}
          <div className="hidden lg:block">
            <div className="sticky top-28 h-[68vh] overflow-hidden rounded-[24px] border border-white/10">
              {PILLARS.map((p, i) => (
                <div
                  key={p.no}
                  className="absolute inset-0 transition-all duration-[1100ms] ease-[cubic-bezier(0.16,1,0.3,1)]"
                  style={{
                    opacity: active === i ? 1 : 0,
                    transform: active === i ? 'scale(1)' : 'scale(1.08)',
                    clipPath:
                      active === i ? 'inset(0% 0% 0% 0%)' : 'inset(12% 0% 12% 0%)',
                  }}
                >
                  <Img
                    src={p.img}
                    seed={p.seed}
                    alt=""
                    className="h-full w-full"
                    loading={i === 0 ? 'eager' : 'lazy'}
                  />
                  <div
                    className="pointer-events-none absolute inset-0"
                    style={{
                      background:
                        'linear-gradient(to top, rgba(8,8,10,0.85) 0%, transparent 55%)',
                    }}
                  />
                  <div className="absolute bottom-8 left-8">
                    <span className="font-display text-[80px] font-black leading-none text-white/15">
                      {p.no}
                    </span>
                  </div>
                </div>
              ))}

              {/* 진행 인디케이터 */}
              <div className="absolute right-6 top-1/2 flex -translate-y-1/2 flex-col gap-2">
                {PILLARS.map((p, i) => (
                  <span
                    key={p.no}
                    className={`w-px transition-all duration-500 ${
                      active === i ? 'h-10 bg-flare-1' : 'h-5 bg-white/25'
                    }`}
                  />
                ))}
              </div>
            </div>
          </div>

          {/* 우측 — 스크롤 텍스트 */}
          <div className="flex flex-col gap-16 lg:gap-0">
            {PILLARS.map((p, i) => (
              <div
                key={p.no}
                data-index={i}
                ref={(el) => (itemRefs.current[i] = el)}
                className="flex flex-col justify-center lg:min-h-[68vh]"
              >
                {/* 모바일 전용 이미지 */}
                <div className="mb-7 lg:hidden">
                  <Img
                    src={p.img}
                    seed={p.seed}
                    alt=""
                    className="h-[260px] rounded-[18px] border border-white/10"
                  />
                </div>

                <Reveal>
                  <span className="num text-[13px] font-semibold text-flare-1">{p.no}</span>
                  <h3 className="mt-4 whitespace-pre-line font-display text-[clamp(24px,3vw,36px)] font-bold leading-[1.32] text-white">
                    {p.title}
                  </h3>
                  <p className="mt-5 max-w-[480px] text-[14.5px] leading-relaxed text-white/62">
                    {p.body}
                  </p>
                  <ul className="mt-7 flex flex-wrap gap-2">
                    {p.meta.map((m) => (
                      <li
                        key={m}
                        className="rounded-full border border-white/15 px-4 py-1.5 text-[12px] text-white/70"
                      >
                        {m}
                      </li>
                    ))}
                  </ul>
                </Reveal>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
