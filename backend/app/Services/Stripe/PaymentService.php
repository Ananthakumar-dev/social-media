<?php

namespace App\Services\Stripe;

use Stripe\PaymentIntent;
use Stripe\Stripe;

class PaymentService
{
    /**
     * Create payment intent
     */
    public function createPaymentIntent(
        float $amount
    ) {
        try {
            Stripe::setApiKey(env('STRIPE_SECRET'));

            $paymentIntent = PaymentIntent::create([
                'amount' => $amount * 100, // Convert to cents
                'currency' => 'usd',
                'payment_method_types' => ['card'],
            ]);

            return [
                'status' => true,
                'message' => 'Payment intent created successfully',
                'clientSecret' => $paymentIntent->client_secret,
            ];
        } catch (\Exception $e) {
            return [
                'status' => true,
                'message' => $e->getMessage()
            ];
        }
    }
}
