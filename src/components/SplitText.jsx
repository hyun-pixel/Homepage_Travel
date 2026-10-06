import { useEffect, useMemo, useRef } from 'react'
import { gsap, prefersReducedMotion } from '../lib/scroll'

/**
 * 텍스트를 글자 단위로 쪼개 스크롤 진입 시 순차 리빌.
 * 한글은 글자 폭이 크므로 어절(word) 단위 줄바꿈을 유지한 채 글자만 애니메이션한다.
 */
export default function SplitText({
  text,
  as: Tag = 'span',
  className = '',
  stagger = 0.028,
  duration = 1.05,
  start = 'top 85%',
  delay = 0,
}) {
  const ref = useRef(null)
  const words = useMemo(() => String(text).split(' '), [text])

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const chars = el.querySelectorAll('[data-char]')

    if (prefersReducedMotion()) {
      gsap.set(chars, { yPercent: 0, opacity: 1 })
      return
    }

    const ctx = gsap.context(() => {
      gsap.fromTo(
        chars,
        { yPercent: 115, opacity: 0 },
        {
          yPercent: 0,
          opacity: 1,
          duration,
          delay,
          ease: 'expo.out',
          stagger,
          scrollTrigger: { trigger: el, start, once: true },
        }
      )
    }, el)

    return () => ctx.revert()
  }, [text, stagger, duration, start, delay])

  return (
    <Tag ref={ref} className={className} aria-label={String(text)}>
      {words.map((word, wi) => (
        <span
          key={wi}
          className="inline-block whitespace-nowrap"
          style={{ overflow: 'hidden', paddingBottom: '0.14em', marginBottom: '-0.14em' }}
        >
          {[...word].map((ch, ci) => (
            <span
              key={ci}
              data-char
              aria-hidden
              className="inline-block will-change-transform"
              style={{ opacity: 0 }}
            >
              {ch}
            </span>
          ))}
          {wi < words.length - 1 && <span aria-hidden>&nbsp;</span>}
        </span>
      ))}
    </Tag>
  )
}
