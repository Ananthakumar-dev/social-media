<?php

namespace App\Http\Controllers;

use App\Http\Requests\PaymentRequest;
use App\Services\Api\PaymentService as ApiPaymentService;
use App\Services\Stripe\PaymentService;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Stripe\Stripe;
use Stripe\PaymentIntent;

class PaymentController extends Controller
{
    private $authId;
    /**
     * initiate dependencies
     */
    public function __construct()
    {
        $this->authId = Auth::id();
    }

    /**
     * create payment intent
     */
    public function createPaymentIntent(
        PaymentService $paymentService,
        Request $request
    ) {
        if (!$request->amount) {
            return [
                'status' => false,
                'message' => 'Amount is required'
            ];
        }

        return $paymentService->createPaymentIntent(
            $request->amount
        );
    }

    /**
     * store payment for user
     */
    public function store(
        PaymentRequest $paymentRequest,
        ApiPaymentService $paymentService
    ) {
        $validatedFields = $paymentRequest->validated();

        return $paymentService->store(
            validated: $validatedFields
        );
    }

    /**
     * get all payments for user
     */
    public function payments(
        ApiPaymentService $paymentService
    ) {
        $payments = $paymentService->getPayments();

        if ($this->authId) {
            $payments = $payments->where('user_id', $this->authId);
        }

        return $payments->get();
    }
}
