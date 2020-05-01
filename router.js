var HomeController = require('./controllers/HomeController');
var UserController = require('./controllers/UserController');

module.exports = function(app){
    app.get('/',            HomeController.Index);
    app.get('/note',            HomeController.Note);

    app.get('/Home/Create', HomeController.Create );
    app.post('/Home/CreateNote', HomeController.CreateNote);
    app.get('/Home/Detail', HomeController.Detail );

    // app.get('/login',            UserController.Note);
}