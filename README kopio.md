# Tasker Application

Add tasks to authenticated user

## Setup

It is recommended to use Visual Studio Code as the editor, but any other editor is also fine.

For endpoint testing use for example insomnia or postman applications.

### Setup MongoDB Mac

Download MongoDB tgz: <https://www.mongodb.com/try/download/community>
Unzip folder and rename to mongodb
Move binary to path you want (e.g. /path/to/mongo)
Add mongodb-data folder to the same path

Now you should have following structure:

/path/to/mongo folder should have the unzipped folder called mongodb and empty folder mongodb-data

Go to terminal and run: `/path/to/mongo/mongodb/bin/mongod --dbpath=/path/to/mongo/mongodb-data`

#### Linux

sudo apt-get install mongodb

create empty folder mongodb-data

Go to terminal and run: `mongod --dbpath=/path/to/mongo/mongodb-data`

### Setup Application

npm install

npm start

should show: `Listening on port 3000`

## TODO

- Read code and figure out what the application does.
- Tasks 1-7 should be done first then 8 if you have time left.
- Create own git repository for the project. Document your changes and decisions in git log as you progress through the tasks.

### Task #1

Create user via API

Copy & Paste successful response to a txt file

### Task #2

Login with your user

Copy & Paste successful response to a txt file

### Task #3

For some reason /users/me returns empty response. Fix the endpoint and successfully Call /users/me API endpoint.

Figure out how authentication works using JWT tokens

Copy & Paste successful response to a txt file

### Task #4

Create new endpoint that deletes the current user. The API should return status 200 on successful delete and 500 if there is some error.

### Task #5

Create new endpoint that updates current users attributes. The API can update one to many attributes. The API should return 400 response if there are unknown or invalid parameters.

### Task #6

There seems to be password in the return payload of user APIs. Remove password propery from every user API response.

### Task #7

Create get tasks endpoint that returns current user's tasks. Endpoint should have sorting and paging functionalities. Feel free to implement the endpoint as you see fit.

### Task #8

Use create-react-app to create frontend for the API. Your task is to create login page and after successful login, logged in user page. You do not have to spend time for form validations or too specific styling. Feel free to use any third party libraries as you see fit.

### Task #9 (For extra points)

Setup jest for unit testing and create unit tests for apis.
