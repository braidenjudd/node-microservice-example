var amqp = require('amqp');
var _ = require('lodash');

var connection = amqp.createConnection({
    url: "amqp://donald:donald@192.168.1.3:5672/donald"
});

var database = {

};

var bestSolution = function (id) {
	return 'The Best Solution for [' + id + '] is ' + _.max(database[id].solutions);
};

connection.on('ready', function() {
    connection.exchange('logs', {
        type: 'fanout',
        autoDelete: false
    }, function(exchange) {
        connection.queue('tmp-' + Math.random(), {exclusive: true}, function(queue) {
            queue.bind('logs', '');

            queue.subscribe(function(msg) {
                var message = JSON.parse(msg.data);

                // if this is a request, propose a solution
                if (message.type === 'solution') {
                	if (message.id in database) {
                		database[message.id].solutions.push(message.solution);
                		console.log('Found the another solution');
                	} else {
                		database[message.id] = {
                			id: message.id,
                			solutions: [
                				message.solution
                			]
                		};
                		console.log('Found the first solution');

                		setTimeout(function() {
                			console.log(bestSolution(message.id));
                		}, message.timeout || 3000);
                	}
                }
            });
        })
    });
});
