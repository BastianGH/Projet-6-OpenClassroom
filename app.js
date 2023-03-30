const express = require('express');
const app = express();
const mongoose = require('mongoose');
const path = require('path');
const cors = require("cors")

const userRoutes = require('./routes/userRoutes');
const saucesRoutes = require('./routes/saucesRoutes');

require('dotenv').config();

mongoose.connect(`mongodb+srv://${process.env.MDB_USER}:${process.env.MDB_PASSWORD}@cluster.3zqn6vj.mongodb.net/?retryWrites=true&w=majority`,
  { useNewUrlParser: true,
    useUnifiedTopology: true })
  .then(() => console.log('Connexion à MongoDB réussie !'))
  .catch(() => console.log('Connexion à MongoDB échouée !'));
  
app.use(express.json());
app.use(cors());
/*
app.use((req,res,next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS, PATCH');
    next();
})
*/
app.use('/api/auth', userRoutes)
app.use('/api/sauces', saucesRoutes)
app.use('/images', express.static(path.join(__dirname, 'images')));

module.exports = app;