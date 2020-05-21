function addThingToDo() {
    let thingToDo = document.getElementById('thing-to-do').value
    if (thingToDo.trim() != "") {
        console.log(thingToDo)
        $.ajax({
            url : "/add/thing-to-do",
            type: "POST",
            contentType: 'application/json',
            dataType : 'json',
            data : JSON.stringify(thingToDo),
        });
        window.location.reload()
    }
}

function thingCompleted(id) {
    $.ajax({
        url : "/complete/thing-to-do/" + id,
        type: "PUT",
        success: function () {
            window.location.reload()
        }
    });
}

function deleteThingToDo(id) {
    $.ajax({
        url : "/delete/thing-to-do/" + id,
        type: "DELETE",
        success: function () {
            window.location.reload()
        }
    });
}