const { MongoClient, ServerApiVersion } = require('mongodb');
const settings = require('./config');
const uri = settings.MONGO_DB;

const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

const dbName = 'worker-schedule'

let connections = {}

async function returnConnection(collection){
    if(!connections[collection]){
        await client.connect();
        let db = client.db(dbName)
        connections[collection] = db.collection(collection);
    }

    return connections[collection]
}

module.exports.findOne = async function findOne(collection, query, projection ={}){
    let collectionConn = await returnConnection(collection);
    return await collectionConn.findOne(query, projection)
}

module.exports.findAll = async function find(collection, query, projection={}){
    let collectionConn = await returnConnection(collection);
    return await collectionConn.find(query, projection).toArray();
}

module.exports.insert = async function insert(collection, query){
    let collectionConn = await returnConnection(collection);
    return await collectionConn.insert(query);
}

module.exports.update = async function update(collection, selectionQuery, updateData, projection={}){
    let collectionConn = await returnConnection(collection);
    return await collectionConn.updateOne(selectionQuery, updateData, projection);
}

module.exports.updateMany = async function updateMany(collection, selectionQuery, updateData, projection={}){
    let collectionConn = await returnConnection(collection);
    return await collectionConn.updateMany(selectionQuery, updateData, projection);
}

