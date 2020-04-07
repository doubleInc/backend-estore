Make sure `config.env` has the values required.

### Creating a new model

------

Inside the `models` folder there is a single model for noe, Category. A new file for the users, called  `User.js` has been created but needs to be completed. Use the `Category.js` file in the same folder to complete the required User columns.

### Create controllers

------

Inside the conrollers folder there is an incomplete `users.js` file. These are the methods that handles requests and responses to server. Using `categories.js` as an example see if you can fill out the methods(automatically imported).

### Creating Routes

------

Inside the routes folder a new route file called `users.js` has been created. Only getting all users and creating a single user is required for now. See if you can complete commented out line once again, use `categories.js` from the same folder for a guide.

------

Finally inside index.js mount the new routes after the categories, just commenting them out, saving and running the server will do.

Run the server with `npm run start`. Use an application like Insomina to make calls to `localhost:3000/users` and see if you get a response, add some users using a post method and adding a json object in the body!