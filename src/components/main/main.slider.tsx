'use client'
import { convertSlugUrl } from '@/utils/api';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import { Box } from "@mui/material";
import Button from "@mui/material/Button/Button";
import Divider from '@mui/material/Divider';
import Image from 'next/image';
import Link from 'next/link';
import Slider, { Settings } from "react-slick";
import "slick-carousel/slick/slick-theme.css";
import "slick-carousel/slick/slick.css";
interface IProps {
    title: string,
    data: IMovieTop[],

}

const MainSlider = (props: IProps) => {
    const { data, title } = props
    const NextArrow = (props: any) => {
        return (
            <Button
                color='inherit'
                variant="contained"
                onClick={props.onClick}
                sx={{
                    position: "absolute",
                    right: 25,
                    top: "25%",
                    zIndex: 2,
                    minWidth: 30,
                    width: 35,
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
                    top: "25%",
                    zIndex: 2,
                    minWidth: 30,
                    width: 35,
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
        slidesToScroll: 1,
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
                margin: "0 50px",
                ".movie": {
                    padding: "0 10px",
                    "img": {
                        height: 250,
                        width: 250,
                    }
                },
                "h3": {
                    border: "1px solid #ccc",
                    padding: "20px",
                    height: "200px",
                }
            }}
        >
            <Box>
                <Box
                    sx={{
                        marginRight: "50px"
                    }}>
                    <h2 style={{ textAlign: 'center', color: 'white' }}> {title} </h2>
                </Box>
                <Slider {...settings}>
                    {data.map(movie => (
                        <div className='movie' key={movie._id} style={{ display: 'flex', alignItems: 'flex-start' }}>
                            <div style={{ position: "relative", height: "225px", width: "150px", marginRight: "20px" }}>
                                <Image
                                    alt="Movie Poster"
                                    src={`https://image.tmdb.org/t/p/original${movie.poster_path}`}
                                    fill
                                    style={{ objectFit: 'contain', width: '100%', height: '100%' }}
                                />
                            </div>
                            <div style={{ flex: 1 }}>
                                <Link href={`/movie/${convertSlugUrl(movie.title)}-${movie._id}`}>
                                    <h4>{movie.title}</h4>
                                </Link>
                                <h5>{movie.genres}</h5>
                            </div>
                        </div>
                    ))}
                </Slider>
            </Box>
            <Divider />
        </Box >
    );
}

export default MainSlider;