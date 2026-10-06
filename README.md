# 트립마운트

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

### Windows에서 로컬 미리보기

의존성 설치가 끝난 상태에서는 이 폴더의 `start-preview.cmd`를 더블클릭하세요.
브라우저에서 `http://127.0.0.1:5180`이 열리고, 파일을 수정하면 화면에 자동으로 반영됩니다.
미리보기 실행 중에는 명령 창을 열어 두세요. 종료하려면 명령 창에서 `Ctrl+C`를 누르세요.

이 실행 파일은 미리보기를 이 컴퓨터에서만 접속할 수 있게 설정합니다.
5180 포트가 이미 사용 중이면 다른 주소로 바뀌지 않고 오류를 표시합니다.
이미 실행한 이 프로젝트의 미리보기 창을 이용하거나, 기존 서버를 종료한 뒤 다시 실행하세요.

명령어로 실행할 때는 다음을 사용하세요.

```bash
npm run dev -- --host 127.0.0.1 --port 5180 --strictPort
```

사진은 외부 사이트에서 불러오므로 인터넷 연결이 필요합니다. 히어로의 15초 무음 영상은 로컬 파일을 사용합니다.
상담 신청은 실제 전송 기능이 없는 데모이며, 미리보기를 켜거나 수정해도 GitHub 반영이나 배포는 실행되지 않습니다.

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
| `index.html` | `canonical` / `og:url` / `og:image` / JSON-LD의 `https://flowaxtravel.vercel.app` → 사용자 지정 도메인 연결 시 변경 |
| `public/robots.txt`, `public/sitemap.xml` | 같은 도메인 문자열 |

사용자 지정 도메인 연결 시 아래 명령으로 변경할 위치를 찾을 수 있습니다.

```bash
rg "https://flowaxtravel.vercel.app" index.html public src
```

## 브랜드 에셋

| 파일 | 용도 |
|---|---|
| `public/branding/tripmount-logo.png` | 승인한 투명 배경 원본 |
| `public/branding/tripmount-logo.svg` | 흰 배경에서 표시하는 로고 |
| `public/branding/tripmount-logo-on-dark.svg` | 어두운 배경에서 표시하는 로고 (주황 심볼·흰 글자) |
| `public/favicon.svg` | 브라우저 탭 아이콘 (승인한 산봉우리·여행길 심볼) |
| `public/favicon-32.png` | SVG 미지원 브라우저용 대체 |
| `public/apple-touch-icon.png` | iOS 홈 화면 아이콘 180×180 |
| `public/og-image.png` | 카카오톡·슬랙·X 공유 썸네일 1200×630 |

승인한 원본은 `public/branding/tripmount-logo.png`입니다. 상단·푸터·로딩 화면은 `BrandLogo` 공용 컴포넌트를 사용하며, 어두운 배경에서는 주황색 심볼과 흰색 여행사명을 표시합니다.

로고·아이콘·공유 이미지를 다시 준비하려면 기존 `scripts/generate-assets.mjs`를 실행하세요. 운영 주소는 Vercel의 `https://flowaxtravel.vercel.app`을 사용합니다. 사용자 지정 도메인·이메일·카카오 채널 주소는 확인 후 별도로 교체해야 합니다.

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

`src/data/site.js`의 `SITE.heroVideo`와 `SITE.heroPoster`를 사용합니다. 현재는 Higgsfield로 제작한 15초 비행기 창문·설산 영상과 로컬 포스터가 적용되어 있습니다.

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

## GitHub와 운영 배포

기본 브랜치는 `main`입니다. GitHub의 `main`에 푸시하면 기존 Vercel 프로젝트 `flowaxtravel`이 자동으로 운영 사이트를 빌드하고 배포합니다.

운영 주소: https://flowaxtravel.vercel.app

배포 완료 여부는 해당 커밋의 Vercel 상태가 성공인지 확인한 뒤 운영 주소에서 확인합니다. 로컬 미리보기 실행만으로는 배포되지 않습니다.
