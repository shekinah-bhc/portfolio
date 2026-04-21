import { ImageResponse } from 'next/og'
import { siteConfig } from '@/lib/constants'

export const alt = siteConfig.name
export const size = {
  width: 1200,
  height: 630,
}

export const contentType = 'image/png'

export default async function Image() {
  // Fetch a trendy font (Plus Jakarta Sans)
  const fontData = await fetch(
    new URL('https://fonts.gstatic.com/s/plusjakartasans/v8/L0x9DFMnlVwD4h3br8Q-y32WvV7-930Nv-S17N_dER_m.woff', import.meta.url)
  ).then((res) => res.arrayBuffer())

  return new ImageResponse(
    (
      <div
        style={{
          background: '#09090b',
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          fontFamily: 'Plus Jakarta Sans',
          position: 'relative',
        }}
      >
        {/* Subtle Grid Pattern */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            backgroundImage: 'radial-gradient(circle at 2px 2px, #27272a 1px, transparent 0)',
            backgroundSize: '24px 24px',
            opacity: 0.5,
          }}
        />

        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 10,
          }}
        >
          <div
            style={{
              fontSize: 80,
              fontWeight: 800,
              color: '#ffffff',
              marginBottom: 20,
              textAlign: 'center',
            }}
          >
            {siteConfig.name}
          </div>
          <div
            style={{
              fontSize: 32,
              fontWeight: 400,
              color: '#a1a1aa',
              textAlign: 'center',
              letterSpacing: '0.1em',
              textTransform: 'uppercase',
            }}
          >
            {siteConfig.title}
          </div>
        </div>

        {/* Accent Bar */}
        <div
          style={{
            position: 'absolute',
            bottom: 0,
            left: 0,
            right: 0,
            height: 8,
            background: 'linear-gradient(90deg, #64ffda, #0a192f)',
          }}
        />
      </div>
    ),
    {
      ...size,
      fonts: [
        {
          name: 'Plus Jakarta Sans',
          data: fontData,
          style: 'normal',
          weight: 800,
        },
      ],
    }
  )
}
