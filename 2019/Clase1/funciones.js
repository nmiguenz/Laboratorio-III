var v;
function cargar(){
    var boton = document.getElementById("btn");
    console.log("cargo");
    boton.onclick = log;

}
//window.onload = cargar; //es una fx que reciube un puntero a la funcion. La ejecuta el navegador cuando termina de cargar
window.addEventListener("load", cargar); //Utilizo esta forma cuando uso mas de un manejador. ([parametro string], [function])
//es idem a window.onload, pero permite más de uno.

function log(){
    var a = document.getElementById("usr");
    alert(a.value);
}

//log (puesto asi es un puntero a una funcion)