<?php

namespace App\Http\Controllers;

use App\Http\Requests\CreateProductRequest;
use App\Http\Requests\UpdateProductRequest;
use App\Models\Product;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;

class ProductController extends Controller
{
    public function __construct()
    {
        $this->middleware(['auth'])->only(['store', 'index']);
    }

    public function index(Request $request)
    {
        $products = $request->user()->products()
            ->with(['user', 'images.sizes'])
            ->latest()->paginate();

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

        $product = $request->user()->products()
            ->create($request->validated());
            
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

    public function edit(Product $product)
    {
        $product = Product::with(['user', 'images.sizes'])->find($product->id);

        return Inertia::render('Edit', [
            'product' => $product
        ]);
    }

    public function update(UpdateProductRequest $request, Product $product)
    {
        $product->update($request->validated());

        if ($request->hasFile('image')) {
            $product->updateImage($request->file('image'));
        }

        session()->flash('success', 'Product updated successfully!');

        return redirect()->route('products.show', ['product' => $product->slug]);
    }

    public function delete(Product $product)
    {
        $this->authorize('delete', $product);
        $product->deleteImage();
        $product->delete();

        return back();
    }
}
