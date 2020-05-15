from flask import render_template, flash, redirect, url_for, request, send_from_directory, make_response
from app import app, db
from app.forms import LoginForm, RegistrationForm, CreateNoteForm
from flask_login import current_user, login_user, logout_user, login_required
from app.models import User, Note, ThingToDo
from werkzeug.urls import url_parse
import datetime
import os


@app.route('/')
@app.route('/index')
def index():
    things_to_do = []
    if current_user.is_authenticated:
        things_to_do = db.session.query(ThingToDo).filter_by(user_id=current_user.username).all()
    return render_template("index.html", title='DaylyLyfe', things_to_do=things_to_do)

@app.route('/login', methods=['GET', 'POST'])
def login():
    if current_user.is_authenticated:
        return redirect(url_for('index'))
    form = LoginForm()
    if form.validate_on_submit():
        print(current_user)
        user = User.query.filter_by(username=form.username.data).first()
        if user is None or not user.check_password(form.password.data):
            flash('Invalid username or password')
            return redirect(url_for('login'))
        login_user(user, remember=form.remember_me.data)
        next_page = request.args.get('next')
        if not next_page or url_parse(next_page).netloc != '':
            next_page = url_for('index')
        return redirect(next_page)
    return render_template('login.html', title='Sign In', form=form)

@app.route('/logout')
def logout():
    logout_user()
    return redirect(url_for('index'))

@app.route('/register', methods=['GET', 'POST'])
def register():
    if current_user.is_authenticated:
        return redirect(url_for('index'))
    form = RegistrationForm()
    if form.validate_on_submit():
        user = User(username=form.username.data, email=form.email.data)
        user.set_password(form.password.data)
        db.session.add(user)
        db.session.commit()
        flash('Congratulations, you are now a registered user!')
        return redirect(url_for('login'))
    return render_template('register.html', title='Register', form=form)

@app.route('/create-note/<date>/<month>/<year>', methods=['GET', 'POST'])
def create_note(date, month, year):
    if not current_user.is_authenticated:
        return redirect(url_for('login'))
    form = CreateNoteForm()
    if form.validate_on_submit():
        date = datetime.datetime(int(year), int(month) + 1, int(date))
        note = Note(user_id=current_user.username, content=form.content.data, date=date)
        db.session.add(note)
        db.session.commit()
        return redirect(url_for('index'))
    return render_template('create-note.html', title="Create Note", form=form)

@app.route('/notes', methods=['GET'])
def view_notes():
    if not current_user.is_authenticated:
        return redirect(url_for('login'))
    notes = db.session.query(Note).filter_by(user_id=current_user.username).all()
    for note in notes:
        note.date = note.date.strftime("%d %b, %Y")
    return render_template('view-notes.html', title="Your notes", notes=notes)

@app.route('/delete/<string:note_id>', methods=['GET'])
def delete_note(note_id):
    # if not current_user.is_authenticated:
    #     return redirect(url_for('login'))
    note = db.session.query(Note).filter(
        Note.id == note_id).first()
    db.session.delete(note)
    db.session.commit()
    return redirect(url_for('view_notes'))

@app.route('/add/thing-to-do', methods=['POST'])
def create_thing_to_do():
    if not current_user.is_authenticated:
        return redirect(url_for('login'))
    content = request.json
    thing_to_do = ThingToDo(user_id=current_user.username, content=content)
    db.session.add(thing_to_do)
    db.session.commit()
    response = make_response(render_template('index.html'))

    return response

@app.route('/things-to-do', methods=['GET'])
def get_things_do():
    if not current_user.is_authenticated:
        return redirect(url_for('login'))
    things_to_do = db.session.query(ThingToDo).filter_by(user_id=current_user.username).all()
    return render_template('view-things_to_do.html', title="Your things_to_do", things_to_do=things_to_do)

@app.route('/delete/thing-to-do/<int:id>', methods=['DELETE'])
def delete_thing_to_do(id):
    thing_to_do = db.session.query(ThingToDo).filter(
        ThingToDo.id == id).first()
    db.session.delete(thing_to_do)
    db.session.commit()
    response = make_response(render_template('index.html'))

    return response    

@app.route('/complete/thing-to-do/<int:id>', methods=['PUT'])
def complete_thing_to_do(id):
    db.session.query(ThingToDo).filter(ThingToDo.id == id).update({'if_done': True})
    db.session.commit()
    response = make_response(render_template('index.html'))

    return response

@app.route('/about')
def about():
    return render_template('about.html')

@app.route('/favicon.ico') 
def favicon(): 
    return send_from_directory(os.path.join(app.root_path, 'static'), 'favicon.ico', mimetype='image/vnd.microsoft.icon')