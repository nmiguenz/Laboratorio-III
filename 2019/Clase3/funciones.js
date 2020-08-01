window.addEventListener("load", Guardar);


function Guardar(){
    var boton = document.getElementById ("guardar");
    console.log("guardó");
    boton.onclick = GuardarNombreApellido;
}

function GuardarNombreApellido (){
    console.log("Entro a guardar");
    var nombre = document.getElementById("name");
    var apellido = document.getElementById("apellido");

    if(apellido==""||nombre==""){
        document.getElementById("name").className="error";
        document.getElementById("apellido").className="error";
        alert("debe ingresar el nombre y apellido");
    }

    if (confirm("¡")){

        document.getElementById("name").className="sinError";
        document.getElementById("apellido").className="sinError";
        // var tCuerpo = document.getElementById("tCuerpo"); 

        var fila = "<tr><td>"+nombre.value+"</td><td>"+apellido.value+"</td><td><a href=''>Borrar</a></td></tr>";
        
        //console.log(fila);
        document.getElementById("tabla").innerHTML +=fila;

    }



}


function borrar(e){
    /*Lo que hace es prevenir que se produzca la acción por defecto al presionar*/
    e.preventDefault();
    /*Obtengo el elemento*/ 
    console.log(e.target);
    /*Obtengo al padre*/
    console.log(e.target.parentNode);
    /*Así sucesivamente*/
    console.log(e.target.parentNode.parentNode);
    alert("Se borro una persona");
}