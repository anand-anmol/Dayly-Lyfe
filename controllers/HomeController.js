const db = require(`../models/index.js`);
const NoteRepo = require('../data/NoteRepo');
const _noteRepo = new NoteRepo();
const { Op, Sequelize } = require('sequelize');

exports.Index = async function(req, res){
    // This may receive an error message during a redirect.
    let errorMsg = ""
    errorMsg = req.query.errorMessage?req.query.errorMessage:"";

    let repoResponse = await _noteRepo.all();
    if(repoResponse.errorMessage=='') {
        res.render('home/Index',
            { errorMessage:errorMsg, notes:repoResponse.notes })
    }
    else {
        res.render('home/Index',
            { errorMessage:repoResponse.errorMessage, notes:[] })
    }
};
