"use client"

import YouTubeIcon from '@mui/icons-material/YouTube';
import { Box, Button, Paper, Typography } from '@mui/material';
import { styled } from '@mui/system';

const CustomButton = styled(Button)({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#f0f0f0', // light gray background
    color: '#000', // black text
    borderRadius: '25px', // rounded corners
    padding: '10px 20px', // increased padding
    boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.2)', // subtle shadow
    textTransform: 'none', // keep the text case as is
    fontSize: '1rem', // increased font size
    '&:hover': {
        backgroundColor: '#e0e0e0', // slightly darker gray on hover
    },
});

const Backdrop = styled(Box)({
    position: 'relative',
    width: '100%',
    height: '60vh',
    backgroundRepeat: 'no-repeat',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
});


const Overlay = styled(Box)({
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    background: 'linear-gradient(to bottom, rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.9))',
});

const Content = styled(Box)({
    position: 'relative',
    zIndex: 2,
    display: 'flex',
    padding: '20px',
    alignItems: 'center',
    color: '#fff',
});

const Poster = styled('img')({
    marginTop: "35px",
    width: '200px',
    height: 'auto',
    marginRight: '20px',
});


interface IDetail {
    data: IMovie;
}

const MovieDetail = (props: IDetail) => {
    const movie = props.data;

    return (
        <Paper elevation={0}>
            <Backdrop style={{ backgroundImage: `url(https://image.tmdb.org/t/p/original${movie.backdrop_path})` }}>
                <Overlay />
                <Box sx={{
                    position: 'relative',
                    zIndex: 2,
                    display: 'flex',
                    padding: '20px',
                    alignItems: 'center',
                    justifyContent: "left",
                    color: '#fff',
                }}>
                    <Poster src={`https://image.tmdb.org/t/p/original${movie.poster_path}`} alt={`${movie.title} Poster`} />
                    <Box>
                        <Typography variant="h2" component="h1">{movie.title}</Typography>
                        <CustomButton variant="contained">
                            <YouTubeIcon style={{ color: '#FF4500', marginRight: '8px', fontSize: '2rem' }} /> {/* orange YouTube icon */}
                            Watch
                        </CustomButton>
                    </Box>
                </Box>
            </Backdrop>
        </Paper>
    );
};

export default MovieDetail;
