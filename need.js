var amqp = require('amqp');
var amqp_hacks = require('./amqp-hacks');

var connection = amqp.createConnection({
	url: "amqp://donald:donald@192.168.1.3:5672/donald"
});

var message = process.argv.slice(2).join(' ') || 'Hello World!';

connection.on('ready', function(){
    connection.exchange('logs', { type: 'fanout', autoDelete: false }, function(exchange) {
    	var msg = {
    		message: message,
    		type: 'request'
    	};
        exchange.publish('', JSON.stringify(msg));
        console.log(" [x] Sent %s", JSON.stringify(msg));
        amqp_hacks.safeEndConnection(connection);
    });
});