var HomeController = require('./controllers/HomeController');
var UserController = require('./controllers/UserController');

module.exports = function(app){
    app.get('/',            HomeController.Index);
    app.get('/note',            HomeController.Note);

    app.get('/home/Create', HomeController.Create );
    app.post('/home/CreateNote', HomeController.CreateNote);

    // app.get('/login',            UserController.Note);
}