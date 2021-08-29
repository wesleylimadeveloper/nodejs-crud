const express = require('express')
const axios = require('axios')
const connection = require('../util/database')
const router = express.Router()

router.get('/', (req, res) => {
    res.send('Welcome to the API!')
})

router.get('/pessoas', (req, res) => {
    const sql = 'SELECT * from tbl_pessoa'

    connection.query(sql, (error, results, fields) => {
        if (!error) {
            return res.send(results)
        } else {
            return res.send('Erro ao listar dados.')
        }
    })
})

router.get('/pessoas/:id', (req, res) => {
    const { id } = req.params
    const sql = 'SELECT * from tbl_pessoa WHERE cod_pessoa = ?'

    connection.query(sql, [id], (error, results, fields) => {
        if (!error) {
            if (results != '') {
                return res.send(results)
            } else {
                return res.send(`Pessoa ${id} não encontrada.`)
            }
        } else {
            return res.send('Erro ao listar dados.')
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

    connection.query(sql, [nome, sobrenome, email, celular], (error, results, fields) => {
        if (!error) {
            return res.send('Dados cadastrados com sucesso!')
        } else {
            return res.send('Erro ao cadastrar os dados.')
        }
    })
})

router.put('/pessoas/:id', (req, res) => {
    const { id } = req.params
    const { nome, sobrenome, email, celular } = req.body
    const sql = `UPDATE tbl_pessoa SET nome = ?, sobrenome = ?, email = ?, celular = ? WHERE cod_pessoa = ${id}`

    connection.query(sql, [nome, sobrenome, email, celular], (error, results, fields) => {
        if (!error) {
            return res.send('Dados alterados com sucesso!')
        } else {
            return res.send('Erro ao alterar os dados.')
        }
    })
})

router.delete('/pessoas/:id', (req, res) => {
    const { id } = req.params
    const sql = 'DELETE from tbl_pessoa WHERE cod_pessoa = ?'

    connection.query(sql, [id], (error, results, fields) => {
        if (!error) {
            return res.send('Dados excluidos com sucesso!')
        } else {
            return res.send('Erro ao excluir os dados.')
        }
    })
})

module.exports = router