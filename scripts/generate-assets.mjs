/**
 * 승인한 트립마운트 로고에서 표시용 SVG·아이콘·공유 이미지를 준비한다.
 * 원본 PNG의 형태를 유지하며 기존 자산 생성 과정을 재사용한다.
 * 실행: node scripts/generate-assets.mjs
 */
import { mkdir, readFile, writeFile } from 'node:fs/promises'
import { fileURLToPath } from 'node:url'
import { dirname, join } from 'node:path'
import sharp from 'sharp'
import { SITE } from '../src/data/site.js'

const root = join(dirname(fileURLToPath(import.meta.url)), '..')
const pub = join(root, 'public')
const branding = join(pub, 'branding')
await mkdir(branding, { recursive: true })
const master = await readFile(join(branding, 'tripmount-logo.png'))
const dataUrl = `data:image/png;base64,${master.toString('base64')}`
// 승인 원본(2172×724)의 실제 그림 범위에 4px 여백을 유지한다.
const viewBox = '233 205 1696 298'
const image = `<image width="2172" height="724" href="${dataUrl}"/>`
const whiteWordmark = `<defs>
  <clipPath id="wordmark"><rect x="780" y="0" width="1392" height="724"/></clipPath>
  <filter id="white" color-interpolation-filters="sRGB"><feColorMatrix type="matrix" values="0 0 0 0 1  0 0 0 0 1  0 0 0 0 1  0 0 0 1 0"/></filter>
  <clipPath id="symbol-color"><rect x="0" y="0" width="780" height="724"/></clipPath>
</defs><use href="#logo-art" clip-path="url(#symbol-color)"/><use href="#logo-art" clip-path="url(#wordmark)" filter="url(#white)"/>`
const logoSvg = (onDark) => `<svg xmlns="http://www.w3.org/2000/svg" width="1696" height="298" viewBox="${viewBox}"><title>${SITE.brand}</title><defs><image id="logo-art" width="2172" height="724" href="${dataUrl}"/></defs>${onDark ? whiteWordmark : '<use href="#logo-art"/>'}</svg>`
const normal = logoSvg(false)
const onDark = logoSvg(true)
await writeFile(join(branding, 'tripmount-logo.svg'), normal)
await writeFile(join(branding, 'tripmount-logo-on-dark.svg'), onDark)

// 같은 원본의 심볼만 SVG 뷰포트로 표시해 작은 아이콘을 만든다.
const symbolSvg = `<svg xmlns="http://www.w3.org/2000/svg" width="527" height="298" viewBox="233 205 527 298">${image}</svg>`
const symbol = await sharp(Buffer.from(symbolSvg)).resize(256, 145).png().toBuffer()
const symbolUrl = `data:image/png;base64,${symbol.toString('base64')}`
const iconSvg = (size) => `<svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}" viewBox="0 0 64 64"><title>${SITE.brand}</title><rect width="64" height="64" rx="14" fill="#08080A"/><image x="8" y="18.4" width="48" height="27.2" href="${symbolUrl}"/></svg>`
await writeFile(join(pub, 'favicon.svg'), iconSvg(64))
await sharp(Buffer.from(iconSvg(32))).png().toFile(join(pub, 'favicon-32.png'))
await sharp(Buffer.from(iconSvg(180))).png().toFile(join(pub, 'apple-touch-icon.png'))

const SANS = "'Malgun Gothic', 'Segoe UI', Arial, sans-serif"
const ogSvg = `<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630" viewBox="0 0 1200 630">
<defs>
  <radialGradient id="orbA"><stop offset="0" stop-color="#FF6B2C" stop-opacity="0.4"/><stop offset="1" stop-color="#FF6B2C" stop-opacity="0"/></radialGradient>
  <radialGradient id="orbB"><stop offset="0" stop-color="#E8348B" stop-opacity="0.35"/><stop offset="1" stop-color="#E8348B" stop-opacity="0"/></radialGradient>
</defs>
<rect width="1200" height="630" fill="#0B0B0F"/>
<circle cx="130" cy="90" r="380" fill="url(#orbA)"/><circle cx="1090" cy="600" r="420" fill="url(#orbB)"/>
<path d="M0 630 L200 400 L330 520 L470 350 L640 560 L790 430 L920 540 L1060 400 L1200 560 L1200 630 Z" fill="#16161C" opacity="0.9"/>
<path d="M0 630 L250 470 L420 570 L600 440 L760 590 L950 500 L1200 620 L1200 630 Z" fill="#08080A"/>
<text x="96" y="104" font-family="${SANS}" font-size="22" font-weight="600" letter-spacing="5" fill="#FFFFFF" fill-opacity="0.62">ADVENTURE TRAVEL</text>
<g transform="translate(96,204) scale(0.59434)">${onDark}</g>
<text x="96" y="444" font-family="${SANS}" font-size="32" fill="#FFFFFF" fill-opacity="0.9">${SITE.tagline}</text>
<rect x="98" y="494" width="86" height="3" fill="#F36A2F"/>
<text x="98" y="552" font-family="${SANS}" font-size="26" fill="#FFFFFF" fill-opacity="0.72">히말라야 · 파타고니아 · 킬리만자로 트레킹 전문</text>
<text x="1104" y="552" text-anchor="end" font-family="${SANS}" font-size="18" letter-spacing="3" fill="#FFFFFF" fill-opacity="0.4">SINCE 2016</text>
</svg>`
await writeFile(join(pub, 'og-image.svg'), ogSvg)
await sharp(Buffer.from(ogSvg)).png().toFile(join(pub, 'og-image.png'))
console.log('트립마운트 표시용 로고·탭 아이콘·홈 화면 아이콘·공유 이미지 생성 완료')