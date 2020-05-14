import sqlite3

conn = sqlite3.connect('DaylyLyfe.db')

c = conn.cursor()
c.execute('''
          DROP TABLE note
          ''')

conn.commit()
conn.close()