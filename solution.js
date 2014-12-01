var amqp = require('amqp');

var connection = amqp.createConnection({
    url: "amqp://donald:donald@192.168.1.3:5672/donald"
});

connection.on('ready', function() {
    connection.exchange('logs', {
        type: 'fanout',
        autoDelete: false
    }, function(exchange) {
        connection.queue('tmp-' + Math.random(), {exclusive: true}, function(queue) {
            queue.bind('logs', '');
            console.log(' [*] Waiting for logs. To exit press CTRL+C')

            queue.subscribe(function(msg) {
                var need = JSON.parse(msg.data);
                console.log(" [NEED] %s", need.message);

                // if this is a request, propose a solution
                if (need.type === 'request') {
                    var solution_msg = {
                        message: 'This is the solution',
                        type: 'solution'
                    };

                    // Publish our solution to the bus
                    exchange.publish('', JSON.stringify(solution_msg));
                    console.log(" [SOLUTION] ", solution_msg.message);
                }
            });
        })
    });
});