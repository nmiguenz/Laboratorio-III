// Funciones Básicas
function sumar( a, b ):string{
  return a + b;
}

//idem anterior pero con arrow function
var sumarIdem = (a,b)=>a+b;

var contar = function( heroes ):number{
  return heroes.length;
}
var superHeroes:string[] = ["Flash", "Arrow", "Superman", "Linterna Verde"];
contar(superHeroes);

//Parametros por defecto
function llamarBatman( llamar:boolean=true ):void{
  if( llamar ){
    console.log("Batiseñal activada");
  }
}

llamarBatman();

// Rest?
function unirheroes( ...personas:string[] ){
  return personas.join(", ");
}


// Tipo funcion
function noHaceNada( numero:number, texto:string, booleano:boolean, arreglo:string[] ):void{
}


// Crear el tipo de funcion que acepte la funcion "noHaceNada"
function noHaceNadaTampoco(noHaceNada:any){

};
