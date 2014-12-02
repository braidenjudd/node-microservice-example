var easyamqp = require('easy-amqp');

// Connections using an amqp URI are supported
//easyamqp.createConnection("amqp://donald:donald@192.168.1.3:5672/donald");


// Connections using options and implOptions like the amqp driver are supported
var conn = easyamqp.createConnection('amqp://donald:donald@192.168.1.3:5672/donald');

conn.exchange('rapids').publish('', 'message');