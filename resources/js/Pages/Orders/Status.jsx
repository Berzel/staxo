import TopNav from "@/Components/TopNav";
import { Head } from "@inertiajs/inertia-react";

export default function Status({order}) {
    return (
        <>
            <Head title="Thank you.">
                <meta name="description" content="" />
            </Head>

            <div className="container">
                <TopNav />
            </div>

            <div className="py-4 text-white bg-sky-500">
                <div className='container text-sm font-semibold'>
                    Home / Product / Status
                </div>
            </div>

            <div className="container mt-8">
                <h1>
                    Thanks for doing business with us...
                </h1>
            </div>
        </>
    )
}
