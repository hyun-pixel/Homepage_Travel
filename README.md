# FLOWAX TRAVEL

어드벤처 · 트레킹 전문 여행사 웹사이트. React + Vite + Tailwind CSS v4.
기획 근거는 [PRD.md](PRD.md)를 참고하세요.

## 실행

```bash
npm install
```

```bash
npm run dev
```

```bash
npm run build
```

빌드 결과물은 `dist/`에 생성됩니다. 정적 호스팅(Vercel, Netlify, S3 등)에 그대로 올리면 됩니다.

> SPA 라우팅을 쓰므로, 배포 시 **모든 경로를 `index.html`로 폴백**하도록 설정해야 `/tours/annapurna-base-camp` 같은 주소를 직접 열었을 때 404가 나지 않습니다.
> Netlify: `_redirects`에 `/* /index.html 200` / Vercel: `vercel.json`의 rewrites 사용.

## 폴더 구조

```
src/
├─ data/          교체 대상 콘텐츠 (사이트 정보, 투어, 후기, 갤러리)
├─ lib/scroll.js  Lenis + GSAP ScrollTrigger 초기화
├─ hooks/         미디어쿼리 훅
├─ components/    공용 UI (내비, 푸터, 커서, 카드, 전환 마스크 등)
├─ sections/      홈 화면 섹션 7종
└─ pages/         라우트별 페이지 5종 + 404
```

## 라우트

| 경로 | 페이지 |
|---|---|
| `/` | 홈 (히어로 + 7개 섹션) |
| `/tours` | 투어 목록 (지역·난이도 필터, 정렬) |
| `/tours/:slug` | 투어 상세 |
| `/about` | 브랜드 소개 |
| `/gallery` | 갤러리 + 전체 후기 |

## 교체해야 할 자리표시자

전부 `TODO` 주석으로 표시해 두었습니다.

| 위치 | 내용 |
|---|---|
| `src/data/site.js` → `SITE.kakaoUrl` | 카카오톡 채널 주소 |
| `src/data/site.js` → `SITE.tel`, `SITE.email` | 대표전화, 이메일 |
| `src/data/site.js` → `SITE.company` | 상호, 대표자, 주소, 사업자등록번호, 통신판매업신고, 관광사업자 등록번호 |
| `src/data/site.js` → `SITE.sns` | SNS 링크 (현재 `#`) |
| `src/sections/ContactCTA.jsx` → `onSubmit` | 상담 신청 전송 연동 지점 (현재는 1.1초 후 완료 처리하는 프론트 데모) |
| `index.html` | `canonical` / `og:url` / `og:image` / JSON-LD의 `https://flowax.travel` → 실제 도메인 |
| `public/robots.txt`, `public/sitemap.xml` | 같은 도메인 문자열 |

도메인은 아래 명령으로 한 번에 바꿀 수 있습니다.

```bash
grep -rl "https://flowax.travel" index.html public src
```

## 브랜드 에셋

| 파일 | 용도 |
|---|---|
| `public/favicon.svg` | 브라우저 탭 아이콘 (벡터, 기본) |
| `public/favicon-32.png` | SVG 미지원 브라우저용 대체 |
| `public/apple-touch-icon.png` | iOS 홈 화면 아이콘 180×180 |
| `public/og-image.png` | 카카오톡·슬랙·X 공유 썸네일 1200×630 |

디자인을 바꾸려면 `scripts/generate-assets.mjs`의 SVG를 수정하고 다시 실행하세요.

```bash
node scripts/generate-assets.mjs
```

> `sharp`는 이 스크립트에서만 쓰는 devDependency입니다. 에셋을 다시 만들 일이 없으면 제거해도 빌드에 영향이 없습니다.

### 이미지 교체

현재 모든 사진은 Unsplash CDN을 씁니다. 자사 사진으로 바꾸려면
`public/images/`에 파일을 넣고 `src/data/tours.js`, `src/data/gallery.js`,
`src/pages/About.jsx`의 경로를 `/images/파일명.jpg` 형태로 바꾸면 됩니다.

`<Img>` 컴포넌트가 로드 실패를 3단계로 처리하므로(원본 → picsum 시드 → 그라데이션),
경로를 잘못 적어도 레이아웃이 깨지지 않습니다.

### 히어로 배경 영상

`src/data/site.js`의 `SITE.heroVideo`. 레퍼런스에서 지정한 URL을 그대로 사용 중입니다.

## 구현된 연출

- 진입 로딩 인트로 (0→100 카운터 + 좌우 커튼 오픈)
- 커스텀 마우스 커서 (링크 호버 시 확대 + `VIEW` 라벨, 터치 기기 자동 비활성)
- 상단 스크롤 진행 바 + 우측 섹션 도트 내비게이션
- 페이지 전환 마스크 (오렌지 패널 5분할 스위프)
- Lenis 관성 스무스 스크롤, GSAP ScrollTrigger 패럴랙스
- 문자 단위 텍스트 리빌(SplitText), 숫자 카운터 롤업
- 이미지 마퀴 2열 역방향 스크롤, 카드 호버 줌 + 그라데이션 오버레이
- 전역 필름 그레인 오버레이

`prefers-reduced-motion: reduce` 환경에서는 위 연출이 자동으로 비활성화됩니다.

## SEO

- `index.html`에 기본 메타 · OG · 트위터 카드 · `TravelAgency` JSON-LD 구조화 데이터
- `src/components/Seo.jsx`가 라우트별 `title` / `description` / `og:image` / `canonical`을 갱신 (투어 상세는 코스별 대표 이미지 사용)
- `public/robots.txt`, `public/sitemap.xml` (12개 URL)

> SPA라 JS를 실행하지 않는 크롤러는 `index.html`의 기본값만 읽습니다.
> 코스별 검색 노출이 중요해지면 그때 프리렌더링(vite-plugin-prerender) 또는 Next.js 이전을 검토하세요.

## 성능

라우트 단위 코드 스플리팅 + 벤더 청크 분리가 적용되어 있습니다.

| 청크 | gzip |
|---|---|
| react (react/dom/router) | 53 kB |
| motion (framer-motion) | 38 kB |
| gsap (gsap/lenis) | 33 kB |
| index (공통 + 홈) | 43 kB |
| 서브페이지 각각 | 0.8 ~ 3.6 kB |

홈 외 페이지는 방문할 때만 해당 청크를 내려받습니다.
