let createButton = document.querySelector('.create');
createButton.addEventListener("click", createTextBox);

let darkLight = document.getElementById("shift");
darkLight.addEventListener("click", changeTheme);

let main = document.getElementById("bigArea");

let block = document.getElementById("sideBar");


block.addEventListener("click", (event) => {
    getOneNote(event.target.innerText);
});

function createTextBox() {
    let exists = document.querySelector("textarea")
    if (exists == null) {
        let createBox = document.createElement("textarea");
        darkLight.after(createBox);
        let createSave = document.createElement("button");
        let createCancel = document.createElement("button");
        createSave.setAttribute("class", "green save");
        createSave.innerText = "Save";
        createCancel.setAttribute("class", "cancel");
        createCancel.innerText = "Cancel";
        document.querySelector("textarea").after(createSave);
        document.querySelector(".save").after(createCancel);
        let cancel = document.querySelector(".cancel");
        cancel.addEventListener("click", removeTextBox);
        let save = document.querySelector(".save");
        save.addEventListener("click", saveTitle);
        document.querySelector('.right').setAttribute("style", "display: none");
    }
    let pExists = document.querySelector("p");
    if (pExists != null) {
        pExists.remove()
    }
}

function saveTitle() {
    let node = document.createElement("h1");
    let words = document.querySelector("textarea").value.split("\n")
    let title = document.createTextNode(words[0]);
    let info = words[2]
    let findTitle = words[0]
    node.appendChild(title);
    block.appendChild(node);
    removeTextBox()
    // implement add a not function
    addANote(findTitle, info)


}

function removeTextBox() {
    let box = document.querySelector("textarea");
    let save = document.querySelector(".save");
    let cancel = document.querySelector(".cancel");
    main.removeChild(cancel);
    main.removeChild(box);
    main.removeChild(save);
    document.querySelector(".right").removeAttribute("style");
}

function changeTheme() {
    if (darkLight.innerText == "Dark") {
        darkLight.setAttribute("class", "light right");
        darkLight.innerText = "Light";
        main.setAttribute("class", "dark");
        block.setAttribute("class", "dark");
    }
    else {
        darkLight.setAttribute("class", "dark right");
        darkLight.innerText = "Dark";
        main.setAttribute("class", "light");
        block.setAttribute("class", "light");
    }
}


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
}


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
    let pExists = document.querySelector("p");
    if (pExists != null) {
        pExists.remove()
    }
    let createPara = document.createElement("p");
    darkLight.after(createPara);
    createPara.innerText = note
}



