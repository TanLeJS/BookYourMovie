import ClosedCaptionIcon from '@mui/icons-material/ClosedCaption';
import HearingIcon from '@mui/icons-material/Hearing';
import { Box, Button, Dialog, DialogActions, DialogContent, DialogTitle, Typography } from '@mui/material';

interface ShowtimeDetailsModalProps {
    open: boolean;
    handleClose: () => void;
}

const ShowtimeDetailsModal = (props: ShowtimeDetailsModalProps) => {
    const { open, handleClose } = props
    return (
        <Dialog open={open} onClose={() => handleClose()} maxWidth="sm" fullWidth sx={{ backgroundColor: '#28292B', gap: "2em" }}>
            <DialogTitle sx=
                {{
                    backgroundColor: '#28292B',
                    color: 'rgb(255, 255, 255)',
                    fontSize: "36px",
                    fontWeight: "800",
                    letterSpacing: "0.012em"
                }}>
                Showtime Details
            </DialogTitle>
            <DialogContent sx={{ backgroundColor: '#28292B', color: '#fff' }}>
                <Box sx={{ mb: 2 }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                        <ClosedCaptionIcon sx={{ color: 'rgb(255, 146, 70)', mr: 1, height: "1.25em", maxWidth: "100%" }} />
                        <Typography sx={{ fontWeight: '800', fontSize: "26px", color: "rgb(205, 204, 208)" }}>Closed Caption</Typography>
                    </Box>
                    <Typography sx={{ color: "rgb(149, 145, 159)", fontSize: "21px" }}>
                        Closed Captioning devices display a movie's dialogue and sound effects as text; captions are not shown on the main screen. Devices available by request.
                    </Typography>
                </Box>
                <Box sx={{ mb: 2 }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                        <HearingIcon sx={{ color: 'rgb(255, 146, 70)', mr: 1, height: "1.25em", maxWidth: "100%" }} />
                        <Typography sx={{ fontWeight: '800', fontSize: "26px", color: "rgb(205, 204, 208)" }}>Audio Described</Typography>
                    </Box>
                    <Typography sx={{ color: "rgb(149, 145, 159)", fontSize: "21px" }}>
                        Descriptive Video devices provide audio descriptions of the movie to accommodate the needs of visually impaired guests. Devices available by request.
                    </Typography>
                </Box>
                <Box sx={{ mb: 2 }}>
                    <Typography sx={{ fontWeight: '800', fontSize: "26px", color: "rgb(205, 204, 208)" }}>No Passes</Typography>
                    <Typography sx={{ color: "rgb(149, 145, 159)", fontSize: "21px" }}>
                        Restrictions apply: please refer to conditions on your pass.
                    </Typography>
                </Box>
                <Box>
                    <Typography sx={{ fontWeight: '800', fontSize: "26px", color: "rgb(205, 204, 208)" }}>Stadium Seating</Typography>
                    <Typography sx={{ color: "rgb(149, 145, 159)", fontSize: "21px" }}>
                        Stadium seating auditorium.
                    </Typography>
                </Box>
            </DialogContent>
            <DialogActions sx={{ backgroundColor: '#28292B', justifyContent: 'center' }}>
                <Button onClick={() => handleClose()}
                    sx={{
                        background: 'linear-gradient(90deg, rgb(213, 76, 0) 8.38%, rgb(245, 102, 0) 52.76%, rgb(255, 146, 70) 100%)',
                        color: 'rgb(255, 255, 255)',
                        borderRadius: "3em",
                        fontWeight: "700",
                        minWidth: "8rem",
                        fontSize: "26px"
                    }}>
                    Okay
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default ShowtimeDetailsModal;
