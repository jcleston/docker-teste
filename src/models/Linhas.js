const mongoose = require('../database');

const linhaSchema = new mongoose.Schema({
    name: {
        type: String,
        require: true,
    },
    code: {
        type: String,
        require: true,
        unique: true,
    },
});

const Linhas = mongoose.model('Linhas', linhaSchema);

module.exports = Linhas;
