<?php

use App\Http\Controllers\DashboardController;
use App\Http\Controllers\OrderController;
use App\Http\Controllers\ProductController;
use App\Http\Controllers\WelcomeController;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::get('/payments/{payment}', [OrderController::class, 'status'])->name('orders.status');
Route::get('/products/{product:slug}/orders/create', [OrderController::class, 'create'])->name('orders.create');
Route::post('/products/{product:slug}/orders', [OrderController::class, 'checkout'])->name('orders.checkout');

Route::delete('products/{product:slug}', [ProductController::class, 'delete'])->name('products.destroy');
Route::get('products/{product:slug}/edit', [ProductController::class, 'edit'])->name('products.edit');
Route::post('products/{product:slug}', [ProductController::class, 'update'])->name('products.update');
Route::get('products/{product:slug}', [ProductController::class, 'show'])->name('products.show');
Route::get('products/create', [ProductController::class, 'create'])->name('products.create');
Route::post('products', [ProductController::class, 'store'])->name('products.store');
Route::get('products', [ProductController::class, 'index'])->name('products.index');

Route::get('/dashboard', DashboardController::class)->name('dashboard');
Route::get('/', WelcomeController::class)->name('home');

require __DIR__.'/auth.php';
