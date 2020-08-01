class Anuncio_Auto extends Anuncio {
    constructor(id,titulo,transaccion,descripcion,precio,adicional,numPuertas,numKms,potencia){
        super(id, titulo,transaccion,descripcion,precio);
        this.adicional = adicional
        this.numPuertas = numPuertas;
        this.numKms = numKms;
        this.potencia = potencia;
    }
}