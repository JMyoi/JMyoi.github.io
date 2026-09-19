/* Paperdoodle components, ported from the Claude Design system bundle.
   Every value comes from a token in src/styles/paperdoodle.css. */
import {
  useState,
  type CSSProperties,
  type MouseEvent,
  type ReactNode,
} from 'react'

/* --- Button -------------------------------------------------------------- */

const buttonBase: CSSProperties = {
  fontFamily: 'var(--font-label)',
  textTransform: 'uppercase',
  letterSpacing: 'var(--track-label)',
  display: 'inline-flex',
  alignItems: 'center',
  gap: 'var(--sp-2)',
  cursor: 'pointer',
  background: 'var(--surface-card)',
  color: 'var(--text-heading)',
  border: 'var(--stroke-w) solid var(--stroke-default)',
  borderRadius: 'var(--sketch-radius-tight)',
  boxShadow: 'var(--shadow-lift)',
  transition:
    'transform var(--dur-fast) var(--ease-pen), box-shadow var(--dur-fast) var(--ease-pen), background var(--dur-fast) linear',
  textDecoration: 'none',
  lineHeight: 1,
}

const buttonSizes: Record<string, CSSProperties> = {
  sm: { padding: '8px 14px', fontSize: 'var(--size-label-sm)' },
  md: { padding: '12px 22px', fontSize: 'var(--size-label)' },
  lg: { padding: '16px 30px', fontSize: 'var(--size-label-lg)' },
}

const buttonVariants: Record<string, CSSProperties> = {
  marker: {
    borderWidth: 'var(--stroke-w-bold)',
    borderColor: 'var(--stroke-strong)',
    background: 'var(--highlight)',
  },
  pen: {},
  ghost: {
    background: 'transparent',
    boxShadow: 'none',
    borderStyle: 'dashed',
    borderColor: 'var(--stroke-soft)',
    color: 'var(--text-muted)',
  },
}

type ButtonProps = {
  children: ReactNode
  variant?: 'pen' | 'marker' | 'ghost'
  size?: 'sm' | 'md' | 'lg'
  href?: string
  external?: boolean
  disabled?: boolean
  tilt?: boolean
  onClick?: (e: MouseEvent) => void
  style?: CSSProperties
}

export function Button({
  children,
  variant = 'pen',
  size = 'md',
  href,
  external = false,
  disabled = false,
  tilt = true,
  onClick,
  style,
}: ButtonProps) {
  const [hover, setHover] = useState(false)
  const [down, setDown] = useState(false)

  const s: CSSProperties = {
    ...buttonBase,
    ...buttonSizes[size],
    ...buttonVariants[variant],
    transform: `rotate(${tilt ? 'var(--tilt-b)' : '0deg'}) translate(${
      down ? '2px,2px' : hover ? '-1px,-1px' : '0,0'
    })`,
    boxShadow: down
      ? 'var(--shadow-press)'
      : variant === 'ghost'
        ? 'none'
        : hover
          ? 'var(--shadow-lift-lg)'
          : 'var(--shadow-lift)',
    opacity: disabled ? 0.45 : 1,
    pointerEvents: disabled ? 'none' : 'auto',
    borderRadius: hover
      ? 'var(--sketch-radius-alt)'
      : 'var(--sketch-radius-tight)',
    ...style,
  }

  const handlers = {
    style: s,
    onClick,
    onMouseEnter: () => setHover(true),
    onMouseLeave: () => {
      setHover(false)
      setDown(false)
    },
    onMouseDown: () => setDown(true),
    onMouseUp: () => setDown(false),
  }

  if (href) {
    return (
      <a
        href={href}
        {...(external
          ? { target: '_blank', rel: 'noreferrer noopener' }
          : null)}
        {...handlers}
      >
        {children}
      </a>
    )
  }
  return (
    <button type="button" disabled={disabled} {...handlers}>
      {children}
    </button>
  )
}

/* --- SectionLabel -------------------------------------------------------- */

export function SectionLabel({
  children,
  number,
  color = 'var(--text-muted)',
  style,
}: {
  children: ReactNode
  number?: string
  color?: string
  style?: CSSProperties
}) {
  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: 'var(--sp-3)',
        ...style,
      }}
    >
      {number != null && (
        <span
          style={{
            fontFamily: 'var(--font-label)',
            fontSize: 'var(--size-label-sm)',
            color: 'var(--annotate)',
            border: 'var(--stroke-w-hair) solid var(--annotate)',
            borderRadius: '50% 46% 52% 48%',
            width: 30,
            height: 30,
            flex: 'none',
            display: 'grid',
            placeItems: 'center',
            transform: 'rotate(-4deg)',
          }}
        >
          {number}
        </span>
      )}
      <span
        style={{
          fontFamily: 'var(--font-label)',
          fontSize: 'var(--size-label)',
          letterSpacing: 'var(--track-label)',
          textTransform: 'uppercase',
          color,
        }}
      >
        {children}
      </span>
      <span
        aria-hidden="true"
        style={{
          flex: 1,
          height: 2,
          background: 'var(--stroke-soft)',
          borderRadius: 'var(--radius-pill)',
          opacity: 0.7,
          transform: 'rotate(-.2deg)',
        }}
      />
    </div>
  )
}

/* --- Tag ----------------------------------------------------------------- */

const tagInks: Record<string, string> = {
  yellow: 'var(--hl-yellow)',
  mint: 'var(--hl-mint)',
  pink: 'var(--hl-pink)',
  paper: 'var(--surface-card)',
  kraft: 'var(--surface-kraft)',
}

export type TagColor = keyof typeof tagInks

export function Tag({
  children,
  color = 'paper',
  outlined = true,
  tilt = 0,
  style,
}: {
  children: ReactNode
  color?: string
  outlined?: boolean
  tilt?: number
  style?: CSSProperties
}) {
  return (
    <span
      style={{
        fontFamily: 'var(--font-label)',
        fontSize: 'var(--size-label-sm)',
        letterSpacing: 'var(--track-label)',
        textTransform: 'uppercase',
        color: 'var(--text-body)',
        background: tagInks[color] || color,
        padding: '5px 12px 6px',
        display: 'inline-block',
        border: outlined
          ? 'var(--stroke-w-hair) solid var(--stroke-default)'
          : 'none',
        borderRadius: 'var(--sketch-radius-tight)',
        transform: `rotate(${tilt}deg)`,
        lineHeight: 1,
        ...style,
      }}
    >
      {children}
    </span>
  )
}

/* --- StickyNote ---------------------------------------------------------- */

export function StickyNote({
  children,
  color = 'var(--surface-sticky)',
  tilt = -1.6,
  tape = true,
  width = 260,
  style,
}: {
  children: ReactNode
  color?: string
  tilt?: number
  tape?: boolean
  width?: number | string
  style?: CSSProperties
}) {
  return (
    <div
      style={{
        position: 'relative',
        width,
        background: color,
        padding: 'var(--sp-5)',
        fontFamily: 'var(--font-body)',
        fontSize: 'var(--size-body)',
        color: 'var(--text-body)',
        boxShadow: 'var(--shadow-lift-lg)',
        transform: `rotate(${tilt}deg)`,
        borderRadius: '2px 2px 14px 3px',
        ...style,
      }}
    >
      {tape && (
        <span
          aria-hidden="true"
          style={{
            position: 'absolute',
            top: -13,
            left: '50%',
            width: 96,
            height: 26,
            transform: 'translateX(-50%) rotate(-3deg)',
            background: 'rgba(253,251,243,.68)',
            boxShadow: 'inset 0 0 0 1px rgba(31,28,24,.10)',
          }}
        />
      )}
      {children}
    </div>
  )
}

/* --- TimelineEntry ------------------------------------------------------- */

export function TimelineEntry({
  title,
  org,
  period,
  children,
  current = false,
  tags,
  style,
}: {
  title: string
  org?: string
  period: string
  children?: ReactNode
  current?: boolean
  tags?: string[]
  style?: CSSProperties
}) {
  const [hover, setHover] = useState(false)
  return (
    <div
      style={{
        position: 'relative',
        paddingLeft: 56,
        paddingBottom: 'var(--sp-7)',
        ...style,
      }}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
    >
      <span
        aria-hidden="true"
        style={{
          position: 'absolute',
          left: 15,
          top: 8,
          bottom: -8,
          width: 0,
          borderLeft: '3px dashed var(--stroke-soft)',
          transform: 'rotate(.3deg)',
        }}
      />
      <span
        aria-hidden="true"
        style={{
          position: 'absolute',
          left: 2,
          top: 6,
          width: 30,
          height: 30,
          borderRadius: '52% 48% 46% 54%/48% 54% 46% 52%',
          border: `var(--stroke-w) solid ${
            current ? 'var(--pen-red)' : 'var(--stroke-default)'
          }`,
          background: current ? 'var(--pen-red)' : 'var(--surface-card)',
          transform: `rotate(${hover ? '-8deg' : '-3deg'}) scale(${
            hover ? 1.12 : 1
          })`,
          transition: 'transform var(--dur) var(--ease-pen)',
        }}
      />
      <div
        style={{
          fontFamily: 'var(--font-label)',
          fontSize: 'var(--size-label)',
          letterSpacing: 'var(--track-label)',
          textTransform: 'uppercase',
          /* past dates sit at pencil grey — faint ink was hard to read */
          color: current ? 'var(--annotate)' : 'var(--text-muted)',
        }}
      >
        {period}
        {current ? ' · now' : ''}
      </div>
      <h3
        style={{
          margin: '8px 0 4px',
          fontFamily: 'var(--font-display)',
          fontWeight: 400,
          fontSize: 'var(--size-h3)',
          color: 'var(--text-heading)',
          lineHeight: 'var(--lh-heading)',
        }}
      >
        {title}
      </h3>
      {org && (
        <div
          style={{
            fontFamily: 'var(--font-body)',
            fontSize: 'var(--size-body-xl)',
            color: 'var(--text-muted)',
          }}
        >
          {org}
        </div>
      )}
      {children && (
        <div
          style={{
            marginTop: 'var(--sp-3)',
            fontFamily: 'var(--font-body)',
            fontSize: 'var(--size-body)',
            lineHeight: 'var(--lh-body)',
            maxWidth: '58ch',
          }}
        >
          {children}
        </div>
      )}
      {tags && tags.length > 0 && (
        <div
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            gap: 'var(--sp-2)',
            marginTop: 'var(--sp-3)',
          }}
        >
          {tags.map((t) => (
            <span
              key={t}
              style={{
                fontFamily: 'var(--font-label)',
                fontSize: 'var(--size-label-sm)',
                letterSpacing: 'var(--track-label)',
                textTransform: 'uppercase',
                color: 'var(--text-muted)',
                borderBottom: '2px solid var(--hl-mint)',
              }}
            >
              {t}
            </span>
          ))}
        </div>
      )}
    </div>
  )
}

/* --- ProjectCard --------------------------------------------------------- */

export function ProjectCard({
  title,
  blurb,
  tags = [],
  year,
  href,
  onOpen,
  tilt = 0,
  pinned = false,
  style,
}: {
  title: string
  blurb: string
  tags?: string[]
  year?: string
  href?: string
  onOpen?: (e: MouseEvent) => void
  tilt?: number
  pinned?: boolean
  style?: CSSProperties
}) {
  const [hover, setHover] = useState(false)
  return (
    <a
      href={href}
      onClick={onOpen}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      style={{
        position: 'relative',
        display: 'block',
        textDecoration: 'none',
        color: 'var(--text-body)',
        background: 'var(--surface-card)',
        padding: 'var(--sp-5)',
        border: 'var(--stroke-w) solid var(--stroke-default)',
        borderRadius: hover
          ? 'var(--sketch-radius-alt)'
          : 'var(--sketch-radius)',
        boxShadow: hover ? 'var(--shadow-lift-lg)' : 'var(--shadow-lift)',
        transform: `rotate(${tilt}deg) translateY(${hover ? '-4px' : '0'})`,
        transition:
          'transform var(--dur) var(--ease-pen), box-shadow var(--dur) var(--ease-pen), border-radius var(--dur) var(--ease-pen)',
        ...style,
      }}
    >
      {pinned && (
        <span
          aria-hidden="true"
          style={{
            position: 'absolute',
            top: -10,
            left: 22,
            width: 16,
            height: 16,
            borderRadius: '50%',
            background: 'var(--pen-red)',
            boxShadow: '0 2px 0 rgba(31,28,24,.25)',
          }}
        />
      )}
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'baseline',
          gap: 'var(--sp-3)',
        }}
      >
        <h3
          style={{
            margin: 0,
            fontFamily: 'var(--font-display)',
            fontWeight: 400,
            fontSize: 'var(--size-h4)',
            color: 'var(--text-heading)',
            lineHeight: 'var(--lh-heading)',
            position: 'relative',
            display: 'inline-block',
          }}
        >
          {title}
          <span
            aria-hidden="true"
            style={{
              position: 'absolute',
              left: 0,
              right: 0,
              bottom: -5,
              height: 3,
              background: 'var(--highlight)',
              borderRadius: 'var(--radius-pill)',
              transformOrigin: 'left center',
              transform: `scaleX(${hover ? 1 : 0}) rotate(-.8deg)`,
              transition: 'transform var(--dur-slow) var(--ease-pen)',
            }}
          />
        </h3>
        {year && (
          <span
            style={{
              fontFamily: 'var(--font-label)',
              fontSize: 'var(--size-label-sm)',
              color: 'var(--text-faint)',
              letterSpacing: 'var(--track-label)',
            }}
          >
            {year}
          </span>
        )}
      </div>
      <p
        style={{
          margin: 'var(--sp-3) 0 var(--sp-4)',
          fontFamily: 'var(--font-body)',
          fontSize: 'var(--size-body)',
          lineHeight: 'var(--lh-body)',
          color: 'var(--text-body)',
        }}
      >
        {blurb}
      </p>
      <div
        style={{
          display: 'flex',
          flexWrap: 'wrap',
          gap: 'var(--sp-2)',
          alignItems: 'center',
        }}
      >
        {tags.map((t, i) => (
          <Tag
            key={t}
            color={['yellow', 'mint', 'pink'][i % 3]}
            tilt={[-1.5, 1, -0.5, 1.8][i % 4]}
          >
            {t}
          </Tag>
        ))}
        <span
          style={{
            marginLeft: 'auto',
            fontFamily: 'var(--font-label)',
            fontSize: 'var(--size-label-sm)',
            letterSpacing: 'var(--track-label)',
            textTransform: 'uppercase',
            color: 'var(--text-link)',
            transform: `translateX(${hover ? '4px' : '0'})`,
            transition: 'transform var(--dur) var(--ease-pen)',
          }}
        >
          open →
        </span>
      </div>
    </a>
  )
}
