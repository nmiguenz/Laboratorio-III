window.addEventListener("load", cargarPagina);
var aux = true;
var fila;

function cargarPagina(){
    //LISTO
    var formulario = document.getElementById("contenedor_formulario");
    formulario.style.visibility = 'hidden';
    
    //LISTO
    var btnCerrar = document.getElementById('btnCerrar');
    btnCerrar.addEventListener('click', cerrarFormulario );

    var btnModificar = document.getElementById('btnModificar');
    btnModificar.addEventListener('click', modificarTabla);

    var btnEliminar = document.getElementById('btnEliminar');
    btnEliminar.addEventListener('click', eliminarTabla );

    CargarDatosServidor();
}

//LISTO
//Oculta el formulario
function cerrarFormulario(){
    var formulario = document.getElementById("contenedor_formulario");
    if(formulario.style.visibility === 'visible'){
        formulario.style.visibility = 'hidden';
    }
    else
    {
        alert('error al cerrar');
    }
}

//LISTO
function CargarDatosServidor(){

    var tabla = document.getElementById('tabla');
    
    var xhttp = new XMLHttpRequest();
    var dirhttp ="http://localhost:3000/personas";

    xhttp.open('GET', dirhttp, true);
    xhttp.onreadystatechange = function(){
        if(xhttp.readyState === 4 && xhttp.status === 200)
        {
            var respuesta = xhttp.responseText;
            var listaPersonas = JSON.parse(respuesta);

            for(var i=0; i < listaPersonas.length; i++)
            {
                var persona = listaPersonas[i];
                var filaTabla = crearTabla(persona.id, persona.nombre, persona.apellido, persona.sexo);
                
                tabla.appendChild(filaTabla);
                filaTabla.addEventListener('dblclick', mostrarContenedor);
            }
        }
    }
    xhttp.send();
    return tabla;
}

//LISTO
function crearTabla(id, nombre, apellido, sexo){
    var fila = document.createElement("tr");

    var columna1 = document.createElement("td");
    var columna2 = document.createElement("td");
    var columna3 = document.createElement("td");
    
    var idOculto= document.createElement("hidden");
    idOculto.setAttribute("id", id);
    idOculto.setAttribute('class', 'idFila');
    columna1.appendChild(idOculto);

    var parrafo= document.createElement("p");
    var txtNombre = document.createTextNode(nombre);
    parrafo.appendChild(txtNombre);
    columna1.appendChild(parrafo);

    parrafo= document.createElement("p");
    var txtApellido = document.createTextNode(apellido);
    parrafo.appendChild(txtApellido);
    columna2.appendChild(parrafo);

    parrafo= document.createElement("p");
    var txtSexo = document.createTextNode(sexo);
    parrafo.appendChild(txtSexo);
    columna3.appendChild(parrafo);

    fila.appendChild(columna1);
    fila.appendChild(columna2);
    fila.appendChild(columna3);

    return fila;
}

//Muestra el contenedor con los datos de las tarjetas incluidos
// Agregar las filas  
function mostrarContenedor(e){

    //MUESTRO u OCULTO el formulario
    var formulario = document.getElementById("contenedor_formulario");
    if(formulario.style.visibility === 'hidden'){
        formulario.style.visibility = 'visible';
    }
    else
    {
        formulario.style.visibility = 'hidden';
    }

    var txtNombre = document.getElementById("txtNombre");
    var txtApellido = document.getElementById("txtApellido");
    var radioMale = document.getElementById("rdMale");
    var radioFemale = document.getElementById("rdFemale");
    
    //obtengo la fila seleccionada
    tarjetaPersona = e.srcElement.parentNode.parentNode;

    //obtengo el id
    id = e.srcElement.parentNode.parentNode.childNodes[0].childNodes[0];

    //obtengo el atributo ID
    listaDatos = e.srcElement.parentNode.parentNode.childNodes;

    txtNombre.value = listaDatos[0].innerText;
    txtApellido.value = listaDatos[1].innerText;
    console.log(txtApellido.value);
    radioFemale.value = listaDatos[2].innerText;
    console.log(radioFemale.value);

    if(radioFemale.value === "Female")
    {
        radioFemale.setAttribute("checked", "checked");
    }
    else
    {
        radioMale.setAttribute("checked", "checked");
    }

}

//MODIFICA LOS DATOS DE LA TABLA DE MANERA PERMANENTE
function modificarTabla(e){
    e.preventDefault();
    var nombre = document.getElementById("txtNombre");
    var apellido = document.getElementById("txtApellido");
    fila = e.target.parentNode.parentNode;
    var id = document.getElementById('idFila');
    console.log(id);
    var sexo = "Female";
    if(document.getElementById("rdMale").checked){
        sexo = "Male";
    }

    var nombreValido;
    var apellidoValido;

    nombreValido = Validar(nombre);
    apellidoValido= Validar(apellido);

    if (nombreValido && apellidoValido)
    {
        var persona  = {"id":parseInt(id),"nombre":nombre.value,"apellido":apellido.value,"sexo":sexo}
        if (persona!=null)
        {
            //guarda la persona en el servidor
            GuardarPersona(persona);
            fila.innerHTML = "<tr><td>" + nombre.value + "</td><td>"
            + apellido.value + "</td><td>" + sexo.value +"</td></</tr>";

        }
    }
    else
    {
        return "el nombre y/o no son validos";
    }

    //Hago un For con el tamaño del radioBTN para poder sacar cual es el sexo
    // for(i=0; i < radiosBtn.length; i++)
    // {
    //     if(radiosBtn[i].checked)
    //     {
    //         sexo = radiosBtn[i].value;
    //         break;
    //     }
    // }
}

function Validar(elemento){
    if(elemento.value == "" || elemento.value.length < 3)
    {
        elemento.className = "conError";
        return false;        
    }
    else    
    {
        elemento.className = "sinError";
        return true;
    }
}

//El método ChildNode.replaceWith () reemplaza este ChildNode en la lista de hijos de su padre con un conjunto de objetos
function ReemplazarCard(persona){
    fila.replaceWith(persona);
}

//Le paso como parametro un JSON
function GuardarPersona(persona){
    
    var xhttp = new XMLHttpRequest();
    cerrarFormulario();
    var dirhttp = "http://localhost:3000/editar";

    document.getElementById("loadingIcon").hidden = false;
    
    xhttp.onreadystatechange = function(){
        if (xhttp.readyState === 4 && xhttp.status === 200 )
        {
            
            document.getElementById("loadingIcon").hidden = true;

            JSON.parse(xhttp.responseText);

        }

    }

    xhttp.open("POST",dirhttp);

    //El setRequestHeder setea el tipo de valor que se le va a pasar y el formato
    xhttp.setRequestHeader("Content-Type", "application/json;charset=UTF-8")
    
    xhttp.send(JSON.stringify(persona));
}

function eliminarTabla(){
    

    var xhttp = new XMLHttpRequest();
    cerrarFormulario();
    var deleteID = {"id":parseInt(id)};
    
    document.getElementById("loadingIcon").hidden = false;
    
    xhttp.open("POST","http://127.0.0.1:3000/eliminar");
    //El setRequestHeder setea el tipo de valor que se le va a pasar y el formato
    xhttp.setRequestHeader("Content-Type", "application/json;charset=UTF-8")
    xhttp.send(JSON.stringify(deleteID));
    xhttp.onreadystatechange = function(){
        if (xhttp.readyState === 4 && xhttp.status === 200  )
        {
            document.getElementById("loadingIcon").hidden = true;
            console.log(JSON.parse(xhttp.responseText));
            userCard.remove();
            cargarPagina();
            
        }
    }
}

//Retorna una PERSONA si coincide con la validacion que se  espera
function LeerObjeto(){
    var nombre = document.getElementById("txtNombre");
    var apellido = document.getElementById("txtApellido");
    var sexo = "Female";
    if(document.getElementById("rdMale").checked){
        sexo = "Male";
    }
    var nombreValido;
    var apellidoValido;

    nombreValido = Validar(nombre);
    apellidoValido= Validar(apellido);
    if (nombreValido && apellidoValido)
    {
        var persona  = {"id":parseInt(id),"nombre":nombre.value,"apellido":apellido.value,"sexo":sexo}
        return persona;
    }
    return "";
}