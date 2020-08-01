import Persona from './entidades.js';

let btnTraerF = document.getElementById('btnTraerF');
let info = document.querySelector('#divInfo');
let img = document.createElement('img');
img.setAttribute('src', './imagenes/spinner.gif');
img.setAttribute('alt', 'spinner');

btnTraerF.addEventListener('click', traerPersonasFetch);


function traerPersonasFetch(){
    
    info.appendChild(img);
    //Devuelve una promesa - por defecto hace un GET a una URL
    fetch('./js/datos.json')
    //Si queremos que lo devuelva como texto
    //.then(res=>res.json())
    .then((res)=>res.json())
    .then((data) =>{ 
        console.log(data)
        info.removeChild(img);
    })
    .catch(error =>{
        console.log(error);
    })
}