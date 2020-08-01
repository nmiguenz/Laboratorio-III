var Animales;
(function (Animales) {
    function makeSound() {
        var miPerro = new Animales.Dog('Atila');
        var miGato = new Animales.Cat('Richi');
        //miPerro.makeSound();
        //En el caso de estar en una herencia, puedo armar un array
        var lista = new Array();
        lista.push(miPerro);
        lista.push(miGato);
        lista.forEach(function (animal) {
            animal.makeSound();
        });
    }
    Animales.makeSound = makeSound;
})(Animales || (Animales = {}));
