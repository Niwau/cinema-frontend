import { Button, Heading, Image, Stack, Text } from "@chakra-ui/react";
import { Spinner } from "@chakra-ui/react";
import { useCinemaStore } from "../store";
import { useEffect } from "react";
import { Movie } from "../api/api";
import { useNavigate } from "react-router-dom";

export const Home = () => {
 
  const store = useCinemaStore();
  const { movies, isLoading, currentMovie } = store;
  const navigate = useNavigate();

  useEffect(() => {
    store.getMovies();
  }, [])

  if (isLoading) {
    return <Spinner />;
  }

  if (movies?.length < 1) {
    return <div>No movies found</div>;
  }

  const onMovieClick = (movie: Movie) => {
    store.setSelectedMovie(movie);
    navigate(`/${movie.id}/sessions`);
  }

  return (
    <Stack justifyContent="space-between" h="100vh" p={16}>
      <Stack maxW="50%" gap={4} my='auto'>
        <Stack>
          <Heading>{currentMovie?.name}</Heading>
          <Text>{currentMovie?.sinopsis}</Text>
        </Stack>
        <Stack direction="row">
          <Button colorScheme="pink">Comprar ingressos</Button>
          <Button variant="outline" colorScheme="pink">
            Trailer
          </Button>
        </Stack>
      </Stack>

      <Image
        src={currentMovie?.cover}
        height="100vh"
        width="100%"
        objectFit="cover"
        position="absolute"
        zIndex={-1}
        inset={0}
        objectPosition="center center"
        filter={"blur(5px)"}
        brightness={"0.1"}
      />

      <Stack direction="row" justifyContent="center" gap={8}>
        {movies.map((movie) => (
          <Image
            onClick={() => onMovieClick(movie)}
            cursor='pointer'
            _hover={{
              transform: "translateY(-10px)",
              transition: "all 0.3s ease-in-out",
            }}
            key={movie.id}
            scale={"1"}
            src={movie.cover}
            alt={movie.name}
            maxHeight="300px"
          />
        ))}
      </Stack>
    </Stack>
  );
};
