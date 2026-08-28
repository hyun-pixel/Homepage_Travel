import { Link } from 'react-router-dom'
import Img from './Img'
import { DIFFICULTY_LABEL, formatPrice } from '../data/tours'

export function DifficultyStars({ level, className = '' }) {
  return (
    <span className={`num text-[12px] tracking-[0.14em] ${className}`} aria-label={`난이도 ${level}단계`}>
      <span className="text-flare-3">{'★'.repeat(level)}</span>
      <span className="text-white/25">{'☆'.repeat(5 - level)}</span>
    </span>
  )
}

/** 투어 상품 카드 — 호버 시 이미지 줌 + 그라데이션 + 정보 슬라이드업 */
export default function TourCard({ tour, index = 0, size = 'md' }) {
  const tall = size === 'lg'

  return (
    <Link
      to={`/tours/${tour.slug}`}
      data-cursor="view"
      data-cursor-label="VIEW"
      className="group relative block overflow-hidden rounded-[20px] border border-white/10 bg-ink-700"
    >
      <Img
        src={tour.hero}
        seed={tour.seed}
        alt={tour.title}
        className={tall ? 'h-[560px]' : 'h-[420px] md:h-[470px]'}
        imgClassName="scale-100 transition-transform duration-[1200ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.09]"
      />

      {/* 기본 그라데이션 */}
      <div
        className="pointer-events-none absolute inset-0 transition-opacity duration-700"
        style={{
          background:
            'linear-gradient(to top, rgba(8,8,10,0.95) 0%, rgba(8,8,10,0.45) 42%, rgba(8,8,10,0.05) 75%)',
        }}
      />
      {/* 호버 시 브랜드 컬러 오버레이 */}
      <div
        className="pointer-events-none absolute inset-0 opacity-0 mix-blend-overlay transition-opacity duration-700 group-hover:opacity-100"
        style={{
          background:
            'linear-gradient(150deg, rgba(255,180,67,0.45) 0%, rgba(255,107,44,0.35) 45%, rgba(232,52,139,0.5) 100%)',
        }}
      />

      {/* 상단 배지 */}
      <div className="absolute inset-x-0 top-0 flex items-start justify-between p-5">
        <span className="num rounded-full border border-white/25 bg-black/30 px-3 py-1 text-[11px] text-white/85 backdrop-blur-md">
          {String(index + 1).padStart(2, '0')}
        </span>
        <span className="rounded-full border border-white/25 bg-black/30 px-3 py-1 text-[11px] text-white/85 backdrop-blur-md">
          {tour.region}
        </span>
      </div>

      {/* 하단 정보 */}
      <div className="absolute inset-x-0 bottom-0 p-6">
        <p className="eyebrow text-[9px] text-flare-3">{tour.subtitle}</p>

        <h3 className="mt-2 font-display text-[24px] font-bold leading-snug text-white md:text-[27px]">
          {tour.title}
        </h3>

        <div className="mt-3 flex flex-wrap items-center gap-x-3 gap-y-2 text-[12px] text-white/70">
          <span>{tour.country}</span>
          <span className="h-3 w-px bg-white/20" />
          <span className="num">{tour.days}일</span>
          <span className="h-3 w-px bg-white/20" />
          <span>
            {DIFFICULTY_LABEL[tour.difficulty]} <DifficultyStars level={tour.difficulty} />
          </span>
        </div>

        {/* 호버 시 열리는 영역 */}
        <div className="grid grid-rows-[0fr] transition-[grid-template-rows] duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:grid-rows-[1fr]">
          <div className="overflow-hidden">
            <p className="pt-4 text-[13px] leading-relaxed text-white/75 line-clamp-3">
              {tour.summary}
            </p>
          </div>
        </div>

        <div className="mt-5 flex items-end justify-between border-t border-white/15 pt-4">
          <div>
            <p className="text-[10px] text-white/45">1인 기준</p>
            <p className="num text-[19px] font-semibold text-white">{formatPrice(tour.price)}</p>
          </div>
          <span className="flex h-10 w-10 items-center justify-center rounded-full border border-white/30 text-white transition-all duration-500 group-hover:border-transparent group-hover:bg-white group-hover:text-black">
            <svg width="15" height="15" viewBox="0 0 16 16" fill="none" aria-hidden>
              <path
                d="M3 13L13 3M13 3H5.5M13 3V10.5"
                stroke="currentColor"
                strokeWidth="1.4"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </span>
        </div>
      </div>
    </Link>
  )
}
