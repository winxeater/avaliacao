const express = require('express');
const router = express.Router();
const mysql = require('../mysql').pool;

//Get all items
router.get('/', (req, res, next) =>{
    // res.status(200).send({
    //     message: 'GET dentro da rota de produtos'
    // });
    mysql.getConnection((error, conn) => {
        if (error) { return res.status(500).send({ error: error }) }
        conn.query(
            'SELECT * FROM produtos',
            (error, result, field) => {
                if (error) { return res.status(500).send({ error: error }) }
                return res.status(200).send({response: result})
            }
        )
    })
});

//Post Item
router.post('/', (req, res, next) => {
    // const produto = {
    //     nome: req.body.nome,
    //     preco: req.body.preco
    // };
    mysql.getConnection((error, conn) => {
        if (error) { return res.status(500).send( {error: error} ) }
        conn.query(
            'INSERT INTO produtos (nome, preco) VALUES (?,?)',
            [req.body.nome, req.body.preco],
            (error, result, field) => {
                conn.release();

                if (error) { return res.status(500).send({ error: error }) }

                res.status(201).send({
                    message: 'Produto inserido com sucesso!',
                    id: result.insertId
                });
    
            }
        )
    })

    
});

//Get an Item by id
router.get('/:id', (req, res, next) =>{
    mysql.getConnection((error, conn) => {
        if (error) { return res.status(500).send({ error: error }) }
        conn.query(
            'SELECT * FROM produtos WHERE id = ?',
            [req.params.id],
            (error, result, field) => {
                if (error) { return res.status(500).send({ error: error }) }
                return res.status(200).send({response: result})
            }
        )
    })
});

//Alter an Item 
router.patch('/', (req, res, next) => {
    mysql.getConnection((error, conn) => {
        if (error) { return res.status(500).send( {error: error} ) }
        conn.query(
            'UPDATE produtos SET nome = ?, preco = ? WHERE id = ?',
            [req.body.nome, req.body.preco, req.body.id],

            (error, result, field) => {
                conn.release();

                if (error) { return res.status(500).send({ error: error }) }

                res.status(202).send({
                    message: 'Produto atualizado com sucesso!',
                    id: result.insertId
                });
    
            }
        )
    })
});

//Delete an Item
router.delete('/', (req, res, next) => {
    mysql.getConnection((error, conn) => {
        if (error) { return res.status(500).send( {error: error} ) }
        conn.query(
            'DELETE FROM produtos WHERE id = ?',
            [req.body.id],

            (error, result, field) => {
                conn.release();

                if (error) { return res.status(500).send({ error: error }) }

                res.status(202).send({
                    message: 'Produto removido com sucesso!',
                    id: result.insertId
                });
    
            }
        )
    })
});

module.exports = router;