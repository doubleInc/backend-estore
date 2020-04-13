# SEI-36 Project 2 (server side repo)

1. Clone repo
2. `npm i` to install dependencies
3. Include config.env file inside /config/ folder
4. `npm run start` to run server

### Basic requests

---

`localhost:3000/categories` GET/POST(provide `name: string` and optional url `image: string`) [GET]returns all or [POST]add a category

`localhost:3000/categories/:id` GET/PUT/DEL a single category

`localhost:3000/categories?name=Fruits` include parameters to search

Heroku server: https://vast-tor-12475.herokuapp.com