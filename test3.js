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

