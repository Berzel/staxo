import Footer from "@/Components/Footer";
import TopNav from "@/Components/TopNav";
import { Head, useForm, usePage } from "@inertiajs/inertia-react";

export default function Create({product, csrf_token}) {
    const { user } = usePage().props.auth;

    const { data, post, setData, errors } = useForm({
        email: user?.email ?? ''
    });

    return (
        <>
            <Head title="Place an order">
                <meta name="description" content="Place an order" />
            </Head>

            <div className="container">
                <TopNav />
            </div>

            <div className="py-4 text-white bg-sky-500">
                <div className='container text-sm font-semibold'>
                    Home / Product / Place Order
                </div>
            </div>

            <div className="container mt-8">

                <form method="post" action={route('orders.checkout', {product: product.slug})}>
                    <input
                        type="hidden"
                        name="_token"
                        value={csrf_token} />

                    <div>
                        <label htmlFor="email" className="block mt-8">
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
                        <button className="block w-full px-4 py-4 font-semibold text-center text-white rounded-lg bg-sky-500">
                            Place Order
                        </button>
                    </div>
                </form>

            </div>

            <Footer />
        </>
    )
}
