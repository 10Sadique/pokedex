'use client';

import Link from 'next/link';
import Image from 'next/image';

import { cn } from '@/lib/utils';
import usePokemon from '@/hooks/usePokemon';

export const PokemonEntry = ({ name }: { name: string }) => {
  const { pokemon, pokemonLoading } = usePokemon(name);

  return (
    <Link href={`/${name}`}>
      <div className="flex flex-col items-center justify-center p-4 rounded-xl bg-white/20 backdrop-blur-[5px] drop-shadow-lg h-[260px]">
        {pokemonLoading && (
          <div className={cn('flex items-center justify-center h-full w-full')}>
            <div className="w-10 h-10 rounded-full animate-ping bg-black/50" />
          </div>
        )}

        {pokemon && (
          <div>
            <h1 className="text-xl font-bold text-center">{pokemon.name}</h1>
            <Image
              src={pokemon.sprites.other['official-artwork'].front_default}
              alt={pokemon.name}
              height={200}
              width={200}
            />
          </div>
        )}
      </div>
    </Link>
  );
};
