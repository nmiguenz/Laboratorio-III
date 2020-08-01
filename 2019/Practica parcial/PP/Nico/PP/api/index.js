var express =require("express");
var cors = require("cors");
var corsOptions = {origin:"*",optionSucessStatus:200};
var app = express();
var bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());

app.use(cors(corsOptions));


var personas = [{
  "id": 24,
  "nombre": "Christean",
  "apellido": "Niese",
  
  "sexo": "Female",
  
}, {
  "id": 32,
  "nombre": "Thomasina",
  "apellido": "Tumbridge",
  
  "sexo": "Female",
  
}, {
  "id": 14,
  "nombre": "Wandis",
  "apellido": "Massimi",
  
  "sexo": "Female",
  
}, {
  "id": 18,
  "nombre": "Herold",
  "apellido": "Rainville",
  
  "sexo": "Male",
  
}, {
  "id": 35,
  "nombre": "Candis",
  "apellido": "Fleming",
  
  "sexo": "Female",
  
}, {
  "id": 36,
  "nombre": "Toddie",
  "apellido": "Eastup",
  
  "sexo": "Male",
  
}, {
  "id": 47,
  "nombre": "Sherill",
  "apellido": "Stockau",
  
  "sexo": "Female",
  
}, {
  "id": 58,
  "nombre": "Georgia",
  "apellido": "Segeswoeth",
  
  "sexo": "Female",
  
}];
var id =25;



app.get("/personas",function(req,res){
   
 res.send(personas);    

        return;
   
   
    
});






app.post("/editar",function(req,res){
    setTimeout(function(){
        
       console.log(req.body);
        if((req.body.id!= undefined&&req.body.id!= "") &&(req.body.nombre!= undefined&&req.body.nombre!= "") &&(req.body.apellido!= undefined&&req.body.apellido!= "") 
			&&   (req.body.sexo!= undefined&&req.body.sexo!= "")){
	
			
        
				for(var i =0;i<personas.length;i++){
					if(req.body.id== personas[i].id){
						personas[i].nombre=req.body.nombre;
						personas[i].apellido=req.body.apellido;

						personas[i].sexo=req.body.sexo;
							res.send(req.body);    
							return;
					}
				}
		
        }
        res.send({'type': 'error'});
    },2000);
    
});



app.post("/eliminar",function(req,res){
    setTimeout(function(){
        
       console.log(req.body);
        if(req.body.id!= undefined&&req.body.id!= ""){
	
			for(var i =0;i<personas.length;i++){
					if(req.body.id== personas[i].id){
						personas.splice(i,1);
        	var data = {"type":"ok"};
							res.send(data);    
							return;
					}
				}
			
			

        }
        res.send({'type': 'error'});
    },2000);
    
});

app.listen(3000,function(){
    console.log("Api en el puerto 3000");
});