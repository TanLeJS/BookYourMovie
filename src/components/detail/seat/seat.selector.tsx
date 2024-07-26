import { Box, Button, Container, Modal, Typography } from '@mui/material';
import { useState } from 'react';
import Seat from './seat';

const SeatSelector = ({ open, onClose, seats, onSeatSelect }) => {
    const [selectedSeats, setSelectedSeats] = useState([]);

    const handleSeatClick = (seat) => {
        if (seat.status === 'booked') return;
        const alreadySelected = selectedSeats.find((s) => s.label === seat.label);
        if (alreadySelected) {
            setSelectedSeats(selectedSeats.filter((s) => s.label !== seat.label));
        } else {
            setSelectedSeats([...selectedSeats, seat]);
        }
    };

    const handlePurchase = () => {
        onSeatSelect(selectedSeats);
        onClose();
    };

    return (
        <Modal open={open} onClose={onClose}>
            <Container sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                height: '100vh',
                backgroundColor: 'rgba(0, 0, 0, 0.8)'
            }}>
                <Box sx={{
                    backgroundColor: '#1c1c1c',
                    padding: '20px',
                    borderRadius: '10px',
                    textAlign: 'center'
                }}>
                    <Typography variant="h6" sx={{ marginBottom: '20px', color: 'white' }}>Mua vé xem phim</Typography>
                    <Typography variant="subtitle1" sx={{ marginBottom: '10px', color: 'white' }}>MÀN HÌNH</Typography>
                    <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(18, 1fr)', gap: '5px', marginBottom: '20px' }}>
                        {seats.map((seat) => (
                            <Seat key={seat.label} seat={seat} selected={selectedSeats.includes(seat)} onClick={handleSeatClick} />
                        ))}
                    </Box>
                    <Button variant="contained" color="secondary" onClick={handlePurchase}>
                        Mua vé
                    </Button>
                </Box>
            </Container>
        </Modal>
    );
};

export default SeatSelector;
