var REPLACEMENTS = {
    es: {
        'terrorista': 'cobarde',
        'Terrorista': 'Cobarde',
        'terrorismo': 'cobardía',
        'Terrorismo': 'Cobardía'
    },

    pt: {
        'terrorista': 'covarde',
        'Terrorista': 'Covarde',
        'terrorismo': 'covardia',
        'Terrorismo': 'Covardia'

    },

    'default': {
        'terrorist': 'coward',
        'Terrorist': 'Coward',
        'terrorism': 'cowardice',
        'Terrorism': 'Cowardice',
        // CN Translation
        '恐怖': '懦弱'
    }
};

var replaceTerror = function(textNode) {
    var text = textNode.data,
        locale = getLocale(),
        dict = REPLACEMENTS[locale] || REPLACEMENTS.default;

    for (var before in dict) {
        if (dict.hasOwnProperty(before)) {
            text = text.replace(new RegExp(before, "g"), dict[before]);
        }
    }
    textNode.data = text;
},

getLocale = function () {
    var locale = document.querySelector('html').getAttribute('lang');

    if (!locale) {

        locale = document.querySelector('meta[http-equiv="Content-Language"') ? 
                document.querySelector('meta[http-equiv="Content-Language"').getAttribute('content') :
                'en';
    }

    return locale.substring(0, 2);
};

// Only alter text nodes
var observer = new MutationObserver(function(mutations) {
    mutations.forEach(function(mutation) {
        if (mutation.addedNodes) {
            [].slice.call(mutation.addedNodes).forEach(function(node) {
                if (node.nodeName.toLowerCase() == "#text") {
                    replaceTerror(node);
                }
            });
        }
    });
});

observer.observe(document, {
    childList: true,
    subtree:   true
});
