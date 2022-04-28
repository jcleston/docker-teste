const mongoose = require('../database');

const itinerarioSchema = new mongoose.Schema({
    lat: {
        type: String,
        require: true,
    },
    lng: {
        type: String,
        require: true,
    },
    idLinha: {
        type: String,        
        require: true,
    }
});

const Itinerarios = mongoose.model('Itinerarios', itinerarioSchema);

module.exports = Itinerarios;
