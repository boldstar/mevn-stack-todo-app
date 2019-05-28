const mongoose = require('mongoose')
const db_key = require('../config/keys').MongoURI;

const connectDb = () => {
    return mongoose.connect(db_key, { useNewUrlParser: true })
}

const mongodb = mongoose.connection
mongodb.on('error', console.error.bind(console, 'MongoDB connections error:'))

module.exports = {
    connectDb: connectDb
}