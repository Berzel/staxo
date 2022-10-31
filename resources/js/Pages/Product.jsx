import Footer from "@/Components/Footer";
import TopNav from "@/Components/TopNav";
import moneyFormat from "@/Utils/moneyFormat";
import productImage from "@/Utils/productImage";
import { Head, Link } from "@inertiajs/inertia-react";

export default function Product({product}) {
    
    return (
        <>
            <Head title={product.name}>
                <meta name="description" content={product.name} />
            </Head>

            <div className='container'>
                <TopNav />
            </div>

            <div className="py-4 text-white bg-sky-500">
                <div className='container text-sm font-semibold'>
                    Home / Products / Product Details
                </div>
            </div>

            <div className="container mt-6">
                <div className="md:flex md:justify-between">
                    <div className="md:w-[50%] aspect-[9/7] bg-gray-200 rounded-lg overflow-hidden flex-shrink-0">
                        <img
                            className="object-cover object-center w-full h-full"
                            src={productImage(product, 'lg')}
                            alt={product.name} />
                    </div>
                    <div className="mt-4 md:mt-0 md:w-[50%] md:ml-8 flex-shrink">
                        <h1 className="text-lg font-semibold md:text-2xl">
                            {product.name}
                        </h1>
                        <p className="mt-4 text-xl font-semibold md:text-4xl text-sky-500">
                            {moneyFormat(product.price)}
                        </p>
                        <div className="py-4 mt-4 text-sm text-gray-500 border-y">
                            Summary
                        </div>
                        <div className="mt-8 text-sm">
                        <p className="">
                            Lorem, ipsum dolor sit amet consectetur adipisicing elit. Nulla minima aspernatur numquam ducimus iste nesciunt beatae ea recusandae ut! Quam omnis possimus aliquid at veniam sequi, exercitationem necessitatibus a dolorem.
                        </p>
                        <p className="mt-4">
                            Lorem, ipsum dolor sit amet consectetur adipisicing elit. Nulla minima aspernatur numquam ducimus iste nesciunt beatae ea recusandae ut! Quam omnis possimus aliquid at veniam sequi, exercitationem necessitatibus a dolorem.
                        </p>
                        </div>
                        <div className="mt-8">
                            <Link href="#" className="block py-4 font-semibold text-center text-white rounded bg-sky-500">
                                Buy now - {moneyFormat(product.price)}
                            </Link>
                        </div>
                    </div>
                </div>
            </div>

            <Footer />
        </>
    )
}