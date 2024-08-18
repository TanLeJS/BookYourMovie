"use client"
import { useToast } from '@/utils/toast';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import ImportExportIcon from '@mui/icons-material/ImportExport';
import MovieCreationIcon from '@mui/icons-material/MovieCreation';
import RemoveCircleOutlineIcon from '@mui/icons-material/RemoveCircleOutline';
import { Accordion, AccordionDetails, AccordionSlots, AccordionSummary, Box, Button, IconButton, styled, TextField, Typography } from '@mui/material';
import Fade from '@mui/material/Fade';
import { signOut, useSession } from 'next-auth/react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import React, { useEffect } from 'react';
import CheckOutSignInModal from './checkout.signin';
import CheckOutSignUp from './checkout.signup';

const ConfirmButton = styled(Button)`
  color: #f56600;
  pointer-events: ${({ disabled }) => (disabled ? 'none' : 'auto')};
  opacity: ${({ disabled }) => (disabled ? 0.5 : 1)};
`;


interface IScheduleDetail {
    scheduleResponse: ISchedule
}

// Define types for ticket prices and counts
type TicketType = 'Adult' | 'Senior' | 'Child';

const ticketPrices: Record<TicketType, number> = {
    Adult: 19.99,
    Senior: 17.99,
    Child: 17.49,
};

const TicketPurchase = (props: IScheduleDetail) => {
    const schedule = props.scheduleResponse;
    const { data: session } = useSession();
    const router = useRouter();
    const toast = useToast()

    const [expanded, setExpanded] = React.useState(true);
    const [isOpenSignIn, setIsOpenSignIn] = React.useState(false);
    const [isOpenSignUp, setIsOpenSignUp] = React.useState(false);

    const handleExpansion = () => {
        setExpanded((prevExpanded) => !prevExpanded);
    };

    const [ticketCounts, setTicketCounts] = React.useState<Record<TicketType, number>>({
        Adult: 0,
        Senior: 0,
        Child: 0,
    });



    const totalTickets = Object.values(ticketCounts).reduce((acc, count) => acc + count, 0);
    const fees = (1.89 * totalTickets).toFixed(2);
    const admissionFees = Object.keys(ticketCounts).reduce(
        (total, ticketType) => total + ticketCounts[ticketType as TicketType] * ticketPrices[ticketType as TicketType], 0
    );

    const roundedAdmissionFees = Math.round(admissionFees * 100) / 100;

    const taxes = (roundedAdmissionFees * 0.07).toFixed(2);

    const totalPrice = Object.keys(ticketCounts).reduce(
        (total, ticketType) => total + ticketCounts[ticketType as TicketType] * (ticketPrices[ticketType as TicketType] * 1.07 + 1.89), 0);

    const handleIncrement = (ticketType: TicketType) => {
        if (totalTickets < 20) {
            setTicketCounts((prevCounts) => ({
                ...prevCounts,
                [ticketType]: prevCounts[ticketType] + 1,
            }));
        }
    };

    const handleDecrement = (ticketType: TicketType) => {
        setTicketCounts((prevCounts) => ({
            ...prevCounts,
            [ticketType]: Math.max(prevCounts[ticketType] - 1, 0), // Ensure count doesn't go below 0
        }));
    };

    const handleLogOut = () => {
        router.refresh();
        signOut();
    };

    // const handleConfirmTicket = () => {
    //     if (!session) {
    //         toast.error("Please login to proceed to next step");
    //         setIsOpenSignIn(true);
    //     }
    // }

    useEffect(() => {
        if (!session) {
            setIsOpenSignIn(true);
        }
    }, []);


    return (
        <Box sx={{ maxWidth: '650px', margin: 'auto', padding: '2rem', backgroundColor: '#fff' }}>
            {session ? (
                <Box>
                    <Typography
                        sx={{
                            fontSize: '1.625rem',
                            fontFamily: 'Exo,Helvetica,sans-serif',
                            fontWeight: 1000,
                        }}
                        gutterBottom
                    >
                        Hello {session?.user.email}
                    </Typography>
                    <Box display="flex" sx={{ alignItems: "center" }} margin="0 1rem .5rem 0">
                        <Typography sx={{
                            fontSize: "1.1875rem",
                            fontWeight: 700,
                        }}>
                            Not You?&nbsp;
                        </Typography>
                        <Link href="" onClick={() => handleLogOut()}>
                            <Typography sx={{
                                fontSize: "1.1875rem",
                                fontWeight: 700,
                                color: "#f56600",
                                border: "none",
                                background: "0 0",
                                textDecoration: "underline",
                                padding: 0
                            }}>
                                Log Out
                            </Typography>
                        </Link>
                    </Box>
                </Box>
            ) : (
                <Box sx={{ color: 'black', fontWeight: 800 }}>
                    <CheckOutSignInModal
                        isOpenSignIn={isOpenSignIn}
                        setIsOpenSignUp={setIsOpenSignUp}
                        setIsOpenSignIn={setIsOpenSignIn}
                    />
                    <Typography
                        sx={{
                            fontSize: '1.5rem',
                            fontFamily: 'Exo,Helvetica,sans-serif',
                            fontWeight: '800',
                        }}
                        gutterBottom
                    >
                        Hello Valued Customer
                    </Typography>
                    <Box display="flex" sx={{ alignItems: 'center', gap: '10px' }}>
                        <Typography
                            sx={{
                                fontSize: '1.17em',
                                fontFamily: 'Exo,Helvetica,sans-serif',
                                fontWeight: '800',
                            }}
                            gutterBottom
                        >
                            Are you a Regal Crown Club Member?
                        </Typography>
                        <Button
                            sx={{
                                backgroundColor: 'black',
                                borderRadius: '5rem',
                                color: 'white',
                                fontSize: '0.85rem',
                                fontWeight: '700',
                                boxShadow: '0 2px 7px 0 rgba(0,0,0,.2)',
                                fontFamily: 'Exo,Helvetica,sans-serif',
                            }}
                            size="small"
                            variant="contained"
                            disableRipple
                            onClick={() => setIsOpenSignIn(true)}
                        >
                            LOG IN
                        </Button>
                        <CheckOutSignInModal
                            isOpenSignIn={isOpenSignIn}
                            setIsOpenSignUp={setIsOpenSignUp}
                            setIsOpenSignIn={setIsOpenSignIn}
                        />
                        <CheckOutSignUp
                            isOpenSignUp={isOpenSignUp}
                            setIsOpenSignUp={setIsOpenSignUp}
                        />
                    </Box>

                    {/* Promotional Banner */}
                    <Box sx={{ marginBottom: '1rem', marginTop: '1rem', fontFamily: 'Exo,Helvetica,sans-serif' }}>
                        <Accordion
                            expanded={expanded}
                            defaultExpanded
                            onChange={handleExpansion}
                            slots={{ transition: Fade as AccordionSlots['transition'] }}
                            slotProps={{ transition: { timeout: 400 } }}
                            sx={{
                                '& .MuiAccordion-region': { height: expanded ? 'auto' : 0 },
                                '& .MuiAccordionDetails-root': { display: expanded ? 'block' : 'none' },
                            }}
                        >
                            <AccordionSummary
                                expandIcon={<ImportExportIcon />}
                                aria-controls="panel1-content"
                                id="panel1-header"
                                sx={{
                                    background: 'linear-gradient(270deg,#4A4A4A 0%,#000 100%)',
                                }}
                            >
                                <MovieCreationIcon sx={{ color: 'orange' }} />
                                <Typography
                                    sx={{
                                        marginLeft: '10px',
                                        color: '#fff',
                                        fontSize: '0.95rem',
                                        fontWeight: 550,
                                        letterSpacing: '0.02em',
                                    }}
                                >
                                    Want Free Movies, Free Popcorn, and Free Soft Drink?
                                </Typography>
                            </AccordionSummary>
                            <AccordionDetails
                                sx={{
                                    background: 'linear-gradient(180deg,#000 0%,#3C3C3C 100%)',
                                    boxShadow: '0 3px 4px 0 rgba(0, 0, 0, .14)',
                                }}
                            >
                                <Typography
                                    sx={{
                                        fontFamily: 'Exo,Helvetica,sans-serif',
                                        color: '#fff',
                                        fontSize: '16px',
                                    }}
                                >
                                    Join Free Regal Crown Club where you can earn credits with every ticket and concessions
                                    purchase. Plus, save money on Tuesdays with Regal Value Days! Get rewarded today.
                                </Typography>
                            </AccordionDetails>
                        </Accordion>
                    </Box>
                </Box>
            )}

            <Typography
                variant="body2"
                sx={{
                    marginBottom: '1rem',
                    display: 'flex',
                    alignItems: 'center',
                    fontFamily: 'Exo,Helvetica,sans-serif',
                    marginRight: '10px',
                }}
            >
                <CheckCircleIcon sx={{ color: 'orange' }} />
                You can buy a maximum of 20 tickets per transaction.
            </Typography>

            {/* Promo Code Input */}
            <Box sx={{ marginBottom: '1rem', marginTop: '1rem' }}>
                <Box display="flex">
                    <TextField fullWidth label="Promo or Voucher Code" variant="outlined" />
                    <Button
                        sx={{
                            marginLeft: '0.5rem',
                            background: '#474747',
                            color: '#fff',
                            fontSize: '0.875rem',
                            opacity: 1,
                            borderRadius: '4px',
                            alignItems: 'center',
                            justifyContent: 'center',
                            fontWeight: 600,
                            fontFamily: 'Exo,Helvetica,sans-serif',
                            textAlign: 'center',
                            lineHeight: 'normal',
                            padding: '0.5rem 1rem 0.5rem 1rem',
                            display: 'inline-flex',
                            whiteSpace: 'nowrap',
                            '&:hover': {
                                background: 'transparent',
                                color: '#474747',
                            },
                        }}
                    >
                        Add Voucher
                    </Button>
                </Box>
            </Box>

            {/* Select Tickets */}
            <Typography
                sx={{
                    fontSize: '1.25rem',
                    lineHeight: 1.45,
                    fontFamily: 'Exo,Helvetica,sans-serif',
                    fontWeight: '600',
                }}
                gutterBottom
            >
                Select Tickets
            </Typography>
            {(['Adult', 'Senior', 'Child'] as TicketType[]).map((ticketType) => (
                <Box key={ticketType} sx={{
                    height: "5.875rem",
                    display: 'flex',
                    justifyContent: "space-between",
                    alignItems: 'center',
                    borderBottom: "1px solid #ddd",
                    flexWrap: "wrap"
                }}>

                    <Box display="flex"
                        sx={{
                            fontWeight: 700,
                            fontSize: "1.125rem",
                            fontFamily: "Exo, Helvetica, sans-serif",
                            flex: "2 0 40%"
                        }}>

                        {ticketType}
                    </Box>

                    <Box sx={{
                        display: 'flex',
                        alignItems: "center",
                        flexGrow: 1,
                        justifyContent: "space-between"
                    }}>
                        <Box sx={{
                            display: 'flex',
                            flexDirection: "column",
                            alignItems: "center",
                            marginRight: "1rem",
                            position: "relative"
                        }}>
                            <Box display="block">


                                <Typography
                                    sx={{
                                        fontSize: "1.19rem",
                                        fontWeight: 550,
                                        lineHeight: "1.4375rem",
                                    }}>
                                    ${ticketPrices[ticketType].toFixed(2)}
                                </Typography>
                                <Typography sx={{
                                    fontSize: "12px",
                                    fontWeight: 600,
                                    lineHeight: "0.75rem"
                                }}>
                                    + $1.89 Fee
                                </Typography>
                            </Box>
                        </Box>

                        {/* Ticket controls */}
                        <Box sx={{
                            display: 'flex',
                            alignItems: 'center',
                        }}>
                            <IconButton size="small" onClick={() => handleDecrement(ticketType)}>
                                <RemoveCircleOutlineIcon />
                            </IconButton>
                            <Box sx={{
                                width: "1em",
                                fontSize: "1.1875rem",
                                fontWeight: 500,
                                lineHeight: "1.4375rem",
                                fontFamily: "Exo, Helvetica, sans-serif",
                                margin: "0.625rem",
                                textAlign: "center",
                                display: "block"
                            }}>
                                {ticketCounts[ticketType]}
                            </Box>
                            <IconButton size="small" onClick={() => handleIncrement(ticketType)} disabled={totalTickets >= 20}>
                                <AddCircleOutlineIcon />
                            </IconButton>
                        </Box>
                    </Box>
                </Box>
            ))}

            {/* Cart Summary */}
            <Box sx={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1rem' }}>
                <Typography sx={{ fontSize: "1.5em", fontWeight: 700, fontFamily: "Exo, Helvetica, sans-serif" }}>Cart</Typography>
                <Typography sx={{ fontSize: "1.6rem", fontWeight: 500, fontFamily: "Exo, Helvetica, sans-serif" }}>${totalPrice.toFixed(2)}</Typography>
            </Box>
            <Typography sx={{ fontSize: "16px", fontWeight: 600, fontFamily: "Exo, Helvetica, sans-serif" }}>
                Admission ${roundedAdmissionFees} + Fees ${fees} + Taxes ${taxes}
            </Typography>

            <Typography sx={{ fontSize: "0.75rem", fontWeight: 700, marginBottom: "10px" }} display="block" gutterBottom>
                Prices may vary in theatre • Any applicable discounts applied at checkout • Terms and Conditions • Privacy Policy
            </Typography>

            {/* Confirm Button */}

            <ConfirmButton
                fullWidth
                color='primary'
                disabled={totalTickets === 0}
            // onClick={handleConfirmTicket}
            >
                {totalTickets > 0 ? (
                    <Link
                        href={{
                            pathname: '/select-seats',
                            query: {
                                scheduleID: schedule._id
                            },
                        }}
                        style={{ textDecoration: 'none', color: 'inherit' }}
                    >
                        Confirm Tickets
                    </Link>
                ) : (
                    'Confirm Tickets'
                )}
            </ConfirmButton>

        </Box >
    );
};

export default TicketPurchase;
