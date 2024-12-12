<?php

namespace App\Services\Stripe;

use App\Services\CacheStore;
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
            $cacheStore = app(CacheStore::class);
            ['Stripe' => $Stripe] = $cacheStore->api_credentials();

            if (!isset($Stripe['secret_key']) || !$Stripe['secret_key']) {
                return [
                    'status' => false,
                    'message' => 'Keys not found'
                ];
            }

            Stripe::setApiKey(
                $Stripe['secret_key']
            );

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
