<?php

namespace App\Http\Controllers;

use App\Http\Requests\CreateOrderRequest;
use App\Models\Payment;
use App\Models\Product;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Str;
use Inertia\Inertia;

class OrderController extends Controller
{
    /**
     * Show the form to create a new order
     *
     * @param \App\Models\Product $product
     * @return \Inertia\Response
     */
    public function create(Product $product)
    {
        return Inertia::render('Orders/Create', [
            'product' => $product,
            'csrf_token' => csrf_token()
        ]);
    }

    /**
     * Create a new order and redirect the user to stripe checkout
     *
     * @param \App\Http\Requests\CreateOrderRequest $request
     * @param \App\Models\Product $product
     */
    public function checkout(CreateOrderRequest $request, Product $product)
    {
        return DB::transaction(function () use ($request, $product) {
            $user = User::firstOrCreate([
                'email' => $request->email
            ], [
                'email' => $request->email,
                'name' => $request->email,
                'password' => Str::random(32)
            ]);

            $order = $user->orders()->create([
                'product_id' => $product->id
            ]);

            $payment = $order->payments()->create([
                'amount' => $product->price
            ]);

            return Inertia::render('Orders/Charge', [
                'payment' => $payment,
                'intent' => $user->pay($payment->amount)
            ]);
        });
    }

    public function status(Request $request, Payment $payment)
    {
        $payment_intent = $request->payment_intent;
        $status = $request->redirect_status = 'succeeded';
        $payment_intent_client_secret = $request->payment_intent_client_secret;
    }
}
