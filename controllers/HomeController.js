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

exports.Note = async function(req, res){
    // This may receive an error message during a redirect.
    let errorMsg = ""
    errorMsg = req.query.errorMessage?req.query.errorMessage:"";

    let repoResponse = await _noteRepo.all();
    if(repoResponse.errorMessage=='') {
        res.render('home/Note',
            { errorMessage:errorMsg, notes:repoResponse.notes })
    }
    else {
        res.render('home/Note',
            { errorMessage:repoResponse.errorMessage, notes:[] })
    }
};

exports.Create = function(req, res) {
    res.render('home/Create');
}

// Creates 'Author'. Called with POST.
exports.CreateNote = async function(req, res) {
    let noteObj = {
        author: req.body.author,
        content: req.body.content
    }

    let repoResponse = await _noteRepo.create(noteObj);
    if(repoResponse.errorMessage == '') {
        res.render('home/Index',
            { errorMessage:"", note:repoResponse.note })
    }
    else {
        res.render('home/Index',
            { errorMessage:repoResponse.errorMessage, note:{} })
    }
}
