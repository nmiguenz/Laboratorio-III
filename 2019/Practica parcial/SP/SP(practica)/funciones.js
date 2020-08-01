var Examen;
(function (Examen) {
    var lista = new Array();
    function agregar() {
        console.log('entre');
        var nombre = String($('#nombre').val()); //String en mayuscula para castear el .val()
        var apellido = String($('#apellido').val());
        var legajo = Number($('#legajo').val());
        console.log(nombre);
        var pr = new Examen.Alumno('jose', 'artigas', 6);
        console.dir(pr);
        pr.setNombre(nombre);
        pr.setApellido(apellido);
        pr.setlegajo(legajo);
        lista.push(pr);
        var tr = document.createElement('tr');
        var td = document.createElement('td');
        var nTd = document.createTextNode(pr.getNombre());
        var tdA = document.createElement('td');
        var aTd = document.createTextNode(pr.getApellido());
        var tdL = document.createElement('td');
        var lTd = document.createTextNode(String(pr.getLegajo()));
        td.appendChild(nTd);
        tdA.appendChild(aTd);
        tdL.appendChild(lTd);
        tr.appendChild(td);
        tr.appendChild(tdA);
        tr.appendChild(tdL);
        $('#tabla').append(tr);
    }
    Examen.agregar = agregar;
    function listar() {
        return lista;
    }
    Examen.listar = listar;
})(Examen || (Examen = {}));
