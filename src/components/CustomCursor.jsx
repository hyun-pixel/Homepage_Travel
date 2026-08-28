import { useEffect, useRef } from 'react'
import { gsap, prefersReducedMotion } from '../lib/scroll'
import { useHasFinePointer } from '../hooks/useIsomorphic'

const HOVER_SELECTOR = 'a, button, [data-cursor], input, textarea, select'

/** 원형 트레일 커서 — 링크/버튼 호버 시 확대 + VIEW 라벨 */
export default function CustomCursor() {
  const fine = useHasFinePointer()
  const dotRef = useRef(null)
  const ringRef = useRef(null)
  const labelRef = useRef(null)

  useEffect(() => {
    if (!fine || prefersReducedMotion()) return

    const dot = dotRef.current
    const ring = ringRef.current
    const label = labelRef.current
    if (!dot || !ring) return

    document.documentElement.classList.add('cursor-active')

    gsap.set([dot, ring], { xPercent: -50, yPercent: -50, opacity: 0 })

    const xRing = gsap.quickTo(ring, 'x', { duration: 0.55, ease: 'power3.out' })
    const yRing = gsap.quickTo(ring, 'y', { duration: 0.55, ease: 'power3.out' })
    const xDot = gsap.quickTo(dot, 'x', { duration: 0.1, ease: 'power3.out' })
    const yDot = gsap.quickTo(dot, 'y', { duration: 0.1, ease: 'power3.out' })

    let visible = false
    const onMove = (e) => {
      if (!visible) {
        visible = true
        gsap.to([dot, ring], { opacity: 1, duration: 0.3 })
      }
      xRing(e.clientX)
      yRing(e.clientY)
      xDot(e.clientX)
      yDot(e.clientY)
    }

    const onOver = (e) => {
      const target = e.target.closest ? e.target.closest(HOVER_SELECTOR) : null
      if (!target) return
      const mode = target.getAttribute('data-cursor') || 'link'
      const big = mode === 'view'
      gsap.to(ring, {
        width: big ? 92 : 62,
        height: big ? 92 : 62,
        backgroundColor: big ? 'rgba(255,107,44,0.18)' : 'rgba(255,255,255,0.09)',
        borderColor: big ? 'rgba(255,107,44,0.9)' : 'rgba(255,255,255,0.7)',
        duration: 0.45,
        ease: 'expo.out',
      })
      gsap.to(dot, { scale: 0, duration: 0.3 })
      if (big && label) {
        label.textContent = target.getAttribute('data-cursor-label') || 'VIEW'
        gsap.to(label, { opacity: 1, duration: 0.3 })
      }
    }

    const onOut = (e) => {
      if (!(e.target.closest && e.target.closest(HOVER_SELECTOR))) return
      gsap.to(ring, {
        width: 34,
        height: 34,
        backgroundColor: 'rgba(255,255,255,0)',
        borderColor: 'rgba(255,255,255,0.45)',
        duration: 0.5,
        ease: 'expo.out',
      })
      gsap.to(dot, { scale: 1, duration: 0.3 })
      if (label) gsap.to(label, { opacity: 0, duration: 0.2 })
    }

    const onLeaveWindow = () => {
      visible = false
      gsap.to([dot, ring], { opacity: 0, duration: 0.25 })
    }

    window.addEventListener('mousemove', onMove, { passive: true })
    document.addEventListener('mouseover', onOver)
    document.addEventListener('mouseout', onOut)
    document.addEventListener('mouseleave', onLeaveWindow)

    return () => {
      document.documentElement.classList.remove('cursor-active')
      window.removeEventListener('mousemove', onMove)
      document.removeEventListener('mouseover', onOver)
      document.removeEventListener('mouseout', onOut)
      document.removeEventListener('mouseleave', onLeaveWindow)
    }
  }, [fine])

  if (!fine) return null

  return (
    <>
      <div ref={dotRef} className="cursor-dot h-[6px] w-[6px] bg-flare" aria-hidden />
      <div
        ref={ringRef}
        className="cursor-ring flex h-[34px] w-[34px] items-center justify-center border border-white/45"
        aria-hidden
      >
        <span
          ref={labelRef}
          className="eyebrow text-[9px] text-white opacity-0"
          style={{ letterSpacing: '0.18em' }}
        />
      </div>
    </>
  )
}
