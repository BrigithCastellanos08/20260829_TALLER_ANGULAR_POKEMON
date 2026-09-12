import { Component, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgClass , NgStyle } from '@angular/common';
import { PokemonStorageService, PokemonTarjeta } from '../../services/pokemon-storage';
import { ResaltarTarjeta } from '../../directives/resaltar-tarjeta';


@Component({
  imports: [FormsModule, NgClass, NgStyle, ResaltarTarjeta],
  standalone: true, // DECLARA QUE UN COMPONENTE ES AUTONOMO
  selector: 'app-buscador-pokemon',
  styleUrl: './buscador-pokemon.css',
  templateUrl: './buscador-pokemon.html',
})


export class BuscadorPokemon {

  pokemonService = inject(PokemonStorageService);
  nombrePokemonInput = signal('') ;
  pokemon = signal<PokemonTarjeta | null>(null);
  mensajeError = signal<string | null>(null);
  cargando = signal(false);

  buscarPokemon() {
  
  const nombrePokemon = this.nombrePokemonInput().trim().toLowerCase();

  if (!nombrePokemon) return;

  this.mensajeError.set(null); // Limpiar mensaje de error antes de la búsqueda
  this.cargando.set(true); // Indicar que la búsqueda está en cargando
 
  this.pokemonService.buscarEnAPI(nombrePokemon).subscribe({
    next: (res) => {
      this.pokemon.set({
        id: res.id,
        name: res.name.toUpperCase(),
        image: res.sprites.front_default,
        type: res.types[0].type.name,
        base_experience: res.base_experience,
        esFavorito: false

    });

    this.cargando.set(false);
  }, error: () => {
    this.pokemon.set(null);
    this.mensajeError.set('Ojito no se encontro el pokemon');
    this.cargando.set(false);
  }
});

}

guardarEnEquipo() {
  const poke = this.pokemon();
  if (poke){
    this.pokemonService.guardarPokemon(poke);
    alert(`${poke.name} agregado al almacenamiento exitosamente!`);
    this.pokemon.set(null);
    this.nombrePokemonInput.set('');
  }
}

}