import TopNav from "@/Components/TopNav";
import { Head } from "@inertiajs/inertia-react";

export default function Charge({payment, intent}) {

    console.log(payment, intent);

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
                    Home / Product / Pay Order
                </div>
            </div>
        </>
    )
}
