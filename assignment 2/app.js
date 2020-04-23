const express = require('express')
const fs = require('fs')

//Starting a server
const app = express()
// This is a built-in middleware function in Express. It serves static files
app.use(express.static('public'))
//This is a built-in middleware function in Express. It parses incoming requests with JSON
app.use(express.json({ limit: '1mb' }))

//add a new note
app.post('/newNote', (request, response) => {
  //data is already parsed back to JS obj
  const data = request.body
  //Converting data to JSON string and 
  //Use fs module to write a json file with data's title as it's name
  fs.writeFileSync(`${data.title}.json`, JSON.stringify(data));
  response.json(data)
})


app.get('/oneNote', (req, res) => {
  // anything after the  ? in the URL is saved as JS object in req.query
  const noteTitle = req.query.note;
  let data = fs.readFileSync(`${noteTitle}.json`, 'utf-8')
  res.json(data) 
})


app.listen(3000, () => console.log('go to http://localhost:3000'))