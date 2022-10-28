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

            <div className='container px-4 mx-auto'>
                <TopNav />
            </div>

            <div className="py-4 text-white bg-sky-500">
                <div className='container px-4 mx-auto text-sm font-semibold'>
                    Home / Products / Product Details
                </div>
            </div>

            <div className="container px-4 mx-auto mt-6">
                <div className="flex justify-between">
                    <div className="h-[32rem] w-[50%] bg-gray-200 rounded-lg overflow-hidden flex-shrink-0">
                        <img
                            className="object-cover object-center w-full h-full"
                            src={productImage(product, 'lg')}
                            alt={product.name} />
                    </div>
                    <div className="w-[50%] ml-8 flex-shrink">
                        <h1 className="text-2xl font-semibold">
                            {product.name}
                        </h1>
                        <p className="mt-4 text-4xl font-semibold text-sky-500">
                            {moneyFormat(product.price)}
                        </p>
                        <div className="py-4 mt-4 text-sm text-gray-500 border-y">
                            Summary
                        </div>
                        <p className="mt-8">
                            Lorem, ipsum dolor sit amet consectetur adipisicing elit. Nulla minima aspernatur numquam ducimus iste nesciunt beatae ea recusandae ut! Quam omnis possimus aliquid at veniam sequi, exercitationem necessitatibus a dolorem.
                        </p>
                        <div className="mt-8">
                            <Link href="#" className="block py-4 font-semibold text-center text-white rounded-lg bg-sky-500">
                                Buy now - {product.price}
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}