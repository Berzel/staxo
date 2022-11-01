<?php

use App\Http\Controllers\OrderController;
use Illuminate\Support\Facades\Route;

Route::get('/orders/{order}/status', [OrderController::class, 'status'])->name('orders.status');
Route::post('/products/{product:slug}/orders', [OrderController::class, 'checkout'])->name('orders.checkout');
Route::get('/products/{product:slug}/orders/create', [OrderController::class, 'create'])->name('orders.create');
Route::post('/orders/{order}/payment_methods', [OrderController::class, 'savePaymentMethod'])->name('payment_methods.store');
