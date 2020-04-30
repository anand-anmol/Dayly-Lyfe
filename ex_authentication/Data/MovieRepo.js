const Movies = require('../Models/Movies');

class MovieRepo {
    
    // This is the constructor.
    MovieRepo() {        
    }

    // Gets all movies.
    async allMovies() {     
        let movies = await Movies.find().exec();
        return   movies;
    }

    async getMovie(id) {  
        let movie = await Movies.findOne({_id:id}).exec();
        return   movie;
    }

    async update(editedObj) {

        // Set up response object which contains origianl product object and empty error message.
        let response = {
            obj:          editedObj,
            errorMessage: "" };

        try {
            // Ensure the content submitted by the user validates.
            var error = await editedObj.validateSync();
            if(error) {
                response.errorMessage = error.message;
                return response;
            }

            // Load the actual corresponding object in the database.
            let movieObject = await this.getMovie(editedObj.id);

            // Check if product exists.
            if(movieObject) {

                // Product exists so update it.
                let updated = await Movies.updateOne(
                    { _id: editedObj.id}, // Match id.

                    // Set new attribute values here.
                    {$push: { movieArray: editedObj.movieArray }});

                // No errors during update.
                if(updated.nModified!=0) {
                    response.obj = editedObj;
                    return response;
                }
                // Errors occurred during the update.
                else {
                    response.errorMessage =
                        "An error occurred during the update. The item did not save."
                };
                return response;
            }

            // Product not found.
            else {
                response.errorMessage = "An item with this id cannot be found." };
            return response;
        }

            // An error occurred during the update.
        catch (err) {
            response.errorMessage = err.message;
            return  response;
        }
    }


    async updateReview(editedObj) {

        // Set up response object which contains origianl product object and empty error message.
        let response = {
            obj:          editedObj,
            errorMessage: "" };

        try {
            // Ensure the content submitted by the user validates.
            var error = await editedObj.validateSync();
            if(error) {
                response.errorMessage = error.message;
                return response;
            }

            // Load the actual corresponding object in the database.
            let movieObject = await this.getMovie(editedObj.id);

            // Check if product exists.
            if(movieObject) {

                // Product exists so update it.
                let updated = await Movies.updateOne(
                    { _id: editedObj.id}, // Match id.

                    // Set new attribute values here.
                    {$set: { movieArray: editedObj.movieArray }});

                // No errors during update.
                if(updated.nModified!=0) {
                    response.obj = editedObj;
                    return response;
                }
                // Errors occurred during the update.
                else {
                    response.errorMessage =
                        "An error occurred during the update. The item did not save."
                };
                return response;
            }

            // Product not found.
            else {
                response.errorMessage = "An item with this id cannot be found." };
            return response;
        }

            // An error occurred during the update.
        catch (err) {
            response.errorMessage = err.message;
            return  response;
        }
    }

    async deleteReview(editedObj) {

        // Set up response object which contains origianl product object and empty error message.
        let response = {
            obj:          editedObj,
            errorMessage: "" };

        try {
            // Ensure the content submitted by the user validates.
            var error = await editedObj.validateSync();
            if(error) {
                response.errorMessage = error.message;
                return response;
            }

            // Load the actual corresponding object in the database.
            let movieObject = await this.getMovie(editedObj.id);

            // Check if product exists.
            if(movieObject) {

                // Product exists so update it.
                let updated = await Movies.updateOne(
                    { _id: editedObj.id}, // Match id.

                    // Set new attribute values here.
                    {$unset: { movieArray: editedObj.movieArray }});

                // No errors during update.
                if(updated.nModified!=0) {
                    response.obj = editedObj;
                    return response;
                }
                // Errors occurred during the update.
                else {
                    response.errorMessage =
                        "An error occurred during the update. The item did not save."
                };
                return response;
            }

            // Product not found.
            else {
                response.errorMessage = "An item with this id cannot be found." };
            return response;
        }

            // An error occurred during the update.
        catch (err) {
            response.errorMessage = err.message;
            return  response;
        }
    }





}

module.exports = MovieRepo;
