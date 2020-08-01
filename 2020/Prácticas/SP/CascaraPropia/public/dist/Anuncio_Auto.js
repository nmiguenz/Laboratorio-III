import Anuncio from './anuncio.js';


let spinner = document.getElementById('spinner');
let formulario = document.getElementById('myForm');
let btnCancelar = document.getElementById('btnCancelar');
let botonesTabla = document.getElementById('botonesTabla');
let btnBaja = document.getElementById('btnBaja');
let btnModificar = document.getElementById('btnEditar');
let table = document.getElementById('tabla');
let contentCheckbox = document.getElementById('filtroCheckbox');
let contentFilterTransaccion = document.getElementById('filtrarTransaccion');

let indiceRow;
let arrayAnuncios;
let transaccion;
let xhr;

let arrayHeader = ["id","titulo","transaccion","descripcion","precio","num_puertas","num_kms","potencia"];

//Info para setear el spinner dinamicamente
let img = document.createElement('img');
img.setAttribute('src','../img/volante_spinner.gif');
img.setAttribute('alt', 'spinner');

//window.addEventListener('load', taerLocal);
window.addEventListener('load', traerAnuncios);
formulario.addEventListener('submit', nuevoAnuncio);
btnCancelar.addEventListener('click', limpiarFormulario);
contentCheckbox.addEventListener("click", (event) => modificarChk(event), false);
contentFilterTransaccion.addEventListener('click', (event) => promedioTransaccion(event), false);

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
            arrayHeader.forEach(any => {
                let td = document.createElement('td');
                td.innerHTML = item[any];
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
    
    let titulo = document.getElementsByName('titulo')[0].value;
    let auxTransaccion = document.getElementById("transaccion");
    transaccion = auxTransaccion.options[auxTransaccion.selectedIndex].value;
    let descripcion = document.getElementsByName('descripcion')[0].value;
    let precio = parseInt(document.getElementsByName('precio')[0].value);
    let puertas = parseInt(document.getElementsByName('puertas')[0].value);
    let kms = parseInt(document.getElementsByName('km')[0].value);
    let potencia = parseInt(document.getElementsByName('potencia')[0].value); 
    
    let nuevoAnuncio = new Anuncio(null,titulo,transaccion,descripcion,precio,puertas,kms,potencia);

    // //Objeto para local
    // let id;
    // if(!arrayAnuncios){
    //     id = 1;
    // }
    // else{
    //     id = arrayAnuncios.length+1;
    // }

    // let nuevoAnuncio = new Anuncio(id,titulo,transaccion,precio,puertas,kms,potencia);
    
    altaAnuncio(nuevoAnuncio);
    //altaLocal(nuevoAnuncio);
    location.reload();
    
}

//Da de ALTA un anuncio en el servidor
function altaAnuncio(anuncio){
    xhr = server();
    xhr.open('POST', 'http://localhost:3000/alta');
    xhr.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
    xhr.send(JSON.stringify(anuncio));
    
    //location.reload();
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
    document.getElementById("txtPuertas").value = arrayAnuncios[indiceRow].num_puertas;
    document.getElementById("txtKm").value = arrayAnuncios[indiceRow].num_kms;
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
    let kms = parseInt(document.getElementById('txtKm').value);
    let potencia = parseInt(document.getElementById('txtPotencia').value); 
    
    arrayAnuncios[indiceRow] = new Anuncio(id,titulo,transaccion,descripcion,precio,puertas,kms,potencia);

    xhr = server();
    xhr.open('POST', 'http://localhost:3000/modificar');
    
    //Le paso un dato como si se lo hubiesemos extraido del formulario 
    xhr.setRequestHeader("Content-Type", "application/json");

    //Si mando mas de una variable
    //xhr.send(`id=${id}&nombre=`);
    xhr.send(JSON.stringify(arrayAnuncios[indiceRow]));
    location.reload();
});

//filtro
let promedioTransaccion = (event)=>{
    
    if(event.target.value){
        let numTipoTransaccion = arrayAnuncios.filter(anuncio =>     
            anuncio.transaccion == event.target.value);
    
        let transaccionTotal = arrayAnuncios.filter(anuncio =>     
                    anuncio.transaccion == event.target.value)
                    .map(anuncio => anuncio.precio)
                    .reduce((a,b)=>{return a+b;});
    
        document.getElementById("filtrarPromedio").value = transaccionTotal / numTipoTransaccion.length;
    }

    table.innerHTML = '';
    agregarRowTableTh(arrayHeader);

    Object.values(arrayAnuncios).forEach(anuncio => {
        if (anuncio.transaccion === event.target.value) {
            let tr = document.createElement("tr");
            tr.setAttribute('onclick', "setIndex(this)");
            Object.values(anuncio).forEach(item => {
                let td = document.createElement('td');
                td.innerHTML = item;
                tr.appendChild(td)
            })
            table.appendChild(tr)
        }
    });
    
}

// Al seleccionar un CheckBox oculta el campo
// Falta solucionar la carga de los datos
const modificarChk = (event) => {
    let checkboxAux, nuevoArray, checkboxAuxName, targetValue = event.target.value;
    console.dir(targetValue);

    if (targetValue) {
        
        checkboxAux = document.getElementById(targetValue);
        switch (targetValue) {
            case 'idChk':
                checkboxAuxName = "id"
                break;
            case 'tituloChk':
                checkboxAuxName = "titulo"
                break;
            case 'transaccionChk':
                checkboxAuxName = "transaccion"
                break;
            case 'descripcionChk':
                checkboxAuxName = "descripcion"
                break;
            case 'precioChk':
                checkboxAuxName = "precio"
                break;
            case 'puertasChk':
                checkboxAuxName = "num_puertas"
                break;
            case 'numeroKmsChk':
                checkboxAuxName = "num_kms"
                break;
            case 'potenciaChk':
                checkboxAuxName = "potencia"
                break;
            default:
                break;
            };
            
            console.log(checkboxAux);
            //saco columnas
            if (!checkboxAux.checked) {
                nuevoArray = arrayHeader.filter(item => item !== checkboxAuxName);
                console.log(nuevoArray);
                arrayHeader = nuevoArray;
            } else {
                //agrego columnas
                //Falta solucionar el orden
                arrayHeader.push(checkboxAuxName);
            }
            table.innerHTML = '';
            agregarRowTableTh(arrayHeader);
            agregarRowTableTd(arrayAnuncios, arrayHeader);

       }
}

//----Local Storage-----
function taerLocal(){
    arrayAnuncios = JSON.parse(localStorage.getItem('listaAnuncios'));
    
    if (arrayAnuncios) {
        agregarRowTableTh(arrayHeader);
        agregarRowTableTd(arrayAnuncios, null);
    } else {
        console.log('No hay Lista anuncios en LocalStorage');
    }
};

function guardarColumnasLocal(item){
    if (arrayAnuncios) {
        arrayAnuncios.push(item);
    } else {
        arrayAnuncios = [item]
    }
    localStorage.setItem('listaAnuncios', JSON.stringify(arrayAnuncios));
    console.log('Carga Exitosa');
    location.reload()
};

// //Baja LOCAL
// btnBaja.addEventListener('click', () => {
//     let id = parseInt(arrayAnuncios[indiceRow].id);
//     let auxAnuncio = arrayAnuncios.filter(item => item.id !== id);
//     localStorage.setItem('listaAnuncios', JSON.stringify(auxAnuncio));
//     location.reload()
    
// });

// //MODIFICACION LOCAL
// btnModificar.addEventListener('click', ()=>{
//     //event.preventDefault();
//     let id = String(arrayAnuncios[indiceRow].id);
//     let arrayAnunciosAux = [];

//     let titulo = document.getElementById("txtTitulo").value;
//     let auxTransaccion = document.getElementById("transaccion");
//     transaccion = auxTransaccion.options[auxTransaccion.selectedIndex].value;
//     let precio = parseInt(document.getElementById('txtPrecio').value);
//     let puertas = parseInt(document.getElementById('txtPuertas').value);
//     let kms = parseInt(document.getElementById('txtKm').value);
//     let potencia = parseInt(document.getElementById('txtPotencia').value); 
    
//     arrayAnuncios[indiceRow] = new Auto(id,titulo,transaccion,precio,puertas,kms,potencia);
//     console.dir([arrayAnuncios[indiceRow]]);
//     localStorage.setItem('listaAnuncios', JSON.stringify(arrayAnuncios[indiceRow]));
    
//     location.reload();
// });

//---------------------------