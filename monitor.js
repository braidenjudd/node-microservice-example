var amqp = require('amqp');

var connection = amqp.createConnection({
	url: "amqp://donald:donald@192.168.1.3:5672/donald"
});

connection.on('ready', function() {
    connection.exchange('rapids2', {
    	type: 'fanout',
        autoDelete: false
    }, function(exchange) {
    	connection.queue('tmp-' + Math.random(), {exclusive: true}, function(queue) {
            queue.bind('rapids2', '');
            console.log(' [*] Waiting for logs. To exit press CTRL+C')

            queue.subscribe(function(msg){





                
                console.log(" [x] %s", msg.data.toString('utf-8'));
            });
        })
    });
});