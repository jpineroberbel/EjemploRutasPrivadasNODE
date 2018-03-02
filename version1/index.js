var express = require('express');
var path = require('path');
var bodyParser = require('body-parser');

var app = express();
var port = process.env.PORT || '3000';
app.set('port', port);

app.get("/", (req,res)=>{
    res.send("Estas en pagina principal");
});

// Esta ruta se autentifica a mano
app.get("/privadoV1", autentificaV1,  (req,res)=>{
    res.send("Accede a zona privada");
})

function autentificaV1(req, res, next)
{
  console.log("entra en autentifica");
   // next(); // Te autentifico
   //res.redirect("/"); // No te autentifico
   res.status(401).json({mensaje:"No puedes entrar"});
}
  app.listen(3000, () => console.log('Example app listening on port 3000!'))