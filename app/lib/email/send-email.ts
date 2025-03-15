import { resend } from './config'
import { OrderConfirmationEmail } from './templates/order-confirmation'

export async function sendOrderConfirmationEmail({
  to,
  orderNumber,
  customerName,
  total,
  items,
}: {
  to: string
  orderNumber: string
  customerName: string
  total: number
  items: Array<{
    name: string
    quantity: number
    price: number
  }>
}) {
  try {
    const data = await resend.emails.send({
      from: 'noreply@yourdomain.com',
      to,
      subject: `Order Confirmation #${orderNumber}`,
      react: OrderConfirmationEmail({
        orderNumber,
        customerName,
        total,
        items,
      }),
    })

    return { success: true, data }
  } catch (error) {
    return { success: false, error }
  }
}

// Add more email sending functions as needed
export async function sendPasswordResetEmail({
  to,
  resetLink,
}: {
  to: string
  resetLink: string
}) {
  try {
    const data = await resend.emails.send({
      from: 'noreply@yourdomain.com',
      to,
      subject: 'Reset Your Password',
      text: `Click this link to reset your password: ${resetLink}`,
      // You can create a React template for this as well
    })

    return { success: true, data }
  } catch (error) {
    return { success: false, error }
  }
} 