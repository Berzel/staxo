import AppLayout from "@/Layouts/AppLayout";
import { Head } from "@inertiajs/inertia-react";

export default function Status({order}) {
    return (
        <AppLayout>
            <Head title="Thank you.">
                <meta name="description" content="" />
            </Head>

            <div className="py-4 text-white bg-indigo-500">
                <div className='container text-sm font-semibold'>
                    Home / Product / Status
                </div>
            </div>

            <div className="container mt-8">
                <h1 className="text-xl font-semibold">
                    Your payment has been charged. Thank you for doing business with us...
                </h1>
            </div>
        </AppLayout>
    )
}
