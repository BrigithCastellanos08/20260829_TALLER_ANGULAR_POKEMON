//AQUI ESTOY EXPORTANDO LAS LIBRERIAS
import { Routes } from '@angular/router';
import { RegistroUsuario } from './components/registro-usuario/registro-usuario';
import { BuscadorPokemon } from './components/buscador-pokemon/buscador-pokemon';
import { InventarioPokemon } from './components/inventario-pokemon/inventario-pokemon';
export const routes: Routes = [
  { path: 'registro', component: RegistroUsuario }, //ME LLEVA A BUSCADOR POR DEFECTO DE REGISTROUSUARIO    
  { path: 'buscador', component: BuscadorPokemon }, //AQUI ME LLEVA A BUSCADOR POR DEFECTO DE BUSCADORPOKEMON
  { path: 'inventario', component: InventarioPokemon }, //AQUI ME LLEVA A INVENTARIO POR DEFECTO DE INVENTARIOPOKEMON
  { path: '', redirectTo: '/buscador', pathMatch: 'full' }
];