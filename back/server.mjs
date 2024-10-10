import {ObjectId} from "bson";
import express from 'express';
import {MongoClient} from 'mongodb';

const mongoURI = "mongodb://db:27017/docker";
const client = new MongoClient(mongoURI);
console.log("CONNECTED", !!client && !!client.topology && client.topology.isConnected());
const db = client.db('docker');
const todos = db.collection('todos');

const app = express();
const port = 3000;

app.use(express.json());

app.use((req, res, next)=>{
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Headers", "*");
    res.setHeader("Access-Control-Allow-Methods", "*");
    console.log("REQ", req.url);
    next();
})

app.delete('/:id', async (req, res)=>{
    console.log("app.delete('/:id'");
    const oid = new ObjectId(req.params.id);
    await todos.deleteOne({_id: oid});
    res.send("OK");
});

app.get('/check/:id/:checked', async (req, res)=>{
    console.log("app.get('/check/:id/:checked'");
    const oid = new ObjectId(req.params.id);
    await todos.updateOne(
        {_id: oid},
        {$set: { checked: req.params.checked }}
    )
});

app.post('/', async (req, res)=>{
    console.log("app.post('/'");
    const texte = req.body.texte;
    const todo = {
        texte,
        checked: false,
    };
    console.log("todo", todo);
    const {insertedId} = await todos.insertOne(todo);
    console.log("after insert");
    const newTodo = await todos.findOne({_id: insertedId});
    res.send(newTodo);
});

app.get('/', async (req, res)=>{
    console.log("app.get('/'");
    const allTodos = await todos.find({}).toArray();
    console.log("getAll", allTodos);
    res.send(allTodos);
});

app.listen(port, () => {
    console.log(`Listening on port ${port}`)
});