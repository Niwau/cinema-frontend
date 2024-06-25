import axios from "axios";

export interface Movie {
  id: number;
  name: string;
  sinopsis: string;
  cover: string;
}

export const api = axios.create({
  baseURL: "http://localhost:5147",
  headers: {
    "Content-Type": "application/json",
  },
});

export const getMovies = async () => {
  try {
    const response = await api.get<Movie[]>("/movie");
    return response.data;
  } catch (error) {
    console.error(error);
    return [];
  }
}
