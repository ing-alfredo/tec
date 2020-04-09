var express = require('express');
var webpack = require('webpack');
var webpackDevMiddleware = require('webpack-dev-middleware');
var webpackConfig = require('../webpack.config');
var badyParser = require('body-parser');

const email = require("./servidor/email");
const contacto = require("./servidor/contacto");

var app = express();
app.set('port',(process.env.PORT || 3000));
app.use('/static',express.static('dist'));
app.use(badyParser.json());
app.use(badyParser.urlencoded({extended:true}));
app.use(webpackDevMiddleware(webpack(webpackConfig)));

const oEmail = new email({
    "host":"smtp.gmail.com",
    "port":"465",
    "secure":true,
    "auth":{
        "type":"login",
        "user":"muebleria.arzat@gmail.com",
        "pass":"comercializadora"
    }
});

const oContacto = new contacto({
    host:"localhost",
    user:"id12743446_industrial",
    password:"industrial",
    database:"id12743446_industrialtec"
});

app.get('/',function(req,res,next){
    res.send('Luxho');
})

app.post('/api/contacto',function(req, res, next){
    let email = {
        from:"muebleria.arzat@gmail.com",
        to:"muebleria.arzat@outlook.com",
        subject:"Nuevo mensaje de usuario",
        html:`
            <div>
                <p>Correo: ${req.body.c}</p>
                <p>Nombre: ${req.body.n}</p>
                <p>Mensaje: ${req.body.m}</p>
            </div>
        `
    };

    oContacto.agregarUsuario(req.body.n,req.body.c);

    oEmail.enviarCorreo(email);
    res.send("ok");

});

app.listen(app.get('port'), ()=>{
    console.log('Servidor activo');
})