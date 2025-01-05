import pymysql  # Changed from mysql.connector to pymysql
import pandas as pd

def load_data_from_db():
    # Establish a connection to the MySQL database
    connection = pymysql.connect(
        host='localhost',
        user='root',
        password='',  # your password
        database='techtrack'
    )

    # Load the data into a pandas DataFrame
    query = "SELECT title, image, duration, rating, url FROM dataset"  # Modify according to your table
    data = pd.read_sql(query, connection)

    connection.close()
    return data
