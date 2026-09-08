import {} from'@angular/router';
import { Routes } from '@angular/router';
import {RegistroUsuarioPokemon} from './components/registro-usuario/registro-usuario.components';
import {BuscadorPokemon} from './componets/buscador-pokemon/buscador-pokemon.componets';
import path from 'path';
import { Component } from '@angular/core';
import { redirect } from 'next/dist/server/api-utils';

export const_routes: Routes = [
    {path: 'registro',components: RegistroUsuarioPokemon},
    {path: 'buscador',components: BuscadorPokemon},
    {path:'',redirectTo: '/buscador', pathMatch: 'full'}
]

