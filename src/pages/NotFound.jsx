import { Link } from 'react-router-dom'

export default function NotFound() {
  return (
    <section className="relative flex min-h-[80vh] items-center justify-center overflow-hidden bg-ink-800 px-5 py-32">
      <div
        className="orb left-1/2 top-1/2 h-[520px] w-[520px] -translate-x-1/2 -translate-y-1/2 opacity-25"
        style={{ background: 'radial-gradient(circle,#ff6b2c,transparent 65%)' }}
      />
      <div className="relative text-center">
        <p className="font-display text-[clamp(80px,18vw,200px)] font-black leading-none text-transparent"
           style={{ WebkitTextStroke: '1px rgba(255,255,255,0.16)' }}>
          404
        </p>
        <h1 className="mt-6 font-display text-[clamp(22px,3vw,34px)] font-bold text-white">
          길을 잘못 들어섰습니다
        </h1>
        <p className="mx-auto mt-4 max-w-[380px] text-[14px] leading-relaxed text-white/55">
          요청하신 페이지를 찾을 수 없습니다. 지도를 다시 펴고 출발점으로 돌아가 볼까요.
        </p>
        <Link
          to="/"
          className="mt-9 inline-block rounded-full bg-white px-[26px] py-[12px] text-[15px] font-medium text-black transition-transform duration-300 hover:scale-105"
        >
          홈으로 돌아가기
        </Link>
      </div>
    </section>
  )
}
