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
                                <form onSubmit={deleteProduct(product)} className="p-4 bg-white rounded">
                                    
                                    <div className="flex space-x-4">
                                        <button type="button" onClick={() => setShowConfirmForm(false)} className="px-4 py-2 bg-gray-200 rounded w-[10rem]">
                                            Cancel
                                        </button>
                                        <button className="px-4 py-2 text-white bg-red-500 rounded w-[10rem]">
                                            Confirm Delete
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
                                                </th>
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
                    </div>
                </div>
            </div>
        </>
    )
}

