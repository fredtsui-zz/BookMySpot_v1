
const mysql = require('mysql');


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
    // first add some clients
    // for each client we need name, address, email, phone
    
    // then add some locations

    // then some Options

    // some suppliers

    // some OptionOffers

    // some events
});