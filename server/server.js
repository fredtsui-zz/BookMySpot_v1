const express = require('express');
const bodyParser = require('body-parser');
const mongoClient = require("mongodb").MongoClient;
const app = express();
const port = process.env.PORT || 5000;
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const url = 'mongodb://localhost:27017';
const eventsDB = "events";
const bookingsDB = "bookings";

const client = new mongoClient(url);

client.connect((err) => {
    if(err === null){
        console.log("connected to mongodb!");
        const events = client.db(eventsDB);
        const bookings = client.db(bookingsDB);
    }
    client.close();
})

app.get('/api/hello', (req, res) => {
  res.send({ express: 'Hello From Express' });
});
app.post('/api/world', (req, res) => {
  console.log(req.body);
  res.send(
    `I received your POST request. This is what you sent me: ${req.body.post}`,
  );
});

// todo: 
app.get('/api/login/:pswd', (req, res) => {
    const password = req.params.pswd;
    res.json({success: (password == "<3holiday")});
})
app.get('/api/events', (req, res) => {});
app.post('/api/event/:name/', (req, res) => {});
app.post('/api/booking/:event/', (req, res) => {});
app.get('/api/events', (req, res) => {});


app.listen(port, () => console.log(`Listening on port ${port}`));