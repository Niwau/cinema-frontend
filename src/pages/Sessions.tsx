import { Flex, Heading, Image, Stack, Text } from "@chakra-ui/react";
import { useNavigate, useParams } from "react-router-dom";
import { useCinemaStore } from "../store";
import { useEffect } from "react";
import { Session } from "../api/api";

export const Sessions = () => {
  const { movieId } = useParams();
  const { selectedMovie, getSessions, sessions, setSelectedSession } = useCinemaStore();

  useEffect(() => {
    getSessions(Number(movieId));
  }, []);

  const navigate = useNavigate();
  
  const getWeekDay = (date: string) => {
    const days = ['Domingo', 'Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta', 'Sábado'];
    return days[new Date(date).getDay()];
  }

  const formatDate = (date: string) => {
    return new Date(date).toLocaleDateString('pt-BR').slice(0, 5);
  }

  const getTime = (date: string) => {
    return new Date(date).toLocaleTimeString('pt-BR').slice(0, 5).replace(':', 'h');
  }

  const onSessionClick = (session: Session) => {
    setSelectedSession(session);
    navigate(`/${movieId}/sessions/${session.id}/chairs`);
  }

  return (
    <Stack h="100vh" p={16}>

      <Image
        src={selectedMovie?.cover}
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

      <Flex gap={8}>
        <Image src={selectedMovie?.cover} maxW={300} />
        <Stack>
    
          <Stack>
            <Heading>{selectedMovie?.name}</Heading>
            <Text>{selectedMovie?.sinopsis}</Text>
          </Stack>
          
          <Flex direction='row' gap={8} mt={8}>
            {sessions.map((session) => (
              <Stack cursor='pointer' bg='#1A1225' borderRadius={2} key={session.id} alignItems='center' justify='center' p={4} boxSize='120px' onClick={() => {
                onSessionClick(session);
              }}> 
                <Heading size='sm' color='white'>{getWeekDay(session.startsAt)}</Heading>
                <Heading size='sm' color='white'>{formatDate(session.startsAt)}</Heading>
                <Text size='sm' color='white'>{getTime(session.startsAt)}</Text>
              </Stack>
            ))}
          </Flex>
        </Stack>
      </Flex>
    </Stack>
  );
};
