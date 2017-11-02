var hljs = require('./highlight');

hljs.registerLanguage('xml', require('./languages/xml'));
hljs.registerLanguage('css', require('./languages/css'));
hljs.registerLanguage('java', require('./languages/java'));
hljs.registerLanguage('javascript', require('./languages/javascript'));
hljs.registerLanguage('json', require('./languages/json'));
hljs.registerLanguage('python', require('./languages/python'));
hljs.registerLanguage('scss', require('./languages/scss'));


module.exports = hljs;