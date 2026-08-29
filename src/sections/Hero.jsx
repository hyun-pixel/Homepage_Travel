import { useEffect, useRef } from 'react'
import { SITE } from '../data/site'
import { useReady } from '../context/ReadyContext'
import { gsap, ScrollTrigger, scrollToId, prefersReducedMotion } from '../lib/scroll'

/**
 * 레퍼런스 Step 1 / Step 3 스펙 고정 구현.
 *  - 100vh, 배경 영상 object-cover, autoplay / loop / muted / playsinline
 *  - 오버레이: 상단 black 10% → 하단 black 40%
 *  - 헤드라인: 38px(모바일) / 56px(데스크톱), font-medium, line-height 1.1
 *  - 서브: 15px(모바일) / 18px(데스크톱), white 80%
 *  - CTA: 흰 배경 / 검정 텍스트 / 15px / medium / px-[26px] py-[12px] / hover scale-105
 *  - 네비 이후 스태거 fade-in-up
 */
export default function Hero() {
  const ready = useReady()
  const rootRef = useRef(null)
  const videoRef = useRef(null)

  // 스크롤 시 배경 영상에 가벼운 패럴랙스 + 페이드
  useEffect(() => {
    if (prefersReducedMotion()) return
    const ctx = gsap.context(() => {
      gsap.to(videoRef.current, {
        yPercent: 14,
        scale: 1.12,
        ease: 'none',
        scrollTrigger: {
          trigger: rootRef.current,
          start: 'top top',
          end: 'bottom top',
          scrub: true,
        },
      })
      gsap.to('[data-hero-content]', {
        yPercent: -22,
        opacity: 0,
        ease: 'none',
        scrollTrigger: {
          trigger: rootRef.current,
          start: 'top top',
          end: 'bottom 30%',
          scrub: true,
        },
      })
    }, rootRef)
    return () => {
      ctx.revert()
      ScrollTrigger.refresh()
    }
  }, [])

  const stagger = (i) => ({ animationDelay: `${0.35 + i * 0.13}s` })

  return (
    <section
      id="hero"
      ref={rootRef}
      className="relative h-[100vh] min-h-[600px] w-full overflow-hidden"
    >
      {/* 배경 영상 */}
      <video
        ref={videoRef}
        className="pointer-events-none absolute inset-0 h-full w-full object-cover"
        src={SITE.heroVideo}
        autoPlay
        loop
        muted
        playsInline
        preload="auto"
        poster="https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=1920&q=80"
      />

      {/* 다크 그라데이션 오버레이 (상단 10% → 하단 40%) */}
      <div
        className="absolute inset-0"
        style={{
          background:
            'linear-gradient(to bottom, rgba(0,0,0,0.10) 0%, rgba(0,0,0,0.22) 55%, rgba(0,0,0,0.40) 100%)',
        }}
        aria-hidden
      />
      {/* 브랜드 컬러 앰비언트 */}
      <div
        className="pointer-events-none absolute inset-0 mix-blend-soft-light"
        style={{
          background:
            'radial-gradient(120% 80% at 50% 120%, rgba(232,52,139,0.55) 0%, transparent 60%), radial-gradient(90% 60% at 10% 0%, rgba(255,107,44,0.35) 0%, transparent 55%)',
        }}
        aria-hidden
      />

      {/* 중앙 콘텐츠 */}
      <div
        data-hero-content
        className="relative z-10 mx-auto flex h-full max-w-[880px] flex-col items-center justify-center px-6 text-center"
      >
        {ready && (
          <>
            <p
              className="eyebrow animate-fade-up text-white/70"
              style={stagger(0)}
            >
              Adventure Travel · Since 2016
            </p>

            <h1
              className="animate-fade-up mt-6 font-display font-medium text-white"
              style={{ ...stagger(1), fontSize: 'clamp(38px, 5.6vw, 56px)', lineHeight: 1.1 }}
            >
              세상의 끝까지
              <br />
              가장 가벼운 마음으로
            </h1>

            <p
              className="animate-fade-up mt-6 max-w-[620px] text-white/80"
              style={{ ...stagger(2), fontSize: 'clamp(15px, 1.3vw, 18px)', lineHeight: 1.75 }}
            >
              항공부터 고소 적응 일정까지, 준비는 저희가 합니다.
              당신은 걷는 것에만 집중하세요.
            </p>

            <div
              className="animate-fade-up mt-9 flex flex-col items-center gap-4 sm:flex-row"
              style={stagger(3)}
            >
              <button
                type="button"
                onClick={() => scrollToId('tours')}
                className="rounded-full bg-white px-[26px] py-[12px] text-[15px] font-medium text-black shadow-[0_10px_30px_-8px_rgba(0,0,0,0.55)] transition-all duration-300 hover:scale-105 hover:shadow-[0_18px_46px_-10px_rgba(255,107,44,0.75)]"
              >
                코스 둘러보기
              </button>
              <button
                type="button"
                onClick={() => scrollToId('contact')}
                className="rounded-full border border-white/40 px-[26px] py-[12px] text-[15px] font-normal text-white/90 backdrop-blur-sm transition-all duration-300 hover:border-white hover:bg-white/10"
              >
                무료 상담 신청
              </button>
            </div>
          </>
        )}
      </div>

      {/* 하단 스크롤 큐 */}
      <div
        className="absolute inset-x-0 bottom-8 z-10 flex flex-col items-center gap-3"
        aria-hidden
      >
        {ready && (
          <div className="animate-fade-up flex flex-col items-center gap-3" style={{ animationDelay: '1.1s' }}>
            <span className="eyebrow text-[9px] text-white/55">Scroll</span>
            <span className="relative h-12 w-px overflow-hidden bg-white/20">
              <span className="absolute inset-x-0 top-0 h-1/2 animate-[scrollCue_2.2s_ease-in-out_infinite] bg-flare" />
            </span>
          </div>
        )}
      </div>

      <style>{`
        @keyframes scrollCue {
          0% { transform: translateY(-100%); }
          60%, 100% { transform: translateY(200%); }
        }
      `}</style>
    </section>
  )
}
