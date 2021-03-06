let arrayAnuncios;
let arrayHeader = ["id","Titulo","Transaccion","Descripcion","Precio","Puertas","KMs","Potencia"];

let formulario = document.getElementById('myForm');
let btnCancelar = document.getElementById('btnCancelar');
let btnBaja = document.getElementById('btnBaja');
let btnModificar = document.getElementById('btnModificar');
let table = document.getElementById('tabla');


//Info para setear el spinner dinamicamente
let spinner = document.getElementById('spinner');
let img = document.createElement('img');
img.setAttribute('src','../img/volante_spinner.gif');
img.setAttribute('alt', 'spinner');

//EVENTOS
window.addEventListener('load', inicializarEventos);

//Inicializa los eventos de la pagina
function inicializarEventos(){
    traerAnuncios();
    formulario.addEventListener('submit', nuevoAnuncio);
    btnCancelar.addEventListener('click', limpiarFormulario);
}

//Instancia del objeto XMLHttpRequest
//Acceso al estado del SERVIDOR
function server(){
    let xhr = new XMLHttpRequest();

    xhr.onreadystatechange = ()=>{
        if(xhr.readyState == 4){
            spinner.removeChild(img);
            if(xhr.status == 200){
                
                console.log(JSON.parse(xhr.responseText));
            }
            else{
                console.log(xhr.status + " " + xhr.statusText);
            } 
        }
        else{
            spinner.appendChild(img);
        } 
        
    }
    return xhr;
}

//CARGA la lista cuando termino el load de la pagina
function traerAnuncios(){
    let xhr = new XMLHttpRequest();
    
    xhr.onreadystatechange = ()=>{
        
        if(xhr.readyState == 4){
            spinner.removeChild(img);
            if(xhr.status == 200){
                
                arrayAnuncios = JSON.parse(xhr.responseText).data;
                console.log(JSON.parse(xhr.responseText).message)
                console.log(arrayAnuncios);

                agregarRowTableTh(arrayHeader);
                agregarRowTableTd(arrayAnuncios);

            }
            else{
                console.log(xhr.status + " " + xhr.statusText);
            } 
        }
        else{
            spinner.appendChild(img);
        }
    
    }
    xhr.open('GET', 'http://localhost:3000/traer');
    xhr.send();
}

//Agrega un renglon de la tabla (th),
const agregarRowTableTh = (element) => {
    let thead = document.createElement('thead');
    thead.setAttribute('class', 'thead-dark');
    let tr = document.createElement("tr");
    element.forEach((item) => {
        let th = document.createElement('th');
        th.innerHTML = item;
        tr.appendChild(th)
    })
    thead.appendChild(tr)
    table.appendChild(thead);
};

//Agrega los dinamicamente los campos del JSON a la tabla
const agregarRowTableTd = (arrayAnuncios, arrayHeader) => {
    if (arrayHeader) {
        Object.values(arrayAnuncios).forEach(item => {
            let tr = document.createElement("tr");
            tr.setAttribute('onclick', "setIndex(this)");
            arrayHeader.forEach(elemento => {
                let td = document.createElement('td');
                td.innerHTML = item[elemento];
                tr.appendChild(td)
            })
            table.appendChild(tr)
        })
    } else {
        console.dir(arrayAnuncios);
        arrayAnuncios.forEach(anuncio => {
            let tr = document.createElement("tr");
            tr.setAttribute('onclick', "setIndex(this)");
            Object.values(anuncio).forEach(item => {
                let td = document.createElement('td');
                td.innerHTML = item;
                tr.appendChild(td)
            })
            table.appendChild(tr)
        })
    }
};

//Setea el indice de la FILA
// Completa los campos del formulario con la fila que presione
window.setIndex = (e) => {
    botonesTabla.style.display = 'block';
    indiceRow = e.rowIndex-1;
    completarCamposAnuncio();
}

//Instancia un nuevo objeto propiedad
function nuevoAnuncio(e){
    e.preventDefault();
    
    let titulo = document.getElementById('txtTitulo').value;
    let auxTransaccion = document.getElementById("transaccion");
    transaccion = auxTransaccion.options[auxTransaccion.selectedIndex].value;
    let descripcion = document.getElementById('txtDescripcion').value;
    let precio = parseInt(document.getElementById('txtPrecio').value);
    let puertas = parseInt(document.getElementById('txtPuertas').value);
    let kms = parseInt(document.getElementById('txtKilometros').value);
    let potencia = parseInt(document.getElementById('txtPotencia').value); 
    
    let nuevoAnuncio = new Anuncio_Auto(null,titulo,transaccion,descripcion,precio,puertas,kms,potencia);

    console.log(nuevoAnuncio);  
    
    altaAnuncio(nuevoAnuncio);
    location.reload();
    
}

//Da de ALTA un anuncio en el servidor
function altaAnuncio(anuncio){
    xhr = server();
    xhr.open('POST', 'http://localhost:3000/alta');
    xhr.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
    xhr.send(JSON.stringify(anuncio));
    
}

//Limpia el formulario al presionar CANCELAR
function limpiarFormulario() {
    document.getElementById("myForm").reset();
}

//Completa los campos del formulario con el valor de la row
function completarCamposAnuncio(){

    document.getElementById("txtTitulo").value = arrayAnuncios[indiceRow].titulo;
    document.getElementById("transaccion").value = arrayAnuncios[indiceRow].transaccion;
    document.getElementById("txtDescripcion").value = arrayAnuncios[indiceRow].descripcion;
    document.getElementById("txtPrecio").value = arrayAnuncios[indiceRow].precio;
    document.getElementById("txtPuertas").value = arrayAnuncios[indiceRow].numPuertas;
    document.getElementById("txtKilometros").value = arrayAnuncios[indiceRow].numKms;
    document.getElementById("txtPotencia").value = arrayAnuncios[indiceRow].potencia;
}

//BAJA logica del anuncio en el SERVIDOR
btnBaja.addEventListener('click', ()=>{
    let id = parseInt(arrayAnuncios[indiceRow].id);

    xhr = server();
    xhr.open('POST', 'http://localhost:3000/baja');
    
    //Le paso un dato como si se lo hubiesemos extraido del formulario 
    xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");

    //Si mando mas de una variable
    //xhr.send(`id=${id}&nombre=`);
    xhr.send(`id=${id}`);
    
    //Refresca la pagina donde actua el codigo
    location.reload();
});

//MODIFICA el anuncio en el SERVIDOR
btnModificar.addEventListener('click', ()=>{
    //event.preventDefault();
    let id = String(arrayAnuncios[indiceRow].id);
    
    let titulo = document.getElementById("txtTitulo").value;
    let auxTransaccion = document.getElementById("transaccion");
    transaccion = auxTransaccion.options[auxTransaccion.selectedIndex].value;
    let descripcion = document.getElementById("txtDescripcion").value;
    let precio = parseInt(document.getElementById('txtPrecio').value);
    let puertas = parseInt(document.getElementById('txtPuertas').value);
    let kms = parseInt(document.getElementById('txtKilometros').value);
    let potencia = parseInt(document.getElementById('txtPotencia').value); 
    
    arrayAnuncios[indiceRow] = new Anuncio_Auto(id,titulo,transaccion,descripcion,precio,puertas,kms,potencia);

    xhr = server();
    xhr.open('POST', 'http://localhost:3000/modificar');
    
    //Le paso un dato como si se lo hubiesemos extraido del formulario 
    xhr.setRequestHeader("Content-Type", "application/json");

    //Si mando mas de una variable
    //xhr.send(`id=${id}&nombre=`);
    xhr.send(JSON.stringify(arrayAnuncios[indiceRow]));
    location.reload();
});