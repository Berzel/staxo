import TopNav from "@/Components/TopNav";
import { Head, usePage } from "@inertiajs/inertia-react";
import { CardElement, PaymentElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';
import { Inertia } from "@inertiajs/inertia";

const stripePromise = loadStripe('pk_test_51Lyv4ECqvLnmo7L5YWwASCrE7hb9WVEECuvDLpmYJ7et35TlFJe7IK3XlFkol0TO4M1a107JDkqCjvwHGHaM9H5k00baxVU9Q3');

const CheckoutForm = ({intent, payment}) => {
    const stripe = useStripe();
    const elements = useElements();

    const handleSubmit = async (event) => {
        event.preventDefault();

        if (!stripe || !elements) {
          return;
        }

        const { setupIntent, error } = await stripe.confirmCardSetup(
            intent.client_secret, {
                payment_method: {
                    card: elements.getElement(CardElement),
                    billing_details: { name: 'Berzel Best' }
                }
            }
        );

        if (error) {
            console.log(error);
            return;
        }

        if (setupIntent.status !== 'succeeded') {
            console.log(setupIntent);
            return;
        }

        Inertia.post(route('payment_methods.store', {payment: payment.id}), {
            payment_method: setupIntent.payment_method,
            payment_method_types: setupIntent.payment_method_types
        });
    };

    return (
        <>
            <form onSubmit={handleSubmit}>
                <CardElement id="card-element" />
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
        <Elements stripe={stripePromise}>
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
                <CheckoutForm intent={intent} payment={payment} />
            </div>
        </Elements>
    )
}
