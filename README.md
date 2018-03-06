# OFFICIAL
HWP Official Website Project


### Dependencies
* `pip install -r requirements.txt`
* Python 3
* Flask

### Set up PostgreSql and Eimeer database
* This [video](https://www.youtube.com/watch?v=iBJ2Y_n6hXU) will tell you how to dl postgreSQL for Windows. Macs, I'm sure there's another tutorial video out there
* These settings are used as default by the code - username: postgres, password: 2dover3d. If you used a different password or id, edit the config.py file accordingly.
* Create a new database on the server called "hwp"
* go to the root hwp folder (the one with run.py) and run 'pip install psycopg2'
* If the pip install didnt work, download and install the files from [here](https://pypi.python.org/pypi/psycopg2/2.7.3.2)

### Database tables creation
* To create the tables in the database, run `python db_create.py`

### Reset database
* This will delete all tables, recreate them and run dbtest_init.py
```
refresh.sh
```

### Running the website
* In powershell `python run.py`

### Managing the database
if you create/delete a column, you can update the db by running
```
python manage.py db migrate
python manage.py db upgrade
```

Currently, the migrater cannot detect column type changes or name changes. These must be manually done by going to /migrations/versions/ and editing the fil created by the 1st command and BEFORE the 2nd command.