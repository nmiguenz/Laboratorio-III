namespace Examen{
    export class Alumno extends Persona{

        legajo:number;
        
        constructor(name:string, surname:string, legajo:number){
            super();
            this.nombre = name;
            this.apellido = surname;
            this.legajo = legajo;    
        }

        public setNombre(nombre:string){
            this.nombre = nombre;
        }
        public getNombre():string{
            return this.nombre;
        }
        public setApellido(apellido:string){
            this.apellido = apellido;
        }
        public getApellido():string{
            return this.apellido;
        }
        public setlegajo(legajo:number){
            this.legajo = legajo;
        }
        public getLegajo():number{
            return this.legajo;
        }
 
    }
}