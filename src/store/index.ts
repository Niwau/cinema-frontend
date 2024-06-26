import { create } from "zustand";
import { getMovies, getSessions, Movie, Session } from "../api/api";

interface Store {
  // Movies
  movies: Movie[];
  isLoading: boolean;
  currentMovie: Movie | null;
  setMovies: (movies: Movie[]) => void;
  setIsLoading: (isLoading: boolean) => void;
  setCurrentMovie: (currentMovie: Movie) => void;
  getMovies: () => Promise<void>;
  setSelectedMovie: (movie: Movie) => void;
  selectedMovie: Movie | null;

  // Sessions
  sessions: Session[];
  isLoadingSessions: boolean;
  setSessions: (sessions: Session[]) => void;
  getSessions: (movieId: number) => Promise<void>;
  selectedSession: Session | null;
  setSelectedSession: (session: Session) => void;
}

export const useCinemaStore = create<Store>((set) => ({
  movies: [],
  isLoading: true,
  currentMovie: null,
  setMovies: (movies) => set({ movies }),
  setIsLoading: (isLoading) => set({ isLoading }),
  setCurrentMovie: (currentMovie) => set({ currentMovie }),
  getMovies: async () => {
    set({ isLoading: true });
    const movies = await getMovies();
    set({ movies, isLoading: false, currentMovie: movies[0] });
  },
  setSelectedMovie: (selectedMovie) => set({ selectedMovie }),
  selectedMovie: null,
  sessions: [],
  isLoadingSessions: true,
  setSessions: (sessions) => set({ sessions }),
  getSessions: async (movieId) => {
    set({ isLoadingSessions: true });
    const sessions = await getSessions(movieId);
    set({ sessions, isLoadingSessions: false });
  },
  selectedSession: null,
  setSelectedSession: (selectedSession) => set({ selectedSession }),
}))