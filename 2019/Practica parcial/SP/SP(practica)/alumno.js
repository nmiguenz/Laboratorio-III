var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var Examen;
(function (Examen) {
    var Alumno = (function (_super) {
        __extends(Alumno, _super);
        function Alumno(name, surname, legajo) {
            _super.call(this);
            this.nombre = name;
            this.apellido = surname;
            this.legajo = legajo;
        }
        Alumno.prototype.setNombre = function (nombre) {
            this.nombre = nombre;
        };
        Alumno.prototype.getNombre = function () {
            return this.nombre;
        };
        Alumno.prototype.setApellido = function (apellido) {
            this.apellido = apellido;
        };
        Alumno.prototype.getApellido = function () {
            return this.apellido;
        };
        Alumno.prototype.setlegajo = function (legajo) {
            this.legajo = legajo;
        };
        Alumno.prototype.getLegajo = function () {
            return this.legajo;
        };
        return Alumno;
    })(Examen.Persona);
    Examen.Alumno = Alumno;
})(Examen || (Examen = {}));
