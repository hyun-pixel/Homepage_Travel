import { Link } from 'react-router-dom'
import PageHero from '../components/PageHero'
import Reveal from '../components/Reveal'
import SplitText from '../components/SplitText'
import Img from '../components/Img'
import { STATS, SITE } from '../data/site'
import Seo from '../components/Seo'

const TIMELINE = [
  { year: '2016', title: '안나푸르나 한 팀에서 시작', body: '창업자 두 명과 참가자 여덟 명. 첫 시즌은 코스 하나가 전부였습니다.' },
  { year: '2018', title: '남미 라인 개설', body: '파타고니아와 잉카 트레일을 추가하며 남반구 시즌을 열었습니다.' },
  { year: '2020', title: '안전 프로토콜 전면 개편', body: '산소포화도 일 2회 기록과 헬기 후송 보험을 전 코스 기본으로 전환했습니다.' },
  { year: '2023', title: '트레일 정비 기금 조성', body: '매출의 1%를 현지 트레일 보수와 포터 처우 개선에 적립하기 시작했습니다.' },
  { year: '2026', title: '48개 코스, 열 번째 시즌', body: '6대륙 48개 루트를 운영하며 누적 여행자 12,480명을 넘어섰습니다.' },
]

const GUIDES = [
  {
    name: '서준혁',
    role: '히말라야 총괄 가이드',
    exp: 'EBC 41회 · ABC 63회',
    img: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=900&q=80',
    seed: 'guide-1',
  },
  {
    name: '문가희',
    role: '남미 라인 리드',
    exp: '파타고니아 28회 · 잉카 22회',
    img: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=900&q=80',
    seed: 'guide-2',
  },
  {
    name: '조태윤',
    role: '고산 안전 담당',
    exp: 'WFR 강사 · 킬리만자로 34회',
    img: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=900&q=80',
    seed: 'guide-3',
  },
  {
    name: '임세라',
    role: '유럽 · 오세아니아 플래너',
    exp: 'TMB 19회 · 밀포드 15회',
    img: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&w=900&q=80',
    seed: 'guide-4',
  },
]

const SAFETY = [
  { t: '고소 대응', b: '4,000m 이상 구간은 적응일을 최소 1일 확보하고, 산소포화도가 기준 이하로 떨어지면 즉시 하강 판단을 내립니다.' },
  { t: '의료 장비', b: '휴대용 산소, 가모프백, AED를 팀 단위로 운용하며 가이드 전원이 야외응급처치 자격을 유지합니다.' },
  { t: '보험', b: '고산 특약과 헬기 후송이 포함된 여행자보험이 전 코스 요금에 기본 포함됩니다.' },
  { t: '팀 규모', b: '한 팀 최대 12명. 고산 코스는 8명으로 제한해 가이드 1인당 관리 인원을 줄입니다.' },
]

export default function About() {
  return (
    <>
      <Seo
        title="브랜드 소개"
        description="2016년 안나푸르나의 한 팀에서 시작해 열 번째 시즌. FLOWAX가 지켜온 안전 기준과 가이드를 소개합니다."
      />
      <PageHero
        eyebrow="About FLOWAX"
        title="무리하지 않고 남기지 않고 다시 오고 싶게"
        desc="2016년 안나푸르나의 한 팀에서 시작해 열 번째 시즌을 지나고 있습니다. 우리가 지켜온 기준을 그대로 공개합니다."
        image="https://images.unsplash.com/photo-1454496522488-7a8e488e8606?auto=format&fit=crop&w=1920&q=80"
        seed="about-hero"
        crumbs={[{ label: 'HOME', to: '/' }, { label: 'ABOUT' }]}
      />

      {/* 스토리 */}
      <section className="relative bg-ink-800 py-24 md:py-32">
        <div
          className="orb -left-40 top-10 h-[500px] w-[500px] opacity-20"
          style={{ background: 'radial-gradient(circle,#ff6b2c,transparent 65%)' }}
        />
        <div className="relative mx-auto grid max-w-[1400px] grid-cols-1 gap-14 px-5 md:px-10 lg:grid-cols-2 lg:gap-20">
          <Reveal>
            <Img
              src="https://images.unsplash.com/photo-1533692328991-08159ff19fca?auto=format&fit=crop&w=1400&q=80"
              seed="about-story"
              alt=""
              className="h-[400px] rounded-[22px] border border-white/10 md:h-[540px]"
            />
          </Reveal>
          <div className="flex flex-col justify-center">
            <Reveal>
              <p className="eyebrow text-flare-1">Our Story</p>
            </Reveal>
            <SplitText
              as="h2"
              text="좋은 여행사는 무엇을 안 하는지로 판단됩니다"
              className="mt-5 block font-display text-[clamp(26px,3.6vw,44px)] font-bold leading-[1.24] text-white"
            />
            <Reveal delay={0.15}>
              <div className="mt-7 flex flex-col gap-5 text-[15px] leading-[1.85] text-white/62">
                <p>
                  첫 시즌, 마지막 캠프에서 한 명이 고산증 초기 증상을 보였습니다.
                  일정을 하루 남겨두고 팀 전체가 함께 내려왔습니다. 그날 이후 우리의 기준은
                  &lsquo;완주&rsquo;가 아니라 &lsquo;전원 무사 귀환&rsquo;이 되었습니다.
                </p>
                <p>
                  그래서 우리는 하지 않는 것이 많습니다. 인원을 채우기 위해 팀을 키우지 않고,
                  성수기라고 적응일을 줄이지 않으며, 사진이 잘 나온다는 이유로 위험한 각도를
                  권하지 않습니다.
                </p>
                <p>
                  대신 여러분이 걷는 것에만 집중할 수 있도록 나머지를 전부 준비합니다.
                  그게 {SITE.brandFull}가 열 시즌 동안 해온 일의 전부입니다.
                </p>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* 지표 */}
      <section className="relative border-y border-white/10 bg-ink-900 py-20">
        <div className="mx-auto grid max-w-[1400px] grid-cols-2 gap-x-6 gap-y-10 px-5 md:px-10 lg:grid-cols-4">
          {STATS.map((s, i) => (
            <Reveal key={s.label} delay={i * 0.08}>
              <p className="num font-display text-[clamp(30px,4vw,48px)] font-black leading-none text-white">
                {s.decimals ? s.value.toFixed(s.decimals) : s.value.toLocaleString('ko-KR')}
                <span className="text-[0.42em] font-normal text-white/45">{s.suffix}</span>
              </p>
              <p className="mt-3 text-[13.5px] text-white/70">{s.label}</p>
            </Reveal>
          ))}
        </div>
      </section>

      {/* 타임라인 */}
      <section className="relative bg-ink-800 py-24 md:py-32">
        <div className="mx-auto max-w-[1400px] px-5 md:px-10">
          <Reveal>
            <p className="eyebrow text-flare-1">Timeline</p>
            <h2 className="mt-4 font-display text-[clamp(26px,3.6vw,44px)] font-bold text-white">
              열 개의 시즌
            </h2>
          </Reveal>

          <ol className="mt-14 flex flex-col">
            {TIMELINE.map((t, i) => (
              <Reveal
                as="li"
                key={t.year}
                delay={i * 0.06}
                className="group grid grid-cols-1 gap-3 border-t border-white/12 py-8 transition-colors duration-500 hover:border-flare-1/50 md:grid-cols-[140px_1fr_1.2fr] md:gap-8"
              >
                <span className="num text-[22px] font-bold text-white/30 transition-colors duration-500 group-hover:text-flare-1">
                  {t.year}
                </span>
                <h3 className="font-display text-[19px] font-bold text-white">{t.title}</h3>
                <p className="text-[14px] leading-relaxed text-white/55">{t.body}</p>
              </Reveal>
            ))}
          </ol>
        </div>
      </section>

      {/* 가이드 */}
      <section className="relative bg-ink-900 py-24 md:py-32">
        <div
          className="orb right-0 top-20 h-[480px] w-[480px] opacity-20"
          style={{ background: 'radial-gradient(circle,#e8348b,transparent 65%)' }}
        />
        <div className="relative mx-auto max-w-[1400px] px-5 md:px-10">
          <Reveal>
            <p className="eyebrow text-flare-1">Guides</p>
            <h2 className="mt-4 max-w-[560px] font-display text-[clamp(26px,3.6vw,44px)] font-bold leading-snug text-white">
              현장에서 판단하는 사람들
            </h2>
          </Reveal>

          <div className="mt-14 grid grid-cols-2 gap-5 lg:grid-cols-4">
            {GUIDES.map((g, i) => (
              <Reveal key={g.name} delay={i * 0.08} className="group">
                <Img
                  src={g.img}
                  seed={g.seed}
                  alt={g.name}
                  className="h-[240px] rounded-[18px] border border-white/10 md:h-[320px]"
                  imgClassName="grayscale transition-all duration-[1100ms] group-hover:grayscale-0 group-hover:scale-105"
                />
                <p className="mt-5 font-display text-[18px] font-bold text-white">{g.name}</p>
                <p className="mt-1 text-[13px] text-flare-3">{g.role}</p>
                <p className="num mt-2 text-[12px] text-white/45">{g.exp}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* 안전 정책 */}
      <section className="relative bg-ink-800 py-24 md:py-32">
        <div className="mx-auto max-w-[1400px] px-5 md:px-10">
          <Reveal>
            <p className="eyebrow text-flare-1">Safety Policy</p>
            <h2 className="mt-4 max-w-[620px] font-display text-[clamp(26px,3.6vw,44px)] font-bold leading-snug text-white">
              안전은 옵션이 아니라 기본 사양입니다
            </h2>
          </Reveal>

          <div className="mt-14 grid grid-cols-1 gap-6 md:grid-cols-2">
            {SAFETY.map((s, i) => (
              <Reveal
                key={s.t}
                delay={i * 0.08}
                className="rounded-[18px] border border-white/10 bg-ink-700/50 p-7 transition-colors duration-500 hover:border-flare-1/40"
              >
                <p className="num text-[12px] text-flare-1">{String(i + 1).padStart(2, '0')}</p>
                <h3 className="mt-3 font-display text-[19px] font-bold text-white">{s.t}</h3>
                <p className="mt-3 text-[14px] leading-relaxed text-white/60">{s.b}</p>
              </Reveal>
            ))}
          </div>

          <Reveal delay={0.12} className="mt-16 flex justify-center">
            <Link
              to="/tours"
              className="group relative inline-flex items-center gap-3 overflow-hidden rounded-full border border-white/25 px-8 py-4 text-[14px] font-medium text-white transition-colors duration-500 hover:border-transparent"
            >
              <span className="absolute inset-0 -translate-y-full bg-flare transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:translate-y-0" />
              <span className="relative">코스 보러 가기</span>
            </Link>
          </Reveal>
        </div>
      </section>
    </>
  )
}
