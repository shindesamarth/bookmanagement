const express = require("express");
const router =express.Router();
const {users}=require("../data/users.json");

/*
 *Route:/users/
 *Method:GET
 *Description:Get all users
 *Access:Public
 *parameters:None
 it is way to document routes before creating them
 */


 router.get("", function (req, res) {
    res.status(200);
    res.json({ sucess: true, data: users });
  });
  /*
   *Route:/users/{id}
   *Method:GET
   *Description:Get user by its id
   *Access:Public
   *parameters:id
   it is way to document routes before creating them
   */
  
  router.get("/:id", function (req, res) {
    const id = req.params.id;
    let output;
    for (let i = 0; i < users.length; i++) {
      if (users[i].id == id) {
        output = users[i];
      }
    }
    return res
      .status(output ? 200 : 400)
      .json(
        output
          ? { success: true, data: output }
          : { sucess: false, message: "given user don't exist" }
      );
  });
  
  /*
   *Route:/users/
   *Method:Post
   *Description:create new user
   *Access:Public
   *parameters:id
   it is way to document routes before creating them
   */
  
  router.post("", function (req, res) {
    const { id, name, surname, email, subscriptionType, subscriptionDate } =
      req.body;
    const user = users.find(function (element) {
      if (element.id === id) {
        return id;
      }
    });
    if (user) {
      return res.status(404).json({
        success: false,
        messsage: "user already exist with particular id",
      });
    }
    users.push({
      id,
      name,
      surname,
      email,
      subscriptionType,
      subscriptionDate,
    });
    return res
      .status(200)
      .json({ success: true, message: "user added succesfully" });
  });
  /*
   *Route:/users/{id}
   *Method:Post
   *Description:updating specific user
   *Access:Public
   *parameters:id
   it is way to document routes before creating them
   */
  
  router.put("/:id", function (req, res) {
    const id = req.params.id;
    const data = req.body;
    const user = users.find(function (element) {
      if (element.id === id) {
        return id;
      }
    });
    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "given user don't exist" });
    }
    const updateuserdata = users.map((each) => {
      if (each.id === id) {
        return { ...each, ...data };
      }
      return each;
    });
    return res
      .status(200)
      .json({
        success: true,
        message: "user updated sucessfully",
        data: updateuserdata,
      });
  });
  /*
   *Route:/users/{id}
   *Method:delete
   *Description:delete user by thier id
   *Access:Public
   *parameters:id
   it is way to document routes before creating them
   */
  
  router.delete("/:id", function (req, res) {
    const targetid = req.params.id;
    const user = users.find(function (element) {
      if (element.id === targetid) {
        return targetid;
      }
    });
    //console.log(user);
    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "given user don't exist" });
    }
    const item = users.find(({ id }, index) => {
      if (targetid === id) {
        users.splice(index, 1);
        return id;
      }
    });
    return res
      .status(200)
      .json({ success: true, message: "user succesfully deleted", data: users });
  });
  

/*
   *Route:/users/subscription-details/:id
   *Method:Post
   *Description:geeting subscribtion details of user
   *Access:Public
   *parameters:id
   it is way to document routes before creating them
   */

router.get("/subscription-details/:id",function(req,res){
  const {id} =req.params;
  const user =users.find((element)=>{
    if(element.id===id){
      return true;
    }
  });
  if(!user){
    return res.status(404).json({success:false,message:"User with given id doesn't exist"});
  }
  const getdateindays=(data="")=>{
    let date;
    if(data===""){
      date=new Date();
    }
    else{
      date=new Date(data);
      console.log(date);
    }
    let days = Math.floor(date/(1000*60*60*24));
    return days;

  };
  const subscriptionType=(date)=>{
    if(user.subscriptionType=="Basic"){
      date=date+90;
    }
    else if(user.subscriptionType=="Standard"){
      date=date+180;
    }
    else if(user.subscriptionType=="Premium"){
      date=date+365;
    }
    return date;
  };
  let returnDate=getdateindays(user.returnDate);
  let currentDate=getdateindays();
  let subscriptionDate=getdateindays(user.subscriptionDate);
  let subscriptionExpiration=subscriptionType(subscriptionDate);
  const data ={
    ...user,
    issubscriptionexpired:subscriptionExpiration<=currentDate,
    daysleftforexpiration:subscriptionExpiration<=currentDate?0:subscriptionExpiration -currentDate,
    fine:returnDate<currentDate?subscriptionExpiration<=currentDate?100:50:0
  };
  return res.status(200).json({success:true,message:"subscription details for user is :",data:data});

})   
































  module.exports=router;