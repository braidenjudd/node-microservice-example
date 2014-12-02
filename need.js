var amqp = require('amqp');
var amqp_hacks = require('./amqp-hacks');
var uuid = require('uuid');

var connection = amqp.createConnection({
	url: "amqp://donald:donald@192.168.1.3:5672/donald"
});

var message = process.argv.slice(2).join(' ') || 'I need a number';

connection.on('ready', function(){
	connection.queue('my-queue', function (q) {
	// Catch all messages
		q.bind('rapids', '#');
		console.log('hi');

	// Receive messages
		q.subscribe(function (message) {
	// Print messages to stdout
			console.log(message.data.toString('utf-8'));
		});
	});



	//queue.bind('rapids', '#', function () {
		//console.log("I bound");
	//});


    // connection.exchange('rapid', { type: 'fanout', autoDelete: false }, function(exchange) {
    // 	var msg = {
    // 		id: uuid.v1(),
    // 		message: message,
    // 		type: 'request',
    // 		timeout: 3000
    // 	};
    //     exchange.publish('', JSON.stringify(msg));
    //     console.log(" [x] Sent %s", JSON.stringify(msg));
    //     amqp_hacks.safeEndConnection(connection);
    // });
});