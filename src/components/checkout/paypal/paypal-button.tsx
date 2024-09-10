'use client';
import { useToast } from '@/utils/toast';
import { Box } from '@mui/material';
import { PayPalButtons, PayPalScriptProvider } from '@paypal/react-paypal-js';
import React from 'react';

interface PayPalPaymentButtonProps {
    amount: number;
    paypalClientId: string | null;
    selectedSeats: ISeat[]
    // onSuccess: () => void;
    // onError: (err: any) => void;
    // schedule: ISchedule
}

const PaypalPaymentButton: React.FC<PayPalPaymentButtonProps> = ({ amount, paypalClientId, selectedSeats }) => {
    const toast = useToast()


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
                        amount: amount,
                        selectedSeats: selectedSeats,
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



    const onApprove = (data: any) => {
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
                toast.success(`Transaction completed by ${name}`)
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
