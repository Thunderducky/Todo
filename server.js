var express = require("express");
var mysql = require("mysql");
var PORT = process.env.PORT || 3000;
var app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"));

var connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "dbpassword",
    database: "todoDB"
})


// // HTML ROUTES
// GET / -> index.html

// // API ROUTES
app.get("/api/todos", function(req, res){
    connection.query("SELECT * FROM todos", function(err, data){
        if(err){
            console.log(err);
            return res.status(500).send(err)
        }
        res.json(data);
    })

})
app.post("/api/todos", function(req, res){
    if(req.body.done !== undefined){
        req.body.done = req.body.done !== "false"
    }
    connection.query("INSERT INTO todos SET ?", [req.body], function(err, data){
        console.log(err);
        if(err){
            return res.status(500).json(false)
        }
        console.log("data", data);
        var response = req.body;
        response.id = data.insertId;
        res.json(response)
    })
})
app.put("/api/todos/:id", function(req, res){
    console.log(req.body);
    if(req.body.done !== undefined){
        req.body.done = req.body.done !== "false"
    }
    connection.query("UPDATE todos SET ? WHERE id=?", [req.body, +req.params.id], function(err, data){
        console.log(err);
        if(err){
            return res.status(500).json(false)
        }
        res.json(true)
    })
})

connection.connect(function(err){
    if(err){ throw err}
    app.listen(PORT, function(){
        console.log("We've got a lot to do: on PORT " + PORT)
    })
})
