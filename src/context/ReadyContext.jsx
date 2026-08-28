import { createContext, useContext } from 'react'

/** 프리로더 종료 여부 — 히어로 스태거 애니메이션 시작 시점을 맞추는 데 사용 */
export const ReadyContext = createContext(true)

export const useReady = () => useContext(ReadyContext)
