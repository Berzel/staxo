<?php

namespace App\Jobs;

use App\Mail\PaymentCompleted;
use App\Models\Payment;
use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Bus\Dispatchable;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Queue\SerializesModels;
use Illuminate\Support\Facades\Mail;

class ChargePayment implements ShouldQueue
{
    use Dispatchable, InteractsWithQueue, Queueable, SerializesModels;

    /**
     * Create a new job instance.
     *
     * @return void
     */
    public function __construct(
        private Payment $payment
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
        $user = $this->payment->order->user;

        $user->charge(
            $this->payment->amount,
            $user->paymentMethods()->first()->toArray()['id']
        );

        Mail::to($user)->send(new PaymentCompleted($this->payment->order));
    }
}
