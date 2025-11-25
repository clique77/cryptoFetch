import '@/app/globals.scss'
import type { Metadata } from 'next'
import { ThemeProvider } from '@/provider/ThemeProvider'
import { ThemeToggle } from '@/components/theme/ThemeToggle'
import { ThemeContextProvider } from '@/provider/ThemeContext'

export const metadata: Metadata = {
  title: 'CryptoFetch',
  description: 'CryptoFetch - Your crypto portfolio tracker',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <ThemeContextProvider>
          <ThemeProvider>
            <ThemeToggle />
              {children}
            </ThemeProvider>
        </ThemeContextProvider>
      </body>
    </html>
  )
}