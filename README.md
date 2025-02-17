This is a scrapping tool designed for an evaluation task.

Technologies used : Node.js - Express.js, Puppeteer and MongoDB

#HOW-TO-USE
1. Copy this code to your remote system,
2. Open the folder in an ide
3. use "npm i" to install all the dependencies.
4. create a .env file and two key value pairs, One for PORT and another for MONGO_CONNECTION_STRING.
5. Assign values to both.
6. Now run "npm start" or "npm run dev" in the terminal to start the server.

#Testing the tool
1. do a get req - http://localhost:8003/api/products
2. do a post req - http://localhost:8003/api/products
  (provide values in this format {
  "productName": "sample2",
  "price": 99.99,
  "description": "sample product2",
  "rating": 4.5
})
4. do a put req - http://localhost:8003/api/products/:id
5. do a delete req - http://localhost:8003/api/products/:id
