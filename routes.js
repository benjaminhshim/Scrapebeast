module.exports = function(app){
    
    var index = require('./routes/index.js');

    app.use('/', index);
    app.use('/headlines', index);
}