var express = require('express');
var app = express();
var fs = require("fs");
var bodyParser = require("body-parser");

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

var user = {
   "user4" : {
      "name" : "Tugce",
      "password" : "t123",
      "degree" : "MSc",
      "id": 4
   }
}

app.get('/listUsers', function (req, res) {
   fs.readFile( __dirname + "/" + "users.json", 'utf8', function (err, data) {
       var users = JSON.parse( data );
       console.log( users );
       res.end( JSON.stringify(users));
   });
})

app.get('/:id', function (req, res) {
   // First read existing users.
   fs.readFile( __dirname + "/" + "users.json", 'utf8', function (err, data) {
      var users = JSON.parse( data );
      var user = users["user" + req.params.id] 
      console.log( user );
      res.end( JSON.stringify(user));
   });
})

app.delete('/deleteUser', function (req, res) {

   // First read existing users.
   fs.readFile( __dirname + "/" + "users.json", 'utf8', function (err, data) {
       data = JSON.parse( data );
       delete data["user" + 2];
       
       console.log( data );
       res.end( JSON.stringify(data));
   });
})

app.post('/addUser', function (req, res) {
   // First read existing users.
   fs.readFile( __dirname + "/" + "users.json", 'utf8', function (err, data) {
	   console.log( "ok" );
       data = JSON.parse( data );
       data["user4"] = user["user4"];
       console.log( data );
       res.end( JSON.stringify(data));
   });
})

app.put('/updateUser', function( req,res) {
   fs.readFile( __dirname + "/" + "users.json", 'utf8', function (err, data) {
	   console.log( "ok" );
       data = JSON.parse( data );
       data["user" + req.body.id] = req.body;
       console.log( data );
       res.end( JSON.stringify(data));
   });
})

var server = app.listen(8081, function () {

  var host = server.address().address
  var port = server.address().port

  console.log("Example app listening at http://%s:%s", host, port)

})