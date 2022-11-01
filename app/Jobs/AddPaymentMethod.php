<?php

namespace App\Jobs;

use App\Models\Order;
use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldBeUnique;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Bus\Dispatchable;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Queue\SerializesModels;

class AddPaymentMethod implements ShouldQueue
{
    use Dispatchable, InteractsWithQueue, Queueable, SerializesModels;

    /**
     * Create a new job instance.
     *
     * @return void
     */
    public function __construct(
        private array $request,
        private Order $order
    ) {
        //
    }

    /**
     * Execute the job.
     *
     * @return void
     */
    public function handle()
    {
        $user = $this->order->user;
        $user->createOrGetStripeCustomer();
        $user->addPaymentMethod($this->request['payment_method']);

        $firstHalf = $this->order->product->price / 2;
        $secondHalf = $this->order->product->price / 2;

        if ($this->order->product->price % 2 !== 0) {
            $firstHalf = intval(ceil($this->order->product->price / 2));
            $secondHalf = intval(floor($this->order->product->price / 2));
        }

        ChargePayment::dispatch($this->order->payments()->create([
            'amount' => $firstHalf
        ]));

        ChargePayment::dispatch($this->order->payments()->create([
            'amount' => $secondHalf
        ]))->delay(now()->addMinutes(5));
    }
}
