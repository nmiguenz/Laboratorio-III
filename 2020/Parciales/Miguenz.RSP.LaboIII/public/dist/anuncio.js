"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var Anuncio = /** @class */ (function () {
    function Anuncio(id, titulo, transaccion, descripcion, precio) {
        this.id = id;
        this.titulo = titulo;
        this.transaccion = transaccion;
        this.descripcion = descripcion;
        this.precio = precio;
    }
    return Anuncio;
}());
var Anuncio_Auto = /** @class */ (function (_super) {
    __extends(Anuncio_Auto, _super);
    function Anuncio_Auto(id, titulo, transaccion, descripcion, precio, num_puertas, num_kms, potencia) {
        var _this = _super.call(this, id, titulo, transaccion, descripcion, precio) || this;
        _this.num_puertas = num_puertas;
        _this.num_kms = num_kms;
        _this.potencia = potencia;
        return _this;
    }
    return Anuncio_Auto;
}(Anuncio));
exports.default = Anuncio_Auto;
