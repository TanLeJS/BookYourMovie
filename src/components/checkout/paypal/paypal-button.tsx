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
    return (
        <Box style={{ maxWidth: '750px', minHeight: '200px' }}>
            {paypalClientId && (
                <PayPalScriptProvider options={{ clientId: paypalClientId, currency: 'USD' }}>
                    <PayPalButtons
                        style={{ layout: 'vertical' }}
                        createOrder={(data, actions) => {
                            return actions.order.create({
                                purchase_units: [{
                                    amount: {
                                        value: amount.toString(),
                                    },
                                }],
                            });
                        }}
                        onApprove={(data, actions) => {
                            return actions.order.capture().then((details) => {
                                onSuccess(); // Call the success handler
                            });
                        }}
                        onError={(err) => {
                            onError(err); // Call the error handler
                        }}
                    />
                </PayPalScriptProvider>
            )}
        </Box>
    );
};

export default PaypalPaymentButton;
