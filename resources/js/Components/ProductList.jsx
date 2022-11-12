import moneyFormat from "@/Utils/moneyFormat";
import productImage from "@/Utils/productImage";
import { Link } from "@inertiajs/inertia-react";

export default function ProductList({products}) {
    return (
        <ul className="flex flex-wrap justify-between -mx-2 -mt-4 md:-mx-4">
            {products.map(product => (
                <li key={product.id} className="w-[50%] md:w-[25%] flex-grow-0 my-4">
                    <Link
                        className="block mx-2 md:mx-4"
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
                                <h2 className="font-semibold text-indigo-500">
                                    {moneyFormat(product.price)}
                                </h2>
                            </div>
                    </Link>
                </li>
            ))}
        </ul>
    )
}
