class Anuncio {
    constructor(id, titulo, transaccion, descripcion, precio) {
        this.id = id;
        this.titulo = titulo;
        this.transaccion = transaccion;
        this.descripcion = descripcion;
        this.precio = precio;
    }
}
class Anuncio_Auto extends Anuncio {
    constructor(id, titulo, transaccion, descripcion, precio, num_puertas, num_kms, potencia) {
        super(id, titulo, transaccion, descripcion, precio);
        this.num_puertas = num_puertas;
        this.num_kms = num_kms;
        this.potencia = potencia;
    }
}
export { Anuncio_Auto };
