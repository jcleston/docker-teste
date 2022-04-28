const express = require('express');
const axios = require('axios');

const router = express.Router();

//PARTE 2: Filtro de linhas por nome
router.get('/:nome', async (req, res) => {  
    const url="http://www.poatransporte.com.br/php/facades/process.php?a=nc&p=%&t=o";
    const palavra = req.params.nome;
    try{
        axios.get(url).then(response => {        
            let apiData = response.data; 
            var filteredData = apiData.filter( item => {                
                return item.nome.toLowerCase().indexOf(palavra.toLowerCase()) > -1;
            });            
            return res.status(200).json({ filteredData });          
        })
        .catch(error => {
            console.log(error);
        });        
    } catch(err){
        return res.status(400).send({ erro: 'Falha ao carregar filtros'});
    }
});
module.exports = app => app.use('/filtrar', router);