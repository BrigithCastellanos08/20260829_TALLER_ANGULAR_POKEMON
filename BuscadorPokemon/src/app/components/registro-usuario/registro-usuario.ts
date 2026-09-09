import { Component, signal  } from '@angular/core';
import{FormsModule} from '@angular/forms';

export interface Usuario {
  id : number;
        nombrecompleto : string;
        documento : { 
            tipo : string; 
            numero : string;
        }
        fecha_nacimiento : string;
        correo_electronico : string;
        domicilio : {
             pais_domicilio : string;
             ciudad_domicilio : string;
        }

        Número_de_teléfono : string;
        tratamiento_datos : boolean;
}

@Component({
  imports: [FormsModule],
  selector: 'app-registro-usuario',
  standalone : true,
  styleUrl: './registro-usuario.css',
  templateUrl: './registro-usuario.html',
})

export class RegistroUsuario {
    nombre = signal('');
    apellido = signal('');
    tipo_documento = signal('CC');
    documento = signal('');
    fecha_nacimiento = signal('');
    correo = signal('');
    pais = signal('');
    cuidad = signal('');
    telefono= signal('');
    tratamiento_datos = signal(false);

    ultimoUsuario =signal<Usuario | null>(null);
    
    guardarUsuario(){
        if(!this.tratamiento_datos()){
            alert('Debes aceptar el tratamiento de datos personales'); 
        }
        const usuarioCreado = {
        id : Date.now(),
        nombrecompleto : `${this.nombre()} ${this.apellido()}`,
        documento : { 
            tipo : this.tipo_documento(), 
            numero : this.documento()
        },
        fecha_nacimiento : this.fecha_nacimiento(),
        correo_electronico : this.correo(),
        domicilio : {
             pais_domicilio : this.pais(),
             ciudad_domicilio : this.cuidad()
        },

        Número_de_teléfono : this.telefono(),
        tratamiento_datos : this.tratamiento_datos()
           
    }
    localStorage.setItem(usuarioCreado.id.toString(),JSON.stringify(usuarioCreado));
    

    this.ultimoUsuario.set(usuarioCreado);
}
}