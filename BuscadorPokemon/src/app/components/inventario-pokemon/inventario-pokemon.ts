import { Component, inject  } from '@angular/core';
import { NgClass} from '@angular/common';
import { PokemonStorageService } from '../../services/pokemon-storage';
import { ResaltarTarjeta } from '../../directives/resaltar-tarjeta';


@Component({
  imports: [NgClass, ResaltarTarjeta],
  standalone: true, // DECLARA QUE UN COMPONENTE ES AUTONOMO
  selector: 'app-inventario-pokemon',
  styleUrl: './inventario-pokemon.css',
  templateUrl: './inventario-pokemon.html',
})
export class InventarioPokemon {
  pokemonService = inject(PokemonStorageService);

}
