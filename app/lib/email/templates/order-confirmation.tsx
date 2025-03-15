import * as React from 'react'
import { BaseEmail } from './base-email'

interface OrderConfirmationEmailProps {
  orderNumber: string
  customerName: string
  total: number
  items: Array<{
    name: string
    quantity: number
    price: number
  }>
}

export function OrderConfirmationEmail({
  orderNumber,
  customerName,
  total,
  items,
}: OrderConfirmationEmailProps) {
  return (
    <BaseEmail previewText={`Order Confirmation #${orderNumber}`}>
      <h1 style={{ color: '#333', fontSize: '24px', marginBottom: '20px' }}>
        Order Confirmation
      </h1>
      <p style={{ marginBottom: '20px' }}>
        Dear {customerName},
      </p>
      <p style={{ marginBottom: '20px' }}>
        Thank you for your order! We're pleased to confirm that we've received your order #{orderNumber}.
      </p>
      <div style={{ marginBottom: '20px' }}>
        <h2 style={{ color: '#333', fontSize: '18px', marginBottom: '10px' }}>
          Order Details:
        </h2>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr style={{ backgroundColor: '#f8f9fa' }}>
              <th style={{ padding: '10px', textAlign: 'left', borderBottom: '1px solid #dee2e6' }}>Item</th>
              <th style={{ padding: '10px', textAlign: 'right', borderBottom: '1px solid #dee2e6' }}>Qty</th>
              <th style={{ padding: '10px', textAlign: 'right', borderBottom: '1px solid #dee2e6' }}>Price</th>
            </tr>
          </thead>
          <tbody>
            {items.map((item, index) => (
              <tr key={index}>
                <td style={{ padding: '10px', borderBottom: '1px solid #dee2e6' }}>{item.name}</td>
                <td style={{ padding: '10px', textAlign: 'right', borderBottom: '1px solid #dee2e6' }}>{item.quantity}</td>
                <td style={{ padding: '10px', textAlign: 'right', borderBottom: '1px solid #dee2e6' }}>${item.price.toFixed(2)}</td>
              </tr>
            ))}
            <tr>
              <td colSpan={2} style={{ padding: '10px', textAlign: 'right', fontWeight: 'bold' }}>Total:</td>
              <td style={{ padding: '10px', textAlign: 'right', fontWeight: 'bold' }}>${total.toFixed(2)}</td>
            </tr>
          </tbody>
        </table>
      </div>
      <p style={{ marginBottom: '20px' }}>
        We'll send you another email when your order ships.
      </p>
      <p style={{ color: '#666', fontSize: '12px' }}>
        If you have any questions about your order, please contact our customer service team.
      </p>
    </BaseEmail>
  )
} 