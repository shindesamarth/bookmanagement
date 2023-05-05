const express = require("express");
const app = express();
//const { users } = require("./data/users.json");
const userrouter = require("./routes/users.js");
const bookrouter = require("./routes/books.js");

const port = 8000;
app.use(express.json()); // converting data tranfer protocol into json format

app.get("/", function (req, res) {
  res.status(200).json({ message: "Server is up and running:-", data: "hey" });
});

// if i get /book divert it to books.js
// if i get /users divert it to users.js
// http://localhost/ it is base url when we request http://localhost/users it will divert to users.js and it is not good to mention /users in users.js as it is already http://localhost/users before diverting  so only write if extra is ther after /userss like /:id 
app.use("/users",userrouter);
app.use("/books",bookrouter);














// route to get all users information

// when we get any route except above
app.get("*", function (req, res) {
  res.status(404).json({
    message: "This route doesn't exist",
  });
});
app.listen(port, function () {
  console.log("succesfully running of server");
});
//console.log(users);
