import TopNav from "@/Components/TopNav";
import { Head, Link } from "@inertiajs/inertia-react";

export default function Products({products}) {
    return (
        <>
            <Head title="Products">
                <meta name="description" content="Products page" />
            </Head>

            <div className='container px-4 mx-auto'>
                <TopNav />
            </div>

            <div className="py-4 text-white bg-sky-500">
                <div className='container px-4 mx-auto text-sm font-semibold'>
                    Home / My Products
                </div>
            </div>

            <div className='container px-4 mx-auto mt-6'>
                <div className="flex space-x-8">
                    <div className="flex-shrink-0">
                        <div className="shadow rounded p-2 min-w-[15rem]">
                            Left Navigation Menu
                        </div>
                    </div>
                    <div className="flex-grow">
                        <div className="flex items-center justify-between">
                            <h1 className="text-lg font-semibold">
                                My Products
                            </h1>
                            
                            <Link href={route('products.create')} className="px-4 py-2 font-semibold text-white rounded bg-sky-500">
                                Add Product
                            </Link>
                        </div>

                        <div className="relative mt-4 overflow-x-auto shadow sm:rounded">
                            <table className="w-full text-sm text-left whitespace-nowrap">
                                <thead className="text-xs text-gray-700 uppercase bg-gray-200">
                                    <tr>
                                        <th scope="col" className="p-4">
                                            Product Details
                                        </th>
                                        <th scope="col" className="p-4">
                                            Price
                                        </th>
                                        <th scope="col" className="p-4">
                                            Created At
                                        </th>
                                        <th scope="col" className="p-4">
                                            Action
                                        </th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        products.data.map(product => (
                                            <tr key={product.id} className="bg-white border-b hover:bg-gray-100">
                                                <th scope="row" className="p-4 font-medium text-gray-900 whitespace-nowrap">
                                                    <div className="flex items-center space-x-4">
                                                        <div className="w-12 h-12 bg-gray-200 rounded">

                                                        </div>
                                                        <div>
                                                            <div>
                                                                {product.name}
                                                            </div>
                                                            <div className="mt-1 text-xs text-gray-500">
                                                                {product.price}
                                                            </div>
                                                        </div>
                                                    </div>
                                                </th>
                                                <td className="p-4">
                                                    {product.price}
                                                </td>
                                                <td className="p-4">
                                                    5/10/2022
                                                </td>
                                                <td className="p-4">
                                                    <div className="flex space-x-4">
                                                        <Link href={route('products.show', {product: product.slug})} className="font-medium text-blue-600 hover:underline">
                                                            View
                                                        </Link>

                                                        <a href="#" className="font-medium text-blue-600 hover:underline">Edit</a>
                                                        <a href="#" className="font-medium text-red-500 hover:underline">Delete</a>
                                                    </div>
                                                </td>
                                            </tr>
                                        ))
                                    }
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

