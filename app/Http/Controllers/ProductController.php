<?php

namespace App\Http\Controllers;

use App\Http\Requests\CreateProductRequest;
use App\Http\Requests\UpdateProductRequest;
use App\Models\Product;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;

class ProductController extends Controller
{
    /**
     * Create a new controller instance
     * 
     * @return void
     */
    public function __construct()
    {
        $this->middleware(['auth'])->except(['show']);
    }

    /**
     * Show a list of the logged in users products
     *
     * @param Request $request
     * @return \Inertia\Response
     */
    public function index(Request $request)
    {
        // Use API Resource to control fields that get to frontend
        $products = $request->user()->products()
            ->with(['user', 'images.sizes'])
            ->latest()->paginate();

        return Inertia::render('Products', [
            'products' => $products,
        ]);
    }

    /**
     * Show a form to create a new product
     *
     * @return \Inertia\Response
     */
    public function create()
    {
        return Inertia::render('Create');
    }

    /**
     * Save a new product to database
     *
     * @param CreateProductRequest $request
     * @return \Illuminate\Http\RedirectResponse
     */
    public function store(CreateProductRequest $request)
    {
        return DB::transaction(function () use ($request){
            $this->authorize('create', Product::class);

            $product = $request->user()->products()
                ->create($request->validated());
                
            $product->addImage($request->file('image'));

            session()->flash('success', 'Product saved successfully!');

            return redirect()->route('products.show', ['product' => $product->slug]);
        });
    }

    /**
     * Show a single product
     *
     * @param Product $product
     * @return \Inertia\Response
     */
    public function show(Product $product)
    {
        // Can use a product resource instead
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

    /**
     * Show the form to edit a product
     *
     * @param Product $product
     * @return \Inertia\Response
     */
    public function edit(Product $product)
    {
        $product = Product::with(['user', 'images.sizes'])->find($product->id);

        return Inertia::render('Edit', [
            'product' => $product
        ]);
    }

    /**
     * Update the product in storage
     *
     * @param UpdateProductRequest $request
     * @param Product $product
     * @return \Illuminate\Http\RedirectResponse
     */
    public function update(UpdateProductRequest $request, Product $product)
    {
        return DB::transaction(function () use ($request, $product){
            $product->update($request->validated());

            if ($request->hasFile('image')) {
                $product->updateImage($request->file('image'));
            }

            session()->flash('success', 'Product updated successfully!');

            return redirect()->route('products.show', ['product' => $product->slug]);
        });
    }

    /**
     * Delete a product from storage
     *
     * @param Product $product
     * @return \Illuminate\Http\RedirectResponse
     */
    public function delete(Product $product)
    {
        return DB::transaction(function () use ($product) {
            $this->authorize('delete', $product);
            $product->deleteImage();
            $product->delete();

            return back();
        });
    }
}
