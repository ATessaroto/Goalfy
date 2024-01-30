const mongoose = require('mongoose');
const dbConfig = 'mongodb+srv://admin:admin@cluster0.2emyadt.mongodb.net/usuarios?retryWrites=true&w=majority'

const connection = mongoose.connect(dbConfig);

module.exports = connection;