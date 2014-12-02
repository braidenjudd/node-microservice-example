var amqp = require('amqp');
var _ = require('lodash');

var connection = amqp.createConnection({
    url: "amqp://donald:donald@192.168.1.3:5672/donald"
});

connection.on('ready', function(){
        connection.queue('logs', function (q) {
            q.bind('rapids', '#');

            q.subscribe(function (msg) {
                var message = JSON.parse(msg.data);


                console.log(message);
            });
        });
});
