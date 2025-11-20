import '@/app/globals.scss'
import type { Metadata } from 'next'
import { ThemeProvider } from '@/provider/ThemeProvider'

export const metadata: Metadata = {
  title: 'CryptoFetch',
  description: 'CryptoFetch - Your crypto portfolio tracker',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html>
      <body>
        <ThemeProvider>
          {children}
        </ThemeProvider>
      </body>
    </html>
  )
}