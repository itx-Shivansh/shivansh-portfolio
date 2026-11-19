import { ImageResponse } from 'next/og'

export const runtime = 'edge'
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

export default function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '1200px',
          height: '630px',
          background: '#000000',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'flex-start',
          justifyContent: 'center',
          padding: '80px 100px',
          position: 'relative',
          fontFamily: 'sans-serif',
        }}
      >
        {/* Gold top accent bar */}
        <div
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            height: '4px',
            background: 'linear-gradient(90deg, #F5B800 0%, #A67C00 100%)',
          }}
        />

        {/* Corner brackets */}
        <div style={{ position: 'absolute', top: 32, left: 48, color: '#F5B800', fontSize: 28, lineHeight: 1 }}>┌</div>
        <div style={{ position: 'absolute', top: 32, right: 48, color: '#F5B800', fontSize: 28, lineHeight: 1 }}>┐</div>
        <div style={{ position: 'absolute', bottom: 32, left: 48, color: '#F5B800', fontSize: 28, lineHeight: 1 }}>└</div>
        <div style={{ position: 'absolute', bottom: 32, right: 48, color: '#F5B800', fontSize: 28, lineHeight: 1 }}>┘</div>

        {/* Badge pill */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 10,
            border: '1px solid rgba(245,184,0,0.4)',
            borderRadius: 999,
            padding: '8px 20px',
            marginBottom: 32,
          }}
        >
          <div style={{ width: 8, height: 8, borderRadius: '50%', background: '#F5B800' }} />
          <span style={{ color: '#F5B800', fontSize: 14, fontWeight: 700, letterSpacing: '0.15em' }}>
            ENGINEERING &amp; AI · DTU
          </span>
        </div>

        {/* Name */}
        <div style={{ display: 'flex', flexDirection: 'column', lineHeight: 0.9, marginBottom: 24 }}>
          <span style={{ color: '#ffffff', fontSize: 100, fontWeight: 900, letterSpacing: '-2px' }}>SHIVANSH</span>
          <span style={{ color: '#F5B800', fontSize: 100, fontWeight: 900, letterSpacing: '-2px' }}>RAJ</span>
        </div>

        {/* Role line */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
          <div style={{ width: 40, height: 2, background: '#F5B800', borderRadius: 999 }} />
          <span style={{ color: '#e2e8f0', fontSize: 24, fontWeight: 600, letterSpacing: '0.02em' }}>
            Software Engineer &amp; AI Developer
          </span>
        </div>

        {/* URL watermark */}
        <div
          style={{
            position: 'absolute',
            bottom: 44,
            right: 80,
            color: '#475569',
            fontSize: 14,
            letterSpacing: '0.08em',
          }}
        >
          shivanshraj-portfolio.vercel.app
        </div>
      </div>
    ),
    { width: 1200, height: 630 }
  )
}
