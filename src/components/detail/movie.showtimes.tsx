"use client"
import styled from '@emotion/styled';
import ConfirmationNumberIcon from '@mui/icons-material/ConfirmationNumber';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import MovieIcon from '@mui/icons-material/Movie';
import PlaceIcon from '@mui/icons-material/Place';
import { Box, Button, Container, FormControl, Grid, InputLabel, MenuItem, Select, SelectChangeEvent, Typography } from '@mui/material';
import Link from 'next/link';
import { useState } from 'react';
import DatePicker from './datepicker';
import ShowtimeDetailsModal from './details.modal';

const CustomButton = styled(Button)(({ theme }) => ({
    position: 'relative',
    display: 'flex',
    alignItems: 'center',
    flexDirection: 'column',
    justifyContent: 'space-between',
    fontWeight: 'bold',
    fontFamily: 'Roboto, sans-serif',
    color: 'rgb(255, 255, 255)',
    transition: 'background 0.4s ease-in-out 0s',
    padding: '0px',
    border: '2px solid rgb(26, 25, 29)',
    borderRadius: '8px',
    background: 'linear-gradient(90deg, rgb(41, 41, 43) 0%, rgb(58, 56, 63) 100%)',
    fontSize: 'calc(27.2394px + 0.469484vw)',
    width: '1.9em',
    minWidth: '1.85em',
    height: '1.9em',
    minHeight: '1.8em',
    margin: '0.25rem',
    zIndex: 1,
}));


interface IInfo {
    movie: IMovie,
    theaterList: ITheater[]
}




const ShowTimes = (props: IInfo) => {
    const movie = props.movie;
    const theaterList = props.theaterList
    const [theater, setTheater] = useState("");
    const [format, setFormat] = useState("");
    const [date, setDate] = useState(new Date());
    const [openShowTimesDetails, setOpenShowTimesDetails] = useState(false);


    const handleChangeTheater = (event: SelectChangeEvent) => {
        setTheater(event.target.value)
    }

    const handleChangeFormat = (event: SelectChangeEvent) => {
        setFormat(event.target.value)
    }

    const handleCloseShowtimesMovieDetails = () => {
        setOpenShowTimesDetails(false);
    }

    return (
        <Box sx={{ background: 'linear-gradient(90deg, rgb(50, 50, 54) 0%, rgb(36, 35, 39) 100%)', color: 'white', minHeight: '100vh', py: 3 }}>
            <Container>
                <Box sx={{ display: 'flex', gap: 2, mb: 1, justifyContent: "center" }}>
                    <FormControl sx={{ m: 1, minWidth: 290, background: "rgb(0, 0, 0)" }} size="medium">
                        <InputLabel id="demo-simple-select-label" sx={{ color: 'rgb(255, 255, 255)' }}>
                            Theater
                        </InputLabel>
                        <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            value={theater}
                            label="Nearby Theaters...."
                            onChange={handleChangeTheater}
                            IconComponent={() => (
                                <PlaceIcon sx={{ color: "gray" }} />
                            )}
                        >
                            {theaterList.map((theater) => (
                                <MenuItem key={theater._id} value={theater.name}>
                                    {theater.name}
                                </MenuItem>
                            ))}

                        </Select>
                    </FormControl>

                    <FormControl sx={{ m: 1, minWidth: 290, background: "rgb(0, 0, 0)" }} size="medium">
                        <InputLabel id="demo-simple-select-label" sx={{ color: 'rgb(255, 255, 255)' }}>
                            Format
                        </InputLabel>
                        <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            value={format}
                            label="Format"
                            onChange={handleChangeFormat}
                            IconComponent={() => (
                                <MovieIcon sx={{ color: "gray" }} />
                            )}
                        >
                            <MenuItem value={format}>Standard</MenuItem>
                            <MenuItem value={format}>2D</MenuItem>
                            <MenuItem value={format}>3D</MenuItem>
                        </Select>
                    </FormControl>

                    <FormControl sx={{ m: 1, minWidth: 290, background: "rgb(0, 0, 0)" }} size="medium">
                        <InputLabel id="demo-simple-select-label" sx={{ color: 'rgb(255, 255, 255)' }}>
                            {movie.title}
                        </InputLabel>
                        <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            label="Nearby Theaters...."
                            onChange={handleChangeTheater}
                            IconComponent={() => (
                                <ConfirmationNumberIcon sx={{ color: "gray" }} />
                            )}
                            disabled
                        >
                        </Select>
                    </FormControl>
                </Box>
                <Box sx=
                    {{
                        display: 'flex'
                        , gap: 1,
                        mb: 3,
                        overflowX: "auto",
                        scrollbarWidth: "none",
                        justifyContent: "center"
                    }}>
                    <DatePicker />
                    <CustomButton>
                        <Typography sx={{
                            display: "flex",
                            height: "100%",
                            justifyContent: "center",
                            alignItems: "center",
                            fontSize: "0.4em",
                            fontWeight: "bold",
                            color: "rgb(255, 255, 255)",
                            fontFamily: "Roboto, sans-serif"
                        }}>Select Day
                        </Typography>
                    </CustomButton>
                </Box>
            </Container >
            <Container maxWidth="xl">
                <Grid container spacing={{ xs: 2, md: 3 }} >
                    {theaterList.map(theater => (
                        <Grid item xs={12} md={4} key={theater._id}>
                            <Box
                                sx={{
                                    position: "relative",
                                    borderRadius: "0.625rem 0.625rem 0px 0px",
                                    overflow: "hidden", // Ensures the overlay stays within the border radius
                                    background: "linear-gradient(rgb(41, 41, 43) 0%, rgb(58, 56, 63) 100%))",
                                    backgroundImage: 'url(/background/background2.png)',
                                    backgroundSize: "cover",
                                    backgroundRepeat: "no-repeat",
                                    '&::before': {
                                        content: '""',
                                        position: "absolute",
                                        top: 0,
                                        left: 0,
                                        width: "100%",
                                        height: "100%",
                                        backgroundColor: "rgba(0, 0, 0, 0.8)", // Adjust the opacity to make the image darker
                                        zIndex: 1,
                                    },
                                }}
                            >
                                <Link href={`/theatres/${theater.name.toLowerCase()}-${theater._id}`} style={{ color: "#fff", textDecoration: "none", position: "relative", zIndex: 2 }}>
                                    <Typography variant="h6" sx={{ fontWeight: 'bold', fontSize: "26px" }}>
                                        {theater.name}
                                    </Typography>
                                </Link>
                                <Box sx={{ display: 'flex', alignItems: 'center', mb: 2, position: "relative", zIndex: 2 }}>
                                    <LocationOnIcon sx={{ color: "rgb(255, 146, 70)" }} />
                                    <Typography variant="body2" sx={{ ml: 1, color: "rgb(149, 145, 159)", fontWeight: "700" }}>
                                        {theater.location}
                                    </Typography>
                                </Box>
                            </Box>
                            <Box>
                                <Box sx={{ display: "flex", justifyContent: "space-between", marginTop: "5px", }}>
                                    <Typography sx={{
                                        display: "flex",
                                        flexWrap: "wrap",
                                        position: "relative",
                                        gap: "0px 1.125em",
                                        overflow: "hidden",
                                        marginRight: "0.5em",
                                        color: "rgb(205, 204, 208)",
                                        fontSize: "1.125rem",
                                        fontWeight: "800",

                                    }}>RealD 3D</Typography>
                                    <Button sx={{
                                        background: "rgb(26, 25, 29)",
                                        borderRadius: "16px",
                                        fontSize: "0.6875rem",
                                        fontWeight: "800",
                                        color: "rgb(149, 145, 159)",
                                        height: "1.75rem",
                                        letterSpacing: "0.025em",
                                        cursor: "pointer",
                                        boxSizing: "border-box"
                                    }}
                                        onClick={() => {
                                            setOpenShowTimesDetails(true)
                                        }}
                                    >
                                        DETAILS

                                    </Button>
                                    <ShowtimeDetailsModal
                                        open={openShowTimesDetails}
                                        handleClose={handleCloseShowtimesMovieDetails}
                                    />
                                </Box>


                            </Box>
                        </Grid>
                    ))}
                    {/* {showtimesData.theaters.map(theater => (
                        <Grid item xs={12} md={4} key={theater.name}>
                            <Box sx={{ backgroundColor: '#2c2c2c', borderRadius: 2, p: 2 }}>
                                <Typography variant="h6" sx={{ fontWeight: 'bold' }}>{theater.name}</Typography>
                                <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                                    <LocationOnIcon color="secondary" />
                                    <Typography variant="body2" sx={{ ml: 1 }}>{theater.address}</Typography>
                                </Box>
                                {theater.formats.map(format => (
                                    <Box key={format.type} sx={{ mb: 2 }}>
                                        <Typography variant="body1" sx={{ fontWeight: 'bold', mb: 1 }}>{format.type}</Typography>
                                        <Box sx={{ display: 'flex', gap: 1 }}>
                                            {format.times.map(time => (
                                                <Button key={time} variant="contained" sx={{ backgroundColor: '#1c1c1c', color: 'white' }}>{time}</Button>
                                            ))}
                                        </Box>
                                    </Box>
                                ))}
                            </Box>
                        </Grid>
                    ))} */}
                </Grid>
            </Container>
        </Box >
    );
};

export default ShowTimes;
