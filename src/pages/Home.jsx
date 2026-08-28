import Hero from '../sections/Hero'
import PopularTours from '../sections/PopularTours'
import Stats from '../sections/Stats'
import BrandStory from '../sections/BrandStory'
import FullBleedGallery from '../sections/FullBleedGallery'
import Reviews from '../sections/Reviews'
import ContactCTA from '../sections/ContactCTA'
import SectionDots from '../components/SectionDots'
import Seo from '../components/Seo'

const SECTIONS = [
  { id: 'hero', label: 'HOME' },
  { id: 'tours', label: 'ROUTES' },
  { id: 'stats', label: 'NUMBERS' },
  { id: 'story', label: 'STORY' },
  { id: 'gallery', label: 'ARCHIVE' },
  { id: 'reviews', label: 'VOICES' },
  { id: 'contact', label: 'CONTACT' },
]

export default function Home() {
  return (
    <>
      <Seo
        title="세상의 끝까지, 가장 가벼운 마음으로"
        description="히말라야부터 파타고니아까지, 20·30대를 위한 어드벤처 트레킹 전문 여행사. 항공부터 고소 적응 일정까지 준비는 저희가 합니다."
      />
      <SectionDots sections={SECTIONS} />
      <Hero />
      <PopularTours />
      <Stats />
      <BrandStory />
      <FullBleedGallery />
      <Reviews />
      <ContactCTA />
    </>
  )
}
