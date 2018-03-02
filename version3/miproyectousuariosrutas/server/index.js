var express = require('express');
var path = require('path');
var bodyParser = require('body-parser');

var jwt = require('jwt-simple');
var secret = 'Mi_Secreto';

var app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

var port = process.env.PORT || '3000';
app.set('port', port);

app.use(express.static(path.join(__dirname, 'public')));

// Esta ruta se autentifica a mano
app.post("/login",  autentifica, (req,res)=>{
        const payload = {usuario: req.body.usuario};    
        

        let miToken = jwt.encode(payload, secret);
         res.status(200).json({token: miToken});
}) 

function autentifica(req, res, next)
{
    if (req.body.usuario == "Jose" || req.body.usuario == "Jose Piñero" )
        next(); // Te autentifico
    else
     res.status(401).send({success: false, msg: 'No puedes acceder a zona privada'}); // No te autentifico
}

app.get("/privadoV3",  chequeaJWT, (req,res)=>{

    datosPerfil = {nombre:"jose", otrocampo:"lkj"};

     res.status(200).json(datosPerfil);
})
function chequeaJWT(req, res, next)
{
    console.log(req.headers['authorization']);
    token = jwt.decode(req.headers['authorization'],secret);
    if (token.usuario == "Jose")
        next();
}


app.listen(3000, () => console.log('Example app listening on port 3000!'))
