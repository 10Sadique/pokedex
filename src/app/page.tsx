'use client';

import useSWR from 'swr';
import { useSearchParams, useRouter } from 'next/navigation';

import { cn } from '@/lib/utils';
import { inter } from './layout';
import { Button } from '@/components/ui/button';
import * as PokemonApi from '@/network/pokemon-api';
import { PokemonEntry } from '@/components/PokemonEntry';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import Link from 'next/link';

export default function Home() {
  const router = useRouter();
  const param = useSearchParams();
  const page = parseInt(param.get('page') || '1');

  const { data, isLoading } = useSWR(['getPokemonPage', page], ([key, page]) =>
    PokemonApi.getPokemonPage(page)
  );

  if (isLoading) {
    return (
      <div
        className={cn(
          'absolute inset-0 flex items-center justify-center h-full w-full'
        )}
      >
        <div className="w-10 h-10 rounded-full animate-ping bg-black/50" />
      </div>
    );
  }

  return (
    <main className="container">
      <h1 className="text-center">
        <Link href={'/'} className="text-3xl font-bold">
          Pokedex
        </Link>
      </h1>
      <div className="grid grid-cols-1 gap-4 my-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {data?.results.map((pokemon) => (
          <PokemonEntry key={pokemon.name} name={pokemon.name} />
        ))}
      </div>

      <div
        className={cn(
          data?.next && 'mt-10',
          data?.previous && 'mt-10',
          inter.className,
          'space-x-4 flex items-center justify-center'
        )}
      >
        {data?.previous && (
          <Button onClick={() => router.push(`/?page=${page - 1}`)}>
            <ChevronLeft className="w-4 h-4 mr-2" /> Previous
          </Button>
        )}
        {data?.next && (
          <Button onClick={() => router.push(`/?page=${page + 1}`)}>
            Next
            <ChevronRight className="w-4 h-4 ml-2" />
          </Button>
        )}
      </div>
    </main>
  );
}
