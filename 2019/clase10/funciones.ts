namespace Animales{
    export function makeSound():void{
        var miPerro:Dog = new Dog('Atila');
        var miGato:Cat = new Cat('Richi');
        //miPerro.makeSound();
        
        //En el caso de estar en una herencia, puedo armar un array
        var lista:Array<Animal> = new Array<Animal>();
        lista.push(miPerro);
        lista.push(miGato);
        
        lista.forEach(function(animal){
            animal.makeSound();
        })
    
    }
}