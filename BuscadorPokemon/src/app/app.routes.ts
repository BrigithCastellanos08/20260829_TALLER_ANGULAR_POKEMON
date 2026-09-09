import { Routes } from '@angular/router';
import { RegistroUsuario } from './components/registro-usuario/registro-usuario';
import { BuscadorPokemon } from './components/buscador-pokemon/buscador-pokemon';
export const routes: Routes = [
  { path: 'registro', component: RegistroUsuario }, //ME LLEVA A BUSCADOR POR DEFECTO DE REGISTROUSUARIO    
  { path: 'buscador', component: BuscadorPokemon }, //AQUI ME LLEVA A BUSCADOR POR DEFECTO DE BUSCADORPOKEMON
  { path: '', redirectTo: '/buscador', pathMatch: 'full' }
];


