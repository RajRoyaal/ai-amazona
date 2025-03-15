import * as React from 'react'

interface BaseEmailProps {
  previewText: string
  children: React.ReactNode
}

export function BaseEmail({ previewText, children }: BaseEmailProps) {
  return (
    <html>
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta httpEquiv="Content-Type" content="text/html; charset=UTF-8" />
        <title>{previewText}</title>
      </head>
      <body style={{
        backgroundColor: '#f6f6f6',
        fontFamily: 'sans-serif',
        fontSize: '14px',
        lineHeight: '1.4',
        margin: 0,
        padding: 0,
      }}>
        <div style={{
          backgroundColor: '#ffffff',
          margin: '0 auto',
          maxWidth: '580px',
          padding: '20px',
        }}>
          {children}
        </div>
      </body>
    </html>
  )
} 