var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var Examen;
(function (Examen) {
    var Profesor = (function (_super) {
        __extends(Profesor, _super);
        function Profesor(name, surname, cuil) {
            _super.call(this);
            this.nombre = name;
            this.apellido = surname;
            this.cuil = cuil;
        }
        Profesor.prototype.setNombre = function (nombre) {
            this.nombre = nombre;
        };
        Profesor.prototype.getNombre = function () {
            return this.nombre;
        };
        Profesor.prototype.setApellido = function (apellido) {
            this.apellido = apellido;
        };
        Profesor.prototype.getApellido = function () {
            return this.apellido;
        };
        Profesor.prototype.setCuil = function (cuil) {
            this.apellido = apellido;
        };
        Profesor.prototype.getApellido = function () {
            return this.apellido;
        };
        return Profesor;
    })(Examen.Persona);
    Examen.Profesor = Profesor;
})(Examen || (Examen = {}));
