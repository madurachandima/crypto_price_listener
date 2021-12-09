const express = require('express');
const cors = require('cors');

const { getCryptoPrice } = require('./websocket_connection/create_connection');
const{createDatabaseConnection} =require('./db_connection/createConnection');


const port = process.env.PORT ||3000;
const app = express();

var connection =createDatabaseConnection();
getCryptoPrice(connection);


//midelware
app.use(express.json());
app.use(cors());

app.listen(port,()=> console.log(`port ${port}`));