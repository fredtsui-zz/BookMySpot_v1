
const mysql = require('mysql');
const faker = require('faker');
const {
    generateClient,
    generateInvitees,
    generateLocation,
    generateOptions,
    generateSuppliers
} = require('./generateStuffs');


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
    const numclients = 100;
    const numlocations = 10;
    const numOptions = [20, 20, 20];
    const numsuppliers = 20;
    const numoptionoffers = 60;
    const numevents = 20;
    // first add some clients
    const client_tmp = generateClient();
    const insert_client = 'insert into clients () values ?'
    const values = [[client_tmp.name, client_tmp.address, client_tmp.email, client_tmp.phone]]
    // then add some locations

    // then some Options

    // some suppliers

    // some OptionOffers

    // some events
});