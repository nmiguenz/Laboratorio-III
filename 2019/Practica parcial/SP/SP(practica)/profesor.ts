namespace Examen{
    export class Profesor extends Persona{
    
        public cuil:number;
    
        constructor(name:string, surname:string, cuil:number){
            super();
            this.nombre = name;
            this.apellido = surname;
            this.cuil = cuil;    
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
        public setCuil(cuil:number){
            this.apellido = apellido;
        }
        public getApellido():string{
            return this.apellido;
        }
 
    }
}