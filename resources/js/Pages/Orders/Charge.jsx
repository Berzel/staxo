import TopNav from "@/Components/TopNav";
import { Head, usePage } from "@inertiajs/inertia-react";
import { PaymentElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';

const stripePromise = loadStripe('pk_test_51Lyv4ECqvLnmo7L5YWwASCrE7hb9WVEECuvDLpmYJ7et35TlFJe7IK3XlFkol0TO4M1a107JDkqCjvwHGHaM9H5k00baxVU9Q3');

const CheckoutForm = ({payment}) => {
    const stripe = useStripe();
    const elements = useElements();

    const handleSubmit = async (event) => {
        event.preventDefault();

        if (!stripe || !elements) {
          return;
        }

        const result = await stripe.confirmPayment({
          //`Elements` instance that was used to create the Payment Element
          elements,
          confirmParams: {
            return_url: route('orders.status', {payment: payment.id}),
          },
        });

        if (result.error) {
          // Show error to your customer (for example, payment details incomplete)
          console.log(result.error.message);
        } else {
          // Your customer will be redirected to your `return_url`. For some payment
          // methods like iDEAL, your customer will be redirected to an intermediate
          // site first to authorize the payment, then redirected to the `return_url`.
          console.log('Paid', result);
        }
    };

    return (
        <>
            <form onSubmit={handleSubmit}>
                <PaymentElement />
                <div className="mt-8">
                    <button disabled={!stripe} className="block w-full py-4 px-8 font-semibold text-center text-white rounded bg-sky-500">
                        Pay
                    </button>
                </div>
            </form>
        </>
    )
}

export default function Charge({payment, intent}) {

    const options = {
        clientSecret: intent.client_secret
    }

    return (
        <Elements stripe={stripePromise} options={options} >
            <Head title="Place an order">
                <meta name="description" content="Place an order" />
            </Head>

            <div className="container">
                <TopNav />
            </div>

            <div className="py-4 text-white bg-sky-500">
                <div className='container text-sm font-semibold'>
                    Home / Product / Charge
                </div>
            </div>

            <div className="container mt-8">
                <CheckoutForm payment={payment} />
            </div>
        </Elements>
    )
}
