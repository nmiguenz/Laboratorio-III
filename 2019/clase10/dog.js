var Animales;
(function (Animales) {
    var Dog = (function () {
        function Dog(name) {
            this.name = name;
        }
        Dog.prototype.makeSound = function () {
            console.log('Guau!!' + this.name);
        };
        return Dog;
    })();
    Animales.Dog = Dog;
})(Animales || (Animales = {}));
