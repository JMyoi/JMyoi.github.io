import { useCallback, useEffect, useRef, useState, type MouseEvent } from 'react'
import {
  Button,
  ProjectCard,
  SectionLabel,
  StickyNote,
  Tag,
  TimelineEntry,
} from './components/paperdoodle'
import {
  certs,
  chip,
  contact,
  footerWords,
  projects,
  skillGroups,
  timeline,
  type Note,
} from './data/portfolio'
import { prefersReducedMotion, useTypewriter, useWordCycle } from './hooks/usePaper'

const NAME = 'Jay Chen'
const TILT = 1.5 /* site-wide tilt amount, the design's tiltAmount default */
const CERTS_SLUG = 'certifications'

type Flip = 'out' | 'in' | null

/* one bullet of a project's notes; sub-notes nest as a tighter list */
function NoteItem({ note, gap }: { note: Note; gap: string }) {
  if (typeof note === 'string') {
    return <li style={{ marginBottom: gap }}>{note}</li>
  }
  return (
    <li style={{ marginBottom: gap }}>
      {note.label && <strong>{note.label}</strong>}
      {note.label && note.text && ' — '}
      {note.text}
      {note.items && (
        <ul style={{ margin: '6px 0 0', paddingLeft: 24 }}>
          {note.items.map((sub, i) => (
            <NoteItem key={i} note={sub} gap="6px" />
          ))}
        </ul>
      )}
    </li>
  )
}

/* slugs that address a page of their own, rather than a section anchor */
const pageSlugs = new Set<string>([
  CERTS_SLUG,
  ...projects.map((p) => p.slug),
])

function slugFromHash() {
  const h = window.location.hash.replace(/^#/, '')
  return pageSlugs.has(h) ? h : null
}

export default function App() {
  const [slug, setSlug] = useState<string | null>(() =>
    typeof window === 'undefined' ? null : slugFromHash(),
  )
  const [flip, setFlip] = useState<Flip>(null)
  const [hovered, setHovered] = useState<string | null>(null)
  const [emailCopied, setEmailCopied] = useState(false)
  const timers = useRef<number[]>([])

  // mailto: silently does nothing when no mail app is configured,
  // so also copy the address to the clipboard as a fallback.
  const copyEmail = useCallback(() => {
    navigator.clipboard
      ?.writeText(contact.email)
      .then(() => {
        setEmailCopied(true)
        window.setTimeout(() => setEmailCopied(false), 2000)
      })
      .catch(() => {})
  }, [])

  const typedName = useTypewriter(NAME)
  const footerNote = `Currently ${useWordCycle(footerWords)}`

  /* 420ms page flip: the current sheet lifts and turns off its left edge,
     the new one swings in behind it */
  const flipTo = useCallback((next: string | null) => {
    if (prefersReducedMotion()) {
      setSlug(next)
      window.scrollTo(0, 0)
      return
    }
    timers.current.forEach(clearTimeout)
    timers.current = []
    setFlip('out')
    timers.current.push(
      window.setTimeout(() => {
        window.scrollTo(0, 0)
        setSlug(next)
        setFlip('in')
        timers.current.push(window.setTimeout(() => setFlip(null), 30))
      }, 210),
    )
  }, [])

  useEffect(() => () => timers.current.forEach(clearTimeout), [])

  /* keep the page in step with the address bar, so deep links and the back
     button both land on the right sheet */
  useEffect(() => {
    const onHash = () => {
      const next = slugFromHash()
      setSlug((cur) => {
        if (cur === next) return cur
        flipTo(next)
        return cur
      })
    }
    window.addEventListener('hashchange', onHash)
    return () => window.removeEventListener('hashchange', onHash)
  }, [flipTo])

  const openPage = (next: string) => (e: MouseEvent) => {
    e.preventDefault()
    window.history.pushState(null, '', `#${next}`)
    flipTo(next)
  }

  const goHome = (e?: MouseEvent) => {
    if (!slug) return
    e?.preventDefault()
    window.history.pushState(null, '', window.location.pathname)
    flipTo(null)
  }

  const isHome = !slug
  const isCerts = slug === CERTS_SLUG
  const current = projects.find((p) => p.slug === slug) ?? projects[0]

  const flipStyle =
    flip === 'out'
      ? {
          transform: 'rotateY(-14deg) translateX(-2%)',
          opacity: 0,
          boxShadow: '0 24px 48px rgba(31,28,24,.22)',
          transition:
            'transform 210ms var(--ease-pen), opacity 210ms var(--ease-pen)',
        }
      : flip === 'in'
        ? { transform: 'rotateY(10deg)', opacity: 0 }
        : {
            transform: 'none',
            opacity: 1,
            transition:
              'transform 420ms var(--ease-pen), opacity 260ms var(--ease-pen)',
          }

  /* the corner of a card peeling up under the cursor */
  const curlStyle = (s: string) => {
    const up = hovered === s
    const size = up ? 64 : 0
    return {
      position: 'absolute' as const,
      right: 0,
      bottom: 0,
      pointerEvents: 'none' as const,
      transform: up ? 'translateY(-4px)' : 'none',
      width: size,
      height: size,
      clipPath: 'polygon(100% 0,100% 100%,0 100%)',
      background:
        'linear-gradient(315deg,#FDFBF3 0%,#F2E8D2 42%,#D9C9A8 78%,#B79C72 100%)',
      borderBottomRightRadius: 15,
      boxShadow: up ? '-6px -6px 10px rgba(31,28,24,.18)' : 'none',
      transition:
        'width var(--dur) var(--ease-pen),height var(--dur) var(--ease-pen),transform var(--dur) var(--ease-pen),box-shadow var(--dur) var(--ease-pen)',
    }
  }

  return (
    <div
      className="pd-paper pd-grain"
      style={{ minHeight: '100vh', position: 'relative' }}
    >
      <div>
        <nav
          style={{
            position: 'sticky',
            top: 0,
            zIndex: 30,
            display: 'flex',
            alignItems: 'center',
            gap: 'var(--sp-6)',
            padding: '14px var(--page-x)',
            background: 'rgba(253,251,243,0.86)',
            backdropFilter: 'blur(6px)',
            borderBottom: 'var(--stroke-w) solid var(--stroke-default)',
          }}
        >
          <a
            href="#top"
            onClick={goHome}
            style={{
              fontFamily: 'var(--font-display)',
              fontSize: 22,
              color: 'var(--text-heading)',
              textDecoration: 'none',
              transform: 'rotate(-1.2deg)',
              display: 'inline-block',
            }}
          >
            {NAME}
          </a>
          <div
            style={{
              display: 'flex',
              flexWrap: 'wrap',
              gap: 'var(--sp-5)',
              marginLeft: 'auto',
              fontFamily: 'var(--font-label)',
              fontSize: 'var(--size-label)',
              letterSpacing: 'var(--track-label)',
              textTransform: 'uppercase',
            }}
          >
            {['journey', 'projects', 'skills', 'contact'].map((id) => (
              <a
                key={id}
                className="pd-nav-link"
                href={`#${id}`}
                onClick={goHome}
                style={{ color: 'var(--text-muted)', textDecoration: 'none' }}
              >
                {id}
              </a>
            ))}
          </div>
        </nav>

        <div style={{ perspective: 2400 }}>
          <div style={{ transformOrigin: 'left center', backfaceVisibility: 'hidden', ...flipStyle }}>
            {isHome && (
              <div>
                <header
                  id="top"
                  style={{
                    padding: '120px var(--page-x) var(--sp-9)',
                    maxWidth: 'var(--container)',
                    margin: '0 auto',
                  }}
                >
                  <h1
                    className="pd-heading"
                    style={{
                      margin: 0,
                      fontSize: 'var(--size-hero)',
                      lineHeight: 'var(--lh-hero)',
                      minHeight: 88,
                    }}
                  >
                    {typedName}
                    <span
                      aria-hidden="true"
                      style={{
                        display: 'inline-block',
                        width: 5,
                        height: '0.72em',
                        marginLeft: 6,
                        verticalAlign: 'baseline',
                        background: 'var(--pen-red)',
                        transform: 'rotate(8deg)',
                        animation: 'pd-caret 640ms steps(1,end) infinite',
                      }}
                    >
                      &nbsp;
                    </span>
                  </h1>
                  <p
                    style={{
                      margin: '20px 0 0',
                      fontSize: 'var(--size-body-xl)',
                    }}
                  >
                    Software engineering. M.S. Computer Science at the College
                    of Staten Island.
                  </p>
                  <div
                    style={{
                      marginTop: 'var(--sp-6)',
                      display: 'flex',
                      gap: 'var(--sp-4)',
                      flexWrap: 'wrap',
                    }}
                  >
                    <Button variant="marker" size="lg" href="#projects">
                      See the projects →
                    </Button>
                    <Button variant="pen" href="#contact">
                      Get in touch
                    </Button>
                  </div>
                </header>

                <section
                  id="journey"
                  className="pd-ruled"
                  style={{ padding: 'var(--sp-9) var(--page-x)' }}
                >
                  <div style={{ maxWidth: 'var(--container)', margin: '0 auto' }}>
                    <SectionLabel number="01">The journey so far</SectionLabel>
                    <h2
                      className="pd-heading"
                      style={{
                        margin: '20px 0 var(--sp-7)',
                        fontSize: 'var(--size-h2)',
                      }}
                    >
                      School, work, and the overlap between them
                    </h2>
                    {timeline.map((t) => (
                      <TimelineEntry
                        key={t.title + t.period}
                        period={t.period}
                        title={t.title}
                        org={t.org}
                        current={t.current}
                      />
                    ))}
                  </div>
                </section>

                <section
                  id="projects"
                  className="pd-grid"
                  style={{ padding: 'var(--sp-9) var(--page-x)' }}
                >
                  <div style={{ maxWidth: 'var(--container)', margin: '0 auto' }}>
                    <SectionLabel number="02">Things I built</SectionLabel>
                    <h2
                      className="pd-heading"
                      style={{
                        margin: '20px 0 var(--sp-7)',
                        fontSize: 'var(--size-h2)',
                      }}
                    >
                      Some things I've built, and some I'm building
                    </h2>
                    <div
                      style={{
                        display: 'grid',
                        gridTemplateColumns:
                          'repeat(auto-fill,minmax(min(320px,100%),1fr))',
                        gap: 'var(--sp-6)',
                      }}
                    >
                      {projects.map((p) => (
                        <div
                          key={p.slug}
                          style={{
                            position: 'relative',
                            display: 'grid',
                            transform: `rotate(${p.tilt * TILT}deg)`,
                          }}
                          onMouseEnter={() => setHovered(p.slug)}
                          onMouseLeave={() =>
                            setHovered((h) => (h === p.slug ? null : h))
                          }
                        >
                          <ProjectCard
                            title={p.title}
                            blurb={p.blurb}
                            tags={p.tags}
                            href={`#${p.slug}`}
                            onOpen={openPage(p.slug)}
                          />
                          <span aria-hidden="true" style={curlStyle(p.slug)} />
                          {p.pinned && (
                            <span
                              aria-hidden="true"
                              style={{
                                position: 'absolute',
                                top: -10,
                                left: '50%',
                                transform: 'translateX(-50%)',
                                width: 16,
                                height: 16,
                                borderRadius: '50%',
                                background: 'var(--pen-red)',
                                boxShadow: '0 2px 0 rgba(31,28,24,.25)',
                                pointerEvents: 'none',
                              }}
                            />
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                </section>

                <section
                  id="skills"
                  style={{ padding: 'var(--sp-9) var(--page-x)' }}
                >
                  <div style={{ maxWidth: 'var(--container)', margin: '0 auto' }}>
                    <SectionLabel number="03">The toolbox</SectionLabel>
                    <h2
                      className="pd-heading"
                      style={{
                        margin: '20px 0 var(--sp-7)',
                        fontSize: 'var(--size-h2)',
                      }}
                    >
                      What I build with
                    </h2>
                    <div
                      style={{
                        display: 'grid',
                        gridTemplateColumns:
                          'repeat(auto-fit,minmax(min(260px,100%),1fr))',
                        gap: 28,
                        alignItems: 'start',
                      }}
                    >
                      {skillGroups.map((g) => (
                        <div
                          key={g.group}
                          style={{
                            background: 'var(--surface-card)',
                            border: 'var(--stroke-w) solid var(--stroke-default)',
                            borderRadius: 'var(--sketch-radius)',
                            padding: 'var(--sp-5)',
                            boxShadow: 'var(--shadow-lift)',
                          }}
                        >
                          <div className="pd-label" style={{ fontSize: 'var(--size-label-sm)', marginBottom: 14 }}>
                            {g.group}
                          </div>
                          <div
                            style={{
                              display: 'flex',
                              flexWrap: 'wrap',
                              gap: 'var(--sp-2)',
                            }}
                          >
                            {g.items.map((name, i) => {
                              const c = chip(name, i)
                              return (
                                <Tag key={name} color={c.color} tilt={c.tilt}>
                                  {c.name}
                                </Tag>
                              )
                            })}
                          </div>
                        </div>
                      ))}

                      <a
                        href={`#${CERTS_SLUG}`}
                        onClick={openPage(CERTS_SLUG)}
                        style={{
                          display: 'block',
                          textDecoration: 'none',
                          color: 'inherit',
                        }}
                      >
                        <StickyNote tilt={1.4} width="100%">
                          <div className="pd-label" style={{ fontSize: 'var(--size-label-sm)', marginBottom: 'var(--sp-3)' }}>
                            CodePath courses
                          </div>
                          <div
                            style={{
                              display: 'grid',
                              gap: 'var(--sp-2)',
                              fontSize: 'var(--size-body)',
                            }}
                          >
                            {certs.map((c) => (
                              <div
                                key={c.code}
                                style={{
                                  display: 'flex',
                                  gap: 10,
                                  alignItems: 'baseline',
                                }}
                              >
                                <span
                                  style={{
                                    fontFamily: 'var(--font-label)',
                                    fontSize: 'var(--size-label-sm)',
                                    letterSpacing: '0.12em',
                                    color: 'var(--text-muted)',
                                    minWidth: 64,
                                  }}
                                >
                                  {c.code}
                                </span>
                                <span>{c.title}</span>
                              </div>
                            ))}
                          </div>
                          <div
                            className="pd-label"
                            style={{
                              marginTop: 'var(--sp-4)',
                              fontSize: 'var(--size-label-sm)',
                              color: 'var(--text-link)',
                            }}
                          >
                            See the certificates →
                          </div>
                        </StickyNote>
                      </a>
                    </div>
                  </div>
                </section>

                <section
                  id="contact"
                  style={{ padding: 'var(--sp-9) var(--page-x) var(--sp-7)' }}
                >
                  <div style={{ maxWidth: 'var(--container)', margin: '0 auto' }}>
                    <SectionLabel number="04">Say hello</SectionLabel>
                    <h2
                      className="pd-heading"
                      style={{
                        margin: '20px 0 var(--sp-4)',
                        fontSize: 'var(--size-h2)',
                      }}
                    >
                      Contacts
                    </h2>
                    <div
                      style={{
                        display: 'flex',
                        gap: 'var(--sp-4)',
                        flexWrap: 'wrap',
                      }}
                    >
                      <Button
                        variant="marker"
                        size="lg"
                        href={contact.linkedin}
                        external
                      >
                        LinkedIn →
                      </Button>
                      <Button variant="pen" href={contact.github} external>
                        GitHub
                      </Button>
                      <Button
                        variant="pen"
                        href={`mailto:${contact.email}`}
                        onClick={copyEmail}
                      >
                        {emailCopied ? 'Email copied ✓' : 'Email me'}
                      </Button>
                    </div>
                    <p className="pd-label" style={{ margin: '24px 0 0' }}>
                      {contact.email}
                    </p>
                  </div>
                </section>
              </div>
            )}

            {isCerts && (
              <article
                style={{
                  padding: 'var(--sp-8) var(--page-x) var(--sp-7)',
                  maxWidth: 'var(--container)',
                  margin: '0 auto',
                }}
              >
                <Button variant="ghost" onClick={goHome}>
                  ← back to the notebook
                </Button>
                <h1
                  className="pd-heading"
                  style={{
                    margin: '32px 0 0',
                    fontSize: 'var(--size-h1)',
                    lineHeight: 1,
                  }}
                >
                  Certificates
                </h1>
                <p
                  style={{
                    margin: '16px 0 0',
                    maxWidth: '58ch',
                    fontSize: 'var(--size-body-xl)',
                  }}
                >
                  CodePath coursework.
                </p>
                <div
                  style={{
                    marginTop: 'var(--sp-7)',
                    display: 'grid',
                    gridTemplateColumns:
                      'repeat(auto-fill,minmax(min(320px,100%),1fr))',
                    gap: 'var(--sp-6)',
                  }}
                >
                  {certs.map((c) => (
                    <div
                      key={c.code}
                      style={{
                        background: 'var(--surface-card)',
                        border: 'var(--stroke-w) solid var(--stroke-default)',
                        borderRadius: 'var(--sketch-radius)',
                        padding: 18,
                        boxShadow: 'var(--shadow-lift)',
                      }}
                    >
                      <div style={{ position: 'relative', width: '100%', height: 240 }}>
                        {c.image ? (
                          <img
                            src={c.image}
                            alt={`${c.code} — ${c.title} certificate`}
                            style={{
                              width: '100%',
                              height: '100%',
                              objectFit: 'contain',
                            }}
                          />
                        ) : (
                          <div
                            className="pd-label"
                            style={{
                              width: '100%',
                              height: '100%',
                              display: 'grid',
                              placeItems: 'center',
                              textAlign: 'center',
                              padding: 'var(--sp-4)',
                              border: '3px dashed var(--paper-500)',
                              borderRadius: 'var(--sketch-radius)',
                            }}
                          >
                            {c.code} certificate
                          </div>
                        )}
                      </div>
                      <div className="pd-label" style={{ marginTop: 14, fontSize: 'var(--size-label-sm)' }}>
                        {c.code}
                      </div>
                      <div style={{ fontSize: 22 }}>{c.title}</div>
                    </div>
                  ))}
                </div>
                <div style={{ marginTop: 'var(--sp-7)' }}>
                  <Button variant="ghost" onClick={goHome}>
                    ← back to the notebook
                  </Button>
                </div>
              </article>
            )}

            {!isHome && !isCerts && (
              <article
                style={{
                  padding: 'var(--sp-8) var(--page-x) var(--sp-7)',
                  maxWidth: 840,
                  margin: '0 auto',
                }}
              >
                <Button variant="ghost" onClick={goHome}>
                  ← back to the notebook
                </Button>
                <h1
                  className="pd-heading"
                  style={{
                    margin: '32px 0 0',
                    fontSize: 'var(--size-h1)',
                    lineHeight: 1,
                  }}
                >
                  {current.title}
                </h1>
                <p style={{ margin: '16px 0 0', fontSize: 'var(--size-body-xl)' }}>
                  {current.description ?? current.blurb}
                </p>
                <div
                  style={{
                    marginTop: 20,
                    display: 'flex',
                    flexWrap: 'wrap',
                    gap: 'var(--sp-2)',
                  }}
                >
                  {current.stack.map((name, i) => {
                    const c = chip(name, i)
                    return (
                      <Tag key={name} color={c.color} tilt={c.tilt}>
                        {c.name}
                      </Tag>
                    )
                  })}
                </div>
                {current.video && (
                  <figure
                    style={{
                      margin: '32px 0 0',
                      background: 'var(--surface-card)',
                      border: 'var(--stroke-w) solid var(--stroke-default)',
                      borderRadius: 'var(--sketch-radius)',
                      padding: 12,
                      boxShadow: 'var(--shadow-lift)',
                    }}
                  >
                    <iframe
                      src={current.video.src}
                      title={current.video.title}
                      allow="fullscreen; picture-in-picture"
                      allowFullScreen
                      loading="lazy"
                      style={{
                        display: 'block',
                        width: '100%',
                        aspectRatio: '16 / 9',
                        border: 0,
                        borderRadius: 'var(--sketch-radius)',
                      }}
                    />
                  </figure>
                )}
                {current.image && (
                  <figure
                    style={{
                      margin: '32px 0 0',
                      background: 'var(--surface-card)',
                      border: 'var(--stroke-w) solid var(--stroke-default)',
                      borderRadius: 'var(--sketch-radius)',
                      padding: 12,
                      boxShadow: 'var(--shadow-lift)',
                    }}
                  >
                    <img
                      src={current.image.src}
                      alt={current.image.alt}
                      style={{
                        display: 'block',
                        width: '100%',
                        height: 'auto',
                        borderRadius: 'var(--sketch-radius)',
                      }}
                    />
                  </figure>
                )}
                {(current.repo || current.documents) && (
                  <div
                    style={{
                      margin: '40px 0 20px',
                      display: 'flex',
                      gap: 'var(--sp-4)',
                      flexWrap: 'wrap',
                    }}
                  >
                    {current.repo && (
                      <Button
                        variant="marker"
                        size="lg"
                        href={current.repo}
                        external
                      >
                        View source →
                      </Button>
                    )}
                    {current.documents?.map((d) => (
                      <Button
                        key={d.file}
                        variant="pen"
                        href={`${import.meta.env.BASE_URL}docs/${d.file}`}
                        external
                      >
                        {d.label}
                      </Button>
                    ))}
                  </div>
                )}
                {[
                  {
                    heading: current.notesHeading ?? 'How it works',
                    notes: current.notes,
                  },
                  ...(current.moreNotes ?? []),
                ].map((section) => (
                  <section key={section.heading}>
                    <h2
                      className="pd-heading"
                      style={{ margin: '40px 0 20px', fontSize: 'var(--size-h2)' }}
                    >
                      {section.heading}
                    </h2>
                    <ul
                      style={{
                        margin: 0,
                        paddingLeft: 24,
                        maxWidth: '58ch',
                        fontSize: 'var(--size-body-lg)',
                        lineHeight: '32px',
                      }}
                    >
                      {section.notes.map((n, i) => (
                        <NoteItem key={i} note={n} gap="var(--sp-4)" />
                      ))}
                    </ul>
                  </section>
                ))}
                {current.gallery?.map((section) => (
                  <section key={section.heading}>
                    <h2
                      className="pd-heading"
                      style={{ margin: '40px 0 16px', fontSize: 'var(--size-h2)' }}
                    >
                      {section.heading}
                    </h2>
                    <p
                      style={{
                        margin: 0,
                        maxWidth: '58ch',
                        fontSize: 'var(--size-body-lg)',
                        lineHeight: '32px',
                      }}
                    >
                      {section.description}
                    </p>
                    {/* breaks out of the 840px text column so screenshots stay
                        legible; the 24px slack keeps a classic scrollbar from
                        causing horizontal scroll */}
                    <div
                      style={{
                        marginTop: 'var(--sp-6)',
                        width:
                          'max(100%, min(1200px, calc(100vw - 2 * var(--page-x) - 24px)))',
                        marginLeft: '50%',
                        transform: 'translateX(-50%)',
                        display: 'grid',
                        gridTemplateColumns:
                          'repeat(auto-fill,minmax(min(300px,100%),1fr))',
                        gap: 'var(--sp-5)',
                      }}
                    >
                      {section.images.map((img) => (
                        <figure
                          key={img.src}
                          style={{
                            margin: 0,
                            background: 'var(--surface-card)',
                            border: 'var(--stroke-w) solid var(--stroke-default)',
                            borderRadius: 'var(--sketch-radius)',
                            padding: 10,
                            boxShadow: 'var(--shadow-lift)',
                          }}
                        >
                          <a href={img.src} target="_blank" rel="noreferrer">
                            <img
                              src={img.src}
                              alt={img.alt}
                              loading="lazy"
                              style={{
                                display: 'block',
                                width: '100%',
                                height: 'auto',
                                borderRadius: 'var(--sketch-radius)',
                              }}
                            />
                          </a>
                          <figcaption
                            className="pd-label"
                            style={{ marginTop: 10, fontSize: 'var(--size-label-sm)' }}
                          >
                            {img.caption}
                          </figcaption>
                        </figure>
                      ))}
                    </div>
                  </section>
                ))}
                <div
                  style={{
                    marginTop: 'var(--sp-7)',
                    display: 'flex',
                    gap: 'var(--sp-4)',
                    flexWrap: 'wrap',
                  }}
                >
                  <Button variant="ghost" onClick={goHome}>
                    ← back to the notebook
                  </Button>
                </div>
              </article>
            )}
          </div>
        </div>

        <footer
          style={{
            position: 'relative',
            marginTop: 'var(--sp-9)',
            padding: 'var(--sp-8) var(--page-x) var(--sp-6)',
            borderTop: '3px dashed var(--ink-200)',
          }}
        >
          <div
            style={{
              maxWidth: 'var(--container)',
              margin: '0 auto',
              display: 'flex',
              flexWrap: 'wrap',
              gap: 'var(--sp-6)',
              alignItems: 'flex-end',
              justifyContent: 'space-between',
            }}
          >
            <div>
              <div
                className="pd-heading"
                style={{ fontSize: 28, transform: 'rotate(-1.4deg)' }}
              >
                {NAME}
              </div>
              <p
                style={{
                  margin: '8px 0 0',
                  fontSize: 'var(--size-body-lg)',
                  color: 'var(--text-muted)',
                  maxWidth: '42ch',
                }}
              >
                {footerNote}
              </p>
            </div>
            <div
              style={{ display: 'flex', flexWrap: 'wrap', gap: 'var(--sp-5)' }}
            >
              {[
                { label: 'Email', href: `mailto:${contact.email}` },
                { label: 'GitHub', href: contact.github },
                { label: 'LinkedIn', href: contact.linkedin },
              ].map((l) => (
                <a
                  key={l.label}
                  className="pd-label pd-footer-link"
                  href={l.href}
                  style={{
                    color: 'var(--text-body)',
                    textDecoration: 'none',
                    paddingBottom: 3,
                  }}
                >
                  {l.label}
                </a>
              ))}
            </div>
          </div>
          <div
            className="pd-label"
            style={{
              maxWidth: 'var(--container)',
              margin: '32px auto 0',
              fontSize: 'var(--size-label-sm)',
              color: 'var(--text-faint)',
            }}
          >
            © {new Date().getFullYear()} {NAME}
          </div>
        </footer>
      </div>
    </div>
  )
}
