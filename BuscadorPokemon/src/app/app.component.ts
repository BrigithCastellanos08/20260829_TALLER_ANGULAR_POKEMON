pokemon
import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { catchError, forkJoin, of } from 'rxjs';

type Pokemon = { id: number; name: string; image: string; types: string[] };
type PokemonResponse = { id: number; name: string; sprites: { other: { 'official-artwork': { front_default: string } } }; types: { type: { name: string } }[] };

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, FormsModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <main class="page-shell">
      <section class="hero" aria-labelledby="page-title">
        <div class="topbar"><span class="pokeball-mark" aria-hidden="true"></span><span>POKÉDEX / 001</span><span class="status"><i></i> API ONLINE</span></div>
        <div class="hero-copy"><p class="eyebrow">Base de datos Pokémon</p><h1 id="page-title">Explora.<br><em>Descubre.</em></h1><p class="intro">Busca entre cientos de especies y descubre sus características, tipos y arte oficial.</p></div>
        <form class="search-box" (ngSubmit)="search()"><label for="pokemon-search">Nombre o número de Pokémon</label><div class="search-row"><input id="pokemon-search" name="pokemon" [ngModel]="query()" (ngModelChange)="query.set($event)" placeholder="Ej. pikachu o 25" autocomplete="off"/><button type="submit" [disabled]="loading()"><span>{{ loading() ? 'Buscando…' : 'Buscar' }}</span><b>↗</b></button></div></form>
      </section>
      <section class="results" aria-live="polite"><div class="section-heading"><div><p class="eyebrow">Resultados</p><h2>{{ searched() ? 'Tu búsqueda' : 'Favoritos de la Pokédex' }}</h2></div><span class="result-count">{{ results().length | number:'2.0-0' }} encontrados</span></div>
        @if (error()) { <div class="message error"><strong>No encontramos ese Pokémon.</strong><span>Prueba con otro nombre o número.</span></div> }
        @if (loading()) { <div class="message"><span class="loader"></span><span>Consultando PokéAPI…</span></div> }
        @if (!loading() && !error() && results().length) { <div class="grid">@for (pokemon of results(); track pokemon.id) { <article class="pokemon-card"><div class="card-top"><span>#{{ pokemon.id | number:'3.0-0' }}</span><span class="spark">✦</span></div><img [src]="pokemon.image" [alt]="'Ilustración oficial de ' + pokemon.name"/><div class="card-info"><h3>{{ pokemon.name }}</h3><div class="types">@for (type of pokemon.types; track type) { <span>{{ type }}</span> }</div></div></article> }</div> }
      </section>
      <footer><span>Datos proporcionados por PokéAPI</span><span>Hecho para explorar el mundo Pokémon</span></footer>
    </main>
  `,
  styles: []
})
export class AppComponent {
  private http = inject(HttpClient);
  query = signal('');
  results = signal<Pokemon[]>([]);
  loading = signal(false);
  error = signal(false);
  searched = signal(false);
  private featured = ['pikachu', 'charizard', 'bulbasaur', 'mewtwo'];

  constructor() { this.load(this.featured); }
  search() { const value = this.query().trim().toLowerCase(); if (!value) return; this.searched.set(true); this.load([value]); }
  private load(names: string[]) { this.loading.set(true); this.error.set(false); forkJoin(names.map((name) => this.http.get<PokemonResponse>(`https://pokeapi.co/api/v2/pokemon/${encodeURIComponent(name)}`).pipe(catchError(() => of(null))))).subscribe((items) => { const valid = items.filter((item): item is PokemonResponse => item !== null); this.results.set(valid.map((item) => ({ id: item.id, name: item.name, image: item.sprites.other['official-artwork'].front_default, types: item.types.map((type) => type.type.name) }))); this.error.set(valid.length === 0); this.loading.set(false); }); }
}
