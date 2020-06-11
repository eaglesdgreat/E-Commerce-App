# E-Commerce-App
This is the code repository for [E-Commerce App](https://github.com/eaglesdgreat/E-Commerce-App.git), published on github by [Okponobi Emmanuel](https://github.com/eaglesdgreat). It contains all the app supporting code files necessary to work through the project from start to finish and the final production and deployment app.

## Instructions on Folders
All of the code is organized into folders. Each folder specify the part the code below whether is the client app which are in the client folder or the server app which are in the server folder or the bundled app in the dist folder. There are also other folders like the config which contain some of the configuration needed for the app, template for the html template to render the app on the browser and the style which contain the basic style sheared by the client and server app.

## Table Of Contents
1. About The Application
2. Setting Up Of Development Environment For Node and React Application
3. Creating the Backend

## About The Application

## Setting Up Of Development Environment For Node and React Application
To set the development environment, we have to add those files and setting that is required for the application to run properly. First thing we need to do is to creae a directory for our application, then we initialize our package.json flie where we would add scripts necessary to run, test, lint the application, in this package.json file we also install necessary modules that our app will depend on.

After initialization of package file we will now set and configure our babel file, webpack files, nodemon file, and eslint file. The babel file is where we add the presets to transpile from ES6 to browser ES5 JavaScript, The webpack is for compiling the code, bundling the code and runnin the code on the desired environment (i.e development or production), webpack take the transpile code and bundle in a new folder call dist so we can run the application. Also webpack help in auto reloading the react application. Nodemon is used to auto reload the server application so we don't always have to start the app by ourselves, while eslint help to organize our code and check for ES6 error and arrangements. We also added git version control for monitoring code changes, collaboration with other developer and pushing code on a hosting platform for security.
The webpack configuration is split into 3 part the client has 3 files and server has one and all files is used depending on the environment we are chose to run the app with their own individual settings.

## Creating the Backend
After the setup and configuration we developed a fully functionall backend application with Node, Express and Mongoose, In the backend application we were able to set the server.js file for running the full backend application. We created a user's model, api and auth services for the backend application and a swagger documentation for the api. 
We started by creating the model directory for setting fields needed to be entered by the user then we set a virtual field where we store the password since it is unsecured to store password directly on the database so what we stored directlt on the database is the hashed_password and salt we are encrypted. Then we create our api in the routes directory for our endpoint CRUD operations. We have 3 routes files in the fo