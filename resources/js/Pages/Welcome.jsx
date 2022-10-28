import React from 'react';
import { Link, Head } from '@inertiajs/inertia-react';
import TopNav from '@/Components/TopNav';
import productImage from '@/Utils/productImage';
import moneyFormat from '@/Utils/moneyFormat';

export default function Welcome({products}) {
    
    return (
        <>
            <Head title='Welcome'>
                <meta name="description" content="Staxo Laravel Coding Challenge" />
            </Head>

            <div className='container px-4 mx-auto'>
                <TopNav />
            </div>

            <div className="container px-4 mx-auto">
                <div className="h-[25rem] bg-gray-200 rounded">

                </div>
            </div>

            <div className="container px-4 mx-auto mt-8">
                {
                    products.data.length > 0 && (
                        <ul className="flex flex-wrap justify-between -mx-4 -mt-4">
                            {products.data.map(product => (
                                <li key={product.id} className="w-[25%] flex-grow-0 my-4">
                                    <Link
                                        className="block mx-4"
                                        href={route('products.show', {product: product.slug})} >
                                            <div className="overflow-hidden bg-gray-200 rounded-lg aspect-[9/7]">
                                                <img 
                                                    loading="lazy"
                                                    className="object-cover object-center w-full h-full"
                                                    src={productImage(product, 'sm')}
                                                    alt={product.name} />
                                            </div>
                                            <div className='mt-2'>
                                                <h2>
                                                    {product.name}
                                                </h2>
                                                <h2 className="font-semibold text-sky-500">
                                                    {moneyFormat(product.price)}
                                                </h2>
                                            </div>
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    )
                }
            </div>
        </>
    );
}
