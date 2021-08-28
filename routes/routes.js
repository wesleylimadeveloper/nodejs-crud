const express = require('express')
const axios = require('axios')
const connection = require('../util/database')
const router = express.Router()

router.get('/', (req, res) => {
    res.send('Welcome to the API!')
})

router.get('/pessoas', (req, res) => {
    const sql = 'SELECT * from tbl_pessoa'

    connection.query(sql, (error, rows, fields) => {
        if (!error) {
            return res.send(rows)
        } else {
            return res.send('Erro ao tentar listar os dados')
        }
    })
})

router.get('/pessoas/:id', (req, res) => {
    const { id } = req.params
    const sql = 'SELECT * from tbl_pessoa WHERE cod_pessoa = ?'

    connection.query(sql, [id], (error, rows, fields) => {
        if (!error) {
            if (rows != '') {
                return res.send(rows)
            } else {
                return res.send(`Pessoa ${id} não encontrada.`)
            }
        } else {
            return res.send('Erro ao tentar listar os dados ' + error)
        }
    })
})

router.get('/jsonplaceholder', async (req, res) => {
    try {
        const { data } = await axios.get('https://jsonplaceholder.typicode.com/posts')
        return res.send(data)
    } catch (error) {
        return res.send('Erro!')
    }
})

router.post('/pessoas', (req, res) => {
    const { nome, sobrenome, email, celular } = req.body
    const sql = 'INSERT INTO tbl_pessoa(nome, sobrenome, email, celular) VALUES(?, ?, ?, ?)'

    connection.query(sql, [nome, sobrenome, email, celular], (error, rows, fields) => {
        if (!error) {
            return res.send('Cadastrado com sucesso!')
        } else {
            return res.send('Erro ao cadastrar!')
        }
    })
})

router.put('/pessoas/:id', (req, res) => {
    const { id } = req.params
    const { nome, sobrenome, email, celular } = req.body
    const sql = `UPDATE tbl_pessoa SET nome = ?, sobrenome = ?, email = ?, celular = ? WHERE cod_pessoa = ${id}`

    connection.query(sql, [nome, sobrenome, email, celular], (error, rows, fields) => {
        if (!error) {
            return res.send('Atualizado com sucesso!')
        } else {
            return res.send('Erro ao atualizar!')
        }
    })
})

router.delete('/pessoas/:id', (req, res) => {
    const { id } = req.params
    const sql = 'DELETE from tbl_pessoa WHERE cod_pessoa = ?'

    connection.query(sql, [id], (error, rows, fields) => {
        if (!error) {
            return res.send('Excluido com sucesso!')
        } else {
            return res.send('Erro ao excluir!')
        }
    })
})

module.exports = router