const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const mysql = require('mysql');
const port = process.env.PORT || 5000;
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'password',
  database: 'new_schema'
});

connection.connect((err) => {
  if(err) {
    console.log("error connecting to database: " + err.stack);
    return;
  }
  console.log("connected to mysql database!");
});


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