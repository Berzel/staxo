<?php

use App\Http\Controllers\DashboardController;
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

Route::post('products', [ProductController::class, 'store'])->name('products.store');
Route::get('products', [ProductController::class, 'index'])->name('products.index');
Route::get('products/create', [ProductController::class, 'create'])->name('products.create');
Route::get('products/{product:slug}', [ProductController::class, 'show'])->name('products.show');

Route::get('/dashboard', DashboardController::class)->name('dashboard');
Route::get('/', WelcomeController::class)->name('welcome');

require __DIR__.'/auth.php';
