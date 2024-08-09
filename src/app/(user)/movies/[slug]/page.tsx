import MovieDetail from "@/components/detail/page.detail";
import { sendRequest } from "@/utils/api";
import { Box } from "@mui/material";
import { notFound } from "next/navigation";

const DetailMoviePage = async ({ params }: { params: { slug: string } }) => {
    const parts = params.slug.split("-");
    const id = parts[parts.length - 1];

    const movieUrl = new URL(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/movie/${id}`);
    const theatersUrl = new URL(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/theaters`);

    const movieResponse = await sendRequest<IBackendRes<IMovie>>({
        url: movieUrl.toString(),
        method: "GET",
    });

    const theatersResponse = await sendRequest<IBackendRes<ITheater[]>>({
        url: theatersUrl.toString(),
        method: "GET",
    });

    if (!movieResponse?.data) {
        notFound();
    }

    if (!theatersResponse?.data) {
        notFound();
    }

    const movieDetail = movieResponse.data;
    const theaterList = theatersResponse.data;

    return (
        <Box>
            <MovieDetail
                movie={movieDetail}
                theaterList={theaterList}
            />
        </Box>
    );
};



export default DetailMoviePage