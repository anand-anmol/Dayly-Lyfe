const User           = require('../models/user');
var   passport       = require('passport');
var sqlite3          = require('sqlite3')
const RequestService = require('../Services/RequestService');

// Displays registration form.
exports.Register = async function(req, res) {
    let reqInfo = RequestService.reqHelper(req);
    res.render('User/Register', {errorMessage:"", user:{}, reqInfo:reqInfo})
};

// Handles 'POST' with registration form submission.
exports.RegisterUser  = async function(req, res){
   
    var password        = req.body.password;
    var passwordConfirm = req.body.passwordConfirm;

    if (password == passwordConfirm) {
        let db               = new sqlite3.Database('../DailyLyfe.db')

       db.run(`INSERT INTO users(username, password) VALUES(?, ?)`, [req.body.username, req.body.password], (err) => {
        if(err) {
            return console.log(err.message); 
        }
        console.log('Row was added to the table: ${this.lastID}')

       db.close

    })}
    else {
      res.render('User/Register', { user:newUser, 
              errorMessage: "Passwords do not match.", 
              reqInfo:reqInfo})
    }
};

// Shows login form.
exports.Login = async function(req, res) {
    let reqInfo      = RequestService.reqHelper(req);
    let errorMessage = req.query.errorMessage; 

    res.render('User/Login', { user:{}, errorMessage:errorMessage, 
                               reqInfo:reqInfo});
}

// Receives login information & redirects 
// depending on pass or fail.
exports.LoginUser = (req, res, next) => {

  passport.authenticate('local', {
      successRedirect : '/User/SecureArea', 
      failureRedirect : '/User/Login?errorMessage=Invalid login.', 
  }) (req, res, next);
};

// Log user out and direct them to the login screen.
exports.Logout = (req, res) => {
    req.logout();
    let reqInfo = RequestService.reqHelper(req);

    res.render('User/Login', { user:{}, isLoggedIn:false, errorMessage : "", 
                               reqInfo:reqInfo});
};

// This displays a view called 'securearea' but only 
// if user is authenticated.
exports.SecureArea  = async function(req, res) {
    let reqInfo = RequestService.reqHelper(req);

    if(reqInfo.authenticated) {
        res.render('User/SecureArea', {errorMessage:"", reqInfo:reqInfo})
    }
    else {
        res.redirect('/User/Login?errorMessage=You ' + 
                     'must be logged in to view this page.')
    }
}

