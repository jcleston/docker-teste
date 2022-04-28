const express = require('express');

//Schema das Linhas
const Linhas = require('../models/Linhas');

const router = express.Router();

//Rota que retorna todas Linhas do database
router.get('/', async (req, res) => {
    try{
        const linhas = await Linhas.find();
        return res.send({ linhas });
    } catch(err){
        return res.status(400).send({ erro: 'Falha ao carregar Linhas'});
    }
});

//Rota para inserir Linha no database
router.post('/', async (req, res) => {
    const { code } = req.body;    
    try{
        if(await Linhas.findOne({ code }))
            return res.status(400).send({ erro: 'Linha já cadastrada'});

        const linhas = await Linhas.create(req.body);
        return res.send({ linhas });
    } catch(err){
        return res.status(400).send({ erro: 'Registro falhou'});
    }
});

//Rota para atualizar  Linha no database
router.put('/:linhaId', async (req, res) => {
    const { name, code } = req.body;   
    try{
        const linha = await Linhas.findByIdAndUpdate(req.params.linhaId, {
            name,
            code
        }, { new: true });

        return res.send({ linha });
    } catch(err){
        return res.status(400).send({ erro: 'Falha ao deletar'});
    }
});

//Rota para deletar Linha no database
router.delete('/:linhaId', async (req, res) => {    
    try{
        await Linhas.findByIdAndRemove(req.params.linhaId);
        return res.send("Linha deletada");
    } catch(err){
        return res.status(400).send({ erro: 'Falha ao deletar'});
    }
});

module.exports = app => app.use('/linhas', router);