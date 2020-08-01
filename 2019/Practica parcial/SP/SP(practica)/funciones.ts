namespace Examen{

    var lista:Array<Persona> = new Array<Persona>();


    export function agregar(){
        console.log('entre');
        let nombre:string = String($('#nombre').val()); //String en mayuscula para castear el .val()
        let apellido:string = String($('#apellido').val());
        let legajo:number = Number($('#legajo').val());
        console.log(nombre);
        let pr:Alumno = new Alumno('jose', 'artigas', 6);
        console.dir(pr);
        
        pr.setNombre(nombre);
        pr.setApellido(apellido);
        pr.setlegajo(legajo);
        lista.push(pr);

        let tr = document.createElement('tr');
        let td = document.createElement('td');
        let nTd = document.createTextNode(pr.getNombre());
        let tdA = document.createElement('td');
        let aTd = document.createTextNode(pr.getApellido());
        let tdL = document.createElement('td');
        let lTd = document.createTextNode(String(pr.getLegajo()));
        
        td.appendChild(nTd);
        tdA.appendChild(aTd);
        tdL.appendChild(lTd);
        tr.appendChild(td);
        tr.appendChild(tdA);
        tr.appendChild(tdL);

        $('#tabla').append(tr);
        

    }

    export function listar():Array<Persona>{
        return lista;
    }

}