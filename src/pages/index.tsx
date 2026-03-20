import { GetStaticProps } from 'next';
import Head from 'next/head';
import styles from './home.module.scss'
import { SubscribeButton } from '../components/SubscribeButton';
import { getStripeServerClient } from '../services/stripe';

interface HomeProps {
  product: {
    priceId: string;
    amount: string;
  }
}

export default function Home({ product }: HomeProps) {


  return (
    <>
      <Head>
      <title>Home | ig.news</title>
      </Head>
      <main className={styles.contentContainer}>
        <section className={styles.hero}>
          <span>👏🏽 Hey, welcome</span>
          <h1>News about the <span className={styles.glitch} data-text="React">React</span> world.</h1>
          <p>
            Get access to all the publications <br />
            <span>for {product.amount} month</span>
          </p>
          <SubscribeButton priceId={product.priceId} />
        </section>
        <img src="/images/Mulher.svg" alt="Girl coding" />
      </main>
    </>
  )
}


export const getStaticProps: GetStaticProps = async () => {
  try {
    const stripe = getStripeServerClient()
    const price = await stripe.prices.retrieve('price_1NspWSAGdn0UVmmDHyWs9UWX', {
      expand: ['product']
    })

    if (price.unit_amount === null) {
      throw new Error('Stripe price without unit_amount')
    }

    const product = {
      priceId: price.id,
      amount: new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
      }).format(price.unit_amount / 100)
    }
    
    return {
      props: {
        product
      },
      revalidate: 60 * 60 * 24,
    }
  } catch {
    return {
      props: {
        product: {
          priceId: '',
          amount: '$0.00',
        },
      },
      revalidate: 60,
    }
  }
}