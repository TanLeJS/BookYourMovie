"use client"

import { useTicketContext } from '@/context/TicketContext';
import { useToast } from '@/utils/toast';
import styled from '@emotion/styled';
import BlockIcon from '@mui/icons-material/Block';
import PersonIcon from '@mui/icons-material/Person';
import { Box, Button, Container, Typography } from '@mui/material';
import { useRouter } from 'next/navigation';
import Seat from './seat';

interface ISeatSelector {
    scheduleResponse: ISchedule,
}

interface TicketCounts {
    Adult: number;
    Senior: number;
    Child: number;
}


const ConfirmButton = styled(Button)(({ theme }) => ({
    background: '#f56600',
}));

const SeatSelector = (props: ISeatSelector) => {
    const schedule = props.scheduleResponse
    const { ticketCounts, setTicketCounts, selectedSeats, setSelectedSeats } = useTicketContext();
    const seats = schedule.seats as ISeat[]
    const toast = useToast()
    const router = useRouter()
    const totalTickets = ticketCounts.Adult + ticketCounts.Child + ticketCounts.Senior

    const handleSeatClick = (seat: ISeat) => {
        if (seat.status === 'booked') return;
        const alreadySelected = selectedSeats.find((s) => s.label === seat.label);
        if (alreadySelected) {
            setSelectedSeats(selectedSeats.filter((s) => s.label !== seat.label));
        } else {
            if (selectedSeats.length >= totalTickets) {
                setSelectedSeats([...selectedSeats.slice(1), seat]);
            } else {
                setSelectedSeats([...selectedSeats, seat]);
            }
        }
    };

    const handlePurchase = () => {
        if (selectedSeats.length < totalTickets) {
            toast.error(`Please choose ${totalTickets} seats`)
        }
        else {
            router.push(`/checkout?scheduleID=${schedule._id}`)
        }
    }

    return (
        <Box>
            <Container sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
            }}>
                <Box maxWidth="35rem" justifyContent="center" alignItems="center">
                    <Typography sx={{
                        fontSize: "1.5625rem",
                        fontWeight: 700,
                        fontFamily: "Exo,Helvetica,sans-serif",
                        margin: "2.5rem 0 .7rem",
                        lineHeight: 1.45,
                    }}>
                        Select Seats
                    </Typography>
                    <Typography sx={{
                        fontSize: "1.125rem",
                        fontWeight: 700,
                        fontFamily: "Exo,Helvetica,sans-serif",
                        margin: "0",
                        paddingBottom: "0.4rem",
                        lineHeight: 1.45,
                    }}>
                        Keep the pre-selected seats below or select the seats you prefer on the map.
                    </Typography>
                    <Box display="flex" gap="10px" justifyContent="center" marginTop="40px" >
                        <Box display="flex" justifyContent="center" alignItems="center" >
                            <Box sx={{
                                border: "none",
                                width: '1.6rem',
                                height: '1.42rem',
                                margin: '3px',
                                borderRadius: ".44rem .44rem .1rem .1rem",
                                opacity: 1,
                                backgroundColor: "#000",
                                color: 'white',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'space-around',
                                padding: 0
                            }}>
                            </Box>
                            <Typography
                                sx={{
                                    fontSize: "0.875rem",
                                    fontWeight: 700,
                                    padding: ".16rem 0 0 .1rem",
                                    margin: 0,
                                    letterSpacing: "0.024rem",
                                    height: "100%",
                                    display: "flex",
                                    alignItems: "center",
                                    fontFamily: "Exo,Helvetica,sans-serif"
                                }}>
                                Available
                            </Typography>
                        </Box>
                        <Box display="flex" justifyContent="center" alignItems="center" >
                            <Box sx={{
                                border: "none",
                                width: '1.6rem',
                                height: '1.42rem',
                                margin: '3px',
                                borderRadius: ".44rem .44rem .1rem .1rem",
                                opacity: 1,
                                backgroundColor: "#f56600",
                                color: 'white',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'space-around',
                                padding: 0
                            }}>
                            </Box>
                            <Typography
                                sx={{
                                    fontSize: "0.875rem",
                                    fontWeight: 700,
                                    padding: ".16rem 0 0 .1rem",
                                    margin: 0,
                                    letterSpacing: "0.024rem",
                                    height: "100%",
                                    display: "flex",
                                    alignItems: "center",
                                    fontFamily: "Exo,Helvetica,sans-serif"
                                }}>
                                Selected
                            </Typography>
                        </Box>
                        <Box display="flex" justifyContent="center" alignItems="center" >
                            <PersonIcon
                                sx={{
                                    width: '1.6rem',
                                    height: '1.42rem',
                                    borderRadius: ".44rem .44rem .1rem .1rem",
                                    backgroundColor: 'gray',
                                    color: 'white',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    padding: 0,
                                }}
                            />
                            <Typography
                                sx={{
                                    fontSize: "0.875rem",
                                    fontWeight: 700,
                                    padding: ".16rem 0 0 .1rem",
                                    margin: 0,
                                    letterSpacing: "0.024rem",
                                    height: "100%",
                                    display: "flex",
                                    alignItems: "center",
                                    fontFamily: "Exo,Helvetica,sans-serif"
                                }}>
                                Booked
                            </Typography>
                        </Box>
                        <Box display="flex" justifyContent="center" alignItems="center" >
                            <BlockIcon
                                sx={{
                                    width: '1.6rem',
                                    height: '1.42rem',
                                    borderRadius: ".44rem .44rem .1rem .1rem",
                                    backgroundColor: 'gray',
                                    color: 'white',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    padding: 0,
                                }}
                            />
                            <Typography
                                sx={{
                                    fontSize: "0.875rem",
                                    fontWeight: 700,
                                    padding: ".16rem 0 0 .1rem",
                                    margin: 0,
                                    letterSpacing: "0.024rem",
                                    height: "100%",
                                    display: "flex",
                                    alignItems: "center",
                                    fontFamily: "Exo,Helvetica,sans-serif"
                                }}
                            > Unavailable</Typography>
                        </Box>

                    </Box>
                </Box>
            </Container >
            <Container
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                }}>
                <Box sx={{
                    padding: '20px',
                    borderRadius: '10px',
                    textAlign: 'center',
                    alignItems: "center",
                    justifyContent: "center"
                }}>
                    <Box
                        display="flex"
                        alignItems="center"
                        width="100%"
                        justifyContent="center"
                        my={2}
                    >
                        <Box flex={1} height="4px" bgcolor="grey.400" />

                        <Typography
                            sx={{
                                backgroundColor: '#b2b2b2',
                                margin: '0 8px',
                                color: 'white',
                                fontWeight: 700,
                                borderRadius: ".2rem",
                                padding: ".2rem 1.2rem",
                                letterSpacing: ".039rem",
                                fontFamily: "Exo,Helvetica,sans-serif"

                            }}
                        >
                            SCREEN
                        </Typography>
                        <Box flex={1} height="4px" bgcolor="grey.400" />
                    </Box>

                    <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(18, 1fr)', gap: '5px', marginBottom: '20px' }}>
                        {seats.map((seat) => (
                            <Seat
                                key={seat.label}
                                seat={seat}
                                selected={selectedSeats.includes(seat)}
                                handleSeatClick={handleSeatClick}
                            />
                        ))}
                    </Box>
                    <Box display="flex" alignItems="center" justifyContent="center">
                        <Typography sx={{
                            fontSize: "1.3125rem",
                            fontWeight: 700,
                            margin: "0.8rem",
                            fontFamily: "Exo,Helvetica,sans-serif"
                        }}>
                            Select Seat(s):
                        </Typography>
                        <Typography sx={{
                            fontSize: "1.3125rem",
                            fontWeight: 700,
                            fontFamily: "Exo,Helvetica,sans-serif"
                        }}>
                            {selectedSeats.length > 0
                                ? selectedSeats.map((seat, index) =>
                                    `${seat.label}${index < selectedSeats.length - 1 ? ', ' : ''}`
                                ).join('')
                                : ''}
                        </Typography>
                    </Box>
                    <ConfirmButton sx={{
                        cursor: "pointer",
                        textAlign: "center",
                        padding: "1rem 1.5rem"
                    }}
                        onClick={handlePurchase}
                    >
                        <Typography
                            sx={{
                                fontWeight: 600,
                                color: "#fff"
                            }}>
                            CONFIRM SEATS
                        </Typography>
                    </ConfirmButton>
                </Box>
            </Container>
        </Box >
    );
};

export default SeatSelector;
