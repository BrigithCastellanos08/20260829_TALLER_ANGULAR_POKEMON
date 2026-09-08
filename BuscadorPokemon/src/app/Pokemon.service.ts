import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { forkJoin, Observable } from 'rxjs';

export interface Pokemon {
  id: number;
  name: string;
  image: string;
}

interface PokemonResponse {
  id: number;
  name: string;
  sprites: { other?: { 'official-artwork'?: { front_default?: string } } };
}

@Injectable({ providedIn: 'root' })
export class PokemonService {
  private readonly http = inject(HttpClient);
  private readonly apiUrl = 'https://pokeapi.co/api/v2/pokemon';

  getPokemon(names: string[]): Observable<Pokemon[]> {
    return forkJoin(names.map((name) => this.http.get<PokemonResponse>(`${this.apiUrl}/${encodeURIComponent(name)}`))).pipe(
      // The API response is normalized here so the component only handles view data.
      (source) => new Observable<Pokemon[]>((subscriber) => source.subscribe({
        next: (responses) => subscriber.next(responses.map((pokemon) => ({
          id: pokemon.id,
          name: pokemon.name,
          image: pokemon.sprites.other?.['official-artwork']?.front_default ?? `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${pokemon.id}.png`
        }))),
        error: (error) => subscriber.error(error),
        complete: () => subscriber.complete()
      }))
    );
  }
}