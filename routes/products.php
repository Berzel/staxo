<?php

use App\Http\Controllers\ProductController;
use Illuminate\Support\Facades\Route;

Route::get('products/create', [ProductController::class, 'create'])->name('products.create');
Route::delete('products/{product:slug}', [ProductController::class, 'delete'])->name('products.destroy');
Route::get('products/{product:slug}/edit', [ProductController::class, 'edit'])->name('products.edit');
Route::post('products/{product:slug}', [ProductController::class, 'update'])->name('products.update');
Route::get('products/{product:slug}', [ProductController::class, 'show'])->name('products.show');
Route::post('products', [ProductController::class, 'store'])->name('products.store');
Route::get('products', [ProductController::class, 'index'])->name('products.index');
