/**
 * 사이트 전역 상수.
 * ⚠️ 아래 회사 정보는 모두 자리표시자(더미)입니다. 실제 값으로 교체하세요.
 */
export const SITE = {
  brand: 'FLOWAX',
  brandFull: 'FLOWAX TRAVEL',
  tagline: '세상의 끝까지, 가장 가벼운 마음으로',

  // 레퍼런스 지정 히어로 배경 영상 (공백은 %20 인코딩)
  heroVideo:
    'https://cdn.sceneai.art/Hero%20Section%20Video/01d1f8de-fec0-4bf5-8b48-9fc2dbc8c6b0.mp4',

  // 상담 채널 — 실제 링크로 교체하세요
  kakaoUrl: 'https://pf.kakao.com/_flowax', // TODO: 실제 카카오톡 채널 주소
  tel: '02-000-0000', // TODO: 실제 대표전화
  email: 'hello@flowax.travel', // TODO: 실제 이메일

  sns: [
    { label: 'Instagram', href: '#' },
    { label: 'YouTube', href: '#' },
    { label: 'Blog', href: '#' },
  ],

  // TODO: 아래 사업자 정보를 실제 값으로 교체하세요
  company: {
    name: '플로왁스트래블 주식회사',
    ceo: '홍길동',
    address: '서울특별시 강남구 테헤란로 000, 00층',
    bizNo: '000-00-00000',
    mailOrderNo: '제2026-서울강남-00000호',
    tourismNo: '제2026-000000호',
  },
}

export const NAV_ITEMS = [
  { label: '소개', to: '/about' },
  { label: '투어', to: '/tours' },
  { label: '갤러리', to: '/gallery' },
  { label: '후기', to: '/gallery#reviews' },
  { label: '문의', to: '/#contact' },
]

export const STATS = [
  { value: 12480, suffix: '명', label: '누적 여행자', desc: '2016년부터 함께 걸었습니다' },
  { value: 48, suffix: '개', label: '운영 코스', desc: '6대륙 트레킹 루트' },
  { value: 98.4, suffix: '%', label: '재참여 의향', decimals: 1, desc: '귀국 후 설문 기준' },
  { value: 26, suffix: '명', label: '전속 가이드', desc: '전원 WFR 자격 보유' },
]
