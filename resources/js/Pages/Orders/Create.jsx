import AppLayout from "@/Layouts/AppLayout";
import { Head, Link, useForm, usePage } from "@inertiajs/inertia-react";

export default function Create({product}) {
    const { user } = usePage().props.auth;
    const { message } = usePage().props.flash;

    const { data, post, setData, errors, processing } = useForm({
        email: user?.email ?? ''
    });

    function createOrder(event) {
        event.preventDefault();
        post(route('orders.checkout', {product: product.slug}));
    }

    return (
        <AppLayout>
            <Head title="Place an order">
                <meta name="description" content="Place an order" />
            </Head>

            <div className="py-4 text-white bg-indigo-500">
                <div className='container text-sm font-semibold'>
                    Home / Product / New Order
                </div>
            </div>

            <div className="container mt-8">
                {
                    message && (
                        <div className="p-3 text-orange-600 bg-orange-100 border-2 border-orange-400 rounded">
                            {message.text}
                        </div>
                    )
                }
                <div className="flex mt-12 space-x-24">
                    <div className="flex-grow w-[50%]">
                        <form onSubmit={createOrder}>
                            <div className="pb-4 mb-8 border-b">
                                <h1 className="text-xl font-semibold">
                                    Email Address
                                </h1>
                                <p className="text-gray-500">
                                    We need your email address to continue
                                </p>
                            </div>

                            <div>
                                <label htmlFor="email" className="block">
                                    <div className="text-sm font-semibold">Email Adress <span className="text-red-400">*</span></div>
                                    <input
                                        required
                                        id="email"
                                        name="email"
                                        type="email"
                                        value={data.email ?? ''}
                                        onChange={e => setData('email', e.target.value)}
                                        className="block w-full border rounded"  />
                                </label>
                                { errors.email && <div className="mt-1 text-sm text-red-500">{errors.email}</div> }
                            </div>

                            <div className="mt-8">
                                <button disabled={processing} className="block w-full px-4 py-4 font-semibold text-center text-white bg-indigo-500 rounded-lg">
                                    {processing?'Submitting...':'Continue with email'}
                                </button>

                                <div className="flex justify-center mx-2 mt-8 border-t">
                                    <span className="px-4 py-1 -mt-3 text-sm font-semibold bg-gray-100">
                                    OR
                                    </span>
                                </div>

                                <Link href="#" className="block w-full px-4 py-4 mt-4 font-semibold text-center text-indigo-600 bg-indigo-200 rounded-lg">
                                    Log in
                                </Link>
                            </div>
                        </form>
                    </div>
                    <div className="flex-grow w-[50%] hidden md:block">
                        Provide the user with the option to log in if they already have an account
                    </div>
                </div>
            </div>
        </AppLayout>
    )
}
