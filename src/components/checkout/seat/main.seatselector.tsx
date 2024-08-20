"use client"

import { Box } from '@mui/material';
import { useState } from 'react';
import SeatSelector from "./seat.selector";


interface IScheduleDetail {
    scheduleResponse: ISchedule
}


const SeatSelectorMainComponent = (props: IScheduleDetail) => {
    const schedule = props.scheduleResponse;
    const [selectedSeats, setSelectedSeats] = useState([]);
    const seats = schedule.seats as ISeat[]

    const handleSeatSelect = (seats: ISeat[]) => {
        setSelectedSeats(seats);
    };

    return (
        <Box>
            <SeatSelector seats={seats} handleSeatSelect={handleSeatSelect} />
        </Box>
    );
};

export default SeatSelectorMainComponent;
