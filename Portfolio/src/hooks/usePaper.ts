import { useCallback, useEffect, useRef, useState } from 'react'

export function prefersReducedMotion() {
  return (
    typeof window !== 'undefined' &&
    !!window.matchMedia &&
    window.matchMedia('(prefers-reduced-motion: reduce)').matches
  )
}

/* Short filtered-noise burst: a pen nib dragging on paper. Browsers keep audio
   suspended until the visitor interacts, so the first strokes are silent and the
   context resumes on the first pointer/key event. */
function useScratch() {
  const ctxRef = useRef<AudioContext | null>(null)

  return useCallback((): void => {
    try {
      const AC =
        window.AudioContext ||
        (window as unknown as { webkitAudioContext?: typeof AudioContext })
          .webkitAudioContext
      if (!AC) return
      if (!ctxRef.current) ctxRef.current = new AC()
      const ctx = ctxRef.current
      if (ctx.state === 'suspended') {
        void ctx.resume()
        return
      }
      const dur = 0.085 + Math.random() * 0.05
      const buf = ctx.createBuffer(
        1,
        Math.ceil(ctx.sampleRate * dur),
        ctx.sampleRate,
      )
      const d = buf.getChannelData(0)
      for (let i = 0; i < d.length; i++) {
        const env = Math.sin((Math.PI * i) / d.length)
        d[i] = (Math.random() * 2 - 1) * env * env
      }
      const src = ctx.createBufferSource()
      src.buffer = buf
      const bp = ctx.createBiquadFilter()
      bp.type = 'bandpass'
      bp.frequency.value = 1700 + Math.random() * 1400
      bp.Q.value = 0.8
      const hp = ctx.createBiquadFilter()
      hp.type = 'highpass'
      hp.frequency.value = 700
      const g = ctx.createGain()
      g.gain.value = 0.07
      src.connect(bp).connect(hp).connect(g).connect(ctx.destination)
      src.start()
    } catch {
      /* audio unavailable */
    }
  }, [])
}

/* Types the name out one character at a time, scratching as it goes. */
export function useTypewriter(text: string, startDelay = 420) {
  /* with reduced motion the name is simply there, never typed */
  const [typed, setTyped] = useState(() =>
    prefersReducedMotion() ? text.length : 0,
  )
  const scratch = useScratch()

  useEffect(() => {
    if (prefersReducedMotion()) return
    let i = 0
    let timer: number
    const step = () => {
      i += 1
      setTyped(i)
      const ch = text[i - 1]
      if (ch && ch !== ' ') scratch()
      if (i < text.length) {
        timer = window.setTimeout(step, 74 + Math.random() * 60)
      }
    }
    timer = window.setTimeout(step, startDelay)
    return () => clearTimeout(timer)
  }, [text, startDelay, scratch])

  return text.slice(0, typed)
}

/* "Currently loading… / building… / debugging… / shipping…" in the footer. */
export function useWordCycle(words: string[], every = 2200) {
  const [i, setI] = useState(0)
  useEffect(() => {
    if (prefersReducedMotion()) return
    const t = window.setInterval(
      () => setI((n) => (n + 1) % words.length),
      every,
    )
    return () => clearInterval(t)
  }, [words.length, every])
  return words[i]
}
