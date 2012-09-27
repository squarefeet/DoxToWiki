module.exports = {

    header: '# %s #\n',
    
    divider: '\n\n----\n\n',
    
    link: '[%name](%url)',
    
    lineBreak: '\n\n',
    
    quickRef: {
        header: '# Quick Reference #\n',
        method: '**`%s`**\n\n',
        declaration: '`%s`\n\n'
    },
    
    
    fullRef: {
        title: {
            open: '# ',
            content: 'Full Reference',
            close: ' #\n'
        },
        item: {
            open: '',
            typeOpen: '{',
            typeClose: '} ',
            nameOpen: '**`',
            nameClose: '`** ',
            descOpen: '\n*    ',
            descClose: '\n',
            close: '\n',
            paramTitle: {
                open: '### ',
                close: ' ###\n'
            }
        }        
    },
    
    
    tags: {
        
        type: {
            open: '* ',
            close: ''
        },
        types: {
            open: ' ` ',
            close: ' ` '
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
            open: '### ',
            close: ' ###\n'
        },
        open: '\n\n',
        close: '\n\n'
    }
    
};