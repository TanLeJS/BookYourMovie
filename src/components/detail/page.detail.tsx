"use client"

import YouTubeIcon from '@mui/icons-material/YouTube';
import { Box, Button, Icon, Paper, Tab, Tabs, Typography } from '@mui/material';

import { styled } from '@mui/system';
import Link from 'next/link';
import React from 'react';
import AgeAllowed from '../../../public/icon/ageallowed.png';
import AgeRestricted from '../../../public/icon/agerestricted.png';
import MovieInfo from './movie.info';
import ShowTimes from './movie.showtimes';

interface TabPanelProps {
    children?: React.ReactNode;
    index: number;
    value: number;
}

function CustomTabPanel(props: TabPanelProps) {
    const { children, value, index, ...other } = props;
    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`simple-tabpanel-${index}`}
            aria-labelledby={`simple-tab-${index}`}
            {...other}
        >
            {value === index && <Box>{children}</Box>}
        </div>
    );
}

function a11yProps(index: number) {
    return {
        id: `simple-tab-${index}`,
        'aria-controls': `simple-tabpanel-${index}`,
    };
}


const CustomButton = styled(Button)({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#f0f0f0', // light gray background
    color: '#000', // black text
    borderRadius: '25px', // rounded corners
    padding: '10px 15px', // increased padding
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
    marginLeft: "100px"
});

const MovieDetails = styled(Box)({
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    marginLeft: '20px',
});



interface IDetail {
    movie: IMovie;
    theaterList: ITheater[];
}

const MovieDetail = (props: IDetail) => {
    const movie = props.movie;
    const theaterList = props.theaterList;
    const [value, setValue] = React.useState(0);


    const handleChange = (event: React.SyntheticEvent, newValue: number) => {
        setValue(newValue);
    };

    return (
        <Paper elevation={0}>
            <Backdrop style={{ backgroundImage: `url(https://image.tmdb.org/t/p/original${movie.backdrop_path})` }}>
                <Overlay />
                <Content>
                    <Poster src={`https://image.tmdb.org/t/p/original${movie.poster_path}`} alt={`${movie.title} Poster`} />
                    <MovieDetails>
                        <Box display={"flex"} sx={{
                            gap: "5px"
                        }}>
                            <Box>
                                {movie.adult ? (
                                    <Icon>
                                        <img src={AgeRestricted.src} alt="Age Restricted" height={25} width={25} />
                                    </Icon>
                                ) : (
                                    <Icon>
                                        <img src={AgeAllowed.src} alt="Age Allowed" height={25} width={25} />
                                    </Icon>
                                )}
                            </Box>
                            <Typography sx={{
                                fontSize: '1rem',
                            }}
                                variant="body1">

                                | {movie.duration} MINS
                            </Typography>
                        </Box>
                        <Typography variant="h2" component="h1" sx={{
                            fontSize: '2.5rem',
                            fontWeight: 'bold',
                            marginBottom: '10px',
                        }}>{movie.title}</Typography>

                        <Link href={`https://www.youtube.com/watch?v=${movie.trailer}`} passHref legacyBehavior>
                            <a target="_blank" style={{ textDecoration: "none" }}>
                                <CustomButton variant="contained">
                                    <YouTubeIcon style={{ color: '#FF4500', marginRight: '8px', fontSize: '1.5rem' }} />
                                    Watch
                                </CustomButton>
                            </a>
                        </Link>
                    </MovieDetails>
                </Content>
                <Box sx={{ marginLeft: "350px" }}>
                    <Tabs value={value} onChange={handleChange}>
                        <Tab label="SHOWTIMES" {...a11yProps(0)} sx={{ color: "white" }} />
                        <Tab label="DETAILS" {...a11yProps(1)} sx={{ color: "white" }} />
                    </Tabs>
                </Box>
            </Backdrop>
            <CustomTabPanel value={value} index={0}>
                <ShowTimes
                    movie={movie}
                    theaterList={theaterList}
                />
            </CustomTabPanel>
            <CustomTabPanel value={value} index={1}>
                <MovieInfo movie={movie} />
            </CustomTabPanel>
        </Paper>
    );
};

export default MovieDetail;
