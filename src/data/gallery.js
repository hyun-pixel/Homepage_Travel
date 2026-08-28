/** 풀블리드 갤러리 / 갤러리 페이지 이미지 */
const g = (id, w = 1200) =>
  `https://images.unsplash.com/photo-${id}?auto=format&fit=crop&w=${w}&q=80`

export const GALLERY = [
  { id: 'g01', src: g('1464822759023-fed622ff2c3b'), seed: 'g01', caption: '안나푸르나 성역, 새벽 5시 40분', place: 'NEPAL' },
  { id: 'g02', src: g('1506905925346-21bda4d32df4'), seed: 'g02', caption: '고쿄 호수의 정적', place: 'NEPAL' },
  { id: 'g03', src: g('1454496522488-7a8e488e8606'), seed: 'g03', caption: '로부체 밤하늘의 은하수', place: 'KHUMBU' },
  { id: 'g04', src: g('1483728642387-6c3bdd6c93e5'), seed: 'g04', caption: '토레스 델 파이네의 첫 빛', place: 'PATAGONIA' },
  { id: 'g05', src: g('1441974231531-c6227db76b6e'), seed: 'g05', caption: '피오르드랜드 원시림', place: 'NEW ZEALAND' },
  { id: 'g06', src: g('1470071459604-3b5ec3a7fe05'), seed: 'g06', caption: '소르스모르크의 안개', place: 'ICELAND' },
  { id: 'g07', src: g('1426604966848-d7adac402bff'), seed: 'g07', caption: '클린턴 밸리를 내려다보며', place: 'NEW ZEALAND' },
  { id: 'g08', src: g('1501785888041-af3ef285b470'), seed: 'g08', caption: '해가 지는 산장의 저녁', place: 'ALPS' },
  { id: 'g09', src: g('1476514525535-07fb3b4ae5f1'), seed: 'g09', caption: '국경으로 향하는 길', place: 'MONT BLANC' },
  { id: 'g10', src: g('1447752875215-b2761acb3c5d'), seed: 'g10', caption: '우림 구간의 아침', place: 'PERU' },
  { id: 'g11', src: g('1418065460487-3e41a6c84dc5'), seed: 'g11', caption: '능선을 넘는 순간', place: 'TANZANIA' },
  { id: 'g12', src: g('1465101162946-4377e57745c3'), seed: 'g12', caption: '베이스캠프의 마지막 밤', place: 'HIMALAYA' },
]

/** 홈 풀블리드 스트립 — 두 줄로 나눠 반대 방향으로 흐릅니다 */
export const STRIP_A = GALLERY.slice(0, 6)
export const STRIP_B = GALLERY.slice(6, 12)
