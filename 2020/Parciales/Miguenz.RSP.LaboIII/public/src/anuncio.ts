class Anuncio{
    public id:number;
    public titulo:string;
    public transaccion:string;
    public descripcion:string;
    public precio:number;

    constructor(id:number, titulo:string, transaccion:string, descripcion:string, precio:number){
        this.id = id;
        this.titulo = titulo;
        this.transaccion = transaccion;
        this.descripcion = descripcion;
        this.precio = precio;
    }
}

export default class Anuncio_Auto extends Anuncio {
    public num_puertas:number;
    public num_kms:number;
    public potencia:number;
  
    constructor(id:number, titulo:string, transaccion:string, descripcion:string, precio:number, num_puertas:number, num_kms:number, potencia:number){
        super(id, titulo, transaccion, descripcion, precio);
        this.num_puertas = num_puertas;
        this.num_kms = num_kms;
        this.potencia = potencia;
    }
}