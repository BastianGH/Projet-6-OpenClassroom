const express = require('express')
const app = express();
const mongoose = require('mongoose')
require('dotenv').config();
const oneRoutes = require('./routes/One')
const userRoutes = require('./routes/userRoutes')



mongoose.connect(`mongodb+srv://${process.env.USER}:${process.env.PASSWORD}@cluster.3zqn6vj.mongodb.net/?retryWrites=true&w=majority`,
  { useNewUrlParser: true,
    useUnifiedTopology: true })
  .then(() => console.log('Connexion à MongoDB réussie !'))
  .catch(() => console.log('Connexion à MongoDB échouée !'));app.use(express.json());

app.use((req,res,next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    next();
})

app.use((req,res) => {
    res.json(`Listening on port ${process.env.PORT}`);
    next();
})

app.use('http:localhost:3000/api/qqch', oneRoutes);
app.use('http:localhost:3000/api/auth', userRoutes)

module.exports = app;