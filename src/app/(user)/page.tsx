import CurrentPlaying from "@/components/main/currentPlaying";
import MainSlider from "@/components/main/main.slider";
import { sendRequest } from "@/utils/api";
import { Box, Container } from "@mui/material";

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
    <Box
      sx={{
        position: 'relative', // Required for the overlay to position correctly
        margin: "0",
        height: 'calc(100vh - 250px)',
        backgroundImage: 'url(/background/background.jpg)', // Correctly setting the background image
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        padding: "20px",
        '::before': {
          content: '""',
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          backgroundColor: 'rgba(0, 0, 0, 0.8)', // Increase opacity to make it darker
          zIndex: 1, // Make sure the overlay is behind the content
        },
        '> *': {
          position: 'relative',
          zIndex: 2, // Make sure the content is above the overlay
        }
      }}>
      <Container>

        <CurrentPlaying
          data={currentPlaying?.data ?? []}
        />
      </Container>

      <Container>
        <MainSlider
          data={upComing?.data ?? []}
        />
      </Container>
    </Box>
  );
}
