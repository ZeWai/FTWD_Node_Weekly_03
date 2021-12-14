# 02 Weekly Assignment NodeJs

## Note Taking application (With white-listed users)

### Setting up your application.

First clone this repository onto your local machine, then install the required packages, you already have the package.json, so run the command:

```
npm install
```

Now that you have the required packages installed you can begin to develop your application.

### views

Within this folder there is a layout directory, this is for express-handlebars. The code that you are developing here deals with the frontend of your application, what your users will see.

main.handlebars
The file main.handlebars will act as the main layout, therefore you will need to link any stylesheets or JavaScript scripts to this file.

index.handlebars
This file will be the body of your application, the actual tags required to structure your app.

### public

This folder is to be served to your server using the index.js, the files within are to be linked to your handlebar layout, remember you will need to use the relevant path from localhost:<port-number> to access these files.

### App.js

This file is the entry point into your application, here you will need to create your express server, apply your middleware, set up your routes and listen to a port.

### Routers

The purpose of the NoteRouter.js is to handle the different routes within your application, the router is used to call the correct services such that you can return the correct page or information to your client

### Services

NoteService.js is responsible for reading, writing, editing and deleting your notes. You will need to use the fs module to access, store and manipulate data (your notes).

### Stores

This directory is required so that you can dynamically store notes for each user that you have created within notes.json, you will need to store the users who are white-listed (allowed into the application) within users.json and finally you can define the paths to these files within config.json, as well as the port number.

### AuthChallenger.js

The AuthChallenger.js is required foe express-basic-auth, you will need to implement the correct logic.

### Tests

To test your application we are going to need to install some development testing dependencies. Install jest and supertest, run the command:

```
npm install jest supertest --save-dev
```

Now you can begin to write tests within your testing folder, write unit test for your services and routers.

Then do preform an integration test on the application as a whole.
