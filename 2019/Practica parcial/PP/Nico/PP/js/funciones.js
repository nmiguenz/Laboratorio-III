window.addEventListener("load", cargarPagina);
var aux = true;
var userCard;

function cargarPagina(){

    //Seteo el FORMULARIO oculto por defecto
    var formulario = document.getElementById("contenedor_formulario");
    formulario.style.visibility = 'hidden';
    
    var btnCerrar = document.getElementById('btnCerrar');
    btnCerrar.addEventListener('click', cerrarFormulario );

    var btnModificar = document.getElementById('btnModificar');
    btnModificar.addEventListener('click', modificarCard);

    var btnEliminar = document.getElementById('btnEliminar');
    btnEliminar.addEventListener('click', eliminarCard);

    CargarDatosServidor();
}

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

function crearTarjeta(id, nombre, apellido, sexo){
    var tarjeta = document.createElement("div");
    tarjeta.setAttribute("class", "tarjeta");

    var divDatos = document.createElement("div");
    divDatos.setAttribute("class", "tarjetaDatos");

    var imgFoto = document.createElement("img");
    imgFoto.setAttribute("src", "./img/user.png");
    tarjeta.appendChild(imgFoto);

    var idOculto= document.createElement("hidden");
    idOculto.setAttribute("id", id);
    divDatos.appendChild(idOculto);

    var parrafo= document.createElement("p");
    var txtNombre = document.createTextNode(nombre);
    parrafo.appendChild(txtNombre);
    divDatos.appendChild(parrafo);

    parrafo= document.createElement("p");
    var txtApellido = document.createTextNode(apellido);
    parrafo.appendChild(txtApellido);
    divDatos.appendChild(parrafo);

    parrafo= document.createElement("p");
    var txtSexo = document.createTextNode(sexo);
    parrafo.appendChild(txtSexo);
    divDatos.appendChild(parrafo);

    tarjeta.appendChild(divDatos);

    return tarjeta;
}

function CargarDatosServidor(){

    var divCards = document.getElementById('contenedor_cards');
    
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
                var card = crearTarjeta(persona.id, persona.nombre, persona.apellido, persona.sexo);
                
                divCards.appendChild(card);
                card.addEventListener('dblclick', mostrarContenedor);
            }
        }
    }
    xhttp.send();
    console.log(divCards);
    return divCards;
}

//Muestra el contenedor con los datos de las tarjetas incluidos
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

    listaDatos = e.target.childNodes[1].childNodes;
    //obtengo la tarjeta seleccionada
    tarjetaPersona = e.target;

    //obtengo el atributo ID
    id = listaDatos[0].getAttribute("id");

    txtNombre.value = listaDatos[1].innerText;
    txtApellido.value = listaDatos[2].innerText;

    if(listaDatos[3].innerText === "Female")
    {
        radioFemale.setAttribute("checked", "checked");
    }
    else
    {
        radioMale.setAttribute("checked", "checked");
    }
}

//MODIFICA LOS DATOS DE LA TABLA DE MANERA PERMANENTE
function modificarCard(e){
    e.preventDefault();
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
        if (persona!=null)
        {
            GuardarPersona(persona);
            
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
    userCard.replaceWith(persona);
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

            console.log(JSON.parse(xhttp.responseText));

        }

    }

    xhttp.open("POST",dirhttp);

    //El setRequestHeder setea el tipo de valor que se le va a pasar y el formato
    xhttp.setRequestHeader("Content-Type", "application/json;charset=UTF-8")
    
    xhttp.send(JSON.stringify(persona));
}

function eliminarCard(){
    
    var xhttp = new XMLHttpRequest();
    cerrarFormulario();
    var deleteID = {"id":parseInt(id)};
    
    console.log(deleteID);
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