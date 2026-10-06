import { useEffect } from 'react'
import { SITE } from '../data/site'

const upsert = (attr, key, content) => {
  if (!content) return
  let el = document.head.querySelector(`meta[${attr}="${key}"]`)
  if (!el) {
    el = document.createElement('meta')
    el.setAttribute(attr, key)
    document.head.appendChild(el)
  }
  el.setAttribute('content', content)
}

const upsertLink = (rel, href) => {
  let el = document.head.querySelector(`link[rel="${rel}"]`)
  if (!el) {
    el = document.createElement('link')
    el.setAttribute('rel', rel)
    document.head.appendChild(el)
  }
  el.setAttribute('href', href)
}

/**
 * 라우트별 title / description / OG 태그 갱신.
 * SPA라 크롤러가 초기 HTML만 읽는 경우 index.html의 기본값이 쓰이고,
 * JS를 실행하는 크롤러와 브라우저 탭·북마크에는 페이지별 값이 반영된다.
 */
export default function Seo({ title, description, image }) {
  useEffect(() => {
    const full = title ? `${title} | ${SITE.brandFull}` : SITE.brandFull
    document.title = full

    upsert('name', 'description', description)
    upsert('property', 'og:title', full)
    upsert('property', 'og:description', description)
    upsert('property', 'og:url', window.location.href)
    upsert('name', 'twitter:title', full)
    upsert('name', 'twitter:description', description)
    const shareImage = image || new URL('/og-image.png?v=tripmount-1', window.location.origin).href
    upsert('property', 'og:image', shareImage)
    upsert('property', 'og:image:alt', image ? full : `${SITE.brandFull} — 어드벤처 트레킹 전문`)
    upsert('name', 'twitter:image', shareImage)
    upsertLink('canonical', window.location.href)
  }, [title, description, image])

  return null
}
