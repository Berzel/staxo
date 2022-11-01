import { Head } from "@inertiajs/inertia-react";
import { PaymentElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';
import { Inertia } from "@inertiajs/inertia";
import AppLayout from "@/Layouts/AppLayout";

const stripePromise = loadStripe('pk_test_51Lyv4ECqvLnmo7L5YWwASCrE7hb9WVEECuvDLpmYJ7et35TlFJe7IK3XlFkol0TO4M1a107JDkqCjvwHGHaM9H5k00baxVU9Q3');

const CheckoutForm = ({ order }) => {
    const stripe = useStripe();
    const elements = useElements();

    const handleSubmit = async (event) => {
        event.preventDefault();

        if (!stripe || !elements) {
          return;
        }

        const { setupIntent, error } = await stripe.confirmSetup({
            elements,
            redirect: 'if_required',
            confirmParams: {
                return_url: route('orders.status', {order: order.id}),
            }
        });

        if (error) {
            alert(error.message);
            return;
        }

        if (setupIntent.status !== 'succeeded') {
            console.log(setupIntent);
            return;
        }

        Inertia.post(route('payment_methods.store', {order: order.id}), {
            payment_method: setupIntent.payment_method,
            payment_method_types: setupIntent.payment_method_types
        });
    };

    return (
        <>
            <form onSubmit={handleSubmit}>
                <PaymentElement />
                {
                    (stripe || elements) && (
                        <div className="mt-8">
                            <button disabled={!stripe} className="block w-full px-8 py-4 font-semibold text-center text-white rounded bg-sky-500">
                                Save Payment Method
                            </button>
                        </div>
                    )
                }
            </form>
        </>
    )
}

export default function Charge({order, intent}) {

    const options = {
        clientSecret: intent.client_secret
    };

    return (
        <Elements stripe={stripePromise} options={options}>
            <AppLayout>
                <Head title="Place an order">
                    <meta name="description" content="Place an order" />
                </Head>

                <div className="py-4 text-white bg-sky-500">
                    <div className='container text-sm font-semibold'>
                        Home / Order / Payment Method
                    </div>
                </div>

                <div className="container mt-8">
                    <div className="flex space-x-24">
                        <div className="flex-grow w-[50%]">
                            <div className="pb-4 mb-8 border-b">
                                <h1 className="text-xl font-semibold">
                                    Payment Method
                                </h1>
                                <p className="text-gray-500">
                                    Add your payment method
                                </p>
                            </div>
                            <CheckoutForm intent={intent} order={order} />
                        </div>
                        <div className="flex-grow w-[50%]">

                        </div>
                    </div>
                </div>
            </AppLayout>
        </Elements>
    )
}
