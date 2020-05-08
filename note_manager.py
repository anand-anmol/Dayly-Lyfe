from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker
from base import Base

from note import Note


class NoteManager:

    def __init__(self, calander_db):
        """ Creates a Song object and map to the Database """

        if calander_db is None or calander_db == "":
            raise ValueError(f"Calander database [{calander_db}] not found")

        engine = create_engine('sqlite:///' + calander_db)
        Base.metadata.bind = engine
        self._db_session = sessionmaker(bind=engine)

    def add_note(self, new_note: Note):
        """ Adds a new note to the calanader database """

        if new_note is None or not isinstance(new_note, Note):
            raise ValueError("Invalid Note Object")

        session = self._db_session()
        session.add(new_note)

        session.commit()

        note_id = new_note.id
        session.close()

        return note_id

    def delete_note(self, note_id):
        """ Delete a song from the database """

        if note_id is None or type(note_id) != str:
            raise ValueError("Invalid Note ID")

        session = self._db_session()

        note = session.query(Note).filter(
                Note.id == note_id).first()
        if note is None:
            session.close()
            raise ValueError("Note does not exist")

        session.delete(note)
        session.commit()

        session.close()

    def get_all_notes(self):
        """ Return a list of all notes in the database """
        session = self._db_session()

        all_notes = session.query(Note).all()

        session.close()

        return all_notes

    # def update_song(self, song):
    #     """ Update existing song to match song_upd """
    #     if song is None or not isinstance(song, Song):
    #         raise ValueError("Invalid Song Object")
    #
    #     session = self._db_session()
    #
    #     existing_song = session.query(Song).filter(
    #             Song.file_location == song.file_location).first()
    #     if existing_song is None:
    #         raise ValueError(f"Song {song.title} does not exist")
    #
    #     existing_song.album = song.album
    #     existing_song.genre = song.genre
    #     existing_song.rating = song.rating
    #     existing_song.last_played = song.last_played
    #     existing_song.play_count = song.play_count
    #
    #     session.commit()
    #     session.close()
    #
    # def get_song(self, file_location):
    #     """ Return song object matching file location"""
    #     if file_location is None or type(file_location) != str:
    #         raise ValueError("Invalid file_location")
    #
    #     session = self._db_session()
    #
    #     song = session.query(Song).filter(
    #             Song.file_location == file_location).first()
    #
    #     session.close()
    #
    #     return song
    #
