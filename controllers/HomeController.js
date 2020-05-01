const db = require(`../models/index.js`);
const NoteRepo = require('../data/NoteRepo');
const _noteRepo = new NoteRepo();
const { Op, Sequelize } = require('sequelize');
const sqlite3       = require('sqlite3')
const RequestService = require('../Services/RequestService');

exports.Index = async function(req, res){
    // This may receive an error message during a redirect.
    let reqInfo = RequestService.reqHelper(req);
    let errorMsg = ""
    errorMsg = req.query.errorMessage?req.query.errorMessage:"";

        res.render('home/Index',
            { notes:[], reqInfo:reqInfo })
};

exports.Note = async function(req, res){
    // This may receive an error message during a redirect.
    let reqInfo = RequestService.reqHelper(req);
    let errorMsg = ""
    errorMsg = req.query.errorMessage?req.query.errorMessage:"";

    let repoResponse = await _noteRepo.all();
    if(repoResponse.errorMessage=='') {
        res.render('home/Note',
            { errorMessage:errorMsg, notes:repoResponse.notes, reqInfo:reqInfo })
    }
    else {
        res.render('home/Note',
            { errorMessage:repoResponse.errorMessage, notes:[], reqInfo:reqInfo })
    }
};

exports.Create = function(req, res) {
    let reqInfo = RequestService.reqHelper(req);

    res.render('home/Create', {reqInfo:reqInfo});
}

// Creates 'Author'. Called with POST.
exports.CreateNote = async function(req, res) {

    let reqInfo = RequestService.reqHelper(req);
 
    let DaylyLyfeDB = new sqlite3.Database('../DaylyLyfe.sqlite3', sqlite3.OPEN_READWRITE, (err) => {
        if (err) {
          console.error(err.message);
        }
        console.log('Connected to the database.');
      });

    DaylyLyfeDB.run(`
        INSERT INTO note(author, content, createdAt, updatedAt) VALUES(?, ?, ?, ?)
    `, [req.body.author, req.body.content, Date.now(), Date.now()])

    // window.location.href = "/"
    res.render('home/Index', {notes:[], reqInfo:reqInfo})

}
