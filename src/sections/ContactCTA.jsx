import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { TOURS } from '../data/tours'
import { SITE } from '../data/site'
import Reveal from '../components/Reveal'
import SplitText from '../components/SplitText'

const EMPTY = { name: '', phone: '', tour: '', date: '', people: 1, memo: '', agree: false }

/** 프론트 전용 유효성 검사 — 백엔드 연동 시 submit 핸들러만 교체하면 됩니다. */
function validate(v) {
  const e = {}
  if (!v.name.trim()) e.name = '이름을 입력해 주세요.'
  else if (v.name.trim().length < 2) e.name = '2자 이상 입력해 주세요.'

  const digits = v.phone.replace(/[^0-9]/g, '')
  if (!digits) e.phone = '연락처를 입력해 주세요.'
  else if (digits.length < 10 || digits.length > 11) e.phone = '올바른 휴대폰 번호를 입력해 주세요.'

  if (!v.tour) e.tour = '희망 코스를 선택해 주세요.'
  if (!v.date) e.date = '출발 희망일을 선택해 주세요.'
  if (!v.agree) e.agree = '개인정보 수집 및 이용에 동의해 주세요.'
  return e
}

const inputBase =
  'w-full rounded-xl border bg-white/[0.04] px-4 py-3.5 text-[14.5px] text-white placeholder-white/30 outline-none transition-all duration-300 focus:bg-white/[0.07]'

function Field({ label, error, children }) {
  return (
    <label className="block">
      <span className="mb-2 block text-[12.5px] font-medium text-white/60">{label}</span>
      {children}
      <AnimatePresence>
        {error && (
          <motion.span
            initial={{ opacity: 0, y: -4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="mt-1.5 block text-[12px] text-flare-2"
          >
            {error}
          </motion.span>
        )}
      </AnimatePresence>
    </label>
  )
}

export default function ContactCTA() {
  const [values, setValues] = useState(EMPTY)
  const [errors, setErrors] = useState({})
  const [status, setStatus] = useState('idle') // idle | sending | done

  const set = (key) => (e) => {
    const val = e.target.type === 'checkbox' ? e.target.checked : e.target.value
    setValues((v) => ({ ...v, [key]: val }))
    setErrors((prev) => (prev[key] ? { ...prev, [key]: undefined } : prev))
  }

  const border = (key) =>
    errors[key] ? 'border-flare-2/70' : 'border-white/12 focus:border-flare-1'

  const onSubmit = (e) => {
    e.preventDefault()
    const next = validate(values)
    setErrors(next)
    if (Object.keys(next).length > 0) return

    setStatus('sending')
    // TODO: 실제 전송 연동 지점 (이메일 API / 폼 백엔드)
    setTimeout(() => setStatus('done'), 1100)
  }

  const reset = () => {
    setValues(EMPTY)
    setErrors({})
    setStatus('idle')
  }

  const today = new Date().toISOString().slice(0, 10)

  return (
    <section id="contact" className="relative overflow-hidden bg-ink-900 py-28 md:py-36">
      {/* 배경 */}
      <div
        className="absolute inset-0 opacity-[0.28]"
        style={{
          backgroundImage:
            'url(https://images.unsplash.com/photo-1454496522488-7a8e488e8606?auto=format&fit=crop&w=1920&q=80)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
        aria-hidden
      />
      <div
        className="absolute inset-0"
        style={{
          background:
            'linear-gradient(to bottom, rgba(8,8,10,0.92) 0%, rgba(8,8,10,0.75) 50%, rgba(8,8,10,0.96) 100%)',
        }}
        aria-hidden
      />
      <div
        className="orb -right-32 top-10 h-[540px] w-[540px] opacity-30"
        style={{ background: 'radial-gradient(circle,#e8348b,transparent 65%)' }}
      />

      <div className="relative mx-auto grid max-w-[1400px] grid-cols-1 gap-14 px-5 md:px-10 lg:grid-cols-[0.9fr_1.1fr] lg:gap-20">
        {/* 좌측 카피 */}
        <div className="lg:pt-6">
          <Reveal>
            <p className="eyebrow text-flare-1">06 — Start Your Route</p>
          </Reveal>
          <SplitText
            as="h2"
            text="지금 상담하면 다음 시즌이 열립니다"
            className="mt-5 block font-display text-[clamp(30px,4.4vw,54px)] font-bold leading-[1.18] text-white"
          />
          <Reveal delay={0.15}>
            <p className="mt-6 max-w-[440px] text-[15px] leading-relaxed text-white/62">
              신청서를 남겨 주시면 담당 플래너가 영업일 기준 1일 내에 연락드립니다.
              아직 코스를 못 정하셨어도 괜찮습니다. 체력과 일정부터 함께 살펴보겠습니다.
            </p>
          </Reveal>

          <Reveal delay={0.25} className="mt-10 flex flex-col gap-4">
            <a
              href={`tel:${SITE.tel.replace(/-/g, '')}`}
              className="group flex items-center justify-between border-b border-white/12 pb-4"
            >
              <span className="text-[13px] text-white/50">대표전화</span>
              <span className="num text-[17px] font-medium text-white transition-colors group-hover:text-flare-1">
                {SITE.tel}
              </span>
            </a>
            <a
              href={`mailto:${SITE.email}`}
              className="group flex items-center justify-between border-b border-white/12 pb-4"
            >
              <span className="text-[13px] text-white/50">이메일</span>
              <span className="text-[15px] text-white transition-colors group-hover:text-flare-1">
                {SITE.email}
              </span>
            </a>
            <div className="flex items-center justify-between border-b border-white/12 pb-4">
              <span className="text-[13px] text-white/50">상담 가능 시간</span>
              <span className="text-[15px] text-white">평일 10:00 – 19:00</span>
            </div>
          </Reveal>
        </div>

        {/* 우측 폼 */}
        <Reveal
          delay={0.1}
          className="relative rounded-[24px] border border-white/12 bg-ink-800/70 p-6 backdrop-blur-2xl md:p-9"
        >
          <AnimatePresence mode="wait">
            {status === 'done' ? (
              <motion.div
                key="done"
                initial={{ opacity: 0, scale: 0.94 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                className="flex min-h-[520px] flex-col items-center justify-center text-center"
              >
                <motion.div
                  initial={{ scale: 0, rotate: -45 }}
                  animate={{ scale: 1, rotate: 0 }}
                  transition={{ delay: 0.12, duration: 0.75, ease: [0.16, 1, 0.3, 1] }}
                  className="flex h-20 w-20 items-center justify-center rounded-full bg-flare"
                >
                  <svg width="30" height="30" viewBox="0 0 24 24" fill="none" aria-hidden>
                    <motion.path
                      d="M5 12.5L10 17.5L19 7.5"
                      stroke="white"
                      strokeWidth="2.2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      initial={{ pathLength: 0 }}
                      animate={{ pathLength: 1 }}
                      transition={{ delay: 0.5, duration: 0.55, ease: 'easeOut' }}
                    />
                  </svg>
                </motion.div>
                <h3 className="mt-8 font-display text-[26px] font-bold text-white">
                  신청이 접수되었습니다
                </h3>
                <p className="mt-3 max-w-[340px] text-[14px] leading-relaxed text-white/60">
                  담당 플래너가 <span className="text-white">{values.name}</span>님께
                  영업일 기준 1일 내로 연락드리겠습니다.
                </p>
                <button
                  type="button"
                  onClick={reset}
                  className="mt-9 rounded-full border border-white/25 px-7 py-3 text-[14px] text-white transition-colors hover:border-white hover:bg-white hover:text-black"
                >
                  새 신청서 작성
                </button>
              </motion.div>
            ) : (
              <motion.form
                key="form"
                onSubmit={onSubmit}
                noValidate
                initial={{ opacity: 1 }}
                exit={{ opacity: 0, y: -12 }}
                className="flex flex-col gap-5"
              >
                <div className="mb-1 flex items-baseline justify-between">
                  <h3 className="font-display text-[21px] font-bold text-white">무료 상담 신청</h3>
                  <span className="eyebrow text-[9px] text-white/35">No Fee</span>
                </div>

                <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                  <Field label="이름" error={errors.name}>
                    <input
                      type="text"
                      value={values.name}
                      onChange={set('name')}
                      placeholder="홍길동"
                      className={`${inputBase} ${border('name')}`}
                    />
                  </Field>
                  <Field label="연락처" error={errors.phone}>
                    <input
                      type="tel"
                      inputMode="numeric"
                      value={values.phone}
                      onChange={set('phone')}
                      placeholder="01012345678"
                      className={`${inputBase} num ${border('phone')}`}
                    />
                  </Field>
                </div>

                <Field label="희망 코스" error={errors.tour}>
                  <select
                    value={values.tour}
                    onChange={set('tour')}
                    className={`${inputBase} ${border('tour')} appearance-none`}
                  >
                    <option value="" className="bg-ink-800">
                      코스를 선택해 주세요
                    </option>
                    {TOURS.map((t) => (
                      <option key={t.slug} value={t.title} className="bg-ink-800">
                        {t.title} · {t.days}일
                      </option>
                    ))}
                    <option value="아직 미정" className="bg-ink-800">
                      아직 정하지 못했어요
                    </option>
                  </select>
                </Field>

                <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                  <Field label="출발 희망일" error={errors.date}>
                    <input
                      type="date"
                      min={today}
                      value={values.date}
                      onChange={set('date')}
                      className={`${inputBase} num ${border('date')} [color-scheme:dark]`}
                    />
                  </Field>
                  <Field label="인원">
                    <div
                      className={`flex items-center justify-between rounded-xl border border-white/12 bg-white/[0.04] px-3 py-2`}
                    >
                      <button
                        type="button"
                        onClick={() =>
                          setValues((v) => ({ ...v, people: Math.max(1, v.people - 1) }))
                        }
                        className="flex h-9 w-9 items-center justify-center rounded-lg border border-white/15 text-white/70 transition-colors hover:border-flare-1 hover:text-white"
                        aria-label="인원 줄이기"
                      >
                        −
                      </button>
                      <span className="num text-[16px] font-medium text-white">
                        {values.people}명
                      </span>
                      <button
                        type="button"
                        onClick={() =>
                          setValues((v) => ({ ...v, people: Math.min(12, v.people + 1) }))
                        }
                        className="flex h-9 w-9 items-center justify-center rounded-lg border border-white/15 text-white/70 transition-colors hover:border-flare-1 hover:text-white"
                        aria-label="인원 늘리기"
                      >
                        +
                      </button>
                    </div>
                  </Field>
                </div>

                <Field label="남기실 말씀 (선택)">
                  <textarea
                    rows={3}
                    value={values.memo}
                    onChange={set('memo')}
                    placeholder="트레킹 경험, 체력 수준, 궁금한 점을 자유롭게 적어주세요."
                    className={`${inputBase} resize-none border-white/12 focus:border-flare-1`}
                  />
                </Field>

                <div>
                  <label className="flex cursor-pointer items-start gap-3">
                    <input
                      type="checkbox"
                      checked={values.agree}
                      onChange={set('agree')}
                      className="mt-[3px] h-4 w-4 shrink-0 accent-[#ff6b2c]"
                    />
                    <span className="text-[12.5px] leading-relaxed text-white/55">
                      상담을 위한 개인정보(이름, 연락처) 수집 및 이용에 동의합니다.
                      수집된 정보는 상담 종료 후 3개월간 보관 후 파기됩니다.
                    </span>
                  </label>
                  <AnimatePresence>
                    {errors.agree && (
                      <motion.span
                        initial={{ opacity: 0, y: -4 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0 }}
                        className="mt-1.5 block pl-7 text-[12px] text-flare-2"
                      >
                        {errors.agree}
                      </motion.span>
                    )}
                  </AnimatePresence>
                </div>

                <button
                  type="submit"
                  disabled={status === 'sending'}
                  className="group relative mt-2 overflow-hidden rounded-full bg-flare px-8 py-4 text-[15px] font-medium text-white shadow-[0_16px_40px_-14px_rgba(232,52,139,0.85)] transition-transform duration-300 hover:scale-[1.02] disabled:opacity-70"
                >
                  <span className="relative">
                    {status === 'sending' ? '전송 중…' : '무료 상담 신청하기'}
                  </span>
                </button>
              </motion.form>
            )}
          </AnimatePresence>
        </Reveal>
      </div>
    </section>
  )
}
