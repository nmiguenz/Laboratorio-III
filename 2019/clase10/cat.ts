namespace Animales{
    export class Cat implements Animal{
        public name;
    
        constructor(name:string){
            this.name = name;
        }
    
        makeSound(){
            console.log('Miau!!'+this.name);
        }
    }
}