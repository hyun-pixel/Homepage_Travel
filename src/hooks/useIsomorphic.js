import { useEffect, useState } from 'react'

/** CSS 미디어쿼리 구독 */
export function useMediaQuery(query) {
  const [matches, setMatches] = useState(() =>
    typeof window === 'undefined' ? false : window.matchMedia(query).matches
  )

  useEffect(() => {
    const mql = window.matchMedia(query)
    const onChange = (e) => setMatches(e.matches)
    setMatches(mql.matches)
    mql.addEventListener('change', onChange)
    return () => mql.removeEventListener('change', onChange)
  }, [query])

  return matches
}

/** 정밀 포인터(마우스) 환경 여부 — 커스텀 커서 활성 조건 */
export const useHasFinePointer = () =>
  useMediaQuery('(hover: hover) and (pointer: fine)')

/** 데스크톱 여부 */
export const useIsDesktop = () => useMediaQuery('(min-width: 1024px)')
