const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');

const express = require('express');
const cors = require('cors');
const app = express();
const port = process.env.PORT || 5000;
require ('dotenv').config();



app.use(cors());
app.use(express.json());


         
         









const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.p9sgcbw.mongodb.net/?retryWrites=true&w=majority`;


const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });













async function run () {

    try{
        const serviceCollection = client.db('assignment-11').collection('services');

        const reviewCollection= client.db('assignment-11').collection('reviews');






        app.get('/services' , async (req, res) => {
            const id = parseInt(req.query.limit);
            const query = {}
            const cursor = serviceCollection.find(query);
            const services = await cursor.limit(id).toArray();
            res.send(services);
        })








        // app.get('/services' , async (req, res) => {
        //     const query = {}
        //     const cursor = serviceCollection.find(query);
        //     const services = await cursor.toArray();
        //     res.send(services);
        // })








        app.get('/services/:id', async (req, res) => {
            const id = req.params.id;
            const query = { _id: ObjectId(id) };
            const services = await serviceCollection.findOne(query);
            res.send(services);
        });











        app.get('/reviews', async (req, res) => {
            const query = {};
            const cursor = reviewCollection.find(query);
            const reviews = await cursor.toArray();
            res.send(reviews);
        })












        app.post('/reviews', async(req, res) => {
            const review = req.body;
            const result = await reviewCollection.insertOne(review);
            res.send(result);
        })


















    }





    finally{

    }
}
run().catch(err => console.error(err));


















app.get('/', (req, res) => {
    res.send('This server is running')
})









app.listen(port, () => {
    console.log(`Dont Worry your server is running on ${port}`);
})







