var dox = require('dox'),
    fs = require('fs');



exports.fetch = function(url, language, callback, opts, onParseComplete) {
    
    opts = opts || {};
    
    fs.readFile( url, function(err, data) {
        if(err) {
            throw err;
        }
        
        if(language === 'html') {
            opts.raw = false;
        }
        else {
            opts.raw = true;
        }
        
        var parsed = '';
        
        try {
            parsed = dox.parseComments( data.toString(), opts );
        }catch(e) {
            throw e;
        }
        

        callback(
            parsed,
            url,
            language,
            onParseComplete
        );
    });
    
};