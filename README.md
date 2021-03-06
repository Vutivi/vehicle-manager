## Vehicle manager

Vehicle manager is a vehicle management app that helps you manage your vehicles on the cloud

## Setting up the database

* On your local postgres database, create a database and name it anything
* Rename the .env.example file and set the database variables as your local database created

## Running the application

In the project directory, you can run:

`npm install && cd client && npm install && cd ..`
`npm run dev`

The browser will open a new tab on http://localhost:3000 where you can sign up and manage your vehicles


## Running the tests

In the project directory with the app running, run:

 `npm test`

The tests assumes that you have users and vehicles records in your database

## To do

* Move secret keys and api links to .env on the client
* Improve test coverage
* Validate vehicle creation form
* Allow users to publish vehicles for selling
* Implement state management with React redux
* Implement containerization with Docker