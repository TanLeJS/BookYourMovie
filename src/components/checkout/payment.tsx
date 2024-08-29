"use client"
import { useTicketContext } from "@/context/TicketContext";
import { Box, Divider, Typography } from "@mui/material";

interface IResponse {
    scheduleResponse: ISchedule,
}
type TicketType = 'Adult' | 'Senior' | 'Child';

const Payment = (props: IResponse) => {
    const schedule = props.scheduleResponse
    const { ticketCounts } = useTicketContext();

    const totalPrice = sessionStorage.getItem("totalPrice")
    const fees = sessionStorage.getItem("fees")
    const taxes = sessionStorage.getItem("taxes")
    const admissionFees = sessionStorage.getItem("admissionFees")

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
            </Box>
        </Box>
    );
}

export default Payment;
