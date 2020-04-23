//addANote must be called after save button is clicked
//uncomment to test addANote function
const title = "note2"
const note = "this is a sample note"
addANote(title, note) 

//function to add a note with fetch
async function addANote(noteTitle, noteBody) {
  const data = { title: noteTitle, note: noteBody };
  const options = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  };
  const response = await fetch('/newNote', options);
  // making sure the json data was transferred
  const json = await response.json();
  console.log(json);
}

//getOneNote must be called after any of the item's on the sidebar is clicked
//uncomment to test get a note (AddANote should be called first)
// let data = getOneNote(title);


// function to get one note using a query string
async function getOneNote(noteTitle) {
  const response = await fetch(`/oneNote/?note=${noteTitle}`)
  const json = await response.json()
  const data = JSON.parse(json)
//call the  function to display the retrieved note
displayNote(data.note);
}

//write a function to display the retrieved note
function displayNote(note) {

}
