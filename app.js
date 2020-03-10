const express = require('express');
const app = express();
const morgan = require('morgan'); //log lib @method @rotas @status code @ms
const bodyParser = require('body-parser');

//Require de rotas
const rotaProdutos = require('./routes/produtos');
const rotaPedidos = require('./routes/pedidos');

app.use(morgan('dev'));
app.use(bodyParser.urlencoded({ extended: false })); //Aceitar apenas dados simples
app.use(bodyParser.json()); //Aceita apenas entrada json no body

//CORS config
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Header', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');

    if(req.method === 'OPTIONS'){
        res.header('Access-Control-Allow-Methods', 'PUPT, POST, PATCH, DELETE, GET');
        return res.status(200).send({});
    }

    next();
});

//ROtas 
app.use('/produtos', rotaProdutos);
app.use('/pedidos', rotaPedidos);

//tratamento de rota
app.use((req, res, next) => {
    const erro = new Error('Não encontrado!');
    erro.status = 404;
    next(erro);
});

app.use((error, req, res, next) => {
    res.status(error.status || 500)
    return res.send({
        error: {
            message: error.message
        }
    })
})

module.exports = app;