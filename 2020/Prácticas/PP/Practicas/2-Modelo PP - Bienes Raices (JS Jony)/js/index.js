function procesarTraerPersonas(){
    if(xhr.readyState==4)
    {
        if(xhr.status==200)
        {
            document.getElementById('spinner').style.display="none";
            let lista=JSON.parse(xhr.responseText)['data'];
            actualizarLista(lista);
        }
    }
    else{
        document.getElementById('spinner').style.display="block";
    }
}

function procesarAlta(){
    if(xhr.readyState==4)
    {
        if(xhr.status==200)
        {
            traerPersonas();
        }
    }
    else{
        document.getElementById('spinner').style.display="block";
    }
}
function procesarEliminarPersona(){
    if(xhr.readyState==4)
    {
        if(xhr.status==200)
        {
            traerPersonas();
        }
    }
    else{
        document.getElementById('spinner').style.display="block";
    }
}
function procesarModificacion(){
    if(xhr.readyState==4)
    {
        if(xhr.status==200)
        {
            traerPersonas();
        }
    }
    else{
        document.getElementById('spinner').style.display="block";
    }
}

function actualizarLista(lista)
{
    var tabla=document.getElementById('bodyTabla');
    var parametros=Object.keys(lista[0]);
    for(var j=0;j<lista.length;j++)
    {
        var tr=document.createElement('tr');
        for(var i=0;i<parametros.length;i++)
        {
            var td=document.createElement('td');
            var texto=document.createTextNode(lista[j][parametros[i]]);
            td.appendChild(texto);
            tr.appendChild(td);
            tr.addEventListener('click',generarForm.bind(null,lista[j]));
        }
        tabla.appendChild(tr);
    }
}

function generarForm(objeto)
{    
    document.getElementById('inputHombre').checked=true;
    if(objeto['first_name'])
    {        
        document.getElementById('tablaLista').style.display="inline-block";
        document.getElementById('inputFirst_Name').value=objeto['first_name'];
        document.getElementById('inputLast_Name').value=objeto['last_name'];
        document.getElementById('inputEmail').value=objeto['email'];
        if(objeto['gender']=='Male')
        {
            document.getElementById('inputMujer').checked=false;
            document.getElementById('inputHombre').checked=true;
        }
        else{
            
            document.getElementById('inputHombre').checked=false;
            document.getElementById('inputMujer').checked=true;
        }
        generarBotonesAlta("existente",objeto);//genera los botones para modificar un objeto existente
    }
    else{
        generarBotonesAlta("nuevo",objeto);//genera los botones para agregar un objeto nuevo
    }
        

}
function generarBotonesAlta(crear,objeto){
    document.getElementById('divBotones').innerHTML="";

    var btnModificar=document.createElement('button');
    var texto=document.createTextNode('Modificar');
    btnModificar.appendChild(texto);
    btnModificar.setAttribute('id','btnModificar');
    btnModificar.onclick=modificarPersonaForm.bind(null,objeto);
    
    
    var btnCancelar=document.createElement('button');
    var texto=document.createTextNode('Cancelar');
    btnCancelar.appendChild(texto);
    btnCancelar.setAttribute('id','btnCancelar');
    btnCancelar.onclick=cerrarForm;

    var btnEliminar=document.createElement('button');
    var texto=document.createTextNode('Eliminar');
    btnEliminar.appendChild(texto);
    btnEliminar.setAttribute('id','btnEliminar');
    btnEliminar.onclick=eliminarPersona.bind(null,objeto['id']);
    
    var btnAgregar=document.createElement('button');
    var texto=document.createTextNode('Agregar');
    btnAgregar.appendChild(texto);
    btnAgregar.setAttribute('id','btnAgregar');
    btnAgregar.onclick=agregarPersonaForm;    

    if(crear=="nuevo"){  
        //visibilidad 
        btnAgregar.style.display="inline-block";    
        btnModificar.style.display="none";
        btnEliminar.style.display="none";
    }
    else{
        //visibilidad
        btnAgregar.style.display="none";    
        btnModificar.style.display="inline-block";  
        btnEliminar.style.display="inline-block";  
    }
    //lo agrego al form
    document.getElementById('divBotones').appendChild(btnAgregar);
    document.getElementById('divBotones').appendChild(btnEliminar);
    document.getElementById('divBotones').appendChild(btnModificar);
    document.getElementById('divBotones').appendChild(btnCancelar);

  
}
function activarDesactivarFormAlta(){
    if(document.getElementById('divFrm').style.display=="none")
    {        
        document.getElementById('divFrm').style.display="inline-block";
    }
    else
    {        
        document.getElementById('divFrm').style.display="none";
    }    
}
function cerrarForm()
{
    activarDesactivarFormAlta();
}

function agregarPersonaForm()
{
    var auxName=document.getElementById('inputFirst_Name').value;
    var auxLastName=document.getElementById('inputLast_Name').value;
    var auxEmail=document.getElementById('inputEmail').value;
    var auxSexo;
    if(document.getElementById('inputHombre').checked)
    {
        auxSexo='Male';
    }
    else
    {
        auxSexo='Female';
    }
    var persona={'first_name':auxName,'last_name':auxLastName,'email':auxEmail,'gender':auxSexo};
    //console.log(persona);
    guardarPersona(persona);
}

function modificarPersonaForm(persona)
{
    persona['first_name']=document.getElementById('inputFirst_Name').value;
    persona['last_name']=document.getElementById('inputLast_Name').value;
    persona['email']=document.getElementById('inputEmail').value;
    if(document.getElementById('inputHombre').checked)
    {
        persona['gender']='Male';
    }
    else{
        persona['gender']='Female';
    }
    modificarPersona(persona);
}