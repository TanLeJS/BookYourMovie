"use client"
import HdrAutoIcon from '@mui/icons-material/HdrAuto';
import InfoIcon from '@mui/icons-material/Info';
import { Box, Tooltip, Typography } from '@mui/material';
import Image from 'next/image';
import Link from 'next/link';

const dayOfTheWeek = (date: Date) => {
    const weekdays = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    return weekdays[date.getUTCDay()];
};

const findMonth = (date: Date) => {
    const months = [
        "January", "February", "March", "April", "May", "June",
        "July", "August", "September", "October", "November", "December"
    ];
    return months[date.getUTCMonth()];
}

interface IScheduleDetail {
    scheduleResponse: ISchedule
}

const MovieSchedule = (props: IScheduleDetail) => {
    const schedule = props.scheduleResponse;
    const date = new Date(schedule.date);
    const dateOfTheWeek = dayOfTheWeek(date);
    const monthName = findMonth(date);
    const dayOfMonth = date.getUTCDate();

    return (
        <Box bgcolor="#000">
            <Box display="flex"
                bgcolor="#000"
                color="#fff"
                p={3}
                fontFamily="Arial, sans-serif"
                sx={{
                    alignItems: "center",
                    justifyContent: "center",
                    maxWidth: "960px",
                    margin: "0 auto",
                }}
            >
                <Box display="flex" width="100%" maxWidth="42rem">
                    <Box marginRight={2} flexShrink={0}>
                        <Image
                            alt="Movie Poster"
                            src={`https://image.tmdb.org/t/p/original${schedule.movie.poster_path}`}
                            width={150}
                            height={200}
                        />
                    </Box>
                    <Box>
                        <Typography sx={{
                            fontSize: "2rem",
                            fontWeight: "bold",
                            marginBottom: "0.5rem",
                            fontFamily: "Exo,Helvetica,sans-serif"
                        }}>
                            {schedule.movie.title}
                        </Typography>
                        <Typography sx={{
                            fontFamily: "Exo,Helvetica,sans-serif",
                            fontSize: "1rem",
                            marginBottom: "0.25rem"
                        }}>
                            {dateOfTheWeek}, {dayOfMonth} {monthName} at {schedule.time}
                        </Typography>
                        <Typography sx={{
                            fontFamily: "Exo,Helvetica,sans-serif",
                            fontSize: "1rem",
                            fontWeight: 500,
                            marginBottom: "0.5rem"
                        }}>
                            {schedule.screen.theater.name} Stm 20 & IMAX
                        </Typography>
                        <Typography sx={{
                            display: "flex",
                            alignItems: "center",
                            fontWeight: 400,
                            fontSize: "0.875rem",
                            letterSpacing: "0.016em",
                            marginBottom: "0.5rem"
                        }}>
                            SCREEN {schedule.screen.name} SHOWING IN {schedule.format === "standard" ? "2D" : "3D"}
                        </Typography>
                        <Typography sx={{ marginBottom: "1rem" }}>
                            {schedule.format === "standard" ? "Standard Format" : "RealD is the most widely used digital 3D cinema technology"}
                        </Typography>
                        <Box display="flex" alignItems="center" mb={1}>
                            <HdrAutoIcon sx={{ marginRight: "0.25rem", fontSize: 16 }} />
                            <Link href="/" style={{ color: "#FFF", marginRight: "1rem", fontSize: 12 }}>Age&nbsp;Policy</Link>
                            <Typography sx={{ marginRight: "0.5rem", fontSize: 12 }}> Closed&nbsp;Caption </Typography>
                            <Tooltip title="Closed Caption">
                                <InfoIcon sx={{ marginRight: "1rem", color: "#333", fontSize: 16 }} />
                            </Tooltip>
                            <Typography sx={{ marginRight: "0.5rem", fontSize: 12 }}>Descriptive&nbsp;Video</Typography>
                            <Tooltip title="Descriptive Video">
                                <InfoIcon sx={{ marginRight: "1rem", color: "#333", fontSize: 16 }} />
                            </Tooltip>
                            <Typography sx={{ marginRight: "0.5rem", fontSize: 12 }}>Stadium&nbsp;Seating</Typography>
                            <Tooltip title="Stadium Seating">
                                <InfoIcon sx={{ marginRight: "1rem", color: "#333", fontSize: 16 }} />
                            </Tooltip>
                            <Typography sx={{ marginRight: "0.5rem", fontSize: 12 }}>No&nbsp;Passes</Typography>
                            <Tooltip title="No Passes">
                                <InfoIcon sx={{ color: "#333", fontSize: 16 }} />
                            </Tooltip>
                        </Box>
                        <Typography mb={2}>Runtime: {schedule.movie.duration} mins</Typography>
                        <Typography>
                            Our
                            <Link href="/" style={{ color: "#FFF", marginLeft: "0.25rem", marginRight: "0.25rem" }}>
                                Term of Service
                            </Link>
                            have changed. Your continued use of this site constitutes your acceptance of such changes.
                        </Typography>
                    </Box>
                </Box>
            </Box>
        </Box>
    );
};

export default MovieSchedule;
