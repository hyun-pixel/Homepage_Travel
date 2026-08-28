import { useEffect, useState, lazy, Suspense } from 'react'
import { Routes, Route, useLocation } from 'react-router-dom'
import { AnimatePresence } from 'framer-motion'

import Navbar from './components/Navbar'
import Footer from './components/Footer'
import Grain from './components/Grain'
import CustomCursor from './components/CustomCursor'
import ScrollProgress from './components/ScrollProgress'
import FloatingChannels from './components/FloatingChannels'
import Preloader from './components/Preloader'
import PageShell from './components/PageShell'

// 홈은 첫 진입 경로라 즉시 로드하고, 나머지는 라우트 단위로 분할한다.
import Home from './pages/Home'
const Tours = lazy(() => import('./pages/Tours'))
const TourDetail = lazy(() => import('./pages/TourDetail'))
const About = lazy(() => import('./pages/About'))
const Gallery = lazy(() => import('./pages/Gallery'))
const NotFound = lazy(() => import('./pages/NotFound'))

/** 청크 로딩 중 화면 — 전환 마스크 뒤에 깔리므로 배경색만 맞춘다 */
const Loading = () => <div className="min-h-screen bg-ink-800" aria-busy="true" />

import { ReadyContext } from './context/ReadyContext'
import { initSmoothScroll, destroySmoothScroll, scrollToTop, ScrollTrigger } from './lib/scroll'

function AnimatedRoutes() {
  const location = useLocation()

  useEffect(() => {
    scrollToTop(true)
    const t = setTimeout(() => ScrollTrigger.refresh(), 420)
    return () => clearTimeout(t)
  }, [location.pathname])

  return (
    <AnimatePresence mode="wait" initial={false}>
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<PageShell><Home /></PageShell>} />
        <Route
          path="/tours"
          element={<PageShell><Suspense fallback={<Loading />}><Tours /></Suspense></PageShell>}
        />
        <Route
          path="/tours/:slug"
          element={<PageShell><Suspense fallback={<Loading />}><TourDetail /></Suspense></PageShell>}
        />
        <Route
          path="/about"
          element={<PageShell><Suspense fallback={<Loading />}><About /></Suspense></PageShell>}
        />
        <Route
          path="/gallery"
          element={<PageShell><Suspense fallback={<Loading />}><Gallery /></Suspense></PageShell>}
        />
        <Route
          path="*"
          element={<PageShell><Suspense fallback={<Loading />}><NotFound /></Suspense></PageShell>}
        />
      </Routes>
    </AnimatePresence>
  )
}

export default function App() {
  const [ready, setReady] = useState(false)

  useEffect(() => {
    initSmoothScroll()
    // 이미지 로드 이후 트리거 위치 재계산
    const onLoad = () => ScrollTrigger.refresh()
    window.addEventListener('load', onLoad)
    return () => {
      window.removeEventListener('load', onLoad)
      destroySmoothScroll()
    }
  }, [])

  return (
    <ReadyContext.Provider value={ready}>
      <Grain />
      <CustomCursor />
      <ScrollProgress />
      <Preloader onDone={() => setReady(true)} />

      <Navbar ready={ready} />

      <main>
        <AnimatedRoutes />
      </main>

      <Footer />
      <FloatingChannels />
    </ReadyContext.Provider>
  )
}
