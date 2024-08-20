import PersonIcon from '@mui/icons-material/Person';
import { Box } from '@mui/material';

const Seat = ({ seat, selected, onClick }) => {
    const getColor = () => {
        if (selected) return 'orange';
        switch (seat.status) {
            case 'available':
                return '#000';
            case 'booked':
                return 'gray';
            default:
                return 'gray';
        }
    };

    return (
        <Box>
            <Box
                onClick={() => onClick(seat)}
                sx={{
                    border: "none",
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
                    cursor: seat.status === 'available' || seat.status === 'vip' ? 'pointer' : 'not-allowed',
                }}
            >
                {seat.status === 'booked' && (
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
                )}
            </Box>
        </Box>
    );
};

export default Seat;
