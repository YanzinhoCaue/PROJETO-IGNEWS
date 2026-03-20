import { loadStripe } from "@stripe/stripe-js";

export async function getStripeJs() {
    const stripePublicKey = process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY;

    if (!stripePublicKey) {
        throw new Error("NEXT_PUBLIC_STRIPE_PUBLIC_KEY is not configured");
    }

    const stripeJs = await loadStripe(stripePublicKey);

    return stripeJs;
}