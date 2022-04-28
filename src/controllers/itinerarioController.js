const express = require('express');

//Schema do itinerario
const Itinerarios = require('../models/Itinerarios');

const router = express.Router();

//Rota raiz, retorna erro.
router.get('/', async (req, res) => {
    return res.status(400).send({ erro: 'ID não encontrado'});
});

//Rota que retorna todos itinerarios da Linha
router.get('/:linhaID', async (req, res) => {    
    try{
        const itinerarios = await Itinerarios.find({
            'idLinha': req.params.linhaID
        });
        return res.send({ itinerarios });
    } catch(err){
        return res.status(400).send({ erro: 'Falha ao carregar itinerarios'});
    }
});

//Rota para inserir Linha no database
router.post('/', async (req, res) => {
    const { lat } = req.body; 
    const { lng } = req.body;
    const { idLinha } = req.body   
    try{
        const verify = await Itinerarios.find({
            'idLinha': idLinha 
        });
        if(verify){
            verify.forEach( item =>{
                if(item.lat == lat && item.lng == lng){
                    return res.status(400).send({ erro: 'Itinerario já cadastrado'});
                }
            })           
        }      
        const itinerarios = await Itinerarios.create(req.body);
        return res.send({ itinerarios });
    } catch(err){
        console.log(err);
        return res.status(400).send({ erro: 'Registro falhou'});
    }
});

//Rota para deletar Linha no database
router.delete('/:linhaId', async (req, res) => {    
    try{
        await Itinerarios.findByIdAndRemove(req.params.linhaId);
        return res.status(200).send({ sucesso: 'Itinerario deletado'});
    } catch(err){
        return res.status(400).send({ erro: 'Falha ao deletar'});
    }
});

module.exports = app => app.use('/itinerario', router);