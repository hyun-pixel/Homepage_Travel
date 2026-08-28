import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { GALLERY } from '../data/gallery'
import { REVIEWS } from '../data/reviews'
import PageHero from '../components/PageHero'
import Reveal from '../components/Reveal'
import Img from '../components/Img'
import { ReviewCard } from '../sections/Reviews'
import { lockScroll } from '../lib/scroll'
import Seo from '../components/Seo'

/** 불규칙한 높이로 매거진 느낌을 주기 위한 패턴 */
const SPANS = [
  'md:col-span-2 md:row-span-2',
  '',
  '',
  '',
  'md:col-span-2',
  '',
  '',
  'md:row-span-2',
  '',
  'md:col-span-2',
  '',
  '',
]

function Lightbox({ item, onClose, onPrev, onNext }) {
  useEffect(() => {
    lockScroll(true)
    const onKey = (e) => {
      if (e.key === 'Escape') onClose()
      if (e.key === 'ArrowLeft') onPrev()
      if (e.key === 'ArrowRight') onNext()
    }
    window.addEventListener('keydown', onKey)
    return () => {
      lockScroll(false)
      window.removeEventListener('keydown', onKey)
    }
  }, [onClose, onPrev, onNext])

  return (
    <motion.div
      className="fixed inset-0 z-[95] flex items-center justify-center bg-ink-900/95 p-5 backdrop-blur-xl"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
    >
      <motion.figure
        className="relative max-h-[86vh] w-full max-w-[1100px]"
        initial={{ scale: 0.94, opacity: 0, y: 20 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        exit={{ scale: 0.96, opacity: 0 }}
        transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
        onClick={(e) => e.stopPropagation()}
      >
        <Img
          src={item.src}
          seed={item.seed}
          alt={item.caption}
          loading="eager"
          className="h-[62vh] rounded-[18px] border border-white/12 md:h-[72vh]"
        />
        <figcaption className="mt-5 flex items-center justify-between">
          <div>
            <p className="eyebrow text-[9px] text-flare-3">{item.place}</p>
            <p className="mt-1.5 text-[15px] text-white">{item.caption}</p>
          </div>
          <div className="flex gap-2">
            <button
              type="button"
              onClick={onPrev}
              className="flex h-11 w-11 items-center justify-center rounded-full border border-white/20 text-white transition-colors hover:bg-white hover:text-black"
              aria-label="이전 사진"
            >
              ←
            </button>
            <button
              type="button"
              onClick={onNext}
              className="flex h-11 w-11 items-center justify-center rounded-full border border-white/20 text-white transition-colors hover:bg-white hover:text-black"
              aria-label="다음 사진"
            >
              →
            </button>
          </div>
        </figcaption>

        <button
          type="button"
          onClick={onClose}
          className="absolute -top-12 right-0 text-[13px] text-white/60 transition-colors hover:text-white"
        >
          닫기 (ESC)
        </button>
      </motion.figure>
    </motion.div>
  )
}

export default function Gallery() {
  const [index, setIndex] = useState(-1)
  const open = index >= 0

  const prev = () => setIndex((i) => (i - 1 + GALLERY.length) % GALLERY.length)
  const next = () => setIndex((i) => (i + 1) % GALLERY.length)

  return (
    <>
      <Seo
        title="갤러리 · 여행자 후기"
        description="가이드와 참가자가 현장에서 직접 남긴 사진과 편집하지 않은 후기를 모았습니다."
      />
      <PageHero
        eyebrow="Archive & Voices"
        title="사진과 후기는 편집하지 않습니다"
        desc="가이드와 참가자가 현장에서 직접 남긴 기록입니다. 아래 사진을 클릭하면 크게 볼 수 있습니다."
        image="https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?auto=format&fit=crop&w=1920&q=80"
        seed="gallery-hero"
        crumbs={[{ label: 'HOME', to: '/' }, { label: 'GALLERY' }]}
      />

      {/* 매거진 그리드 */}
      <section className="relative bg-ink-800 py-20 md:py-28">
        <div
          className="orb left-1/3 top-20 h-[520px] w-[520px] opacity-15"
          style={{ background: 'radial-gradient(circle,#ffb443,transparent 65%)' }}
        />
        <div className="relative mx-auto max-w-[1400px] px-5 md:px-10">
          <div className="grid auto-rows-[190px] grid-cols-2 gap-4 md:auto-rows-[230px] md:grid-cols-4">
            {GALLERY.map((g, i) => (
              <Reveal
                key={g.id}
                delay={(i % 4) * 0.06}
                className={`${SPANS[i] || ''} group relative cursor-pointer overflow-hidden rounded-[16px] border border-white/10`}
              >
                <button
                  type="button"
                  onClick={() => setIndex(i)}
                  data-cursor="view"
                  data-cursor-label="OPEN"
                  className="block h-full w-full text-left"
                  aria-label={`${g.caption} 크게 보기`}
                >
                  <Img
                    src={g.src}
                    seed={g.seed}
                    alt={g.caption}
                    className="h-full w-full"
                    imgClassName="transition-transform duration-[1300ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-110"
                  />
                  <span
                    className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-700 group-hover:opacity-100"
                    style={{
                      background:
                        'linear-gradient(to top, rgba(8,8,10,0.92) 0%, transparent 60%)',
                    }}
                  />
                  <span className="pointer-events-none absolute bottom-4 left-4 right-4 translate-y-3 opacity-0 transition-all duration-700 group-hover:translate-y-0 group-hover:opacity-100">
                    <span className="eyebrow block text-[9px] text-flare-3">{g.place}</span>
                    <span className="mt-1 block text-[13px] text-white">{g.caption}</span>
                  </span>
                </button>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* 전체 후기 */}
      <section id="reviews" className="relative border-t border-white/10 bg-ink-900 py-24 md:py-32">
        <div className="mx-auto max-w-[1400px] px-5 md:px-10">
          <Reveal className="text-center">
            <p className="eyebrow text-flare-1">All Reviews</p>
            <h2 className="mx-auto mt-4 max-w-[640px] font-display text-[clamp(26px,3.6vw,44px)] font-bold leading-snug text-white">
              돌아온 사람들의 기록 전체
            </h2>
            <p className="num mt-4 text-[13px] text-white/40">
              평균 평점 4.98 / 5.0 · 총 {REVIEWS.length}건 표시
            </p>
          </Reveal>

          <div className="mt-14 grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-3">
            {REVIEWS.map((r, i) => (
              <Reveal key={r.id} delay={(i % 3) * 0.07}>
                <ReviewCard r={r} fluid />
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <AnimatePresence>
        {open && (
          <Lightbox
            item={GALLERY[index]}
            onClose={() => setIndex(-1)}
            onPrev={prev}
            onNext={next}
          />
        )}
      </AnimatePresence>
    </>
  )
}
