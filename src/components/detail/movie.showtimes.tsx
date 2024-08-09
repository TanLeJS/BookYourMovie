"use client"
import { sendRequest } from '@/utils/api';
import { useToast } from '@/utils/toast';
import styled from '@emotion/styled';
import ClosedCaptionIcon from '@mui/icons-material/ClosedCaption';
import ConfirmationNumberIcon from '@mui/icons-material/ConfirmationNumber';
import HearingIcon from '@mui/icons-material/Hearing';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import MovieIcon from '@mui/icons-material/Movie';
import PlaceIcon from '@mui/icons-material/Place';
import { Box, Button, Container, FormControl, Grid, InputLabel, MenuItem, Select, SelectChangeEvent, Typography } from '@mui/material';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import ShowtimeDetailsModal from './details.modal';
import './styles.scss'; // Import the CSS file

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

const ScheduleButton = styled(Button)(({ theme }) => ({
    position: "relative",
    background: "linear-gradient(90deg, rgb(17, 17, 17) 0%, rgb(0, 0, 0) 100%)",
    color: "rgb(255, 255, 255)",
    border: "1px solid rgb(0, 0, 0)",
    borderRadius: "0.2rem",
    fontSize: "1.125rem",
    margin: "0.5rem 0px",
    width: "6.2rem",
    height: "3rem",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    boxSizing: 'border-box',
    flex: '0 0 auto',
    cursor: "pointer",
    transition: 'background 0.3s ease',
    '&:hover': {
        background: 'linear-gradient(90deg, rgb(213, 76, 0) 8.38%, rgb(245, 102, 0) 52.76%,rgb(255, 146, 70) 100%)',
    },
}));


interface IInfo {
    movie: IMovie,
    theaterList: ITheater[]
}

const dates = [
    { date: "2024-07-25", day: 'Today' },
    { date: "2024-07-26", day: 'Fri' },
    { date: "2024-07-27", day: 'Sat' },
    { date: "2024-07-28", day: 'Sun' },
    { date: "2024-07-29", day: 'Mon' },
    { date: "2024-07-30", day: 'Tue' },
    { date: "2024-07-31", day: 'Wed' },
    { date: "2024-08-01", day: 'Thu' },
    { date: "2024-08-02", day: 'Fri' },
    { date: "2024-08-03", day: 'Sat' },
    { date: "2024-08-04", day: 'Sun' },
];

const ShowTimes = (props: IInfo) => {
    const movie = props.movie;
    const router = useRouter()
    const toast = useToast()
    const theaterList = props.theaterList
    const [theater, setTheater] = useState("");
    const [format, setFormat] = useState("");
    const [openShowTimesDetails, setOpenShowTimesDetails] = useState(false);
    const [scheduleResponse, setScheduleResponse] = useState<IScheduleResponse[]>();
    const [selectedDate, setSelectedDate] = useState<string>(dates[0].date); // Initialize with the first date


    useEffect(() => {
        // Function to fetch data based on the selected date
        const fetchData = async () => {
            try {
                const url = new URL(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/schedules`);
                const res = await sendRequest<IBackendRes<IScheduleResponse[]>>({
                    url: url.toString(),
                    method: "GET",
                    queryParams: {
                        movieID: movie._id,
                        date: selectedDate,
                    }
                });
                if (res && res.data) {
                    const scheduleResponse = res.data;
                    setScheduleResponse(scheduleResponse)
                } else {
                    toast.error(res.message);
                }
            } catch (error) {
                toast.error("Failed to fetch movies. Please try again.");
            }
        };

        fetchData();
    }, [selectedDate]); // Refetch data when `selectedDate` changes

    const handleChangeTheater = (event: SelectChangeEvent) => {
        setTheater(event.target.value)
    }

    const handleChangeFormat = (event: SelectChangeEvent) => {
        setFormat(event.target.value)
    }

    const handleCloseShowtimesMovieDetails = () => {
        setOpenShowTimesDetails(false);
    }

    const handleDateChange = (date: string) => {
        setSelectedDate(date);
        router.push(`?date=${date}`)
    };



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

                            {scheduleResponse?.map((response) => (
                                <MenuItem key={response.theater._id} value={response.theater.name}>
                                    {response.theater.name}
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
                    <Box className="datePicker">
                        {dates.map(dateObj => {
                            const day = dateObj.date.split("-")[2];
                            return (
                                <Box
                                    key={dateObj.date}
                                    className={`customButton ${selectedDate === dateObj.date ? 'selected' : ''}`}
                                    onClick={() => handleDateChange(dateObj.date)}
                                >
                                    <Box className="span1">{dateObj.day}</Box>
                                    <Box className="span2">{day}</Box>
                                </Box>
                            );
                        })}
                    </Box>
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
                    {scheduleResponse?.map(response => (
                        <Grid item xs={12} md={4} key={response.theater._id}>
                            <Box sx={{ borderRadius: "0.625rem", backgroundColor: "rgb(58, 56, 63)", opacity: "1" }}>
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
                                    <Link href={`/theatres/${response.theater.name.toLowerCase()}-${response.theater._id}`} style={{ color: "#fff", textDecoration: "none", position: "relative", zIndex: 2 }}>
                                        <Typography variant="h6" sx={{ fontWeight: 'bold', fontSize: "26px" }}>
                                            {response.theater.name}
                                        </Typography>
                                    </Link>
                                    <Box sx={{ display: 'flex', alignItems: 'center', mb: 2, position: "relative", zIndex: 2 }}>
                                        <LocationOnIcon sx={{ color: "rgb(255, 146, 70)" }} />
                                        <Typography variant="body2" sx={{ ml: 1, color: "rgb(149, 145, 159)", fontWeight: "700" }}>
                                            {response.theater.location}
                                        </Typography>
                                    </Box>
                                </Box>

                                <Box>
                                    {response.formats.map(format => (
                                        <Box sx={{
                                            background: "linear-gradient(rgb(41, 41, 43) 0%, rgb(58, 56, 63) 100%)",
                                        }}>
                                            <Box sx={{
                                                display: "flex",
                                                justifyContent: "space-between",
                                            }}>
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
                                                    marginTop: "5px"
                                                }}>{format.format.toLocaleUpperCase()}
                                                </Typography>

                                                <Button sx={{
                                                    marginTop: "5px",
                                                    background: "rgb(26, 25, 29)",
                                                    borderRadius: "16px",
                                                    border: "none",
                                                    fontSize: "0.8rem",
                                                    fontWeight: "900",
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
                                            <Box sx={{ display: "flex", gap: "7px", flexWrap: "wrap", }}>
                                                {format.schedules.map(schedule => (
                                                    <ScheduleButton onClick={() => router.push(`/select-ticket?site=${response.theater._id}&id=${schedule._id}`)}>
                                                        {schedule.time}
                                                    </ScheduleButton>
                                                ))}
                                            </Box>
                                            <Box sx={{
                                                display: "flex",

                                                flexWrap: "wrap",
                                                alignItems: "center",
                                                marginTop: "6px",
                                                letterSpacing: "0.025em",
                                                color: "rgb(149, 145, 159)",
                                            }}>
                                                <ClosedCaptionIcon />
                                                <HearingIcon />
                                                <Typography
                                                    sx={{
                                                        marginLeft: "5px",
                                                        fontSize: "0.9rem",
                                                        fontWeight: "800",
                                                    }}>
                                                    • NO PASSES
                                                </Typography>
                                                <Typography sx={{
                                                    marginLeft: "5px",
                                                    fontSize: "0.9rem",
                                                    fontWeight: "800",
                                                }}>
                                                    • STADIUM SEATING
                                                </Typography>
                                            </Box>
                                        </Box>
                                    )
                                    )}

                                </Box>
                            </Box>
                        </Grid>
                    ))}
                </Grid>
            </Container>
        </Box >
    );
};

export default ShowTimes;
