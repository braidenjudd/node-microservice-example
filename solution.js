var amqp = require('amqp');

var connection = amqp.createConnection({
    url: "amqp://donald:donald@192.168.1.3:5672/donald"
});

var delay = function random (low, high) {
    return Math.round(Math.random() * (high - low) + low);
};

connection.on('ready', function() {
    connection.exchange('logs', {
        type: 'fanout',
        autoDelete: false
    }, function(exchange) {
        connection.queue('tmp-' + Math.random(), {exclusive: true}, function(queue) {
            queue.bind('logs', '');

            queue.subscribe(function(msg) {
                var need = JSON.parse(msg.data);

                // if this is a request, propose a solution
                if (need.type === 'request') {
                    var solution_msg = {
                    	id: need.id,
                        message: 'This is my good number',
                        type: 'solution',
                        solution: 100
                    };

                    // Publish our solution to the bus
                    var delay_time = delay(0, 6000);
                    setTimeout(function() {
                		exchange.publish('', JSON.stringify(solution_msg));
                    	console.log(" [PROPOSED SOLUTION] ", solution_msg.solution, ' in ', delay_time);
                	}, delay_time);
                }
            });
        })
    });
});