import { Box, Tooltip } from '@mui/material';

const Seat = ({ seat, selected, onClick }) => {
    const getColor = () => {
        if (selected) return 'pink';
        switch (seat.status) {
            case 'available':
                return 'purple';
            case 'vip':
                return 'red';
            case 'booked':
                return 'gray';
            default:
                return 'gray';
        }
    };

    return (
        <Tooltip title={seat.label}>
            <Box
                onClick={() => onClick(seat)}
                sx={{
                    width: '30px',
                    height: '30px',
                    margin: '5px',
                    backgroundColor: getColor(),
                    color: 'white',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    cursor: seat.status === 'available' || seat.status === 'vip' ? 'pointer' : 'not-allowed',
                }}
            >
                {seat.label}
            </Box>
        </Tooltip>
    );
};

export default Seat;
