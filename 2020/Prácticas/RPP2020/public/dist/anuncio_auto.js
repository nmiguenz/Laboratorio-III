class Anuncio_Auto extends Anuncio {
    constructor(id, titulo,transaccion,descripcion,precio,numPuertas,numKms,potencia){
        super(id, titulo,transaccion,descripcion,precio);
        this.numPuertas = numPuertas;
        this.numKms = numKms;
        this.potencia = potencia;
    }
}