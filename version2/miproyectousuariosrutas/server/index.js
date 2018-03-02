var express = require('express');
var path = require('path');
var bodyParser = require('body-parser');

var app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

var port = process.env.PORT || '3000';
app.set('port', port);

app.use(express.static(path.join(__dirname, 'public')));

// Esta ruta se autentifica a mano
app.post("/privadoV2",  autentificaV2, (req,res)=>{
         res.status(200).json({success: true, msg: "Bienvenido a zona privada"});
})

function autentificaV2(req, res, next)
{

    
    if (req.body.usuario == "Jose")
        next(); // Te autentifico
    else
     res.status(401).send({success: false, msg: 'No puedes acceder a zona privada'}); // No te autentifico
}
  app.listen(3000, () => console.log('Example app listening on port 3000!'))