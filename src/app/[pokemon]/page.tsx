'use client';

import useSWR from 'swr';
import * as PokemonApi from '@/network/pokemon-api';
import Link from 'next/link';
import { ChevronLeft } from 'lucide-react';

export default function PokemonDetailsPage({
  params,
}: {
  params: { pokemon: string };
}) {
  const pokemonName = params.pokemon;

  const { data: pokemon, isLoading: pokemonLoading } = useSWR(
    pokemonName,
    PokemonApi.getPokemon
  );

  console.log(pokemon);

  return (
    <div>
      <Link href={'/'}>
        <ChevronLeft className="w-4 h-4 mr-2" />
        Back
      </Link>
    </div>
  );
}
