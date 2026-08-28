import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { SITE } from '../data/site'

/** 우측 하단 플로팅 상담 채널 — 카카오톡 / 전화 */
export default function FloatingChannels() {
  const [visible, setVisible] = useState(false)
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > window.innerHeight * 0.6)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 0, scale: 0.8, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.8, y: 20 }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          className="fixed bottom-6 right-5 z-[68] flex flex-col items-end gap-3 md:bottom-8 md:right-8"
        >
          <AnimatePresence>
            {open && (
              <>
                <motion.a
                  key="kakao"
                  href={SITE.kakaoUrl}
                  target="_blank"
                  rel="noreferrer"
                  initial={{ opacity: 0, y: 14, scale: 0.85 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 14, scale: 0.85 }}
                  transition={{ duration: 0.32, delay: 0.05 }}
                  className="flex items-center gap-3 rounded-full border border-white/12 bg-ink-800/90 py-2 pl-4 pr-2 backdrop-blur-xl"
                >
                  <span className="text-[13px] text-white">카카오톡 상담</span>
                  <span className="flex h-9 w-9 items-center justify-center rounded-full bg-[#FEE500] text-[15px]">
                    💬
                  </span>
                </motion.a>

                <motion.a
                  key="tel"
                  href={`tel:${SITE.tel.replace(/-/g, '')}`}
                  initial={{ opacity: 0, y: 14, scale: 0.85 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 14, scale: 0.85 }}
                  transition={{ duration: 0.32 }}
                  className="flex items-center gap-3 rounded-full border border-white/12 bg-ink-800/90 py-2 pl-4 pr-2 backdrop-blur-xl"
                >
                  <span className="num text-[13px] text-white">{SITE.tel}</span>
                  <span className="flex h-9 w-9 items-center justify-center rounded-full bg-white text-[15px]">
                    📞
                  </span>
                </motion.a>
              </>
            )}
          </AnimatePresence>

          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-label={open ? '상담 채널 닫기' : '상담 채널 열기'}
            className="relative flex h-14 w-14 items-center justify-center rounded-full bg-flare shadow-[0_14px_38px_-10px_rgba(232,52,139,0.9)] transition-transform duration-300 hover:scale-105"
          >
            <span className="absolute inset-0 animate-ping rounded-full bg-flare-1/40" style={{ animationDuration: '2.6s' }} />
            <motion.span
              animate={{ rotate: open ? 135 : 0 }}
              transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
              className="relative text-[24px] font-light leading-none text-white"
            >
              {open ? '+' : '☰'}
            </motion.span>
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
