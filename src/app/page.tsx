"use client";

import { CheckoutPage } from "@/app/components/CheckoutPage";
import convertToSubcurrency from "@/app/lib/convertToSubcurrency";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";

if (process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY === undefined) {
  throw new Error(
    "Next Public Key is required to use the Stripe currently not available"
  );
}
const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY);

const Home = () => {
  const amount = 50;
  return (
    <main className="max-w-6xl mx-auto p-10 text-white text-center border m-10 rounded-md bg-gradient-to-tr from-blue-900 to-orange-600">
      <div className="mb-10">
        <h1 className="text-4xl font-extrabold mb-2">Ehsan</h1>
        <h2 className="text-2xl">has requested</h2>
        <span className="font-bold">${amount}</span>
      </div>

      <Elements
        stripe={stripePromise}
        options={{
          mode: "payment",
          amount: isNaN(amount) ? 1000 : convertToSubcurrency(amount), // Default to 1000 cents (10 USD) if amount is NaN
          currency: "usd",
        }}
      >
        <CheckoutPage amount={amount} />
      </Elements>
    </main>
  );
};

export default Home;
