import { sendRequest } from "@/utils/api";
import { useToast } from "@/utils/toast";
import { notFound } from "next/navigation";


const DetailMoviePage = async ({ params }: { params: { slug: string } }) => {
    const toast = useToast();



    const parts = params.slug.split("-");
    const id = parts[parts.length - 1]

    const url = new URL(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/movie/${id}`);
    const res = await sendRequest<IBackendRes<IMovie[]>>({
        url: url.toString(),
        method: "GET",
    });

    if (!res?.data) {
        notFound()
    }

    if (res && res.data) {
        const data = res.data;
        //@ts-ignore
        setMoviesResponse(data)
    } else {
        toast.error(res.message);
    }




    return (
        <div>
            tan ngoc le
        </div>
    )
}


export default DetailMoviePage