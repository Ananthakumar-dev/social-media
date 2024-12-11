import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import PaymentPage from "../pages/PaymentPage.jsx";

const stripePromise = loadStripe('your_stripe_publishable_key');

const PaymentPageWrapper = () => {
    return (
        <Elements stripe={stripePromise}>
            <PaymentPage />
        </Elements>
    );
};

export default PaymentPageWrapper;
