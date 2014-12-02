var amqp = require('amqp');

var connection = amqp.createConnection({
    url: "amqp://donald:donald@192.168.1.3:5672/donald"
});

connection.on('ready', function() {
    // exchange.bind('rapids', '#', function(exchange) {
    // 	console.log('bound');
    //     exchange.publish('', JSON.stringify({
    //     	hi: 'Braiden'
    //     }));
    // });
	//console.log('connection ready');
	// var exc = connection.exchange('rapids', function (exchange) {
	//   	console.log('Exchange ' + exchange.name + ' is open');
	//   	exchange.publish('', 'my message');
	// });
	//console.log('connected');

	exchange = connection.exchange('rapids', {'type':'fanout'});

	exchange.on('open', function () {
		console.log('connected2');
	});

	// var exc = connection.exchange('rapids', function (exchange) {
	//   console.log('Exchange ' + exchange.name + ' is open');
	// });

	// exc.on('open', function () {

	// 	console.log('on');
	// 	exc.publish('', 'this is my message');
	// });

});



