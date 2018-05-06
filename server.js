const express = require('express');
const bodyParser = require('body-parser');
const http = require('http');
const ip = require('ip');
var path = require('path');
const readline = require('readline');
const app = express();
var rsa = require('./utils/rsa.js');
const requestIp = require('request-ip');
const port = 8080;
var connections = {};
var key_pair = {};

app.use(bodyParser.urlencoded({ extended: false }));
app.enable('trust proxy');
app.use(requestIp.mw());

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

app.post('/connect', (req, res) => {
    const clientIp = req.clientIp;
    let { public_key } = req.body;
    if(connections[req.clientIp]){
        res.send('Client already connected');
    }else{
        connections[req.clientIp] = {
            public_key: rsa.getTokens(public_key)
        }
    }
    res.send(connections);
});
app.get('/', (req, res) => { 
    rl.question('message> ', function (message) {
        console.log(message);
        res.send(message);
        rl.close();
    });
});
app.get('*', (req, res) => {
    res.send('RSA Server');
});

app.listen(port, () => {
    console.log(`RSA Server running on ${ip.address()}:${port}\n`);
    key_pair = rsa.generateKeys();
    console.log(`Public key: ${rsa.printKey(key_pair.public)}`);
    console.log(`Private key: ${rsa.printKey(key_pair.private)}`);

    var message = 'prueba de amor';
    console.log('\nEncrypt:');
    var encryptedMessage = rsa.encrypt(message,key_pair.public);
    console.log('\nDecrypt:');
    var decryptedMessage = rsa.decrypt(encryptedMessage,key_pair.private);
    console.log(`${message} -> ${encryptedMessage} -> ${decryptedMessage}`);
});