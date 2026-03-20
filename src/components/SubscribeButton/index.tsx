import { signIn, useSession } from "next-auth/react";
import { api } from "../../services/api";
import { getStripeJs } from "../../services/stripe-js";
import styles from "./styles.module.scss";

interface subscribeButton {
  priceId: string;
}

export function SubscribeButton({ priceId }: subscribeButton) {
  const {data: session} = useSession(); 
  async function handleSubscribe() {
    if (!session) {
      signIn("github"); 
      return;
    }

  
    try {
      const response = await api.post("/subscribe"); 


      const { sessionId } = response.data;

      const stripe = await getStripeJs();

      if (!stripe) {
        throw new Error("Nao foi possivel inicializar o Stripe.");
      }

      await stripe.redirectToCheckout({ sessionId });
    } catch (error) {
      const message = error instanceof Error ? error.message : "Erro ao iniciar checkout.";
      alert(message);
    }
  }
  return (
    <button
      type="button"
      className={styles.subscribeButton}
      onClick={handleSubscribe}>
      Subscribe now
    </button>
  );
}
