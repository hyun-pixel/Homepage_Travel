import { SITE } from '../data/site'

/** 승인한 로고를 어두운 배경에서 표시한다. 비율과 대체 텍스트를 공통으로 유지한다. */
export default function BrandLogo({ className = '' }) {
  return (
    <img
      src={SITE.logoOnDark}
      alt={SITE.brand}
      width={1696}
      height={298}
      className={`block max-w-full ${className}`}
      draggable={false}
    />
  )
}
