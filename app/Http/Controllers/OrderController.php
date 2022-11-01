<?php

namespace App\Http\Controllers;

use App\Http\Requests\CreateOrderRequest;
use App\Jobs\ChargeHalf;
use App\Models\Order;
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
                'payment' => Payment::with(['order'])->find($payment->id),
                'intent' => $user->createSetupIntent()
            ]);
        });
    }

    public function savePaymentMethod(Request $request, Payment $payment)
    {
        $user = $payment->order->user;
        $user->createOrGetStripeCustomer();
        $user->addPaymentMethod($request->payment_method);

        ChargeHalf::dispatch($payment->order);
        ChargeHalf::dispatch($payment->order)->delay(now()->addMinutes(5));

        return redirect()->route('orders.status', ['order' => $payment->order->id]);
    }

    /**
     * Show the status of the payment
     *
     * @param \App\Models\Order $order
     * @return \Inertia\Response
     */
    public function status(Order $order)
    {
        return Inertia::render('Orders/Status', [
            'order' => $order
        ]);
    }
}
