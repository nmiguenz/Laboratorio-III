var fila;

function CargarBoton()
{
    var btnGuardar = document.getElementById("btnGuardar");
    var btnCancelar = document.getElementById("btnCancelar");
    var btnAgregarPersona = document.getElementById("btnAgregarPersona");  
    var contenedorPersona = document.getElementById("contenedorPersona");

    contenedorPersona.style.visibility = "hidden";

    btnGuardar.addEventListener("click", GuardarPersona);
    btnCancelar.addEventListener("click", MostrarIngreso);
    btnAgregarPersona.addEventListener("click", MostrarIngreso);


}

window.addEventListener("load", CargarBoton);


function GuardarPersona()
{
    var nombre = document.getElementById("txtNombre"); 
    var apellido = document.getElementById("txtApellido");
    
    if( nombre.value == "" || apellido.value == "")
    {
        nombre.className = "error";
        apellido.className = "error";
        alert("Debe agregar nombre y apellido");
    }
    else
    {       
        var contenedorPersona = document.getElementById("contenedorPersona");

        nombre.className = "sinError";
        apellido.className = "sinError";

        document.getElementById("tbody").innerHTML += "<tr><td>" + nombre.value + "</td><td>"
            + apellido.value + "</td><td>" +
            "<a href='' onclick= Borrar(event)>borrar</a><a href='' onclick= Editar(event)>editar</a>" +
            "</td></</tr>";

        nombre.value = ""; 
        apellido.value = "";

        contenedorPersona.style.visibility = "hidden";
    }
    
}

function MostrarIngreso()
{
    var contenedorPersona = document.getElementById("contenedorPersona");

    if(contenedorPersona.style.visibility === "visible")
    {
        contenedorPersona.style.visibility = "hidden";
    }
    else
    {
        contenedorPersona.style.visibility = "visible";
    }
    
}

function Borrar(e)
{
 
    e.preventDefault();
    console.log(e.target);
    console.log(e.target.parentNode); //me muestra el padre
    console.log(e.target.parentNode.parentNode); //me muestra el padre del padre

    //recupero el componente y lo cambio
    // var tagA = e.target.parentNode;
    // tagA.innerHTML = "Otra Cosa";

    //saco la fila
    e.target.parentNode.parentNode.innerHTML = "";

    // alert("Se borra");
}

function Editar(e)
{
    var i;
    var txtNombre = document.getElementById("txtNombre"); 
    var txtApellido = document.getElementById("txtApellido");
    var btnGuardar = document.getElementById("btnGuardar");

    // le saco el evento por defecto (redireccionar a href)
    e.preventDefault();

    // busco los hijos de tr: (apellido y nombre)
    var hijos = e.target.parentNode.parentNode.children;

    // guardo la fila en una variable global
    fila = e.target.parentNode.parentNode;

    // recupero los objetos:
    for(i = 0; i < hijos.length-1; i++)
    {
        if(i == 0)
        {
            txtNombre.value = hijos[i].innerHTML;
        }
        else
        {
            txtApellido.value = hijos[i].innerHTML;
        }
    }

    MostrarIngreso();

    // modifico el listener
    btnGuardar.removeEventListener("click", GuardarPersona);
    btnGuardar.addEventListener("click", Modificar);
}

function Modificar()
{
    var nombre = document.getElementById("txtNombre"); 
    var apellido = document.getElementById("txtApellido");
    
    if( nombre.value == "" || apellido.value == "")
    {
        nombre.className = "error";
        apellido.className = "error";
        alert("Debe agregar nombre y apellido");
    }
    else
    {       
        var contenedorPersona = document.getElementById("contenedorPersona");

        nombre.className = "sinError";
        apellido.className = "sinError";

        fila.innerHTML = "<tr><td>" + nombre.value + "</td><td>"
            + apellido.value + "</td><td>" +
            "<a href='' onclick= Borrar(event)>borrar</a><a href='' onclick= Editar(event)>editar</a>" +
            "</td></</tr>";

        nombre.value = ""; 
        apellido.value = "";

        contenedorPersona.style.visibility = "hidden";

        console.log("edito");

        btnGuardar.removeEventListener("click", Modificar);
        btnGuardar.addEventListener("click", GuardarPersona);
    }



}


