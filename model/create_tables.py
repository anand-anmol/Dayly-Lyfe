import sqlite3

conn = sqlite3.connect('DaylyLyfe.db')

c = conn.cursor()
c.execute('''
            CREATE TABLE "note" (
                "id"	INTEGER PRIMARY KEY AUTOINCREMENT,
                "author"	TEXT NOT NULL,
                "content"	TEXT NOT NULL,
                "date"	DATETIME NOT NULL,
                "createdAt"	DATETIME NOT NULL,
                "updatedAt" DATETIME NOT NULL
            );
          ''')

conn.commit()
conn.close()
