'use client';

import Link from 'next/link';
import Image from 'next/image';
import { inter } from '@/app/layout';
import { ChevronLeft } from 'lucide-react';

import { cn } from '@/lib/utils';
import { buttonVariants } from '@/components/ui/button';
import usePokemon from '@/hooks/usePokemon';

export default function PokemonDetailsPage({
  params,
}: {
  params: { pokemon: string };
}) {
  const pokemonName = params.pokemon;

  const { pokemon, pokemonLoading } = usePokemon(pokemonName);

  return (
    <div>
      <Link
        href={'/'}
        className={cn(inter.className, 'flex items-center', buttonVariants())}
      >
        <ChevronLeft className={cn('w-4 h-4 mr-2')} />
        Back
      </Link>

      <div
        className={cn(
          pokemonLoading && 'absolute inset-0 flex items-center justify-center'
        )}
      >
        {pokemonLoading && (
          <div className="w-10 h-10 rounded-full animate-ping bg-black/50"></div>
        )}

        {pokemon === null && <div className="py-24 text-center">Not Found</div>}

        {pokemon && (
          <div className="flex flex-col items-center justify-center py-10">
            <h1 className="mb-6 text-3xl capitalize">{pokemon.name}</h1>

            <Image
              src={pokemon.sprites.other['official-artwork'].front_default}
              alt={pokemon.name}
              height={400}
              width={400}
            />

            <div>
              <p className="font-bold capitalize">
                Types: {pokemon.types.map((type) => type.type.name).join(', ')}
              </p>
              <p className="font-bold capitalize">
                Height: {pokemon.height * 10} cm
              </p>
              <p className="font-bold capitalize">
                Weight: {pokemon.weight / 10} Kg
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
