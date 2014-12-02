var amqp = require('amqp');
var connection = amqp.createConnection({ url: 'amqp://donald:donald@192.168.1.3:5672/donald' }, {defaultExchangeName: 'rapids'});
var count = 1;

connection.on('ready', function () {
  connection.exchange('rapids', options={type:'fanout', passive: true}, function(exchange) {   

    var sendMessage = function(exchange, payload) {
      console.log('about to publish')
      var encoded_payload = JSON.stringify(payload);
      exchange.publish('', encoded_payload, {})
    }

    // Recieve messages
    connection.queue("my_queue_name", function(queue){
      console.log('Created queue')
      queue.bind(exchange, ''); 
      queue.subscribe(function (message) {
        console.log('subscribed to queue')
        var encoded_payload = unescape(message.data)
        var payload = JSON.parse(encoded_payload)
        console.log('Recieved a message:')
        console.log(payload)
      })
    })

    setInterval( function() {    
      var test_message = 'TEST '+count
      sendMessage(exchange, test_message)  
      count += 1;
    }, 2000) 
 })
})