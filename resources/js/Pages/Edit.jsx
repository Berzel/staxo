import Footer from "@/Components/Footer";
import TopNav from "@/Components/TopNav";
import productImage from "@/Utils/productImage";
import { Head, useForm } from "@inertiajs/inertia-react";
import { useState } from "react";

export default function Edit({product}) {

    const [ previewUrl, setPreviewUrl ] = useState(productImage(product, 'default'));
    const { data, setData, post, errors }  = useForm({
        name: product.name,
        price: product.price
    })

    function onImageChange(event) {
        const file = event.target.files[0];
        setData('image', event.target.files[0]);
        setPreviewUrl(URL.createObjectURL(file));
    }

    function updateProduct(event) {
        event.preventDefault();
        post(route('products.update', {product: product.slug}));
    }

    return (
        <>
            <Head title="Edit Product">
                <meta name="description" content="Edit product" />
            </Head>

            <div className='container'>
                <TopNav />
            </div>

            <div className="py-4 text-white bg-indigo-500">
                <div className='container text-sm font-semibold'>
                    Home / Edit Product
                </div>
            </div>

            <div className='container mt-6'>
                <div className="flex md:space-x-8">
                    <div className="flex-shrink-0 hidden md:block">
                        <div className="shadow rounded p-2 min-w-[15rem]">
                            Left Navigation Menu
                        </div>
                    </div>
                    <div className="flex-grow md:max-w-[40rem]">
                        <form onSubmit={updateProduct} encType="multipart/form-data">
                            <label htmlFor="image" className="block cursor-pointer">
                                <input
                                    type="file"
                                    id="image"
                                    className="hidden"
                                    name="image"
                                    onChange={onImageChange}
                                    accept=".jpeg,.png,.jpg,.webp" />

                                <div className={`bg-gray-200 rounded overflow-hidden aspect-[9/7]`}>
                                    {
                                        previewUrl && (
                                            <img
                                                src={previewUrl}
                                                alt="Listing Image"
                                                className="object-cover object-center w-full h-full" />
                                        )
                                    }

                                    {
                                        !previewUrl && (
                                            <div className="flex flex-col items-center justify-center w-full h-full">
                                                <ImageUploadIcon className="w-16 h-16 text-indigo-500 fill-current md:h-24 md:w-24" />
                                                <h2 className="mt-8 text-lg font-semibold">Click to <span className="text-indigo-500">browse</span> image.</h2>
                                                <p className="mt-2 font-light text-gray-500 ">.jpg, .jpeg, .png, .webp files, max 20MB.</p>
                                            </div>
                                        )
                                    }
                                </div>
                            </label>
                            { errors.image && <div className="mt-1 text-sm text-red-500">{errors.image}</div> }

                            <label htmlFor="name" className="block mt-8">
                                <div className="text-sm font-semibold">Product Name <span className="text-red-400">*</span></div>
                                <input
                                    required
                                    id="name"
                                    type="text"
                                    value={data.name ?? ''}
                                    onChange={e => setData('name', e.target.value)}
                                    className="block w-full border rounded"  />
                            </label>
                            { errors.name && <div className="mt-1 text-sm text-red-500">{errors.name}</div> }

                            <label htmlFor="price" className="block mt-8">
                                <div className="text-sm font-semibold">Product Price (US$) <span className="text-red-400">*</span></div>
                                <input
                                    id="price"
                                    required
                                    type="text"
                                    value={data.price ?? ''}
                                    onChange={e => setData('price', e.target.value)}
                                    className="block w-full border rounded"  />
                            </label>
                            { errors.price && <div className="mt-1 text-sm text-red-500">{errors.price}</div> }

                            <div className="mt-8">
                            <button className="block w-full px-4 py-4 font-semibold text-center text-white bg-indigo-500 rounded">
                                Update Product
                            </button>
                            </div>
                        </form>
                    </div>
                    <div className="flex-shrink-0 hidden md:block">
                        <div className="min-w-[20rem]">

                        </div>
                    </div>
                </div>
            </div>

            <Footer />
        </>
    )
}
