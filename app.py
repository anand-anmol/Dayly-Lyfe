from flask import Flask, render_template, request
from note_manager import NoteManager
from note import Note
import json
import requests


app = Flask(__name__)

note_mgr = NoteManager('DaylyLyfe.db')

@app.route("/")
def main():
    return render_template('index.html')

@app.route("/calander/note")
def create_note():
    return render_template('create_note.html')

@app.route("/calander/view")
def view_notes():
    response = requests.get("http://localhost:5000/note/all")
    return render_template('view_notes.html', notes=response.json())

@app.route("/note", methods=['POST'])
def add_note():
    """ Add a note to the database """

    try:
        new_note = Note(author=request.form['author'],
                    content=request.form['content'])
        note_mgr.add_note(new_note)

        response = app.response_class(
                status=200
        )
    except ValueError as e:
        response = app.response_class(
                response=str(e),
                status=400
        )
    return response


@app.route('/note/<string:note_id>', methods=['DELETE'])
def delete_note(note_id):
    """ Delete a note from the database """
    try:
        note_mgr.delete_note(note_id)

        response = app.response_class(
                status=200
        )
    except ValueError as e:
        response = app.response_class(
                response=str(e),
                status=404
        )
    return response


@app.route('/note/all', methods=['GET'])
def get_all_notes():
    """ Returns all notes"""
    notes = note_mgr.get_all_notes()

    response = app.response_class(
            status=200,
            response=json.dumps([n.to_dict() for n in notes]),
            mimetype='application/json'
    )

    return response

if __name__ == "__main__":
    app.run(debug=True)