const mongoose = require('mongoose');

const AnnotationDataSchema = new mongoose.Schema({
    nome_completo: String,
    email: String,
    telefone: String,
    CNPJ: String,
    endereco: String,
    cidade: String
});

module.exports = mongoose.model('usuarios', AnnotationDataSchema);