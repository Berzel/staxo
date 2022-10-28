<?php

namespace App\Http\Controllers;

use App\Models\Product;
use Inertia\Inertia;

class WelcomeController extends Controller
{
    /**
     * Show the application homepage
     */
    public function __invoke()
    {
        $products = Product::with([
            'user',
            'images' => [
                'sizes',
            ],
        ])->latest()->paginate(16);

        return Inertia::render('Welcome', [
            'products' => $products,
        ]);
    }
}
