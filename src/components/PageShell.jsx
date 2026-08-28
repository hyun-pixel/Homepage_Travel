import { motion } from 'framer-motion'

const EASE = [0.83, 0, 0.17, 1]

const container = {
  initial: {},
  animate: { transition: { staggerChildren: 0.06, delayChildren: 0.02 } },
  exit: { transition: { staggerChildren: 0.06 } },
}

/** 오렌지 패널이 화면을 덮었다 걷히는 페이지 전환 마스크 */
const panel = {
  initial: { scaleY: 1, originY: 0 },
  animate: {
    scaleY: 0,
    originY: 0,
    transition: { duration: 0.75, ease: EASE },
  },
  exit: {
    scaleY: 1,
    originY: 1,
    transition: { duration: 0.6, ease: EASE, originY: { duration: 0 } },
  },
}

const content = {
  initial: { opacity: 0, y: 24 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.35 } },
  exit: { opacity: 0, y: -16, transition: { duration: 0.35 } },
}

const PANEL_COLORS = [
  'linear-gradient(180deg,#ffb443,#ff6b2c)',
  'linear-gradient(180deg,#ff6b2c,#e8348b)',
  'linear-gradient(180deg,#e8348b,#ff6b2c)',
  'linear-gradient(180deg,#ff6b2c,#ffb443)',
  'linear-gradient(180deg,#0e0e12,#16161c)',
]

export default function PageShell({ children }) {
  return (
    <motion.div variants={container} initial="initial" animate="animate" exit="exit">
      {/* 전환 마스크 */}
      <div className="pointer-events-none fixed inset-0 z-[85] flex" aria-hidden>
        {PANEL_COLORS.map((bg, i) => (
          <motion.span
            key={i}
            variants={panel}
            className="h-full flex-1"
            style={{ background: bg }}
          />
        ))}
      </div>

      <motion.div variants={content}>{children}</motion.div>
    </motion.div>
  )
}
