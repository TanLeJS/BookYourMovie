"use client"
import styled from '@emotion/styled';
import AddIcon from '@mui/icons-material/Add';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import ImportExportIcon from '@mui/icons-material/ImportExport';
import MovieCreationIcon from '@mui/icons-material/MovieCreation';
import RemoveIcon from '@mui/icons-material/Remove';
import { Accordion, AccordionDetails, AccordionSlots, AccordionSummary, Box, Button, Divider, IconButton, Link, TextField, Typography } from '@mui/material';
import Fade from '@mui/material/Fade';
import { signOut, useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

const StyledButton = styled(Button)`
  &&.MuiButton-root {
    &:hover {
      background: transparent;
    }
  }
`

const TicketPurchase = () => {
    const { data: session } = useSession()
    const router = useRouter()

    const [expanded, setExpanded] = useState(false);

    const handleExpansion = () => {
        setExpanded((prevExpanded) => !prevExpanded);
    };


    const handleLogOut = () => {
        router.refresh()
        signOut()
    }
    return (
        <Box sx={{ maxWidth: '650px', margin: 'auto', padding: '2rem', backgroundColor: '#fff' }}>

            {session ?
                <Box>
                    <Typography sx={{
                        fontSize: "1.625rem",
                        fontFamily: "Exo,Helvetica,sans-serif",
                        fontWeight: 1000
                    }} gutterBottom>
                        Hello {session?.user.email}
                    </Typography>
                    <Box display="flex">
                        <Typography variant="h5" gutterBottom>
                            Not You
                        </Typography>
                        <Link onClick={() => handleLogOut()} >
                        </Link>
                    </Box>
                </Box>
                :
                <Box sx={{ color: "black", fontWeight: 800 }}>
                    <Typography sx={{
                        fontSize: "1.5rem",
                        fontFamily: "Exo,Helvetica,sans-serif",
                        fontWeight: "800"
                    }} gutterBottom>
                        Hello Valued Customer
                    </Typography>
                    <Box display="flex" sx={{ alignItems: "center", gap: "10px" }}>
                        <Typography sx={{
                            fontSize: "1.17em",
                            fontFamily: "Exo,Helvetica,sans-serif",
                            fontWeight: "800"
                        }}
                            gutterBottom>
                            Are you a Regal Crown Club Member?
                        </Typography>
                        <Button
                            sx={{
                                backgroundColor: "black",
                                borderRadius: "5rem",
                                color: "white",
                                fontSize: "0.85rem",
                                fontWeight: "700",
                                boxShadow: "0 2px 7px 0 rgba(0,0,0,.2)",
                                fontFamily: "Exo,Helvetica,sans-serif"
                            }}
                            size='small'
                            variant='contained'
                            disableRipple
                        >
                            LOG IN
                        </Button>
                    </Box>
                    {/* Promotional Banner */}

                    <Box
                        sx={{
                            marginBottom: '1rem',
                            marginTop: "1rem",
                            fontFamily: "Exo,Helvetica,sans-serif"
                        }}
                    >
                        <Accordion
                            expanded={expanded}
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
                                    background: "linear-gradient(270deg,#4A4A4A 0%,#000 100%)"
                                }}
                            >
                                <MovieCreationIcon sx={{
                                    color: "orange"
                                }} />
                                <Typography sx={{
                                    marginLeft: "10px",
                                    color: "#fff",
                                    fontSize: "0.95rem",
                                    fontWeight: 550,
                                    letterSpacing: "0.02em"
                                }}>
                                    Want Free Movies, Free Popcorn, and Free Soft Drink?
                                </Typography>
                            </AccordionSummary>
                            <AccordionDetails
                                sx={{
                                    background: "linear-gradient(180deg,#000 0%,#3C3C3C 100%)",
                                    boxShadow: "0 3px 4px 0 rgba(0, 0, 0, .14)"
                                }}
                            >
                                <Typography sx={{
                                    fontFamily: "Exo,Helvetica,sans-serif",
                                    color: "#fff",
                                    fontSize: "16px"
                                }}>
                                    Join Free Regal Crown Club where you can earn credits with every ticket and concessions purchase.
                                    Plus, save money on Tuesdays with Regal Value Days! Get rewarded today.
                                </Typography>
                            </AccordionDetails>
                        </Accordion>
                    </Box>
                </Box>
            }


            <Typography variant="body2" sx={{
                marginBottom: '1rem',
                display: 'flex',
                alignItems: 'center',
                fontFamily: "Exo,Helvetica,sans-serif",
                marginRight: "10px"
            }}>
                <CheckCircleIcon sx={{
                    color: "orange"
                }} />
                You can buy a maximum of 20 tickets per transaction.
            </Typography>

            {/* Promo Code Input */}
            <Box sx={{ marginBottom: '1rem', marginTop: "1rem" }}>
                <Box display="flex">
                    <TextField fullWidth label="Promo or Voucher Code" variant="outlined" />
                    <Button
                        sx={{
                            marginLeft: '0.5rem',
                            background: "#474747",
                            color: "#fff",
                            fontSize: "0.8rem",
                            opacity: 1,
                            borderRadius: "4px",
                            alignItems: "center",
                            justifyContent: "center",
                            fontWeight: 600,
                            textAlign: "center",
                            lineHeight: "normal",
                            padding: "0.5rem 1rem", // Adjust padding for better spacing
                            display: "inline-flex", // Ensure button behaves like a flex container but doesn’t take full width
                            whiteSpace: "nowrap",   // Prevents text wrapping
                            '&:hover': {
                                background: 'transparent',
                                color: "#474747", // Optional: Change text color on hover for better contrast
                            },
                        }}
                    >
                        Add Voucher
                    </Button>

                </Box>
            </Box>

            {/* Select Tickets */}
            <Typography sx={{
                fontSize: "1.25rem"
            }} gutterBottom>
                Select Tickets
            </Typography>
            {['Adult', 'Senior', 'Child'].map((ticketType) => (
                <Box key={ticketType} sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
                    <Typography variant="body1">
                        {ticketType}
                    </Typography>
                    <Typography variant="caption">
                        $19.99 + $1.89 Fee
                    </Typography>
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        <IconButton size="small"><RemoveIcon /></IconButton>
                        <Typography variant="body1" sx={{ margin: '0 0.5rem' }}>0</Typography>
                        <IconButton size="small"><AddIcon /></IconButton>
                    </Box>
                </Box>
            ))}

            <Divider sx={{ marginY: '1rem' }} />

            {/* Cart Summary */}
            <Box sx={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1rem' }}>
                <Typography variant="body1">
                    Cart
                </Typography>
                <Typography variant="h6">
                    $0.00
                </Typography>
            </Box>
            <Typography variant="caption" display="block" gutterBottom>
                Prices may vary in theatre • Any applicable discounts applied at checkout • Terms and Conditions • Privacy Policy
            </Typography>

            {/* Confirm Button */}
            <Button fullWidth variant="contained" color="primary">
                Confirm Tickets
            </Button>
        </Box>
    );
};

export default TicketPurchase;
