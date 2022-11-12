<?php

namespace App\Jobs;

use App\Mail\PaymentCompleted;
use App\Models\Order;
use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Bus\Dispatchable;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Queue\SerializesModels;
use Illuminate\Support\Facades\Mail;

class ChargeHalf implements ShouldQueue
{
    use Dispatchable, InteractsWithQueue, Queueable, SerializesModels;

    /**
     * Create a new job instance.
     *
     * @return void
     */
    public function __construct(
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

        $user->charge(
            intval(ceil($this->order->payments->first()->amount / 2)),
            $user->paymentMethods()->first()->toArray()['id']
        );

        Mail::to($user)->send(new PaymentCompleted($this->order));
    }
}
