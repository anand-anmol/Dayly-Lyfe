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

# c.execute('''
#             CREATE TABLE "user" (
#                 "username"	TEXT NOT NULL PRIMARY KEY,
#                 "password"	TEXT CHECK(length(password)>=8)
#             );
#           ''')

conn.commit()
conn.close()
