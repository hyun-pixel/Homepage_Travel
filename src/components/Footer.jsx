import { Link } from 'react-router-dom'
import BrandLogo from './BrandLogo'
import { SITE } from '../data/site'
import { TOURS } from '../data/tours'

const COLUMNS = [
  {
    title: 'Explore',
    links: [
      { label: '전체 코스', to: '/tours' },
      { label: '브랜드 소개', to: '/about' },
      { label: '갤러리', to: '/gallery' },
      { label: '여행자 후기', to: '/gallery' },
    ],
  },
  {
    title: 'Routes',
    links: TOURS.slice(0, 4).map((t) => ({ label: t.title, to: `/tours/${t.slug}` })),
  },
]

export default function Footer() {
  const { company } = SITE

  return (
    <footer className="relative overflow-hidden border-t border-white/10 bg-ink-900 pt-20">
      <div
        className="orb -bottom-40 left-1/2 h-[520px] w-[520px] -translate-x-1/2 opacity-20"
        style={{ background: 'radial-gradient(circle,#ff6b2c,transparent 65%)' }}
      />

      <div className="relative mx-auto max-w-[1400px] px-5 md:px-10">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-[1.4fr_1fr_1fr_1fr]">
          <div>
            <Link to="/" className="inline-flex min-h-11 items-center focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white">
              <BrandLogo className="h-10 w-auto" />
            </Link>
            <p className="mt-4 max-w-[300px] text-[13.5px] leading-relaxed text-white/50">
              {SITE.tagline}
              <br />
              어드벤처 트레킹 전문 여행사, {SITE.brandFull}.
            </p>
            <div className="mt-7 flex gap-2">
              {SITE.sns.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  className="rounded-full border border-white/15 px-4 py-2 text-[12px] text-white/65 transition-all duration-400 hover:border-transparent hover:bg-flare hover:text-white"
                >
                  {s.label}
                </a>
              ))}
            </div>
          </div>

          {COLUMNS.map((col) => (
            <div key={col.title}>
              <p className="eyebrow text-[9px] text-white/35">{col.title}</p>
              <ul className="mt-5 flex flex-col gap-3">
                {col.links.map((l) => (
                  <li key={l.label + l.to}>
                    <Link
                      to={l.to}
                      className="text-[13.5px] text-white/65 transition-colors hover:text-flare-1"
                    >
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          <div>
            <p className="eyebrow text-[9px] text-white/35">Contact</p>
            <ul className="mt-5 flex flex-col gap-3 text-[13.5px] text-white/65">
              <li>
                <a href={`tel:${SITE.tel.replace(/-/g, '')}`} className="num hover:text-flare-1">
                  {SITE.tel}
                </a>
              </li>
              <li>
                <a href={`mailto:${SITE.email}`} className="hover:text-flare-1">
                  {SITE.email}
                </a>
              </li>
              <li className="text-white/45">평일 10:00 – 19:00</li>
            </ul>
          </div>
        </div>

        {/* 대형 워드마크 */}
        <div className="mt-20 select-none overflow-hidden" aria-hidden>
          <p
            className="whitespace-nowrap text-center font-display font-black leading-none tracking-tight text-transparent"
            style={{
              fontSize: 'clamp(56px, 15.5vw, 260px)',
              WebkitTextStroke: '1px rgba(255,255,255,0.10)',
            }}
          >
            {SITE.brandFull}
          </p>
        </div>

        {/* 사업자 정보 — TODO: 실제 값으로 교체 */}
        <div className="border-t border-white/10 py-8">
          <div className="flex flex-col gap-4 text-[11.5px] leading-relaxed text-white/35 md:flex-row md:items-center md:justify-between">
            <div className="flex flex-wrap gap-x-4 gap-y-1">
              <span>{company.name}</span>
              <span>대표 {company.ceo}</span>
              <span>{company.address}</span>
              <span className="num">사업자등록번호 {company.bizNo}</span>
              <span className="num">통신판매업신고 {company.mailOrderNo}</span>
              <span className="num">관광사업자 등록번호 {company.tourismNo}</span>
            </div>
            <p className="num shrink-0">© 2026 {SITE.brandFull}</p>
          </div>
        </div>
      </div>
    </footer>
  )
}
