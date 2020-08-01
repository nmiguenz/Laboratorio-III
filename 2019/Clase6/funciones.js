window.onload = CargarLista;
window.addEventListener("load", Guardar);
window.addEventListener("load", Mostrar);
//window.addEventListener("load", editar);


var aux=true;

function Mostrar(){
    var boton = document.getElementById("agregar");
    boton.onclick = MostrarFormulario;
}

function MostrarFormulario (){
    var formulario = document.getElementById("contenedor");
    console.dir(formulario);
    if(formulario){
        aux=!aux;
    }

    formulario.hidden=aux;
}

//Carga la lista del servidor en un objeto de tipo JSON
function CargarLista(){
    var http = new XMLHttpRequest();
    var persona;
    var lista;
    http.open("GET", "http://localhost:3000/personas", true);
        http.onreadystatechange = function(){
            if (http.readyState ===4 && http.status ===200){
                //lo que hace es devolver un objeto de tipo string
                persona = http.responseText;
                lista = JSON.parse(persona);
                generadorLista(lista);
            }
        }
        http.send();
}

//Carga en la tabla los datos ingresados por el formulario
function GuardarNombreApellido (){
    console.log("Entro a guardar");
    var nombre = document.getElementById("name");
    var apellido = document.getElementById("apellido");
    var telefonos = document.getElementById("telefono");
    var dates = document.getElementById("fecha");

    var fila = "<tr><td>"+nombre.value+"</td><td>"+apellido.value+"</td><td>"+telefonos.value+"</td><td>"+dates.value+"</td><td><a href='' onclick='borrar(event)'>Borrar</a><a href=''onclick='editar(event)'>Editar</a></td></tr>";
        
    console.log(fila);
    document.getElementById("tabla").innerHTML +=fila;
}

//Recorre uno a uno los elementos de tipo JSON cargados en la variable que se pasa como parametro
function generadorLista(personas){
    personas.forEach(element => {
        GuardarDatosDelServidor(element);
    });
           
}

//Carga en la tabla los datos del servidor
function GuardarDatosDelServidor (element){
    var nombres;
    var apellidos;
    var telefonos;
    var dates;

    if (element){
        console.log("Entro a guardar el parser");
        nombres = element.nombre;
        apellidos = element.apellido;
        telefonos = element.telefono;
        dates = element.fecha;
        var fila = "<tr><td>"+nombres+"</td><td>"+apellidos+"</td><td>"+telefonos+"</td><td>"+dates+"</td><td><a href='' onclick='borrar(event)'>Borrar</a><a href=''onclick='editar(event)'>Editar</a></td></tr>";
    }
    else{
        console.log("No se cargaron los datos");
    }
    console.log(fila);
    document.getElementById("tabla").innerHTML +=fila;

}

function Guardar(){
    var boton = document.getElementById ("guardar");
    console.log("guardó");
    boton.onclick = GuardarNombreApellido;
    window.addEventListener("Load", guardarEnServidor);
}

function guardarEnServidor(e){
    e.preventDefault();
    var nombre = document.getElementById("name");
    var apellido = document.getElementById("apellido");
    var telefonos = document.getElementById("telefono");
    var dates = document.getElementById("fecha");
    var objJson = {"nombre": nombre, "apellido": apellido, "fecha": dates, "telefono": telefono};
    var http = new XMLHttpRequest();
    http.open('POST', "http://localhost:3000/nuevaPersona", true);
    http.onreadystatechange = function(){
        if (http.readyState === 4 && http.status === 200){
            var stringDatos = JSON.stringify(abjJson);

    }
    http.setRequestHeader("Content-Type","application/json");
    http.send(stringDatos);
}

function editar(e){
    e.preventDefault();
    var nombre = e.target.parentNode.parentNode.children[0].innerHTML;
    var apellido = e.target.parentNode.parentNode.children[1].innerHTML;

    var formulario = document.getElementById("contenedor");
    formulario.hidden = false;
    n = document.getElementById("name");
    a = document.getElementById("apellido");
    n.value = nombre;
    a.value = apellido;
    // if()
    e.target.parentNode.parentNode.remove();
}

function borrar(e){
    e.preventDefault();
    var nombre = e.target.parentNode.parentNode.children[0].innerHTML;
    var apellido = e.target.parentNode.parentNode.children[1].innerHTML;
    e.target.parentNode.parentNode.remove();
   
    // /*Lo que hace es prevenir que se produzca la acción por defecto al presionar*/
    // e.preventDefault();
    // /*Obtengo el elemento*/ 
    // console.log(e.target);
    // /*Obtengo al padre*/
    // console.log(e.target.parentNode);
    // /*Así sucesivamente*/
    // console.log(e.target.parentNode.parentNode);
    alert("Se borro una persona");
}
