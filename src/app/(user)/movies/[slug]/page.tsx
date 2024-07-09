import MovieDetail from "@/components/detail/page.detail";
import { sendRequest } from "@/utils/api";
import { notFound } from "next/navigation";


const DetailMoviePage = async ({ params }: { params: { slug: string } }) => {

    const parts = params.slug.split("-");
    const id = parts[parts.length - 1]

    const url = new URL(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/movie/${id}`);
    const res = await sendRequest<IBackendRes<IMovie>>({
        url: url.toString(),
        method: "GET",
    });

    if (!res?.data) {
        notFound()
    }
    const data = res.data




    return (
        <div>
            <MovieDetail
                data={data}
            />
        </div>
    )
}


export default DetailMoviePage