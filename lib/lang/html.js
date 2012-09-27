module.exports = {

    header: '<h1>%s</h1>',
    
    divider: '<br /><hr><br />',
    
    link: '<a href="%url">%name</a>',
    
    lineBreak: '<br />',
    
    quickRef: {
        header: '<h1>Quick Reference</h1>',
        method: '<pre><code>%s</code></pre>',
        declaration: '<pre><code>%s</code></pre>'
    },
    
    
    fullRef: {
        title: {
            open: '<h1>',
            content: 'Full Reference',
            close: '</h1>'
        },
        item: {
            open: '',
            typeOpen: '{',
            typeClose: '} ',
            nameOpen: '<pre><code>',
            nameClose: '</code></pre>',
            descOpen: '<ul><li>',
            descClose: '</li></ul>',
            close: '<br />',
            paramTitle: {
                open: '<h3>',
                close: '</h3>'
            }
        }        
    },
    
    
    tags: {
        
        type: {
            open: '<ul><li>',
            close: '</li></ul>'
        },
        types: {
            open: ' <pre> ',
            close: ' </pre> '
        },
        name: {
            open: '',
            close: ''
        },
        description: {
            open: '',
            close: ''
        },
        general: {
            open: '',
            close: '<br />'
        }
    },
    
    
    code: {
        title: {
            open: '<h3>',
            close: '</h3>\n'
        },
        open: '<pre><code>',
        close: '</code></pre>'
    }
    
};