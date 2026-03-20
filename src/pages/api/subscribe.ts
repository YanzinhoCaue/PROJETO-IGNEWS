import { NextApiRequest, NextApiResponse } from "next";
import { getSession } from "next-auth/react";
import { query as q } from "faunadb";

import { getFaunaClient } from "../../services/fauna";
import { getStripeServerClient } from "../../services/stripe";

type User = {
  ref: {
    id: string;
  };
  data: {
    stripe_customer_id: string;
  };
};

export default async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === "POST") {
    const session = await getSession({ req });

    if (!session?.user?.email) {
      return res.status(401).json({ error: "Unauthorized" });
    }

    const email = session.user.email;
    const successUrl = process.env.STRIPE_SUCCESS_URL;
    const cancelUrl = process.env.STRIPE_CANCEL_URL;

    if (!successUrl || !cancelUrl) {
      return res.status(500).json({ error: "Stripe URLs are not configured" });
    }

    let stripe;
    let fauna;

    try {
      stripe = getStripeServerClient();
    } catch {
      return res.status(500).json({ error: "STRIPE_API_KEY is not configured" });
    }

    try {
      fauna = getFaunaClient();
    } catch {
      return res.status(500).json({ error: "FAUNADB_KEY is not configured" });
    }

    const user = await fauna.query<User>(
      q.Get(
        q.Match(q.Index("user_by_email"), q.Casefold(email))
      )
    );

    let customerId = user.data.stripe_customer_id;

    if (!customerId) {
      const stripeCustomer = await stripe.customers.create({
        email,
      });

      await fauna.query(
        q.Update(
          q.Ref(q.Collection("users"), user.ref.id),
          {
            data: {
              stripe_customer_id: stripeCustomer.id,
            },
          }
        )
      );

      customerId = stripeCustomer.id;
    }

    const stripeCheckoutSession = await stripe.checkout.sessions.create({
      customer: customerId,
      payment_method_types: ["card"],
      billing_address_collection: "required",
      line_items: [{ price: "price_1Ijmr6FuAxoHDiWy4AHqKCMF", quantity: 1 }],
      mode: "subscription",
      allow_promotion_codes: true,
      success_url: successUrl,
      cancel_url: cancelUrl,
    });

    return res.status(200).json({ sessionId: stripeCheckoutSession.id });
  }

  res.setHeader("Allow", "POST"); 
  res.status(405).end("Method not allowed");
};
