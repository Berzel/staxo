import ImageUploadIcon from "@/Components/ImageUploadIcon";
import TopNav from "@/Components/TopNav";
import { Head, useForm } from "@inertiajs/inertia-react";
import { useState } from "react";

export default function Create() {
    const { data, setData, post } = useForm({});
    const [ previewUrl, setPreviewUrl ] = useState();

    function onImageChange(event) {
        const file = event.target.files[0];
        setData('image', event.target.files[0]);
        setPreviewUrl(URL.createObjectURL(file));
    }

    function addProduct(event) {
        event.preventDefault();
        post(route('products.store'));
    }

    return (
        <>
            <Head title="Create Product">
                <meta name="description" content="Create product" />
            </Head>

            <div className='container px-4 mx-auto'>
                <TopNav />
            </div>

            <div className="py-4 text-white bg-sky-500">
                <div className='container px-4 mx-auto text-sm font-semibold'>
                    Home / Create Product
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
                        <form onSubmit={addProduct} encType="multipart/form-data">
                            <label htmlFor="image" className="block cursor-pointer">
                                <input 
                                    type="file" 
                                    id="image" 
                                    className="hidden"
                                    name="image"
                                    onChange={onImageChange}
                                    accept=".jpeg,.png,.jpg,.webp" />
                                        
                                <div className={`bg-gray-200 rounded overflow-hidden ${previewUrl ? 'aspect-auto':'aspect-[9/7]'}`}>
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
                                                <ImageUploadIcon className="w-16 h-16 fill-current md:h-24 md:w-24 text-sky-500" />
                                                <h2 className="mt-8 text-lg font-semibold">Click to <span className="text-sky-500">browse</span> image.</h2>
                                                <p className="mt-2 font-light text-gray-500 ">.jpg, .jpeg, .png, .webp files, max 20MB.</p>
                                            </div>
                                        )
                                    }
                                </div>
                            </label>
                            
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
                            
                            <div className="mt-8">
                            <button className="block w-full px-4 py-4 font-semibold text-center text-white rounded-lg bg-sky-500">
                                Add Product
                            </button>
                            </div>
                        </form>
                    </div>
                    <div className="flex-shrink-0">
                        <div className="min-w-[20rem]">

                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}