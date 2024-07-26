"use client"
import styled from '@emotion/styled';
import ConfirmationNumberIcon from '@mui/icons-material/ConfirmationNumber';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import MovieIcon from '@mui/icons-material/Movie';
import PlaceIcon from '@mui/icons-material/Place';
import { Box, Button, Container, FormControl, Grid, InputLabel, MenuItem, Select, SelectChangeEvent, Typography } from '@mui/material';
import { useState } from 'react';
import DatePicker from './datepicker';


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

const showtimesData = {
    theaters: [
        {
            name: 'Regal Waterford Lakes',
            address: '541 North Alafaya Trail (2.40mi)',
            formats: [
                { type: '4DX', times: ['10:30pm'] },
                { type: 'IMAX', times: ['11:25pm'] },
                { type: 'Standard', times: ['9:30pm', '10:00pm', '10:10pm', '11:00pm'] }
            ]
        },
        {
            name: 'Regal Oviedo Mall',
            address: '1500 Oviedo Marketplace Blvd (4.83mi)',
            formats: [{ type: 'Standard', times: ['9:30pm', '10:00pm', '10:30pm'] }]
        },
        {
            name: 'Regal Winter Park Village',
            address: '510 North Orlando Ave (8.94mi)',
            formats: [{ type: 'Standard', times: ['9:30pm', '10:00pm', '10:30pm', '10:45pm', '11:00pm'] }]
        }
    ],
    dates: ['18', '19', '20', '21', '22', '23', '24', '25', '26', '27', '28']
};


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



    const handleChangeTheater = (event: SelectChangeEvent) => {
        setTheater(event.target.value)
    }

    const handleChangeFormat = (event: SelectChangeEvent) => {
        setFormat(event.target.value)
    }

    return (
        <Box sx={{ background: 'linear-gradient(90deg, rgb(50, 50, 54) 0%, rgb(36, 35, 39) 100%)', color: 'white', minHeight: '100vh', py: 3 }}>
            <Container>
                <Box sx={{ display: 'flex', gap: 2, mb: 3, justifyContent: "center" }}>
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
                            fontSize: "0.42em",
                            fontWeight: "bold",
                            color: "rgb(255, 255, 255)",
                            fontFamily: "Roboto, sans-serif"
                        }}>Select Day</Typography>
                    </CustomButton>

                </Box>
                <Grid container spacing={3}>
                    {showtimesData.theaters.map(theater => (
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
                    ))}
                </Grid>
            </Container >
        </Box >
    );
};

export default ShowTimes;
