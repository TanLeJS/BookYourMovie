"use client"

import { convertSlugUrl, sendRequest } from "@/utils/api";
import { useToast } from "@/utils/toast";
import SearchIcon from '@mui/icons-material/Search';
import StarIcon from '@mui/icons-material/Star';
import { alpha, Box, Container, Grid, InputBase, styled } from "@mui/material";
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Pagination from '@mui/material/Pagination';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import Stack from '@mui/material/Stack';
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import * as React from 'react';

const Search = styled('div')(({ theme }) => ({
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: alpha(theme.palette.common.white, 0.15),
    '&:hover': {
        backgroundColor: alpha(theme.palette.common.white, 0.25),
    },
    marginRight: theme.spacing(2),
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
        marginLeft: theme.spacing(3),
        width: 'auto',
    },
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
    color: 'inherit',
    '& .MuiInputBase-input': {
        padding: theme.spacing(1, 1, 1, 0),
        // vertical padding + font size from searchIcon
        paddingLeft: `calc(1em + ${theme.spacing(4)})`,
        transition: theme.transitions.create('width'),
        width: '50%',
        [theme.breakpoints.up('md')]: {
            width: '400px'
        },
    },
}));

const SortPagination = () => {
    const router = useRouter()
    const toast = useToast();
    const [listMovies, setListMovies] = React.useState<IMovieTop[]>([]);
    const [type, setType] = React.useState("");
    const [meta, setMeta] = React.useState({
        current: 1,
        pageSize: 20,
        pages: 0,
        total: 0
    });


    React.useEffect(() => {
        fetchPageWithPagination(meta.current);
        router.refresh()
    }, [meta.current]); // Call this effect when the `current` page changes


    const handleTypeChange = (event: SelectChangeEvent) => {
        setType(event.target.value as string);
    };


    const handlePageChange = async (event: React.ChangeEvent<unknown>, page: number) => {
        setMeta({
            current: page,
            pageSize: meta.pageSize,
            pages: meta.pages,
            total: meta.total
        }
        )

    };

    const fetchPageWithPagination = async (page: number) => {
        try {
            const result = await sendRequest<IBackendRes<IMovieTop[]>>({
                url: `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/movie?current=${meta.current}&pageSize=${meta.pageSize}`,
                method: "GET",
                nextOption: {
                    caches: "no-store"
                }

            });

            if (result && result.data) {
                const data = result.data;
                //@ts-ignore
                setListMovies(data.result);
                console.log(data.meta.current)
                console.log(data.meta.pageSize)
                console.log(data.meta.pages)
                console.log(data.meta.total)
                setMeta({
                    //@ts-ignore
                    current: data.meta.current,
                    //@ts-ignore
                    pageSize: data.meta.pageSize,
                    //@ts-ignore
                    pages: data.meta.pages,
                    //@ts-ignore
                    total: data.meta.total,
                });
            } else {
                toast.error(result.message);
            }
        } catch (error) {
            toast.error("Failed to fetch movies. Please try again.");
        }
    };

    return (
        <Box sx={{ padding: 3 }}>
            <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "30px" }}>
                <h2 style={{ color: "black", marginLeft: "20px", marginBottom: "30px" }}>Finding Movie</h2>
                <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
                    <FormControl sx={{ minWidth: 150 }}>
                        <InputLabel id="demo-simple-select-label">Type</InputLabel>
                        <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            value={type}
                            label="Type"
                            onChange={handleTypeChange}
                        >
                            <MenuItem value={"Action"}>Action</MenuItem>
                            <MenuItem value={"Adventure"}>Adventure</MenuItem>
                            <MenuItem value={"Animation"}>Animation</MenuItem>
                            <MenuItem value={"Comedy"}>Comedy</MenuItem>
                            <MenuItem value={"Crime"}>Crime</MenuItem>
                            <MenuItem value={"Documentary"}>Documentary</MenuItem>
                            <MenuItem value={"Drama"}>Drama</MenuItem>
                            <MenuItem value={"Family"}>Family</MenuItem>
                            <MenuItem value={"Fantasy"}>Fantasy</MenuItem>
                            <MenuItem value={"History"}>History</MenuItem>
                            <MenuItem value={"Horror"}>Horror</MenuItem>
                            <MenuItem value={"Mystery"}>Mystery</MenuItem>
                            <MenuItem value={"Music"}>Music</MenuItem>
                            <MenuItem value={"Romance"}>Romance</MenuItem>
                            <MenuItem value={"War"}>War</MenuItem>
                            <MenuItem value={"Western"}>Western</MenuItem>
                        </Select>
                    </FormControl>
                    <Search>
                        <SearchIconWrapper>
                            <SearchIcon />
                        </SearchIconWrapper>
                        <StyledInputBase
                            placeholder="Searching your movie..."
                            inputProps={{ 'aria-label': 'search' }}
                            onKeyDown={(e: any) => {
                                if (e.key === "Enter") {
                                    if (e?.target?.value)
                                        router.push(`/search?q=${e?.target?.value}`)
                                }
                            }}
                        />
                    </Search>
                </Box>
            </Box>

            <Grid container spacing={5} >
                {listMovies.map(movie => (
                    <Grid item sx={{ width: '20%' }} key={movie._id}>
                        <Container>
                            <div className='movie' key={movie._id} >
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
                                        <h5 style={{ color: "black", margin: 0, fontSize: "15px" }}>{movie.title}</h5>
                                    </Link>
                                    <h5 style={{ color: "rgb(102, 102, 102)", margin: 0, fontSize: "12px" }}>{movie.genres}</h5>
                                    <Box sx={{ display: "flex" }}>
                                        <StarIcon
                                            sx={{
                                                width: "15px",
                                                height: "15px"
                                            }}
                                            color='warning' />
                                        <h5 style={{ color: "black", margin: 0, fontSize: "12px" }}>{movie.vote_average.toFixed(1)}</h5>
                                    </Box>
                                </div>
                            </div>
                        </Container>
                    </Grid>

                ))}
            </Grid>
            <Stack sx={{ display: "flex", alignItems: "center", marginTop: 4 }} spacing={2}>
                <Pagination count={meta.pages} page={meta.current} onChange={handlePageChange} />
            </Stack>
        </Box >
    );
};

export default SortPagination