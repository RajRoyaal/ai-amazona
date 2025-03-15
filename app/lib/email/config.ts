import { Resend } from 'resend'

if (!process.env.RESEND_API_KEY) {
  throw new Error('RESEND_API_KEY environment variable is not set')
}

export const resend = new Resend(process.env.RESEND_API_KEY)

export const emailConfig = {
  from: 'noreply@yourdomain.com', // Replace with your verified domain
  replyTo: 'support@yourdomain.com', // Replace with your support email
} 