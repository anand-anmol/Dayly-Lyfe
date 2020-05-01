import sqlite3

conn = sqlite3.connect('DaylyLyfe.db')

c = conn.cursor()
c.execute('''
            CREATE TABLE "note" (
                "id"	INTEGER PRIMARY KEY AUTOINCREMENT,
                "author"	TEXT NOT NULL,
                "content"	TEXT NOT NULL,
                "createdAt"	DATETIME NOT NULL,
                "updatedAt" DATETIME NOT NULL
            );
          ''')

c.execute('''
            CREATE TABLE "users" (
    "id" INTEGER PRIMARY KEY AUTOINCREMENT,
    "username" TEXT,
    "password" TEXT, -- sha256 hash of the plain-text password
    "salt" TEXT -- salt that is appended to the password before it is hashed
)         '''
)

conn.commit()
conn.close()
