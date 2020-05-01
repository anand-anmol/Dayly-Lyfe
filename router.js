var HomeController = require('./controllers/HomeController');
var UserController = require('./controllers/UserController');

module.exports = function(app){
    app.get('/',            HomeController.Index);
    app.get('/note',            HomeController.Note);

    app.get('/home/Create', HomeController.Create );
    app.post('/home/CreateNote', HomeController.CreateNote);
    app.get('/User/Login', UserController.Login);
    app.post('/User/LoginUser', UserController.LoginUser);
    app.get('/User/Logout', UserController.Logout);
    app.get('/User/Register', UserController.Register);
    app.post('/User/RegisterUser', UserController.RegisterUser);

    // app.get('/login',            UserController.Note);
}