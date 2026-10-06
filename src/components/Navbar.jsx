import { useEffect, useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import BrandLogo from './BrandLogo'
import { SITE, NAV_ITEMS } from '../data/site'
import { lockScroll, scrollToId } from '../lib/scroll'

/**
 * 레퍼런스 Step 2 스펙 고정:
 *  - 로고: 승인한 산봉우리·여행길 심볼 + 트립마운트 한글 워드마크
 *  - 메뉴: 정확히 14px / font-normal / white 90%
 *  - 우측 버튼: 투명 배경 + 흰 보더 / 14px regular / hover 시 white 배경 + black 텍스트
 *  - 모바일 햄버거 (데스크톱 숨김)
 *  - 페이지 로드 시 fade-in-up
 */
export default function Navbar({ ready = true }) {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const location = useLocation()
  const navigate = useNavigate()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    setMenuOpen(false)
  }, [location.pathname])

  useEffect(() => {
    lockScroll(menuOpen)
    return () => lockScroll(false)
  }, [menuOpen])

  useEffect(() => {
    const desktop = window.matchMedia('(min-width: 768px)')
    const closeOnDesktop = () => {
      if (desktop.matches) setMenuOpen(false)
    }
    desktop.addEventListener('change', closeOnDesktop)
    return () => desktop.removeEventListener('change', closeOnDesktop)
  }, [])

  useEffect(() => {
    if (!menuOpen) return
    const onKeyDown = (event) => {
      if (event.key === 'Escape') setMenuOpen(false)
    }
    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [menuOpen])

  const go = (to) => (e) => {
    const [path, hash] = to.split('#')
    if (hash && (path === '' || path === '/') && location.pathname === '/') {
      e.preventDefault()
      setMenuOpen(false)
      scrollToId(hash)
    } else if (hash) {
      e.preventDefault()
      setMenuOpen(false)
      navigate(path || '/')
      setTimeout(() => scrollToId(hash), 700)
    }
  }

  return (
    <>
      <header
        className={`fixed inset-x-0 top-0 z-[65] transition-all duration-500 ${
          scrolled
            ? 'border-b border-white/10 bg-ink-900/70 backdrop-blur-xl'
            : 'border-b border-transparent bg-transparent'
        }`}
      >
        <div
          className={`mx-auto flex max-w-[1400px] items-center justify-between px-5 md:px-10 ${
            scrolled ? 'py-4' : 'py-6'
          } transition-all duration-500 ${ready ? 'animate-fade-up' : 'opacity-0'}`}
          style={ready ? { animationDelay: '0.1s' } : undefined}
        >
          {/* 브랜드 로고 */}
          <Link
            to="/"
            className="group relative inline-flex min-h-11 shrink-0 items-center focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white"
          >
            <BrandLogo className="h-7 w-auto md:h-8" />
            <span className="absolute -bottom-1 left-0 h-px w-0 bg-flare transition-all duration-500 group-hover:w-full" />
          </Link>

          {/* 데스크톱 메뉴 — 14px / font-normal / white 90% */}
          <nav className="hidden items-center gap-9 md:flex">
            {NAV_ITEMS.map((item) => (
              <Link
                key={item.label}
                to={item.to}
                onClick={go(item.to)}
                className="group relative text-[14px] font-normal text-white/90 transition-colors duration-300 hover:text-white"
              >
                {item.label}
                <span className="absolute -bottom-[6px] left-0 h-px w-0 bg-flare transition-all duration-400 group-hover:w-full" />
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-3">
            {/* 우측 CTA — 투명 + 흰 보더, hover 시 반전 */}
            <Link
              to="/#contact"
              onClick={go('/#contact')}
              className="hidden rounded-full border border-white bg-transparent px-5 py-2 text-[14px] font-normal text-white transition-all duration-300 hover:bg-white hover:text-black md:inline-block"
            >
              여행 시작하기
            </Link>

            {/* 모바일 햄버거 */}
            <button
              type="button"
              onClick={() => setMenuOpen((v) => !v)}
              className="flex h-10 w-10 flex-col items-center justify-center gap-[5px] md:hidden"
              aria-label={menuOpen ? '메뉴 닫기' : '메뉴 열기'}
              aria-expanded={menuOpen}
              aria-controls="mobile-navigation"
            >
              <span
                className={`h-px w-6 bg-white transition-all duration-400 ${
                  menuOpen ? 'translate-y-[6px] rotate-45' : ''
                }`}
              />
              <span
                className={`h-px w-6 bg-white transition-all duration-300 ${
                  menuOpen ? 'opacity-0' : 'opacity-100'
                }`}
              />
              <span
                className={`h-px w-6 bg-white transition-all duration-400 ${
                  menuOpen ? '-translate-y-[6px] -rotate-45' : ''
                }`}
              />
            </button>
          </div>
        </div>
      </header>

      {/* 모바일 풀스크린 메뉴 */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            id="mobile-navigation"
            className="fixed inset-0 z-[64] flex flex-col justify-center bg-ink-900/97 px-7 backdrop-blur-2xl md:hidden"
            initial={{ opacity: 0, clipPath: 'inset(0 0 100% 0)' }}
            animate={{ opacity: 1, clipPath: 'inset(0 0 0% 0)' }}
            exit={{ opacity: 0, clipPath: 'inset(0 0 100% 0)' }}
            transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
          >
            <div
              className="orb -right-24 top-10 h-[300px] w-[300px] opacity-45"
              style={{ background: 'radial-gradient(circle,#e8348b,transparent 65%)' }}
            />
            <nav className="relative flex flex-col gap-2">
              {NAV_ITEMS.map((item, i) => (
                <motion.div
                  key={item.label}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.15 + i * 0.07, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
                >
                  <Link
                    to={item.to}
                    onClick={go(item.to)}
                    className="flex items-baseline gap-4 py-3 font-display text-[34px] font-bold leading-tight text-white"
                  >
                    <span className="num text-[11px] text-flare-1">0{i + 1}</span>
                    {item.label}
                  </Link>
                </motion.div>
              ))}
            </nav>
            <motion.div
              className="relative mt-10 flex flex-col gap-3"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.55, duration: 0.7 }}
            >
              <Link
                to="/#contact"
                onClick={go('/#contact')}
                className="rounded-full bg-flare px-6 py-3 text-center text-[15px] font-medium text-white"
              >
                무료 상담 신청하기
              </Link>
              <p className="num text-[13px] text-white/45">{SITE.tel}</p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
