const MovieRepo   = require('../Data/MovieRepo');
const _movieRepo  = new MovieRepo();
const RequestService = require('../Services/RequestService');
const Movie       = require('../Models/Movies');
var passport = require("passport")


// This is the default page for domain.com/movie/index.
// It shows a listing of movies if any exist.
exports.Index = async function(request, response){
    let movies = await _movieRepo.allMovies();
    if(movies!= null) {
        let reqInfo = RequestService.reqHelper(request);
        response.render('Movies/Index', { movies:movies, reqInfo:reqInfo})
    }
    else {
        response.render('Movies/Index', { movies:[] })
    }
};

exports.LoginNotice = async function(request, response){
    let reqInfo = RequestService.reqHelper(request);
    response.render('Movies/LoginNotice', {reqInfo:reqInfo})
};

exports.Detail = async function(request, response) {
    // request.query used to get url parameter.
    let movieID  = request.query._id;
    let reqInfo = RequestService.reqHelper(request);


    let movieObj = await _movieRepo.getMovie(movieID);
    response.render('Movies/Detail', { movies:movieObj, reqInfo:reqInfo});
};


// Displays 'edit' form and is accessed with get request.
exports.Edit = async function(request, response) {
    let movieID  = request.query._id;
    let reqInfo = RequestService.reqHelper(request);

    let movieObj = await _movieRepo.getMovie(movieID);
    response.render('Movies/Edit', {movies:movieObj, errorMessage:"", reqInfo:reqInfo});
};

// Receives posted data that is used to update the item.
exports.Update = async function(request, response) {
    let movieID = request.body._id;
    console.log("The posted product id is: " + movieID);
    let reqInfo = RequestService.reqHelper(request);
    let username = reqInfo.username;
    let rating = request.body.rating;
    let review = request.body.review;
    let month_names = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
    let d = new Date()
    let date = d.getDate() + "-" + month_names[d.getMonth()] + "-" + String(d.getFullYear()).slice(2,4)

    // Parcel up data in a 'Product' object.
    let tempMovieObj  = new Movie( {
        _id: movieID,
        movieName: request.body.movieName,
        movieArray: {"user": username, "date": date, "rating": rating, "review": review}
    });

    // Call update() function in repository with the object.
    let responseObject = await _movieRepo.update(tempMovieObj);

    // Update was successful. Show detail page with updated object.
    if(responseObject.errorMessage === "") {
        response.render('Movies/Detail', { movies:responseObject.obj,
            errorMessage:"", reqInfo:reqInfo});
    }

    // Update not successful. Show edit form again.
    else {
        console.log(JSON.stringify(responseObject.errorMessage));
        response.render('Movies/Edit', {
            movies:      responseObject.obj,
            errorMessage: responseObject.errorMessage, reqInfo:reqInfo });
    }
};

// Receives posted data that is used to update the item.
exports.UpdateReview = async function(request, response) {
    let movieID = request.body._id;
    console.log("The posted product id is: " + movieID);
    let reqInfo = RequestService.reqHelper(request);
    let username = reqInfo.username;
    let rating = request.body.rating;
    let review = request.body.review;
    let month_names = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
    let d = new Date()
    let date = d.getDate() + "-" + month_names[d.getMonth()] + "-" + String(d.getFullYear()).slice(2,4)

    // Parcel up data in a 'Product' object.
    let tempMovieObj  = new Movie( {
        _id: movieID,
        movieName: request.body.movieName,
        movieArray: {"user": username, "date": date, "rating": rating, "review": review}
    });

    // Call update() function in repository with the object.
    let responseObject = await _movieRepo.updateReview(tempMovieObj);

    // Update was successful. Show detail page with updated object.
    if(responseObject.errorMessage === "") {
        response.render('Movies/Detail', { movies:responseObject.obj,
            errorMessage:"", reqInfo:reqInfo});
    }

    // Update not successful. Show edit form again.
    else {
        console.log(JSON.stringify(responseObject.errorMessage));
        response.render('Movies/EditReview', {
            movies:      responseObject.obj,
            errorMessage: responseObject.errorMessage, reqInfo:reqInfo });
    }
};

// Receives posted data that is used to update the item.
exports.DeleteReview = async function(request, response) {
    let movieID = request.body._id;
    console.log("The posted product id is: " + movieID);
    let reqInfo = RequestService.reqHelper(request);
    let username = reqInfo.username;
    let rating = request.body.rating;
    let review = request.body.review;
    let month_names = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
    let d = new Date()
    let date = d.getDate() + "-" + month_names[d.getMonth()] + "-" + String(d.getFullYear()).slice(2,4)

    // Parcel up data in a 'Product' object.
    let tempMovieObj  = new Movie( {
        _id: movieID,
        movieName: request.body.movieName,
        movieArray: {"user": username, "date": date, "rating": rating, "review": review}
    });

    // Call update() function in repository with the object.
    let responseObject = await _movieRepo.deleteReview(tempMovieObj);

    // Update was successful. Show detail page with updated object.
    if(responseObject.errorMessage === "") {
        response.render('Movies/MyReviews', { movies:responseObject.obj,
            errorMessage:"", reqInfo:reqInfo});
    }

    // Update not successful. Show edit form again.
    else {
        console.log(JSON.stringify(responseObject.errorMessage));
        response.render('Movies/Delete', {
            movies:      responseObject.obj,
            errorMessage: responseObject.errorMessage, reqInfo:reqInfo });
    }
};

exports.Reviews = async function(request, response) {
    let movies = await _movieRepo.allMovies();
    let movieID  = request.query._id;
    let reviewed = true;
    if(movies!= null) {
        let reqInfo = RequestService.reqHelper(request);
        for(let i=0; i < movies[movieID - 1].movieArray.length; i++) {
            if(reqInfo.username == movies[movieID - 1].movieArray[i].user) {
                reviewed = false
            }
        };
        response.render('Movies/Reviews', { movies:movies, reqInfo:reqInfo, movieID:movieID, reviewed:reviewed})
    }
    else {
        response.render('Movies/Reviews', { movies:[] })
    }
};

exports.MyReviews = async function(request, response) {
    let movies = await _movieRepo.allMovies();
    let movieID  = request.query._id;
    if(movies!= null) {
        let reqInfo = RequestService.reqHelper(request);
        response.render('Movies/MyReviews', { movies:movies, reqInfo:reqInfo, movieID:movieID})
    }
    else {
        response.render('Movies/MyReviews', { movies:[] })
    }
};

exports.Delete = async function(request, response) {
    let movieID  = request.query._id;
    let movieIndex = 0;
    let movieObj = await _movieRepo.getMovie(movieID);
    let reqInfo = RequestService.reqHelper(request);

    for(let i=0; i < movieObj.movieArray.length; i++){
        if(reqInfo.username == movieObj.movieArray[i].user) {
            movieIndex = i;
        }}

    // Some debug data to ensure the item is deleted.
    response.render('Movies/Delete', {movies:movieObj, reqInfo:reqInfo, movieIndex:movieIndex, movieID:movieID});
}

exports.EditReview = async function(request, response) {
    let movieID  = request.query._id;
    let movieIndex = 0;
    let movieObj = await _movieRepo.getMovie(movieID);
    let reqInfo = RequestService.reqHelper(request);

    for(let i=0; i < movieObj.movieArray.length; i++){
        if(reqInfo.username == movieObj.movieArray[i].user) {
            movieIndex = i;
        }}
    response.render('Movies/EditReview', {movies:movieObj, errorMessage:"", reqInfo:reqInfo, movieIndex:movieIndex, movieID:movieID});
}
