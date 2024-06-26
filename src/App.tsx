import { Button, Heading, Image, Stack, Text } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { getMovies, Movie } from "./api/api";
import { Spinner } from "@chakra-ui/react";

export const App = () => {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [currentMovie, setCurrentMovie] = useState<Movie | null>(null);

  useEffect(() => {
    getMovies().then((movies) => {
      setMovies(movies);
      setIsLoading(false);
    });
  }, []);

  useEffect(() => {
    const randomMovie = movies[Math.floor(Math.random() * movies.length)];
    setCurrentMovie(randomMovie);
  }, [movies]);

  if (isLoading) {
    return <Spinner />;
  }

  if (movies?.length < 1) {
    return <div>No movies found</div>;
  }

  // blur example = 100%
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
