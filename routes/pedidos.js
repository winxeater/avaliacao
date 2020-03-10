const express = require('express');
const router = express.Router();

//Get all items
router.get('/', (req, res, next) =>{
    res.status(200).send({
        message: 'GET dentro da rota de pedidos'
    });
});

//Post Item
router.post('/', (req, res, next) => {

    const pedido = {
        id: req.body.id,
        quantidade: req.body.quantidade
    }

    res.status(201).send({
        message: 'POST dentro da rota de pedidos',
        pedidoCriado: pedido
    });
});

//Get an Item by id
router.get('/:id', (req, res, next) =>{
    const id = req.params.id;
   
    res.status(200).send({
        message: 'Bingo! Você passou um single ID',
        id: id
    });
});

//Alter an Item 
router.patch('/', (req, res, next) => {
    res.status(201).send({
        message: 'PATCH dentro da rota de pedidos'
    });
});

//Delete an Item
router.delete('/', (req, res, next) => {
    res.status(201).send({
        message: 'DELETE dentro da rota de pedidos'
    });
});

module.exports = router;