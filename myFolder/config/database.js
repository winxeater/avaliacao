const mongoose = require('mongoose')
module.exports = mongoose.connect('mongodb+srv://mathgaguiar:teste333@cluster0-h7xia.mongodb.net/test?retryWrites=true&w=majority',{
    useNewUrlParser: true, useUnifiedTopology: true
})
