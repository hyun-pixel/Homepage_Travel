/**
 * 브랜드 래스터 에셋 생성기 (1회성).
 *   node scripts/generate-assets.mjs
 * 결과물: public/og-image.png, public/apple-touch-icon.png, public/favicon-32.png
 * sharp는 이 스크립트에서만 쓰이므로, 에셋을 다시 만들 일이 없다면 제거해도 됩니다.
 */
import { mkdir, writeFile } from 'node:fs/promises'
import { fileURLToPath } from 'node:url'
import { dirname, join } from 'node:path'
import sharp from 'sharp'

const root = join(dirname(fileURLToPath(import.meta.url)), '..')
const pub = join(root, 'public')

const SERIF = "Georgia, 'Times New Roman', 'Noto Serif KR', serif"
const SANS = "'Malgun Gothic', 'Segoe UI', Arial, sans-serif"

const ogSvg = `<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630" viewBox="0 0 1200 630">
  <defs>
    <linearGradient id="flare" x1="0" y1="630" x2="1200" y2="0" gradientUnits="userSpaceOnUse">
      <stop offset="0" stop-color="#E8348B"/>
      <stop offset="0.5" stop-color="#FF6B2C"/>
      <stop offset="1" stop-color="#FFB443"/>
    </linearGradient>
    <radialGradient id="orbA" cx="0.5" cy="0.5" r="0.5">
      <stop offset="0" stop-color="#FF6B2C" stop-opacity="0.55"/>
      <stop offset="1" stop-color="#FF6B2C" stop-opacity="0"/>
    </radialGradient>
    <radialGradient id="orbB" cx="0.5" cy="0.5" r="0.5">
      <stop offset="0" stop-color="#E8348B" stop-opacity="0.5"/>
      <stop offset="1" stop-color="#E8348B" stop-opacity="0"/>
    </radialGradient>
  </defs>

  <rect width="1200" height="630" fill="#0B0B0F"/>
  <circle cx="130" cy="90" r="380" fill="url(#orbA)"/>
  <circle cx="1090" cy="600" r="420" fill="url(#orbB)"/>

  <!-- 산 실루엣 -->
  <path d="M0 630 L200 400 L330 520 L470 350 L640 560 L790 430 L920 540 L1060 400 L1200 560 L1200 630 Z"
        fill="#16161C" opacity="0.9"/>
  <path d="M0 630 L250 470 L420 570 L600 440 L760 590 L950 500 L1200 620 L1200 630 Z"
        fill="#08080A"/>

  <!-- 마크 -->
  <g transform="translate(96,86)">
    <rect width="72" height="72" rx="16" fill="#08080A" stroke="#FFFFFF" stroke-opacity="0.14"/>
    <g transform="translate(4,4) scale(0.9375)">
      <path d="M14 46 L26 27 L36 41 L42 33 L54 46 Z" fill="url(#flare)" opacity="0.35"/>
      <path d="M10 46 L24 22 L33 35 L38 28 L50 46 Z" fill="url(#flare)"/>
      <path d="M24 22 L19.5 30 L24 28.5 L28 30.5 L33 35 Z" fill="#08080A" opacity="0.55"/>
    </g>
  </g>

  <text x="192" y="136" font-family="${SANS}" font-size="21" font-weight="600"
        letter-spacing="7" fill="#FFFFFF" fill-opacity="0.62">ADVENTURE TRAVEL</text>

  <text x="96" y="352" font-family="${SERIF}" font-size="128" font-weight="700"
        letter-spacing="-2" fill="url(#flare)">FLOWAX</text>
  <text x="96" y="452" font-family="${SERIF}" font-size="72" font-weight="400"
        letter-spacing="14" fill="#FFFFFF">TRAVEL</text>

  <rect x="98" y="500" width="86" height="3" fill="url(#flare)"/>
  <text x="98" y="552" font-family="${SANS}" font-size="27" fill="#FFFFFF" fill-opacity="0.72">
    히말라야 · 파타고니아 · 킬리만자로 트레킹 전문
  </text>

  <text x="1104" y="552" text-anchor="end" font-family="${SANS}" font-size="20"
        letter-spacing="4" fill="#FFFFFF" fill-opacity="0.4">SINCE 2016</text>
</svg>`

const iconSvg = (size) => `<svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}" viewBox="0 0 64 64">
  <defs>
    <linearGradient id="flare" x1="0" y1="64" x2="64" y2="0" gradientUnits="userSpaceOnUse">
      <stop offset="0" stop-color="#E8348B"/><stop offset="0.55" stop-color="#FF6B2C"/><stop offset="1" stop-color="#FFB443"/>
    </linearGradient>
  </defs>
  <rect width="64" height="64" rx="14" fill="#08080A"/>
  <path d="M14 46 L26 27 L36 41 L42 33 L54 46 Z" fill="url(#flare)" opacity="0.35"/>
  <path d="M10 46 L24 22 L33 35 L38 28 L50 46 Z" fill="url(#flare)"/>
  <path d="M24 22 L19.5 30 L24 28.5 L28 30.5 L33 35 Z" fill="#08080A" opacity="0.55"/>
  <rect x="10" y="46" width="44" height="2.5" rx="1.25" fill="url(#flare)"/>
</svg>`

await mkdir(pub, { recursive: true })

await sharp(Buffer.from(ogSvg)).png({ quality: 92 }).toFile(join(pub, 'og-image.png'))
await sharp(Buffer.from(iconSvg(180))).png().toFile(join(pub, 'apple-touch-icon.png'))
await sharp(Buffer.from(iconSvg(32))).png().toFile(join(pub, 'favicon-32.png'))

await writeFile(join(pub, 'og-image.svg'), ogSvg, 'utf8')

console.log('생성 완료: og-image.png / apple-touch-icon.png / favicon-32.png / og-image.svg')
