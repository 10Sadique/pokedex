import { Pokemon, PokemonPage } from '@/models/Pokemon';
import api from '@/network/axiosInstance';

export async function getPokemon(name: string) {
  const res = await api.get<Pokemon>(`/pokemon/${name}`);

  return res.data;
}

export async function getPokemonPage(page: number) {
  const pageSize = 12;
  const res = await api.get<PokemonPage>(
    `/pokemon?limit=${pageSize}&offset=${pageSize * (page - 1)}`
  );

  return res.data;
}
