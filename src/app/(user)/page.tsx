import MainSlider from "@/components/main/main.slider";
import { sendRequest } from "@/utils/api";
import { Container } from "@mui/material";

export default async function HomePage() {

  const currentPlaying = await sendRequest<IBackendRes<IMovieTop[]>>({
    url: `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/movie/current`,
    method: "GET",
  })
  const upComing = await sendRequest<IBackendRes<IMovieTop[]>>({
    url: `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/movie/upcoming`,
    method: "GET",
  })


  return (
    <Container>
      <MainSlider
        title="Now Playing"
        data={currentPlaying?.data ?? []}
      />
      <MainSlider
        title="Coming soon"
        data={upComing?.data ?? []}
      />
    </Container>
  );
}
