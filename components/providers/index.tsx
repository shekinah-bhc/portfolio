'use client'

import React from 'react'
import { ThemeProvider } from './theme-provider'
import { SmoothScrollProvider } from './smooth-scroll'
import { QueryProvider } from './query-provider'

interface ProvidersProps {
  children: React.ReactNode
}

export function Providers({ children }: ProvidersProps) {
  return (
    <QueryProvider>
      <ThemeProvider
        attribute="class"
        defaultTheme="dark"
        enableSystem
        disableTransitionOnChange
      >
        <SmoothScrollProvider>
          {children}
        </SmoothScrollProvider>
      </ThemeProvider>
    </QueryProvider>
  )
}
