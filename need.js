var amqp = require('amqp');
var amqp_hacks = require('./amqp-hacks');
var uuid = require('uuid');

var connection = amqp.createConnection({
	url: "amqp://donald:donald@192.168.1.3:5672/donald"
});

var message = process.argv.slice(2).join(' ') || 'I need a number';

connection.on('ready', function(){
    connection.exchange('logs', { type: 'fanout', autoDelete: false }, function(exchange) {
    	var msg = {
    		id: uuid.v1(),
    		message: message,
    		type: 'request'
    	};
        exchange.publish('', JSON.stringify(msg));
        console.log(" [x] Sent %s", JSON.stringify(msg));
        amqp_hacks.safeEndConnection(connection);
    });
});