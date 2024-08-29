import PersonIcon from '@mui/icons-material/Person';
import { Box, Button, IconButton } from '@mui/material';

interface SeatProps {
    seat: ISeat,
    selected: boolean,
    handleSeatClick: (seat: ISeat) => void;
}

const Seat = (props: SeatProps) => {
    const { seat, selected, handleSeatClick } = props

    const getColor = () => {
        if (selected) return '#f56600'; // This should be orange for selected seats
        switch (seat.status) {
            case 'available':
                return '#000'; // Black for available seats
        }
    };


    return (
        <Box>
            <Box
                onClick={() => handleSeatClick(seat)}
                sx={{
                    width: '1.6rem',
                    height: '1.42rem',
                    margin: '3px',
                    borderRadius: ".44rem .44rem .1rem .1rem",
                    opacity: 1,
                    backgroundColor: getColor(),
                    color: 'white',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    padding: 0,
                    cursor: seat.status === 'available' ? 'pointer' : 'not-allowed',
                }}
            >
                <Button
                    sx={{
                        width: '100%',
                        height: '100%',
                        minWidth: 'unset',
                        padding: 0,
                        margin: 0,
                        borderRadius: ".44rem .44rem .1rem .1rem",
                        backgroundColor: 'transparent', // Ensure button background doesn't override box background
                    }}
                >
                </Button>
                {seat.status === 'booked' && (
                    <IconButton disabled
                        sx={{
                            position: 'absolute',
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
                    >
                        <PersonIcon />
                    </IconButton>
                )}
            </Box>
        </Box>
    );
};

export default Seat;
