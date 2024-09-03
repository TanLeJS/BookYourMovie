'use client';
import { useEffect } from 'react';

declare global {
    interface Window {
        paypal?: any;
    }
}

const PayPalPaymentButton = ({ amount, paypalClientId, onSuccess, onError }: { amount: number; paypalClientId: string | null; onSuccess: () => void; onError: (err: any) => void; }) => {

    useEffect(() => {
        const script = document.createElement('script');
        script.src = `https://www.paypal.com/sdk/js?client-id=${paypalClientId}`;
        script.async = true;
        script.onload = () => {
            initializePayPalButton();
        };
        document.body.appendChild(script);

        return () => {
            document.body.removeChild(script);
        };
    }, []);

    const initializePayPalButton = () => {
        window.paypal.Buttons({
            createOrder: function (data: any, actions: any) {
                return actions.order.create({
                    purchase_units: [{
                        amount: {
                            value: amount,
                            currency_code: 'USD',
                        },
                        application_context: {
                            user_action: 'PAY_NOW',
                            shipping_preference: 'NO_SHIPPING',
                            payment_method: { payee_preferred: 'IMMEDIATE_PAYMENT_REQUIRED' },
                            return_url: process.env.NEXTAUTH_URL,
                            cancel_url: process.env.NEXTAUTH_URL,
                        },
                    }],
                });
            },
            onApprove: function (data: any, actions: any) {
                return actions.order.capture().then(function (details: any) {
                    onSuccess();
                });
            },
            onError: function (err: any) {
                onError(err);
            },
        }).render('#paypal-button-container');
    };

    return <div id="paypal-button-container" className='bg-gray-200'></div>;
};

export default PayPalPaymentButton;