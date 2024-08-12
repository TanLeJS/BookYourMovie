// components/MovieSchedule.js
"use client"
import { Box } from '@mui/material';



interface ISheduleInfo {
    scheduleResponse: ISchedule
}

const MovieSchedule = (props: ISheduleInfo) => {
    console.log(props.scheduleResponse)
    return (
        <Box display="flex"
            bgcolor="#000"
            color="#fff"
            p={2}
            fontFamily="Arial, sans-serif">
            <Box>
                {/* <Image
                    alt="Movie Poster"
                    src={`https://image.tmdb.org/t/p/original${schedule.movie.poster_path}`}
                    fill
                /> */}
            </Box>
            <Box>

            </Box>
        </Box>
    );
};

export default MovieSchedule;
