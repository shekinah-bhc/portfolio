import { ImageResponse } from 'next/og'
import { siteConfig } from '@/lib/constants'

export const alt = siteConfig.name
export const size = {
  width: 1200,
  height: 630,
}

export const contentType = 'image/png'

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          background: 'linear-gradient(to bottom right, #0a0a0a, #1a1a1a)',
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          fontFamily: 'sans-serif',
          color: 'white',
          padding: '80px',
        }}
      >
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '20px',
            marginBottom: '40px',
          }}
        >
          <div
            style={{
              width: '80px',
              height: '80px',
              background: '#0ea5e9',
              borderRadius: '20px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '48px',
              fontWeight: 900,
            }}
          >
            S
          </div>
          <div style={{ fontSize: '64px', fontWeight: 800 }}>{siteConfig.name}</div>
        </div>
        <div
          style={{
            fontSize: '32px',
            color: '#94a3b8',
            textAlign: 'center',
            maxWidth: '800px',
            lineHeight: 1.4,
          }}
        >
          {siteConfig.description}
        </div>
        <div
          style={{
            marginTop: '60px',
            display: 'flex',
            gap: '15px',
          }}
        >
          {['Next.js 15', 'TypeScript', 'Animation'].map((tag) => (
            <div
              key={tag}
              style={{
                padding: '8px 20px',
                background: 'rgba(14, 165, 233, 0.1)',
                border: '1px solid rgba(14, 165, 233, 0.3)',
                borderRadius: '9999px',
                fontSize: '20px',
                color: '#0ea5e9',
              }}
            >
              {tag}
            </div>
          ))}
        </div>
      </div>
    ),
    {
      ...size,
    }
  )
}
