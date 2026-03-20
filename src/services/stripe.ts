import Stripe from 'stripe'

const stripeApiKey = process.env.STRIPE_API_KEY
export const stripe = stripeApiKey
  ? new Stripe(
      stripeApiKey,
      {
        apiVersion: '2023-08-16',
        appInfo: {
          name: 'Ignews',
          version: '0.1.0',
        },
      }
    )
  : null

export function getStripeServerClient() {
  if (!stripe) {
    throw new Error('STRIPE_API_KEY is not configured')
  }

  return stripe
}
