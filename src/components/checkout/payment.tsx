"use client"

import { useTicketContext } from "@/context/TicketContext";
import { Box, Divider, Typography } from "@mui/material";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import PayPalPaymentButton from "./paypal/paypal-button";



interface IScheduleDetail {
    scheduleResponse: ISchedule
}
type TicketType = 'Adult' | 'Senior' | 'Child';

const Payment = (props: IScheduleDetail) => {
    const schedule = props.scheduleResponse;
    const { ticketCounts } = useTicketContext();
    const router = useRouter();


    const [totalPrice, setTotalPrice] = useState<string | null>(null);
    const [fees, setFees] = useState<string | null>(null);
    const [taxes, setTaxes] = useState<string | null>(null);
    const [admissionFees, setAdmissionFees] = useState<string | null>(null);
    const [paypalClientId, setPaypalClientId] = useState<string | null>(null);

    useEffect(() => {
        // Ensure we're in the browser before accessing sessionStorage
        if (typeof window !== "undefined") {
            setTotalPrice(sessionStorage.getItem("totalPrice"));
            setFees(sessionStorage.getItem("fees"));
            setTaxes(sessionStorage.getItem("taxes"));
            setAdmissionFees(sessionStorage.getItem("admissionFees"));
        }

        // Fetch the PayPal client ID
        fetch('/api/paypal-client-id')
            .then((response) => response.json())
            .then((data) => {
                if (data.paypalClientId) {
                    setPaypalClientId(data.paypalClientId);
                } else {
                    console.error('PayPal client ID not found.');
                }
            })

            .catch((error) => {
                console.error('Failed to fetch PayPal client ID:', error);
            });
    }, []);

    if (!paypalClientId) {
        return <div>Loading...</div>;
    }

    const handleSuccess = () => {
        router.push('/');
    };

    const handleError = (error: any) => {
        console.error('Payment error:', error);
    };


    return (
        <Box>
            <Box maxWidth="35em" margin="auto">
                <Box paddingTop="2.75rem" justifyContent="center" alignItems="center">
                    <Typography variant="h5" sx={{ fontWeight: 700, marginBottom: '1rem' }}>
                        Order Summary
                    </Typography>
                    {(Object.keys(ticketCounts) as TicketType[]).map((ticketType) => (
                        <Box key={ticketType} display="flex" justifyContent="space-between" marginBottom="0.5rem" alignItems="center">
                            <Typography
                                sx={{
                                    fontSize: "1rem",
                                    fontWeight: 700,
                                    fontFamily: "Exo, Helvetica, sans-serif"
                                }}
                            >{ticketType} x{ticketCounts[ticketType]}
                            </Typography>
                            <Typography
                                sx={{
                                    fontSize: "1.125rem",
                                    fontWeight: 400,
                                    fontFamily: "Exo, Helvetica, sans-serif",
                                    margin: 0,
                                    padding: 0
                                }}>
                                ${schedule.ticketPrices[ticketType] * ticketCounts[ticketType]}
                            </Typography>
                        </Box>
                    ))}
                    <Divider sx={{ marginBottom: '1.5rem' }} />

                    <Box display="flex" justifyContent="space-between" marginBottom="0.5rem" alignItems="center">
                        <Typography
                            sx={{
                                fontSize: "1.25rem",
                                fontWeight: 700,
                                fontFamily: "Exo, Helvetica, sans-serif",
                                margin: 0,
                                padding: 0
                            }}>Subtotal</Typography>
                        <Typography sx={{
                            fontSize: "1.125rem",
                            fontWeight: 400,
                            fontFamily: "Exo, Helvetica, sans-serif",
                            margin: 0,
                            padding: 0
                        }}>${admissionFees}</Typography>
                    </Box>

                    <Box display="flex" justifyContent="space-between" marginBottom="0.5rem" alignItems="center">
                        <Box display="flex" gap="2px">
                            <Typography sx={{
                                fontSize: "1rem",
                                fontWeight: 700,
                                fontFamily: "Exo, Helvetica, sans-serif",
                                margin: 0,
                                padding: 0,
                            }}>
                                Booking Fee
                            </Typography>
                            <Typography>(Non-Refundable)</Typography>
                        </Box>
                        <Typography sx={{
                            fontSize: "1.125rem",
                            fontWeight: 400,
                            fontFamily: "Exo, Helvetica, sans-serif",
                            margin: 0,
                            padding: 0
                        }}>${fees}</Typography>
                    </Box>

                    <Box display="flex" justifyContent="space-between" marginBottom="0.5rem" alignItems="center">
                        <Typography sx={{
                            fontSize: "1rem",
                            fontWeight: 700,
                            fontFamily: "Exo, Helvetica, sans-serif",
                            margin: 0,
                            padding: 0,
                        }}>Taxes</Typography>
                        <Typography sx={{
                            fontSize: "1.125rem",
                            fontWeight: 400,
                            fontFamily: "Exo, Helvetica, sans-serif",
                            margin: 0,
                            padding: 0
                        }}>${taxes}</Typography>
                    </Box>



                    <Box display="flex" justifyContent="space-between" marginBottom="1.5rem">
                        <Typography sx={{
                            fontSize: "1.25rem",
                            fontWeight: 700,
                            fontFamily: "Exo, Helvetica, sans-serif",
                            margin: 0,
                            padding: 0
                        }}>Total</Typography>
                        <Typography sx={{
                            fontSize: "1.125rem",
                            fontWeight: 400,
                            fontFamily: "Exo, Helvetica, sans-serif",
                            margin: 0,
                            padding: 0
                        }}>${totalPrice}</Typography>
                    </Box>

                    <Divider sx={{ marginBottom: '1.5rem' }} />
                    <Typography variant="h6" sx={{ marginBottom: '1rem' }}>
                        Payment Methods
                    </Typography>
                    {/* Add payment method components here */}

                </Box>
                <PayPalPaymentButton amount={50} paypalClientId={paypalClientId} onSuccess={handleSuccess} onError={handleError} />
            </Box>
        </Box>
    );
}

// const actualPage: React.FC = () => {
//     return <Suspense fallback={<div>Loading...</div>}><Payment /></Suspense>;
// }

export default Payment;
