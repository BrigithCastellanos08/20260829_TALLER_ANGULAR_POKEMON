import { Injectable, inject , signal } from '@angular/core';
import {HttpClient} from '@angular/common/http';
export interface PokemonTarjeta {
    id: number;
    name: string;
    image: string;
    type: string;
    base_experience: number;
    esFavorito?: boolean;
}

@Injectable({
    providedIn: 'root'

    })//cualquier elemento o objeto puede ingresar al servicio

export class PokemonStorageService {
    private http = inject(HttpClient);
    private readonly storageKey = 'equipo_pokemon_registrado';
    
    misPokemons = signal<PokemonTarjeta[]>([]);

    constructor() {
        this.cargarDesdeStorage();
    }

private cargarDesdeStorage() {
    const data = localStorage.getItem(this.storageKey);

    if (data) {
        this.misPokemons.set(JSON.parse(data));
    }
}
//1. Obtener datos de la API de Pokémon
buscarEnAPI(nombreOId: string) {
    return this.http.get<any>(`https://pokeapi.co/api/v2/pokemon/${nombreOId.toLowerCase()}`);

}
//2. Guardar/Crear nuevo Pokémon en el almacenamiento local
guardarPokemon(nuevo: PokemonTarjeta) {
    const actualizados = [...this.misPokemons(), nuevo];
    this.misPokemons.set(actualizados);//es agregar un nuevo valor 
    localStorage.setItem(this.storageKey, JSON.stringify(actualizados));
}
//3.Actualizar Pokémon favorito
actualizarFavorito(id: number) {
    const actualizados = this.misPokemons().map(poke => {
        if (poke.id === id) {
            return { ...poke, esFavorito: !poke.esFavorito };
}
return poke;
    });

    this.misPokemons.set(actualizados);
    localStorage.setItem(this.storageKey, JSON.stringify(actualizados));
};


//4. Eliminar Pokémon 
eliminarPokemon(id: number) {
    const filtrados = this.misPokemons().filter(poke => poke.id !== id);//FILTER,
    this.misPokemons.set(filtrados);
    localStorage.setItem(this.storageKey, JSON.stringify(filtrados));
}
}
