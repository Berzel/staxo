import React from 'react';
import { Link, Head } from '@inertiajs/inertia-react';
import TopNav from '@/Components/TopNav';
import productImage from '@/Utils/productImage';
import moneyFormat from '@/Utils/moneyFormat';
import Footer from '@/Components/Footer';
import ProductList from '@/Components/ProductList';

export default function Welcome({products}) {

    const featured = products.data[0];

    return (
        <>
            <Head title='Welcome'>
                <meta name="description" content="Staxo Laravel Coding Challenge" />
            </Head>

            <div className='container'>
                <TopNav />
            </div>

            {
                featured && (
                    <div className="container flex space-x-32">
                        <div className="flex-shrink-0 py-24 rounded">
                            <h1 className='text-2xl md:text-5xl font-bold max-w-[30rem]'>
                                {featured.name}
                            </h1>
                            <p className='mt-4 md:text-xl max-w-[20em] text-gray-500'>
                                Lorem ipsum dolor sit amet consectetur adipisicing elit. Laudantium, dolores. Totam alias voluptates molestiae modi?
                            </p>
                            <div className='flex mt-12 space-x-4'>
                                <Link href={route('orders.create', {product: featured.slug})} className='px-6 py-3 font-semibold text-white bg-indigo-500 rounded'>
                                    Buy Now
                                </Link>
                                <Link href={route('products.show', {product: featured.slug})} className='px-6 py-3 font-semibold text-indigo-600 bg-indigo-200 rounded'>
                                    View Details
                                </Link>
                            </div>
                        </div>
                        <div className='flex-grow my-12 overflow-hidden bg-gray-300 rounded-lg max-h-[26rem] hidden md:block'>
                            <img className='object-cover object-center w-full h-full' src={productImage(featured, 'lg')} />
                        </div>
                    </div>
                )
            }


            {
                products.data.length > 0 && (
                    <div className="container mt-8">
                        <ProductList products={products.data} />
                    </div>
                )
            }

            <Footer />
        </>
    );
}
