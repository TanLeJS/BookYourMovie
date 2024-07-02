'use client'
import { convertSlugUrl } from '@/utils/api';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import StarIcon from '@mui/icons-material/Star';
import { Box } from "@mui/material";
import Button from "@mui/material/Button/Button";
import Divider from '@mui/material/Divider';
import Image from 'next/image';
import Link from 'next/link';
import Slider, { Settings } from "react-slick";
import "slick-carousel/slick/slick-theme.css";
import "slick-carousel/slick/slick.css";

interface IProps {
    data: IMovieTop[],
}

const styles = {

    largeIcon: {
        width: 20,
        height: 20,
    },

};

const CurrentPlaying = (props: IProps) => {
    const { data } = props

    const NextArrow = (props: any) => {
        return (
            <Button
                color='inherit'
                variant="contained"
                onClick={props.onClick}
                sx={{
                    position: "absolute",
                    right: 0, // Move the arrow further to the right
                    top: "40%",
                    transform: "translateY(-50%)",
                    zIndex: 2,
                    minWidth: 35,
                    width: 35,
                    height: 35,
                    borderRadius: "50%",
                    backgroundColor: "white",

                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                }}
            >
                <ChevronRightIcon />
            </Button>
        )
    }


    const PrevArrow = (props: any) => {
        return (
            <Button
                color='inherit'
                variant="contained"
                onClick={props.onClick}
                sx={{
                    position: "absolute",
                    left: -50, // Move the arrow further to the left
                    top: "40%",
                    transform: "translateY(-50%)",
                    zIndex: 2,
                    minWidth: 35,
                    width: 35,
                    height: 35,
                    borderRadius: "50%",
                    backgroundColor: "white",
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                }}
            >
                <ChevronLeftIcon />
            </Button>
        )
    }


    const settings: Settings = {
        infinite: true,
        speed: 500,
        slidesToShow: 5,
        slidesToScroll: 3,
        nextArrow: <NextArrow />,
        prevArrow: <PrevArrow />,
        responsive: [
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 3,
                    slidesToScroll: 3,
                    infinite: true,
                    dots: true
                }
            },
            {
                breakpoint: 600,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 2,
                    initialSlide: 2
                }
            },
            {
                breakpoint: 480,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1
                }
            }
        ]
    };
    //box === div
    return (
        <Box
            sx={{
                width: "100%",
                margin: "0 30px",
                ".movie": {
                    padding: "0 10px",
                    "img": {
                        height: 250,
                        width: 250,
                    }
                },
            }}
        >
            <Box>
                <Box
                    sx={{
                        marginRight: "50px"
                    }}>
                    <h2 style={{ textAlign: 'center', color: 'white' }}> Now Playing </h2>
                </Box>
                <Slider {...settings}>
                    {data.map(movie => (
                        <div className='movie' key={movie._id} style={{ display: 'flex', alignItems: 'flex-start' }}>
                            <div style={{ position: "relative", height: "225px", width: "150px" }}>
                                <Link
                                    href={`/movie/${convertSlugUrl(movie.title)}-${movie._id}`}
                                    style={{ textDecoration: 'none' }}>
                                    <Image
                                        alt="Movie Poster"
                                        src={`https://image.tmdb.org/t/p/original${movie.poster_path}`}
                                        fill
                                    />
                                </Link>
                            </div>
                            <div style={{ flex: 1, marginTop: "2px" }}>
                                <Link
                                    href={`/movie/${convertSlugUrl(movie.title)}-${movie._id}`}
                                    style={{ textDecoration: 'none' }}
                                >
                                    <h5 style={{ color: "white", margin: 0, fontSize: "15px" }}>{movie.title}</h5>
                                </Link>
                                <h5 style={{ color: "#ccc", margin: 0, fontSize: "12px" }}>{movie.genres}</h5>
                                <Box sx={{ display: "flex" }}>
                                    <StarIcon
                                        sx={{
                                            width: "15px",
                                            height: "15px"
                                        }}
                                        color='warning' />
                                    <h5 style={{ color: "white", margin: 0, fontSize: "12px" }}>{movie.vote_average.toFixed(1)}</h5>
                                </Box>
                            </div>
                        </div>
                    ))}
                </Slider>
            </Box>
            <Divider />
        </Box >
    );
}

export default CurrentPlaying;