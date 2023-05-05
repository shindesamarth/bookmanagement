const express = require("express");
const router = express.Router();
module.exports = router;
const { books } = require("../data/books.json");
const { users } = require("../data/users.json");

/*
 *Route:/books
 *Method:GET
 *Description:Get all books
 *Access:Public
 *parameters:None
 it is way to document routes before creating them
 */
router.get("/", function (req, res) {
  return res.status(200).json({ success: true, books: books });
});

// *Route:/books/issued
//  *Method:GET
//  *Description:Get issued
//  *Access:Public
//  *parameters:None
//  it is way to document routes before creating them
//  */

router.get("/issued", function (req, res) {
  const userwithissuedbook = users.filter((each) => {
    if (each.issuedBook) {
      return each;
    }
  });
  const issuedbooks = [];
  userwithissuedbook.forEach((each) => {
    const book = books.find((book) => book.id === each.issuedBook);
    book.issuedby = each.name;
    book.issuedDate = each.issuedDate;
    book.returnDate = each.returnDate;
    console.log(each);
    issuedbooks.push(book);
  });
  console.log(issuedbooks);
  if (issuedbooks.length == 0) {
    return res
      .status(400)
      .json({ success: false, message: "no books have issued yet" });
  }
  return res.status(200).json({
    success: true,
    message: "here are issud books",
    data: issuedbooks,
  });
});

/*
 *Route:/
 *Method:post
 *Description:adding new book
 *Access:Public
 *parameters:None
 it is way to document routes before creating them
 */
router.post("/", function (req, res) {
  const { id, name, author, genre, price, publisher } = req.body;
  if (!id) {
    return res.status(404).json({ success: false, message: "No data to add" });
  }
  const check = books.find(function (each) {
    if (each.id === id) {
      return each;
    }
  });
  //console.log(check);
  if (check) {
    return res
      .status(404)
      .json({ success: false, message: "book with given id already exist" });
  }
  books.push({
    id,
    name,
    author,
    genre,
    price,
    publisher,
  });
  return res
    .status(200)
    .json({ success: true, message: "book added succesfully", data: books });
});

/*
 *Route:/
 *Method:put
 *Description:updating a book by their id 
 *Access:Public
 *parameters:None
 it is way to document routes before creating them
 */

router.put("/:id", function (req, res) {
    const id=req.params.id;
  const { data } = req.body;
  console.log(data);
  const check = books.find((each) => {
    if (each.id == id) {
      return each;
    }
  });
  if (!check) {
    return res
      .status(404)
      .json({ success: false, message: "book with given id don't exist" });
  }
  const output = books.map(function (element) {
    if (element.id == id) {
      return { ...element, ...data };
    }
    return element;
  });
  console.log("output" + output);
  return res
    .status(200)
    .json({ success: true, message: "succesfully updated", data: output });
});


/*
 *Route:/issued/withfine
 *Method:get
 *Description:get books which are issued with their fine
 *Access:Public
 *parameters:None
 it is way to document routes before creating them
 */

router.get("/issued/withfine",function(req,res){
    const bookusers = users.filter((element)=>{
        if(element.issuedBook){
            return true;
        }
    });
    
})








/*
 *Route:/books/:id
 *Method:GET
 *Description:Get book by id
 *Access:Public
 *parameters:None
 it is way to document routes before creating them
 */

router.get("/:id", function (req, res) {
  const targetid = req.params.id;
  const book = books.find(({ id }) => {
    if (targetid === id) {
      return id;
    }
  });
  if (!book) {
    return res
      .status(404)
      .json({ success: false, message: "given book don't exist in library" });
  }
  return res.status(200).json({ success: true, book: book });
});
