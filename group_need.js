var amqp = require('amqp');
var connection = amqp.createConnection({ url: 'amqp://donald:donald@192.168.1.3:5672/donald' });
var uuid = require('uuid');

connection.on('ready', function () {
	connection.exchange('rapids', options={type:'fanout', passive: true}, function(exchange) { 
	    setInterval( function() {    
	      	var test_message = { 
		      	need: 'car_rental_offer',
		  		solutions: [],
		  		json_class: 'com.microservices.rentaloffer.NeedPacket',
		  		id: uuid.v4(),
		  		timeout: 10000
	  		};

	  		console.log('[o] Requesting need for: ', test_message.id);
	      	exchange.publish('', JSON.stringify(test_message), {});
	    }, 15000) 
 	})
})