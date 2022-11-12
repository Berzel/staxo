<?php

namespace App\Http\Controllers;

use App\Http\Requests\CreateOrderRequest;
use App\Http\Requests\CreatePaymentMethod;
use App\Jobs\AddPaymentMethod;
use App\Models\Order;
use App\Models\Product;
use App\Models\User;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Session;
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
        Session::flash('message', [
            'type' => 'info',
            'text' => 'You must enter your email address to continue. Alternatively you can log in to your account so you can track your order status at a later point.'
        ]);

        return Inertia::render('Orders/Create', [
            'product' => $product
        ]);
    }

    /**
     * Create a new order and redirect the user to stripe checkout
     *
     * @param \App\Http\Requests\CreateOrderRequest $request
     * @param \App\Models\Product $product
     * @return \Inertia\Response
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

            $intent = $user->createSetupIntent();

            return Inertia::render('Orders/Charge', [
                'order' => $order,
                'intent' => $intent
            ]);
        });
    }

    /**
     * Save the added payment method
     *
     * @param \App\Http\Requests\CreatePaymentMethod $request
     * @param \App\Model\Order $order
     * @return \Illuminate\Routing\Redirector|\Illuminate\Http\RedirectResponse
     */
    public function savePaymentMethod(CreatePaymentMethod $request, Order $order)
    {
        AddPaymentMethod::dispatch($request->validated(), $order);
        return redirect()->route('orders.status', ['order' => $order->id]);
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
