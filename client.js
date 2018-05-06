var P2P = require('socket.io-p2p');
var io = require('socket.io-client');
var socket = io();
var p2p = new P2P(socket);
p2p.on('peer-msg', function (data) {
  console.log('From a peer %s', data);
});