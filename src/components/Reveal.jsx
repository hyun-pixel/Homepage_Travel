import { useEffect, useRef, useState } from 'react'

/**
 * 스크롤 진입 시 fade-in-up 리빌.
 * GSAP까지 갈 필요 없는 일반 요소에 쓰는 경량 유틸.
 */
export default function Reveal({
  as: Tag = 'div',
  children,
  delay = 0,
  y = 40,
  blur = false,
  once = true,
  threshold = 0.15,
  className = '',
  style = {},
  ...rest
}) {
  const ref = useRef(null)
  const [shown, setShown] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setShown(true)
          if (once) io.unobserve(el)
        } else if (!once) {
          setShown(false)
        }
      },
      { threshold, rootMargin: '0px 0px -8% 0px' }
    )
    io.observe(el)
    return () => io.disconnect()
  }, [once, threshold])

  return (
    <Tag
      ref={ref}
      className={className}
      style={{
        opacity: shown ? 1 : 0,
        transform: shown ? 'translate3d(0,0,0)' : `translate3d(0,${y}px,0)`,
        filter: blur ? (shown ? 'blur(0px)' : 'blur(10px)') : undefined,
        transition: `opacity 1s cubic-bezier(0.16,1,0.3,1) ${delay}s, transform 1.1s cubic-bezier(0.16,1,0.3,1) ${delay}s, filter 1s ease ${delay}s`,
        willChange: 'opacity, transform',
        ...style,
      }}
      {...rest}
    >
      {children}
    </Tag>
  )
}
