const { MongoClient, ServerApiVersion } = require('mongodb');

const express = require('express');
const cors = require('cors');
const app = express();
const port = process.env.PORT || 5000;
require ('dotenv').config();



app.use(cors());
app.use(express.json());


         
         








const { MongoClient, ServerApiVersion } = require('mongodb');
const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.p9sgcbw.mongodb.net/?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });













app.get('/', (req, res) => {
    res.send('This server is running')
})









app.listen(port, () => {
    console.log(`Dont Worry your server is running on ${port}`);
})







