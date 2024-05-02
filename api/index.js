var Express = require("express");
var Mongoclient = require("mongodb").MongoClient;
var cors = require("cors");
const multer = require("multer");

var app = Express();
app.use(cors());
var CONNECTION_STRING = "mongodb+srv://connectifydb:mano5421@cluster0.ntyczhl.mongodb.net/";
var DATABASENAME = "ConnectifyDB";
var database;
app.listen(5037, () => {
    Mongoclient.connect(CONNECTION_STRING, (error, client) => {
        if (error) {
            console.error("Error connecting to MongoDB:", error);
        } else {
            database = client.db(DATABASENAME);
            console.log("DB Connection successful");
        }
    });
})

app.get("/api/chatapp/getmessages", (request, response) => {
    database.collection("ChatAppCollection").find({}).toArray((error, result) => {
        if (error) {
            console.error("Error fetching messages:", error);
            response.status(500).send("Error fetching messages");
        } else {
            response.send(result);
            console.log("got data!!");
        }
    });
});

app.post("/api/chatapp/sendmessage", multer().none(), (request, response)=>{
    database.collection("ChatAppCollection").count({}, function(error, numOfDocs){
        database.collection("ChatAppCollection").insertOne({
            id: (numOfDocs++).toString(),
            message: request.body.message,
            sender: request.body.sender,
            receiver: request.body.receiver
        });
        response.json("added Successfully");
    })
})


app.delete("/api/chatapp/deletemessage", (request, response)=>{
    database.collection("ChatAppCollection").deleteOne({
        id: request.query.id
    });
    response.json("deleted Sucessfully");
})

