var HomeController = require('./controllers/HomeController');

module.exports = function(app){
    app.get('/',            HomeController.Index);
}