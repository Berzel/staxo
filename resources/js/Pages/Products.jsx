import Footer from "@/Components/Footer";
import TopNav from "@/Components/TopNav";
import moneyFormat from "@/Utils/moneyFormat";
import productImage from "@/Utils/productImage";
import { Portal } from "@headlessui/react";
import { Head, Link, useForm } from "@inertiajs/inertia-react";
import { ClickAwayListener } from "@mui/material";
import { useState } from "react";

function DeleteForm({product}) {
    const { delete: destroy } = useForm();
    const [showConfirmForm, setShowConfirmForm] = useState(false);

    function openDialog(event) {
        event.stopPropagation();
        setShowConfirmForm(true);
    }

    function deleteProduct(product) {
        return event => {
            event.preventDefault();
            destroy(route('products.destroy', {product: product.slug}));
        }
    }

    return (
        <>
            <button className="text-red-500" onClick={openDialog}>
                Delete
            </button>

            {
                showConfirmForm && (
                    <Portal>
                        <div className="fixed top-0 bottom-0 left-0 right-0 z-10 flex items-center justify-center bg-black bg-opacity-50">
                            <ClickAwayListener onClickAway={() => setShowConfirmForm(false)}>
                                <form onSubmit={deleteProduct(product)} className="p-4 bg-white rounded max-w-[20rem]">
                                    <div className="px-8 my-8 text-center">
                                        <h2 className="text-2xl font-semibold">You Sure?</h2>
                                        <p className="mt-4 text-sm text-gray-500">
                                            Please confirm if you really wish to delete. You won't be able to recover this item.
                                        </p>
                                    </div>
                                    <div className="flex space-x-4">
                                        <button type="button" onClick={() => setShowConfirmForm(false)} className="px-4 py-2 bg-gray-200 rounded w-[10rem]">
                                            Cancel
                                        </button>
                                        <button className="px-4 py-2 text-white bg-red-500 rounded w-[10rem]">
                                            Delete
                                        </button>
                                    </div>
                                </form>
                            </ClickAwayListener>
                        </div>
                    </Portal>
                )
            }
        </>
    )
}

export default function Products({products}) {
    return (
        <>
            <Head title="Products">
                <meta name="description" content="Products page" />
            </Head>

            <div className='container'>
                <TopNav />
            </div>

            <div className="py-4 text-white bg-sky-500">
                <div className='container text-sm font-semibold'>
                    Home / My Products
                </div>
            </div>

            <div className='container mt-6 '>
                <div className="flex md:space-x-8">
                    <div className="flex-shrink-0 hidden md:block">
                        <div className="shadow rounded p-2 min-w-[15rem]">
                            Left Navigation Menu
                        </div>
                    </div>
                    <div className="w-full md:flex-grow">
                        <div className="flex items-center justify-between">
                            <h1 className="text-lg font-semibold">
                                My Products
                            </h1>
                            
                            <Link href={route('products.create')} className="px-4 py-2 font-semibold text-white rounded bg-sky-500">
                                Add Product
                            </Link>
                        </div>

                        {
                            products.data.length > 0 ? (
                                <div className="relative mt-4 overflow-x-auto md:shadow sm:rounded">
                                    <table className="w-full text-sm text-left whitespace-nowrap">
                                        <thead className="text-xs text-gray-700 uppercase md:bg-gray-200 border-y md:border-y-0">
                                            <tr>
                                                <th scope="col" className="p-4 pl-0 md:pl-4 min-w-[15rem]">
                                                    Product Details
                                                </th>
                                                <th scope="col" className="p-4 min-w-[6rem]">
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
                                                    <tr key={product.id} className="border-b md:bg-white hover:bg-gray-100">
                                                        <td scope="row" className="p-4 pl-0 font-medium text-gray-900 md:pl-4 whitespace-nowrap">
                                                            <div className="flex items-center space-x-4">
                                                                <div className="w-16 aspect-[9/7] overflow-hidden bg-gray-200 rounded">
                                                                    <img className="object-cover object-center w-full h-full" src={productImage(product, 'sm')} alt={product.name} />
                                                                </div>
                                                                <div>
                                                                    <div>
                                                                        {product.name}
                                                                    </div>
                                                                    <div className="mt-1 text-xs text-gray-500">
                                                                        #{product.id}
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </td>
                                                        <td className="p-4">
                                                            {moneyFormat(product.price)}
                                                        </td>
                                                        <td className="p-4">
                                                            5/10/2022
                                                        </td>
                                                        <td className="p-4">
                                                            <div className="flex space-x-4">
                                                                <Link href={route('products.show', {product: product.slug})} className="font-medium text-blue-600 hover:underline">
                                                                    View
                                                                </Link>

                                                                <Link href={route('products.edit', {product: product.slug})} className="font-medium text-blue-600 hover:underline">
                                                                    Edit
                                                                </Link>
                                                                
                                                                <DeleteForm product={product} />
                                                            </div>
                                                        </td>
                                                    </tr>
                                                ))
                                            }
                                        </tbody>
                                    </table>
                                </div>
                            ) : (
                                <div className="py-12 mt-4 text-center bg-gray-200 rounded">
                                    <div className="text-xl font-semibold">Nothing here!!</div>
                                    <div className="mt-8">
                                        <Link href={route('products.create')} className="px-4 py-2 rounded text-sky-500">
                                            Add Products
                                        </Link>
                                    </div>
                                </div>
                            )
                        }
                    </div>
                </div>
            </div>

            <Footer />
        </>
    )
}

