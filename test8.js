(function(ext) {
    // http://scratchx.org/?url=https://s3-eu-west-1.amazonaws.com/wp-kg-2015-public/js/scratch/test1.js
    // https://github.com/LLK/scratchx/wiki - very important tutorial!
    // Cleanup function when the extension is unloaded
    ext._shutdown = function() {};

    // Status reporting code
    // Use this to report missing hardware, plugin or unsupported browser
    ext._getStatus = function() {
        return {status: 2, msg: 'Ready'};
    };


    // Functions for block with type 'w' will get a callback function as the 
    // final argument. This should be called to indicate that the block can
    // stop waiting.
    ext.wait_random = function(callback) {
        wait = Math.random();
        console.log('Waiting for ' + wait + ' seconds');
        window.setTimeout(function() {
            callback();
        }, wait*1000);
    };


    ext.my_first_block = function() {
        // Code that gets executed when the block is run
        console.log("HELLO WORLD KEV - open the pod bay doors please");
    };

    ext.power = function(base, exponent) {
        return Math.pow(base, exponent);
    };

    ext.make_payment = function() {
        // Make an AJAX call to the Open Weather Maps API
        $.ajax({
              type: "POST",
              url: 'https://api.worldpay.com/v1/orders',
              beforeSend : function(xhr) {
                    xhr.setRequestHeader( "Authorization", "T_S_3bdadc9c-54e0-4587-8d91-29813060fecd" );
                    
                },
              data: { 
    "paymentMethod":{
    "type":"Card",
    "name":"cardholder-name",
    "expiryMonth":"2",
    "expiryYear":"2020",
    "cardNumber":"4444333322221111",
    "cvc":"123",
    "issueNumber":"1"
  }, 
    "orderType": "ECOM", 
    "orderDescription": "Kev paying to open the pod bay doors", 
    "amount": 1942, 
        "currencyCode": "GBP" },
              dataType: 'jsonp',
              success: function(responseData) {
                  // Got the data - parse it and return the temperature
                  console.log("PAYMENT should have HAPPENED! " + responseData);
              }
        });

    };


    ext.get_temp = function(location, callback) {
        // Make an AJAX call to the Open Weather Maps API
        $.ajax({
              url: 'http://api.openweathermap.org/data/2.5/weather?q='+location+'&units=imperial',
              dataType: 'jsonp',
              success: function( weather_data ) {
                  // Got the data - parse it and return the temperature
                  temperature = weather_data['main']['temp'];
                  callback(temperature);
              }
        });
    };

    // Block and block menu descriptions
    var descriptor = {
        blocks: [
            // Block type, block name, function name
            [' ', 'make my first payment', 'make_payment'],
            [' ', 'my first block', 'my_first_block'],
            ['w', 'wait for random time', 'wait_random'],
            [' ', '%n ^ %n', 'power', 2, 3],
            [' ', 'current temperature in city %s', 'get_temp', 'Boston, MA']
            /*['r', '%n ^ %n', 'power', 2, 3],
            ['R', 'current temperature in city %s', 'get_temp', 'Boston, MA']*/
        ]
    };

    // Register the extension
    ScratchExtensions.register('My first extension', descriptor, ext);
})({});

