interface Animal{

    //por defecto todo lo que esta en la INTERFACE esta como PUBLIC
    name:string;
    //Dentro de la interface no va declarada la palabra FUNCTION
    makeSound();
}

//Clases ABSTRACTAS no definen las funciones
//Las clases simples EXTENDS de la padre.

class Dog implements Animal{
    public name;

    constructor(name:string){
        this.name = name;
    }

    makeSound(){
        console.log('Guau!!'+this.name);
    }
}

class Cat implements Animal{
    public name;

    constructor(name:string){
        this.name = name;
    }

    makeSound(){
        console.log('Miau!!'+this.name);
    }
}

//para que me funcione el codigo en un BOTON, lo tengo que meter dentro de una FX
function makeSound():void{
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