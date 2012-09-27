var path = require('path'),
    langs = {
        creole: require('./lang/creole.js'),
        html: require('./lang/html.js'),
        markdown: require('./lang/md.js')
    },
    translationMap;


function addLineBreaks(text) {
    var br = translationMap.lineBreak;
    return text.split('\n').join(br);
}


function parseMarkdown(md) {
    if(translationMap === langs.creole) {  
        return md.replace(/#/g, '=')
            .replace(/(`)([^`]+)(`)/g, '{{{$2}}}');
    }
    else {
        return md;
    }
}

function createHeader(json, filepath) {
    
    var filename = path.basename(filepath),
        outputStr = '',
        map = translationMap.header;
    
    // Make header
    outputStr += map.replace('%s', filename);
    
    // Add a divider
    outputStr += translationMap.divider;
    
    return outputStr;
}

function createSingleQuickReference(obj) {
    
    if(!obj || !obj.ctx) {
        return '';
    }
    
    var type = obj.ctx.type,
        name = obj.ctx.name,
        args = [],
        map = translationMap.quickRef;
        
        outputStr = '';
        
        
    if(type === 'method' || type === 'function') {
        for(var i = 0; i < obj.tags.length; ++i) {
            if(obj.tags[i].type === 'param') {
                args.push(obj.tags[i].name);
            }
        }
        
        var method = name + ' ( ' + args.join(', ') + ' ) ';
        
        outputStr += map.method.replace('%s', method);
    }
    
    else if(type === 'declaration' || type === 'property'){
        outputStr += map.declaration.replace('%s', name);
    }

    
    return outputStr;
}

function createQuickReference(json) {
    var outputStr = '',
        map = translationMap.quickRef;
        
    // Header
    outputStr += map.header;
    
    
    var i = 0, il = json.length,
        refs = [];
    
    
    for(i; i < il; ++i) {
        if(json[i].ctx) {
            refs.push( createSingleQuickReference(json[i]) );
        }
    }
    
    // Sort the members into alphabetical order
    refs.sort();
    
    // Join them into a string
    outputStr += refs.join('');
    
    // Add a divider
    outputStr += translationMap.divider;
    
    // Return the creole.
    return outputStr;
    
}

function parseTag(tag, obj) {
    var outputStr = '',
        map = translationMap.tags;
    
    
    outputStr += map.general.open;
    
    if(tag.type) {
        outputStr += map.type.open + tag.type + map.type.close;
    }
    
    if(tag.types && tag.types.length) {
        tag.types.forEach(function(val) {
            outputStr += map.types.open + val + map.types.close;
        });
    }
    
    if(tag.name) {
        outputStr += map.name.open + tag.name + map.name.close;
    }
    
    if(tag.description) {
        outputStr += map.description.open + tag.description + map.description.close
    }
    
    outputStr += map.general.close;
    
    return createSingleQuickReference(obj)
    
    return outputStr;
}

function createDescription(desc) {
    var map = translationMap.fullRef.item,
        outputStr = '';
    
    // FIXME: Parse Markdown.
    outputStr += map.open + parseMarkdown(desc.summary) + map.close;
    
    if(desc.body) {
        outputStr += addLineBreaks(parseMarkdown(desc.body)) + map.close;
    }
    
    return outputStr;
}

function createTag(tags) {
    
    var map = translationMap.fullRef.item;
        outputStr = '',
        doneParamTitle = doneReturnTitle = false;
    
    
   
    
    tags.forEach(function(tag) {
        if(tag.type === 'param' || tag.type === 'return') {
            
            if(tag.type === 'param' && !doneParamTitle) {
                 outputStr += map.paramTitle.open + 'Params' + map.paramTitle.close;
                 doneParamTitle = true;
            }
            else if(tag.type === 'return' && !doneReturnTitle) {
                 outputStr += map.paramTitle.open + 'Returns' + map.paramTitle.close;
                 doneReturnTitle = true;
            }
            
            outputStr += map.open;
            
            if(tag.name) {
                outputStr += map.nameOpen + tag.name + map.nameClose;
            }
            
            // Create tag summary
            tag.types.forEach(function(type) {                
                outputStr += map.typeOpen + type + map.typeClose;
            });
            
            outputStr += map.close;
            
            // Create description
            if(tag.description) {
                outputStr += map.descOpen + tag.description + map.descClose;
            }
            
            outputStr += map.close;
        }
    });
    
    return outputStr;
}

function createFullReference(item) {
    
    var outputStr = '',
        map = translationMap.fullRef;
    
    // Create a single quick ref for this tag
    outputStr += createSingleQuickReference(item);
    
    // Print out the description
    outputStr += createDescription(item.description);
    
    // Create tag summary and description pairs
    outputStr += createTag(item.tags);
    
    return outputStr;
}

function createCodePreview(item) {
    var map = translationMap.code,
        outputStr = '';
    
    
    var code = item.code;
    
    if(typeof code === 'undefined') {
      return outputStr;
    }
    
    
    outputStr += map.title.open + 'Source' + map.title.close;
    
    
    
    
    if(translationMap === langs.markdown) {
        code = code.split('\n');
        
        code.forEach(function(val, index) {
            code[index] = '    ' + val;
        });
        
        code = code.join('\n');
    }
    
    
    outputStr += map.open + code + map.close;
    
    return outputStr;
}


function createLinkFromPath(p) {
    var base = p[0] + '/' + p[1],
        url = './' + base,
        outputStr = '',
        map = translationMap.link;
        
    outputStr += map.replace('%name', base).replace('%url', url) + translationMap.lineBreak;
    
    return outputStr;
}


exports.makeIndex = function(paths, callback) {
    var map = translationMap.header,
        outputStr = '';
    
    // Make header
    outputStr += map.replace('%s', 'Code Index');
    
    // Add a divider
    outputStr += translationMap.divider;
    
    var links = [];
    
    // Create the links
    paths.forEach(function(val) {
        links.push( createLinkFromPath(val) );
    });
    
    links.sort();
    links = links.join('');
    
    outputStr += links;
    
    callback(outputStr);
};



exports.parse = function(str, filepath, type, callback) {
    
    if(str === '') {
        return str;
    }
    
    // Make sure we're working with an object.
    var json = typeof str === 'string' ? JSON.parse(str) : str;
    
    // Default to the creole language
    translationMap = langs[type || 'creole'];
    
    
    
    
    var i = 0, il = json.length;
    
    
    var creole = '',
        currentItem,
        tags, currentTag;
    
    // Create a header for the file
    creole += createHeader(json, filepath);
    
    
    // Create a quick reference for the file.
    creole += createQuickReference(json);
    
    // Create section title
    creole += translationMap.fullRef.title.open + translationMap.fullRef.title.content + translationMap.fullRef.title.close;
    
    
    for(i; i < il; ++i) {
        
        currentItem = json[i];
        
        // Create the full reference for the property or method
        creole += createFullReference( currentItem );
        
        // Create the code preview
        creole += createCodePreview( currentItem );
        
        // Add a divider
        creole += translationMap.divider;
    }
    
    callback(creole, filepath);
};