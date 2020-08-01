//Clases ABSTRACTAS no definen las funciones
//Las clases simples EXTENDS de la padre.
var Dog = (function () {
    function Dog(name) {
        this.name = name;
    }
    Dog.prototype.makeSound = function () {
        console.log('Guau!!' + this.name);
    };
    return Dog;
})();
var Cat = (function () {
    function Cat(name) {
        this.name = name;
    }
    Cat.prototype.makeSound = function () {
        console.log('Miau!!' + this.name);
    };
    return Cat;
})();
//para que me funcione el codigo en un BOTON, lo tengo que meter dentro de una FX
function makeSound() {
    var miPerro = new Dog('Atila');
    var miGato = new Cat('Richi');
    //miPerro.makeSound();
    //En el caso de estar en una herencia, puedo armar un array
    var lista = new Array();
    lista.push(miPerro);
    lista.push(miGato);
    lista.forEach(function (animal) {
        animal.makeSound();
    });
}
