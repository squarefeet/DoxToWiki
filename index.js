var dox = require('./lib/getDox.js');
var parser = require('./lib/parser.js');
var path = require('path');
var fs = require('fs');
var proc = require('child_process'),
    exec = proc.exec;

var async = require('async');

var args = process.argv.splice(2);
var filepath, language, isFile, parserOptions;


// Resolve the filepath, language and parserOptions
filepath = path.resolve( args[0] || 'test/test.js' );
language = args[1] || 'html';
parserOptions = args[2] || {};


var outputPath = path.resolve( filepath, 'codeWiki' );

// Determine whether we're working with a single file or a folder
isFile = !!(path.extname(filepath));





function doFolder(dir, callback) {
    
    // make sure we're working with an absolute path
    dir = path.resolve( dir );
    
    var contents, stats, currentPath, series = [],
        
        onParseComplete = function( data, url ) {
            
            var basename = path.dirname( url ),
                filename = path.basename( url ),
                extension = path.extname( url );
            
            callback({
                data: data,
                path: url,
                basename: basename,
                filename: filename,
                extension: extension
            });
        },
        
        doParse = function( path, next ) {
            try {
                dox.fetch(path, language, parser.parse, parserOptions, function() {
                    onParseComplete.apply({}, arguments);
                }, filepath);
            }catch(e) {
                console.log('ERROR: ', e);
            }
        },
        
        onGetStats = function( err, stats, p, next ) {
            if(stats.isDirectory()) {
                doFolder( p, callback );
            }
            else if(path.extname(p) === '.js') {
                doParse( p );
            }
        },
        
        onReadDir = function( err, members ) {
            members.forEach( function( val, index ) {
                
                if(~val.indexOf('.git')) {
                    
                }
                else {
                    currentPath = path.resolve(dir, val);                                               
                
                    if(currentPath.indexOf('wiki') === -1) {                
                        stats = fs.stat( 
                            currentPath,
                            (function(p) {
                                return function(err, stats) {
                                    onGetStats(err, stats, p);
                                };
                            }(currentPath))
                        );
                    }
                }
            });
        };


    // get current directory's contents and kick off the callback cycle!
    contents = fs.readdir( dir, onReadDir);
}


function getFileExtension() {
    switch(language) {
        case 'html':
            return '.html';
            break;
        case 'creole':
            return '.wiki';
            break;
        case 'markdown':
            return '.md';
            break;
    }
}



if(isFile) {
    console.log('Single files not currently supported. \
        In the meantime, please provide a path to a folder instead.');
}
else {
    
    var paths = [],
        numPaths = 0,
        timer;
    
    doFolder(filepath, function(obj) {
        
        var base = obj.basename.replace(filepath, '');
        
        if(base.indexOf('/') === 0) {
            base = base.substr(1);
        }
        
        var filename = obj.filename.replace( obj.extension, getFileExtension());
        
        var targetDir = path.resolve(outputPath, base);
        
        var targetFilename = path.resolve(targetDir, filename);
        
        exec('mkdir -p ' + targetDir, function(err) {
            
            if(err) {
                throw new Error(err);
            }
            
            fs.writeFile(targetFilename, obj.data, 'utf-8', function() {
                clearTimeout(timer);
                
                console.log('Written: ', targetFilename);
                
                paths.push([base, filename]);
                
                timer = setTimeout(function() {
                    if(paths.length > numPaths) {
                        parser.makeIndex(paths, function(data) {
                            
                            fs.writeFile(path.resolve(outputPath, 'index' + getFileExtension()), data, 'utf-8', function() {
                                console.log('Created index' + getFileExtension());
                            });
                        });
                    }
                }, 500);
            })
        });
    });
    
    
}




