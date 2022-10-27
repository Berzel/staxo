<?php

namespace App\Http\Controllers;

use App\Http\Requests\CreateProductRequest;
use App\Models\Product;
use Inertia\Inertia;

class ProductController extends Controller
{
    public function __construct()
    {
        $this->middleware(['auth'])->only(['store', 'index']);
    }

    public function index()
    {
        $products = Product::paginate();

        return Inertia::render('Products', [
            'products' => $products,
        ]);
    }

    public function create()
    {
        return Inertia::render('Create');
    }

    public function store(CreateProductRequest $request)
    {
        $this->authorize('create', Product::class);

        $product = Product::create($request->validated());
        $product->addImage($request->file('image'));

        session()->flash('success', 'Product saved successfully!');

        return redirect()->route('products.show', ['product' => $product->slug]);
    }

    public function show(Product $product)
    {
        $product = Product::with([
            'user',
            'images' => [
                'sizes',
            ],
        ])->find($product->id);

        return Inertia::render('Product', [
            'product' => $product,
        ]);
    }
}
