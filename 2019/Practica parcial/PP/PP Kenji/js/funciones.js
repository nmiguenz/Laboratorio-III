window.addEventListener("load",SetFunctions);
window.addEventListener("load",getPersonas);

var userCard;
var id;

function SetFunctions(){

    var botonOcultar = document.getElementById("btnOcultar");
    botonOcultar.addEventListener("click",Ocultar);

    var btnEliminar = document.getElementById("btnEliminar");  
    btnEliminar.addEventListener("click",Borrar);

    var btnModificr = document.getElementById("btnModificr");   
    btnModificr.addEventListener("click",Modificar);

    var botonMostrar = document.getElementById("mostrarFormBtn");   
    botonMostrar.addEventListener("click",Mostrar);

    //var formPersona = document.getElementById("formPersona");

}

function Mostrar(e)
{
    userCard = e.target;
    var userDataDiv = e.target.childNodes[1];
    var txtNombre = document.getElementById("txtNombre");
    var txtApellido = document.getElementById("txtApellido");
    id = (userDataDiv.childNodes[0].innerText);
    var nombre =(userDataDiv.childNodes[1].innerText);
    var apellido =(userDataDiv.childNodes[2].innerText);
    var sexo =(userDataDiv.childNodes[3].innerText);

    txtNombre.value = nombre;
    txtApellido.value = apellido;
    if (sexo == "Male"){
        var radioBtnMale = document.getElementById("radioBtnMale").checked = true;
    }
    else{
        var radioBtnFemale = document.getElementById("radioBtnFemale").checked = true;
    }
    //console.log(id,nombre,apellido,sexo);

    var form = document.getElementById("formPP");
    form.hidden = false;
}

function Ocultar()
{
    var form = document.getElementById("formPP");
    form.hidden = true;
}


// Agregar card  
function GuardarItem(item){
    //console.log(item);
    var cardDiv = document.createElement("div");
    cardDiv.className = "card";
    var imgImg = document.createElement("img");
    imgImg.className = "profilePic";
    imgImg.src = "./img/user.png";
    var userdataDiv = document.createElement("div");
    userdataDiv.className = "userData";
    cardDiv.appendChild(imgImg);
    cardDiv.appendChild(userdataDiv);

    for (var objetoJson in item) {
        
        var pNuevo = AgregarData(item[objetoJson],objetoJson);
        pNuevo.className ="userDataItem";
            if(objetoJson=="id"){
                pNuevo.hidden = true;
            }
        userdataDiv.appendChild(pNuevo);
        
    }
    cardDiv.addEventListener("dblclick",Mostrar);
    return cardDiv;

}

function AgregarData(texto,classElemento){
    var pNuevo = document.createElement("p");
    var textoNuevo = document.createTextNode(texto);

    if(classElemento!=undefined){
        pNuevo.className = classElemento;
    }

    pNuevo.appendChild(textoNuevo);
    return pNuevo;

}

function Validar(elemento){
    console.log(elemento.value.length);
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


function Modificar(e){
    var persona = LeerObjeto();
    if (persona != "")
    {
        
        console.log(persona);
        var newCard;
        var xhttp = new XMLHttpRequest();
        
        document.getElementById("loadingIcon").hidden = false;
        xhttp.open("POST","http://127.0.0.1:3000/editar");
        //El setRequestHeder setea el tipo de valor que se le va a pasar y el formato
        xhttp.setRequestHeader("Content-Type", "application/json;charset=UTF-8")
        xhttp.send(JSON.stringify(persona));
        xhttp.onreadystatechange = function(){
            if (xhttp.readyState === 4 && xhttp.status === 200  )
            {
                document.getElementById("loadingIcon").hidden = true;
                console.log(JSON.parse(xhttp.responseText));
                newCard = GuardarItem(persona);
                ReemplazarCard(newCard);
                Ocultar();
            }
        }
    }
}

function ReemplazarCard(newCard)
{
    //console.log(newCard);
    userCard.replaceWith(newCard);
}

function LeerObjeto(){
    var nombre = document.getElementById("txtNombre");
    var apellido = document.getElementById("txtApellido");
    var sexo = "Female";
    if(document.getElementById("radioBtnMale").checked){
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


function Borrar(e)
{       
    var xhttp = new XMLHttpRequest();
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
            Ocultar();
        }
    }
}


function getPersonas(){
    var xhttp = new XMLHttpRequest();
    var cardContainerDiv = document.getElementById("cardContainer");

    xhttp.open("GET","http://127.0.0.1:3000/personas");
    xhttp.send();
    xhttp.onreadystatechange = function(){
        
        if (xhttp.readyState === 4 && xhttp.status === 200  )
            var listaPersonas = JSON.parse(xhttp.responseText);

            listaPersonas.forEach(function(item) {
                //console.log(item);
                var cardNueva = GuardarItem(item);
                cardContainerDiv.appendChild(cardNueva);
              });
    }
}
