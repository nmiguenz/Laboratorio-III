window.addEventListener("load", cargar);
window.addEventListener("load", cargarSumar);

function cargar(){
    var boton = document.getElementById("suma");
    console.log("cargo");
    boton.onclick = sumar;
}

function cargarSumar(){
    var boton = document.getElementById ("guardar");
    console.log("guardo");
    boton.onclick = sumarGuardar;
}

function sumar (){
    var res = confirm;
    if (res){
        var numeroUno = $ ("numeroUno");
        var numeroDos = document.getElementById("num2");
        var resultado = document.getElementById("resul");
        resultado.value =  parseInt(numeroUno.value) + parseInt(numeroDos.value);
    }else{
        alert("no sumo");
    }
}

function $(id){
    var num1 = document.getElementById(id);
    return num1;
}

function sumarGuardar (){
    console.log("Entro a sumar guardar");
    var numeroUno = document.getElementById("num1");
    var numeroDos = document.getElementById("num2");
    var resultado = document.getElementById("resul");
    resultado.value =  parseInt(numeroUno.value) + parseInt(numeroDos.value);

    var fila = "<tr><td>"+numeroUno.value+"</td><td>"+numeroDos.value+"</td><td>"+resultado.value+"</td></tr>";
    console.log(fila);
    document.getElementById("tabla").innerHTML = fila;

}
