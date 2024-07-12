"use client"

import { Box, Container, Divider, Icon, Typography } from '@mui/material';

import AgeAllowed from '../../../public/icon/ageallowed.png';
import AgeRestricted from '../../../public/icon/agerestricted.png';

interface IInfo {
    data: IMovie
}

const MovieInfo = (props: IInfo) => {
    const movie = props.data;
    return (
        <Box sx={{ backgroundColor: '#1c1c1c', color: '#ffffff', padding: '20px' }}>
            <Container >
                <Box sx={{ margin: '0 auto', maxWidth: '800px' }}>
                    <Box sx={{ display: 'flex', justifyContent: 'flex-start', marginBottom: '20px' }}>
                        <Box sx={{ marginRight: '200px' }}>
                            <Typography variant="subtitle1" sx={{ fontWeight: 'bold', color: "rgb(169,169,169)", fontSize: "16px" }}>RELEASE DATE</Typography>
                            <Typography variant="subtitle1" sx={{ color: "rgb(255, 255, 255)", fontSize: "21px", fontWeight: "500" }}>{movie.release_date}</Typography>
                        </Box>
                        <Box>
                            <Typography variant="subtitle1" sx={{ fontWeight: 'bold', color: "rgb(169,169,169)", fontSize: "16px" }}>RUNNING TIME</Typography>
                            <Typography variant="body2" sx={{ color: "rgb(255, 255, 255)", fontSize: "21px", fontWeight: "500" }}>{movie.duration} MINS</Typography>
                        </Box>
                    </Box>
                    <Divider sx={{ backgroundColor: '#404040', marginBottom: '20px' }} />

                    <Box sx={{ textAlign: 'left', marginBottom: '20px' }}>
                        <Typography variant="subtitle1" sx={{ fontWeight: 'bold', color: "rgb(169,169,169)", fontSize: "16px" }}>SYNOPSIS</Typography>
                        <Typography variant="body2" sx={{ color: "rgb(255, 255, 255)", fontSize: "21px", fontWeight: "500" }}>{movie.overview}</Typography>
                    </Box>
                    <Divider sx={{ backgroundColor: '#404040', marginBottom: '20px' }} />

                    <Box sx={{ display: 'flex', justifyContent: 'space-between', marginBottom: '20px' }}>
                        <Box sx={{ marginRight: '50px', }}>
                            <Typography variant="subtitle1" sx={{ fontWeight: 'bold', color: "rgb(169,169,169)", fontSize: "16px" }}>DIRECTOR</Typography>
                            <Typography variant="body2" sx={{ color: "rgb(255, 255, 255)", width: "260px", fontSize: "21px", fontWeight: "500", }}>{movie.director}</Typography>
                        </Box>
                        <Box>
                            <Typography variant="subtitle1" sx={{ fontWeight: 'bold', color: "rgb(169,169,169)" }}>CAST</Typography>
                            <Typography variant="body2" sx={{ color: "rgb(255, 255, 255)", fontSize: "21px", fontWeight: "500" }}>{movie.actors}</Typography>
                        </Box>
                    </Box>

                    <Box sx={{ textAlign: 'left', marginBottom: '20px' }}>
                        <Typography variant="subtitle1" sx={{ fontWeight: 'bold', color: "rgb(169,169,169)", fontSize: "16px" }}>GENRES</Typography>
                        <Typography variant="body2" sx={{ color: "rgb(255, 255, 255)", fontSize: "21px", fontWeight: "500", }}>{movie.genres}</Typography>
                    </Box>
                    <Divider sx={{ backgroundColor: '#404040', marginBottom: '20px' }} />

                    <Box sx={{ display: 'flex', justifyContent: 'space-between', marginBottom: '20px' }}>
                        <Box sx={{ marginRight: '70px', width: "260px" }}>
                            <Typography variant="subtitle1" sx={{ fontWeight: 'bold', color: "rgb(169,169,169)", fontSize: "16px" }}>AGE RESTRICTION</Typography>
                            <Box>
                                {movie.adult ? (
                                    <Box>
                                        <Icon>
                                            <img src={AgeRestricted.src} alt="Age Restricted" height={25} width={25} />
                                        </Icon>
                                        <Typography variant="body2" sx={{ color: "rgb(255, 255, 255)", fontSize: "15px", fontWeight: "500", }}>Some material may not be suitable for young children.
                                        </Typography>

                                    </Box>

                                ) : (
                                    <Box>
                                        <Icon>
                                            <img src={AgeAllowed.src} alt="Age Allowed" height={25} width={25} />
                                        </Icon>
                                        <Typography variant="body2" sx={{ color: "rgb(255, 255, 255)", fontSize: "15px", fontWeight: "500", }}>Some material may not be suitable for young children.
                                        </Typography>
                                    </Box>
                                )}

                            </Box>
                        </Box>
                    </Box>
                </Box>
            </Container >
        </Box >
    );
};

export default MovieInfo;
