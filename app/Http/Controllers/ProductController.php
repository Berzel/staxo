<?php

namespace App\Http\Controllers;

use App\Http\Requests\CreateProductRequest;
use App\Http\Requests\UpdateProductRequest;
use App\Models\Product;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Session;
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
     * @param  \Illuminate\Http\Request  $request
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
     * @param  CreateProductRequest  $request
     * @return \Illuminate\Http\RedirectResponse
     */
    public function store(CreateProductRequest $request)
    {
        return DB::transaction(function () use ($request) {
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
     * @param  \App\Models\Product  $product
     * @return \Inertia\Response
     */
    public function show(Product $product)
    {
        $relations = ['user', 'images.sizes'];

        return Inertia::render('Product', [
            'product' => $product->load($relations),
            'others' => Product::with($relations)->take(8)->inRandomOrder()->get()
        ]);
    }

    /**
     * Show the form to edit a product
     *
     * @param  Product  $product
     * @return \Inertia\Response
     */
    public function edit(Product $product)
    {
        return Inertia::render('Edit', [
            'product' => $product->load(['user', 'images.sizes']),
        ]);
    }

    /**
     * Update the product in storage
     *
     * @param  \App\Http\Requests\UpdateProductRequest  $request
     * @param  \App\Models\Product  $product
     * @return \Illuminate\Http\RedirectResponse
     */
    public function update(UpdateProductRequest $request, Product $product)
    {
        return DB::transaction(function () use ($request, $product) {
            $product->update($request->validated());

            if ($request->hasFile('image')) {
                $product->updateImage($request->file('image'));
            }

            Session::flash('message', [
                'type' => 'success',
                'text' => 'Product updated successfully!'
            ]);

            return redirect()->route('products.show', ['product' => $product->slug]);
        });
    }

    /**
     * Delete a product from storage
     *
     * @param  \App\Models\Product  $product
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
