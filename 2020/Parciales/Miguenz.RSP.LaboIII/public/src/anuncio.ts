class Anuncio{
    id:number;
    titulo:string;
    transaccion:string;
    descripcion:string;
    precio:number;

    constructor(id:number, titulo:string, transaccion:string, descripcion:string, precio:number){
        this.id = id;
        this.titulo = titulo;
        this.transaccion = transaccion;
        this.descripcion = descripcion;
        this.precio = precio;
    }
}

class Anuncio_Auto extends Anuncio {
    num_puertas:number;
    num_kms:number;
    potencia:number;
  
    constructor(id:number, titulo:string, transaccion:string, descripcion:string, precio:number, num_puertas:number, num_kms:number, potencia:number){
        super(id, titulo, transaccion, descripcion, precio);
        this.num_puertas = num_puertas;
        this.num_kms = num_kms;
        this.potencia = potencia;
    }
}

export { Anuncio_Auto };