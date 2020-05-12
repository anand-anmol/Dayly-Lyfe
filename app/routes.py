from flask import render_template, flash, redirect, url_for, request
from app import app, db
from app.forms import LoginForm, RegistrationForm, CreateNoteForm
from flask_login import current_user, login_user, logout_user, login_required
from app.models import User, Note
from werkzeug.urls import url_parse
import datetime

@app.route('/')
@app.route('/index')
def index():
    return render_template("index.html", title='Home Page')

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
    return render_template('view-notes.html', title="Your notes", notes=notes)