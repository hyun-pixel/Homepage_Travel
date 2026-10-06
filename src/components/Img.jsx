import { useLayoutEffect, useState } from 'react'

/**
 * 이미지 로드 실패에 3단계로 대응한다.
 *  1) 원본(Unsplash) → 2) picsum 시드 이미지 → 3) 그라데이션 플레이스홀더
 * 어떤 상황에서도 레이아웃이 깨지지 않도록 보장하기 위한 장치.
 */
export default function Img({
  src,
  seed = 'flowax',
  alt = '',
  className = '',
  imgClassName = '',
  ratio = '',
  loading = 'lazy',
  children,
  ...rest
}) {
  const [stage, setStage] = useState(0)
  const [loaded, setLoaded] = useState(false)

  useLayoutEffect(() => {
    setStage(0)
    setLoaded(false)
  }, [src])

  const current =
    stage === 0 ? src : stage === 1 ? `https://picsum.photos/seed/${seed}/1400/1000` : null

  return (
    <div
      className={`relative overflow-hidden bg-ink-700 ${ratio} ${className}`}
      {...rest}
    >
      <div
        aria-hidden
        className="absolute inset-0 bg-[linear-gradient(135deg,#22222b_0%,#ff6b2c22_50%,#e8348b22_100%)]"
      />
      {current && (
        <img
          src={current}
          alt={alt}
          loading={loading}
          decoding="async"
          onLoad={() => setLoaded(true)}
          onError={() => setStage((s) => s + 1)}
          className={`relative h-full w-full object-cover transition-opacity duration-700 ${
            loaded ? 'opacity-100' : 'opacity-0'
          } ${imgClassName}`}
        />
      )}
      {children}
    </div>
  )
}
