var Animales;
(function (Animales) {
    var Cat = (function () {
        function Cat(name) {
            this.name = name;
        }
        Cat.prototype.makeSound = function () {
            console.log('Miau!!' + this.name);
        };
        return Cat;
    })();
    Animales.Cat = Cat;
})(Animales || (Animales = {}));
