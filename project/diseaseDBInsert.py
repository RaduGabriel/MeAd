import mysql.connector
import re

path = "/Users/radugabriel/Downloads/diseasestatistics.csv";

cnx = mysql.connector.connect(user='mead', password='mead12345',
                              host='server.gplay.ro',
                              database='mead')

cursor = cnx.cursor()

file = open(path, "r")
file.seek(0)
lines = file.readlines()[5:]
i = 0
pattern = re.compile("[A-Z]+[0-9]+")
valuesToInsert = []

for line in lines:
    i += 1
    try:
        values = line.split(",")
        sex = (values[5])
        year = (values[2])
        country = values[1]
        deaths = (values[7])
        code = values[4]

        if pattern.match(code) and (sex == "1" or sex == "2"):
            valuesToInsert.append((sex, year, country, deaths, code))
            j += 1

        if j > 0 and j % 25000 == 0:
            cursor.executemany(
                """INSERT INTO diseasestatistics (sex,year,country,deaths,code) VALUES (%s,%s,%s,%s,%s)""",
                valuesToInsert)
            valuesToInsert.clear()
    except:
        cnx.rollback()

cursor.executemany("""INSERT INTO diseasestatistics (sex,year,country,deaths,code) VALUES (%s,%s,%s,%s,%s)""",
                   valuesToInsert)

valuesToInsert.clear()
cnx.commit()
cnx.close()
