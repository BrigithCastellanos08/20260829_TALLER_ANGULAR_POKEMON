import { Component, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';

interface PokemonData {
  name: string;
  image: string;
  type: string;
}

@Component({
  imports: [FormsModule],
  standalone: true, // DECLARA QUE UN COMPONENTE ES AUTONOMO
  selector: 'app-buscador-pokemon',
  styleUrl: './buscador-pokemon.css',
  templateUrl: './buscador-pokemon.html',
})


export class BuscadorPokemon {
  nombrePokemonInput = signal('') ;
  pokemon = signal<PokemonData | null>(null);
  mensajeError = signal<string | null>(null);

  async buscarPokemon() {
  
  const nombrePokemon = this.nombrePokemonInput().trim().toLowerCase();

  if (!nombrePokemon) return;

  this.mensajeError.set(null); // Limpiar mensaje de error antes de la búsqueda
  
  try {
    
    const  respuesta = await fetch(`https://pokeapi.co/api/v2/pokemon/${nombrePokemon}`);

    if (!respuesta.ok) {
    throw  new Error('¡No se encontró el Pokémon!');
    }

    const datos = await respuesta.json();

    this.pokemon.set({
      name: datos.name.toUpperCase(),
      image: datos.sprites.front_default,
      type: datos.types.map((typeInfo: any) => typeInfo.type.name).join (', '), //EL MAP ME CONVIERTE EN TEXTO DE ACUERDO CON LA PROPIEDAD QUE YO LE PIDA EN ESTE CASO ES NAME//ME LLAMA LISTAS
    });

  }catch (error: any) {
    this.pokemon.set(null);
    this.mensajeError.set(error.message);
  }
  
}

}