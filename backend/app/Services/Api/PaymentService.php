<?php

namespace App\Services\Api;

use App\Models\Payment;
use Exception;
use Illuminate\Support\Facades\Auth;

class PaymentService
{
    /**
     * get all payments
     */
    public function getPayments()
    {
        return Payment::query();
    }

    /**
     * Store payment
     */
    public function store(
        array $validated
    )
    {
        try {
            $payment = Payment::create([
                'user_id' => Auth::id(),
                'transaction_id' => $validated['transaction_id'],
                'amount' => $validated['amount'],
            ]);
        } catch(Exception $e) {
            return [
                'status' => false,
                'message' => app()->isLocal() ? $e->getMessage() : 'Something went wrong'
            ];
        }

        return [
            'status' => true,
            'message' => 'Payment created Successfully',
            'data' => $payment
        ];
    }
}
