'use client';
import { Box } from '@mui/material';
import { PayPalButtons, PayPalScriptProvider } from '@paypal/react-paypal-js';
import React from 'react';

interface PayPalPaymentButtonProps {
    amount: number;
    paypalClientId: string | null;
    onSuccess: () => void;
    onError: (err: any) => void;
}

const PaypalPaymentButton: React.FC<PayPalPaymentButtonProps> = ({ amount, paypalClientId, onSuccess, onError }) => {
    const createOrder = () => {
        return fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/paypal/orders`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            // use the "body" param to optionally pass additional order information
            // like product ids and quantities
            body: JSON.stringify({
                cart: [
                    {
                        sku: "1blwyeo8",
                        quantity: 2,
                    },
                ],
            }),
        })
            .then((response) => response.json())
            .then((order) => {
                // Your code here after create the order
                return order.id;
            });
    }


    const onApprove = (data) => {
        return fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/paypal/orders/capture`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                orderID: data.orderID
            })
        })
            .then((response) => response.json())
            .then((orderData) => {
                const name = orderData.payer.name.given_name;
                alert(`Transaction completed by ${name}`);
            });
    }



    return (
        <Box style={{ maxWidth: '750px', minHeight: '200px' }}>
            {paypalClientId && (
                <PayPalScriptProvider options={{ clientId: paypalClientId, currency: 'USD' }}>
                    <PayPalButtons
                        createOrder={createOrder}
                        onApprove={(data) => onApprove(data)}
                    />
                </PayPalScriptProvider>
            )}
        </Box>
    );
};

export default PaypalPaymentButton;
