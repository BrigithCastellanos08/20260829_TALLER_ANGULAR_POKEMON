import { Component } from '@angular/core';

@Component({
  imports: [],
  selector: 'app-registro-usuario',
  styleUrl: './registro-usuario.css',
  templateUrl: './registro-usuario.html',
})
export class RegistroUsuario {
}
function CrearUsuario ( nombre,apellido,tipo_documento,documento,fecha_nacimiento,correo,pais,ciudad,telefono,tratamiento_datos){

    const UsuarioCreado = {
        id : Date.now(),
        nombrecompleto : `${nombre} ${apellido}`,
        documento : { 
            tipo : tipo_documento, 
            numero : documento
        },
        fecha_nacimiento : fecha_nacimiento,
        correo_electronico : correo,
        domicilio : {
             pais_domicilio : pais,
             ciudad_domicilio : ciudad
        },

        Número_de_teléfono : telefono,
        tratamiento_datos : tratamiento_datos
        
        
    
    
    }
    return UsuarioCreado 
        
    }
  

//captura de informacionA
const formulario = document.querySelector('form');


formulario.addEventListener('submit',function(event) {
    event.preventDefault();

    const Nombre =document.getElementById('nombre').value;
    const Apellido =document.getElementById('apellido').value;
    const tipoDocumento =document.getElementById('tipo_documento').value;
    const numeroDocumento =document.querySelector('.documento-field input')?.value || '';
    const fechaNacimiento =document.getElementById('fecha_nacimiento').value;
    const correoElectronico =document.getElementById('correo').value;
    const Pais =document.getElementById('pais').value;
    const Ciudad =document.querySelector('.ciudad-field select')?.value || '';
    const numeroTelefono =document.getElementById('telefono').value;
    const tratamientoDatos =document.getElementById('tratamiento_datos').checked;

    const CrearUsuario2 = CrearUsuario(Nombre,Apellido,tipoDocumento,numeroDocumento,fechaNacimiento,correoElectronico,Pais,Ciudad,numeroTelefono,tratamientoDatos);
    
    //convertir los datos en JSON 
    const usuarioJSON = JSON.stringify(CrearUsuario2)

    //Guardado 
    localStorage.setItem(CrearUsuario2.id,usuarioJSON)

});


const formularioPokemon = document.getElementById('formPokedex');

formularioPokemon.addEventListener('submit', async function(event) {
    event.preventDefault();
    const nombrePokemon = document.getElementById('pokemonInput').value.trim().toLowerCase();

    if(!nombrePokemon) return;

try{

    const respuesta = await fetch(`https://pokeapi.co/api/v2/pokemon/${nombrePokemon}`);

    if(!respuesta.ok) {
        throw new Error ('¡No encontre nada chamo!');

}

   const datos = await respuesta.json();
   
   cositasPokemon(datos);
}


 catch(error) {
    const contenedor = document.getElementById('resultadoPokemon')
    contenedor.innerHTML =
      `<div> 
        <p>  ${error.message}</p>
      </div>`;
 }
});

function cositasPokemon(argumentos){

    const contenedor = document.getElementById('resultadoPokemon')
    const nombre = argumentos.name.toUpperCase();
    const imagen = argumentos.sprites.front_default;
    contenedor.innerHTML =
      `<div> 
        <h2>${nombre}</h2>
        <img src ="${imagen}" style="with: 200px; height: 200px">
     </div>`;

}
    


    
