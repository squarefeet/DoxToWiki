module.exports = {

    header: '= %s =\n',
    
    divider: '\n\n\\\\\n----\n\\\\\n\n',
    
    link: '[[%url|%name]]',
    
    lineBreak: '\\\\\n',
    
    quickRef: {
        title: {
            open: '= ',
            content: 'Quick Reference',
            close: ' =\n'
        },
        method: {
            open: '**{{{',
            close: '}}}**\\\\\n'
        },
        
        declaration: {
            open: '{{{',
            close: '}}}\\\\\n'
        }
    },
    
    quickRef: {
        header: '= Quick Reference =\n',
        method: '**{{{%s}}}**\n\n',
        declaration: '{{{%s}}}\n\n'
    },
    
    
    fullRef: {
        title: {
            open: '= ',
            content: 'Full Reference',
            close: ' =\n'
        },
        item: {
            open: '',
            typeOpen: '{',
            typeClose: '} ',
            nameOpen: '**{{{',
            nameClose: '}}}** ',
            descOpen: '* ',
            descClose: '\n',
            close: '\n',
            paramTitle: {
                open: '=== ',
                close: ' ===\n'
            }
        }        
    },
    
    
    tags: {
        
        type: {
            open: '* ',
            close: ''
        },
        types: {
            open: ' {{{ ',
            close: ' }}} '
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
            close: '\n'
        }
    },
    
    
    code: {
        title: {
            open: '=== ',
            close: ' ===\n'
        },
        open: '\n{{{\n#!javascript\n\n',
        close: '\n}}}\n'
    }
    
};