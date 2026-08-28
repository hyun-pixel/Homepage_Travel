import Lenis from 'lenis'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export const prefersReducedMotion = () =>
  typeof window !== 'undefined' &&
  window.matchMedia('(prefers-reduced-motion: reduce)').matches

let lenis = null

/** Lenis 관성 스크롤 초기화 + GSAP ScrollTrigger 동기화 */
export function initSmoothScroll() {
  if (lenis || prefersReducedMotion()) return lenis

  lenis = new Lenis({
    lerp: 0.085,
    smoothWheel: true,
    wheelMultiplier: 1,
    touchMultiplier: 1.7,
  })

  lenis.on('scroll', ScrollTrigger.update)
  gsap.ticker.add(rafLoop)
  gsap.ticker.lagSmoothing(0)
  return lenis
}

function rafLoop(time) {
  lenis?.raf(time * 1000)
}

export function destroySmoothScroll() {
  if (!lenis) return
  gsap.ticker.remove(rafLoop)
  lenis.destroy()
  lenis = null
}

export const getLenis = () => lenis

export function lockScroll(locked) {
  if (lenis) locked ? lenis.stop() : lenis.start()
  document.documentElement.classList.toggle('lenis-stopped', locked)
  document.body.style.overflow = locked ? 'hidden' : ''
}

export function scrollToTop(immediate = true) {
  if (lenis) lenis.scrollTo(0, { immediate })
  else window.scrollTo(0, 0)
}

export function scrollToId(id, offset = -80) {
  const el = document.getElementById(id)
  if (!el) return
  if (lenis) lenis.scrollTo(el, { offset, duration: 1.4 })
  else el.scrollIntoView({ behavior: 'smooth' })
}

export { gsap, ScrollTrigger }
