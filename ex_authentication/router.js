var HomeController = require('./Controllers/HomeController');
var UserController = require('./Controllers/UserController');
var MovieController = require('./Controllers/MovieContoller');

// Routes
module.exports = function(app){  
    // Main Routes
    app.get('/',      MovieController.Index);
    app.get('/Home/Index',      MovieController.Index);

    app.get('/User/Register', UserController.Register);
    app.post('/User/RegisterUser', UserController.RegisterUser);
    app.get('/User/Login', UserController.Login);
    app.post('/User/LoginUser', UserController.LoginUser);
    app.get('/User/Logout', UserController.Logout);
    app.get('/User/SecureArea', UserController.SecureArea);

    app.get('/Movies/Index', MovieController.Index);
    app.get('/Movies/Detail', MovieController.Detail);

    app.get('/Movies/Edit', MovieController.Edit);
    app.post('/Movies/Update', MovieController.Update);
    app.post('/Movies/UpdateReview', MovieController.UpdateReview);
    app.post('/Movies/DeleteReview', MovieController.DeleteReview);


    app.get('/Movies/Reviews', MovieController.Reviews);
    app.get('/Movies/MyReviews', MovieController.MyReviews);
    app.get('/Movies/LoginNotice', MovieController.LoginNotice);
    app.get('/Movies/Delete', MovieController.Delete);
    app.get('/Movies/EditReview', MovieController.EditReview);



};
