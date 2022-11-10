const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');

const express = require('express');
const cors = require('cors');
const jwt = require('jsonwebtoken');
const app = express();
const port = process.env.PORT || 5000;
require ('dotenv').config();



app.use(cors());
app.use(express.json());


         
         









const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.p9sgcbw.mongodb.net/?retryWrites=true&w=majority`;


const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });








        // jwt Function________________
        function verifyJWT(req, res, next){
            const authHeader = req.headers.authorization;
            if(!authHeader){
                return res.status(401).send({message: 'unauthorized access'})
            }
             const token = authHeader.split(' ')[1];
            jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, function(err, decoded){
                if(err){
                   return res.status(403).send({message: 'unauthorized access'});
                }
                req.decoded = decoded;
                next();
            })


            
         }










async function run () {

    try{
        const serviceCollection = client.db('assignment-11').collection('services');

        const reviewCollection= client.db('assignment-11').collection('reviews');

        const addServiceCollection = client.db('assignment-11').collection('addservice');



        // jwt Token________
        app.post('/jwt', (req, res) => {
            const user = req.body;
           const token = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '1d'})
           res.send({token});
        })



// getting services____
        app.get('/services' , async (req, res) => {
            const id = parseInt(req.query.limit);
            const query = {}
            const cursor = serviceCollection.find(query);
            const services = await cursor.limit(id).toArray();
            console.log(services);
            res.send(services);
            
        })




// getting specific services________
        app.get('/services/:id', async (req, res) => {
            const id = req.params.id;
            const query = { _id: ObjectId(id) };
            const services = await serviceCollection.findOne(query);
            // console.log(services);
            res.send(services);
        });



// post_reviews__________
        app.post('/reviews', async(req, res) => {
            const review = req.body;
            const result = await reviewCollection.insertOne(review);
            res.send(result);
        })



// getting reviews for MyReview Router_________
        app.get('/reviews', verifyJWT,  async (req, res) => {
            
            const decoded = req.decoded;
            
            if(decoded.email !== req.query.email){
                res.status(403).send({message: 'unauthorized access'})
            }
            
            let query = {};
            if(req.query.email){
                query = {
                    email: req.query.email
                }
            }

            const cursor = reviewCollection.find(query);
            const reviews = await cursor.toArray();
            res.send(reviews);
        })


        // getting Review___________________
        app.get('/reviews/:id', async (req, res) => {
            const id = req.params.id;
            const query = { _id: ObjectId(id) };
            const reviews = await reviewCollection.findOne(query);
            res.send(reviews);
        });



        // delete Review___________
        app.delete('/reviews/:id', verifyJWT,  async (req, res) => {
            const id = req.params.id;
            const query = { _id: ObjectId(id) };
            const result = await reviewCollection.deleteOne(query);
            res.send(result);
        })






        // for adservices____
        app.post('/addservice', async(req, res) => {
            const review = req.body;
            const result = await addServiceCollection.insertOne(review);
            res.send(result);
        })




        app.get('/addservice', async (req, res) => {
            let query = {};
            const cursor = addServiceCollection.find(query);
            const reviews = await cursor.toArray();
            res.send(reviews);
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







