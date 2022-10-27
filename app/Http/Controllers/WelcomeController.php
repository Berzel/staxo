<?php

namespace App\Http\Controllers;

use App\Models\Product;
use Illuminate\Support\Facades\Route;
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
                'sizes'
            ]
        ])->paginate();

        return Inertia::render('Welcome', [
            'products' => $products,
            'canLogin' => Route::has('login'),
            'canRegister' => Route::has('register'),
        ]);
    }
}
