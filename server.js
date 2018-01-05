var path = require("path");
var mysql = require("mysql");
var bodyParser = require('body-parser');
var express = require('express'),app = express(),port = process.env.PORT || 3000;

//Easy JSON parsing
app.use( bodyParser.json() );       // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
  extended: true
})); 


//DATABASE
const con = mysql.createConnection({
  host: "localhost",
  user: "raspberry",
  password: "password"
});
con.connect(function(err) {
  if (err) throw err;
  console.log("Connected to database!");
});
con.query('USE NodeJS', function (err) {
        if (err) throw err;
});

//Allows us to add files in our /public folder
app.use(express.static(path.join(__dirname,"public")));

//ROUTING
app.get("/", function(req,res){
	res.send("Hello world");//This is never called because of index.html in /public
});
app.post("/add", function(req,res){
	con.query('INSERT INTO test SET ?', req.body, 
			function (err, result) {
				if (err) throw err;
				res.send(result);
			}
	);
});
app.post("/remove", function(req,res){
		con.query('DELETE FROM test WHERE ?', req.body, 
			function (err, result) {
				if (err) throw err;
				res.send(result);
			}
	);
});
app.get("/list", function(req,res){
	con.query('SELECT * FROM test', 
        function (err, result) {
            if (err) throw err;
            res.send(result);
        }
);
});




//Start listening
app.listen(port);
console.log('todo list API server started on: ' + port);