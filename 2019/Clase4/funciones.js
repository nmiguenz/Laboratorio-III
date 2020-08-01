window.addEventListener("load", Guardar);
window.addEventListener("load", Mostrar);
window.addEventListener("load", editar);

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
    // if(aux){
    //     console.log(aux);
    //     formulario.className = 'contenedor2';    
    // }
    // else{
    //     formulario.className = 'contenedor';
    // }
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

function Guardar(){
    var boton = document.getElementById ("guardar");
    console.log("guardó");
    boton.onclick = GuardarNombreApellido;
}
function GuardarNombreApellido (){
    console.log("Entro a guardar");
    var nombre = document.getElementById("name");
    var apellido = document.getElementById("apellido");

//     if(apellido==""||nombre==""){
//         document.getElementById("name").className="error";
//         document.getElementById("apellido").className="error";
//         alert("debe ingresar el nombre y apellido");
//     }

//     if (confirm("¡")){

//         document.getElementById("name").className="sinError";
//         document.getElementById("apellido").className="sinError";
//         // var tCuerpo = document.getElementById("tCuerpo"); 

    var fila = "<tr><td>"+nombre.value+"</td><td>"+apellido.value+"</td><td><a href='' onclick='borrar(event)'>Borrar</a><a href=''onclick='editar(event)'>Editar</a></td></tr>";
        
    console.log(fila);
    document.getElementById("tabla").innerHTML +=fila;

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