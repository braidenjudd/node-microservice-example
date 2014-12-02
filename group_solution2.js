var amqp = require('amqp');
var _ = require('lodash');

var connection = amqp.createConnection({
    url: "amqp://donald:donald@192.168.1.3:5672/donald"
});

var solution_name = 'Ripoff Rental Offer';
var solution_type = 'RIPOFF';

var requires_solutions = function (solutions) {
	return solutions.length === 0;
};

var get_solutions = function (request) {
	return [{
		id: 1,
		name: solution_name, 
		price: 100, 
		type: solution_type 
	}];
};

connection.on('ready', function(){
	connection.exchange('rapids', options={type:'fanout', passive: true}, function(exchange) { 
		connection.queue('my-queue2', function (q) {
			q.bind('rapids', '#');

			q.subscribe(function (msg) {
				var message = JSON.parse(msg.data);

				// Check if this message has my solution
	            if (requires_solutions(message.solutions)) {
	                message.solutions = get_solutions(message.NEED);
	            	exchange.publish('', JSON.stringify(message), {})
	            	console.log('[x] Solution Published for :', message.id);
	            }
			});
		});
	});
});
