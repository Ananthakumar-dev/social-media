import { useState } from 'react';
import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import axios from '../axios'; // Replace with your Axios setup

const PaymentPage = () => {
    const stripe = useStripe();
    const elements = useElements();
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState('');

    const handlePayment = async (e) => {
        e.preventDefault();
        if (!stripe || !elements) {
            setMessage('Stripe is not loaded yet.');
            return;
        }

        setLoading(true);
        setMessage('');

        try {
            // Call your backend to create a payment intent
            const { data } = await axios.post('/create-payment-intent', {
                amount: 20, // $20 (use cents for the backend: 2000)
            });

            const cardElement = elements.getElement(CardElement);

            // Confirm the payment using the client secret
            const { error, paymentIntent } = await stripe.confirmCardPayment(data.clientSecret, {
                payment_method: {
                    card: cardElement,
                },
            });

            if (error) {
                setMessage(error.message);
            } else if (paymentIntent.status === 'succeeded') {
                setMessage('Payment successful!');
            }
        } catch (err) {
            setMessage('Error processing payment.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="max-w-md mx-auto p-4">
            <h2 className="text-2xl font-bold mb-4">Stripe Payment</h2>
            <form onSubmit={handlePayment} className="space-y-4">
                <CardElement className="border p-2" />
                <button
                    type="submit"
                    disabled={!stripe || loading}
                    className="w-full bg-blue-500 text-white py-2 rounded disabled:opacity-50"
                >
                    {loading ? 'Processing...' : 'Pay $20'}
                </button>
            </form>
            {message && <p className="mt-4 text-center">{message}</p>}
        </div>
    );
};

export default PaymentPage;
