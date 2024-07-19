"use client"

import { Button } from '@mui/material';
import { useState } from 'react';
import SeatSelector from "./seatselector";

const seatsData = [
    { label: 'A1', status: 'available' },
    { label: 'A2', status: 'available' },
    { label: 'A3', status: 'booked' },
    // ... add more seats
];

const SeatSelectorMainComponent = () => {
    const [open, setOpen] = useState(false);
    const [selectedSeats, setSelectedSeats] = useState([]);

    const handleSeatSelect = (seats) => {
        setSelectedSeats(seats);
    };

    return (
        <div>
            <Button variant="contained" color="primary" onClick={() => setOpen(true)}>
                Selecting seats
            </Button>
            <SeatSelector open={open} onClose={() => setOpen(false)} seats={seatsData} onSeatSelect={handleSeatSelect} />
        </div>
    );
};

export default SeatSelectorMainComponent;
