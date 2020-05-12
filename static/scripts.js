let today = new Date();
let currentMonth = today.getMonth();
let currentYear = today.getFullYear();
let selectYear = document.getElementById("year");
let selectMonth = document.getElementById("month");

let months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

let monthAndYear = document.getElementById("monthAndYear");
showCalendar(currentMonth, currentYear);


function next() {
    currentYear = (currentMonth === 11) ? currentYear + 1 : currentYear;
    currentMonth = (currentMonth + 1) % 12;
    showCalendar(currentMonth, currentYear);
}

function previous() {
    currentYear = (currentMonth === 0) ? currentYear - 1 : currentYear;
    currentMonth = (currentMonth === 0) ? 11 : currentMonth - 1;
    showCalendar(currentMonth, currentYear);
}

function jump() {
    currentYear = parseInt(selectYear.value);
    currentMonth = parseInt(selectMonth.value);
    showCalendar(currentMonth, currentYear);
}

function showCalendar(month, year) {

    let firstDay = (new Date(year, month)).getDay();
    let daysInMonth = 32 - new Date(year, month, 32).getDate();

    let tbl = document.getElementById("calendar-body"); // body of the calendar

    // clearing all previous cells
    tbl.innerHTML = "";

    // filing data about month and in the page via DOM.
    monthAndYear.innerHTML = months[month] + " " + year;
    selectYear.value = year;
    selectMonth.value = month;

    // creating all cells
    let date = 1;
    for (let i = 0; i < 6; i++) {
        // creates a table row
        let row = document.createElement("tr");

        //creating individual cells, filing them up with data.
        for (let j = 0; j < 7; j++) {
            if (i === 0 && j < firstDay) {
                let cell = document.createElement("td");
                let cellText = document.createTextNode("");
                cell.appendChild(cellText);
                row.appendChild(cell);
            }
            else if (date > daysInMonth) {
                break;
            }

            else {
                let cell = document.createElement("td");
                let cellText = document.createTextNode(date);
                if (date === today.getDate() && year === today.getFullYear() && month === today.getMonth()) {
                    cell.classList.add("bg-info");
                } // color today's date
                cell.appendChild(cellText);
                row.appendChild(cell);
                date++;
            }


        }

        tbl.appendChild(row); // appending each row into calendar body.
    }

    makeDatesClickable();

}

function makeDatesClickable() {
    let calendarBody = document.getElementById('calendar-body');
    calendarBody.addEventListener('click', createNote);
}

function createNote() {

    // window.location.href = "/" + event.target.innerHTML + "/" + currentMonth + "/" + currentYear
    console.log(event.target.innerHTML, currentMonth, currentYear)
}

let ToDo = document.getElementById("ToDo");
ToDo.addEventListener('click', unhide);

function unhide() {
    let ToDoList = document.getElementById("ToDoList");
    if (ToDoList.style.visibility === "hidden") {
        ToDoList.style.visibility = "visible";
    } else {
        ToDoList.style.visibility = "hidden";
    }
}

let createToDo = document.getElementById("createToDo");
createToDo.addEventListener('click', createBox);

function createBox() {
    let zone = document.getElementById("writeZone");

    let text = document.createElement("textarea");
    text.id = "whatWeDo"
    zone.appendChild(text);
    createToDo.removeEventListener('click', createBox);

    let save = document.createElement("button");
    save.value = "Save";
    save.innerText = "Save";
    save.id = "SaveBtn";
    save.classList.add("card-header");
    zone.appendChild(save);

    let deleteBtn = document.createElement("button");
    deleteBtn.value = "Delete";
    deleteBtn.innerText = "Delete";
    deleteBtn.id = "deleteBtn";
    deleteBtn.classList.add("card-header");
    zone.appendChild(deleteBtn);

    let noToDo = document.getElementById("deleteBtn");
    noToDo.addEventListener('click', stopToDo);

    function stopToDo() {
        while (zone.firstChild) {
            zone.removeChild(zone.firstChild);
        }
        createToDo.addEventListener('click', createBox);
    }
}
