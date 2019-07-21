const express = require('express');
const bodyParser = require('body-parser');
const controller = require('./controller');


const app = express();
const port = process.env.PORT || 5000;
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


// Location
// Get
app.get('/api/getAllLocation', controller.getAllLocation);
app.get('/api/getLocationInCity/:city/:province',controller.getLocationInCity);
app.get('/api/getLocationWithCapabilityAndPrice/:capability/:price', controller.getLocationWithCapabilityAndPrice);
app.get('/api/getAvailableLocations/:StartTime/:EndTime/:invitees', controller.getAvailableLocations);
//Post
app.post('/api/insertLocation', controller.insertLocation);
app.post('/api/updateLocation', controller.updateLocation);

// Supplier
//Get
app.get('/api/getSuppliers/:IsCater/:IsFlower/:IsEntertainment', controller.getSuppliers);
//Post
app.post('/api/insertNewSupplier', controller.insertNewSupplier);
app.post('/api/updateSupplier', controller.updateSupplier);

//LocationOffer
//Get

app.get('/api/getAllSuppliersOfferLocation/:locationName/:Season', controller.getAllSuppliersOfferLocation);

//Post
app.post('/api/insertNewLocationOffer', controller.insertNewLocationOffer);
app.post('/api/updateLocationOffer', controller.updateLocationOffer);


//Options Table
//Get
app.get('/api/getAllOptionWithType/:Type', controller.getAllOptionWithType);
//Post
app.post('/api/insertNewOptions', controller.insertNewOptions);

//OptionOffer Table
//Get
app.get('/api/getTypeMenuFromSupplier/:SupplierName/:Type', controller.getTypeMenuFromSupplier);
app.get('/api/getAllFromSupplier/:SupplierName', controller.getAllFromSupplier);
app.get('/api/getAllSuppliersOfOption/:OptionName', controller.getAllSuppliersOfOption);
//Post
app.post('/api/insertNewOptionOffer', controller.insertNewOptionOffer);
app.post('/api/updateOptionOffer', controller.updateOptionOffer);



//Clients Table
//Get
app.get('/api/getAllClients',controller.getAllClients);
app.get('/api/getClientsInfoWithClientID/:ClientID', controller.getClientsInfoWithClientID);
//Post
app.post('/api/insertNewClients', controller.insertNewClients);
app.post('/api/updateClients', controller.updateClients);

//Events Table
//Get
app.get('/api/getAllEvents',controller.getAllEvents);
app.get('/api/getAllEventsFromClient/:ClientID', controller.getAllEventsFromClient);
app.get('/api/getAllEventsInFuture',controller.getAllEventsInFuture);
app.get('/api/getAllEventsInPast',controller.getAllEventsInPast);
app.get('/api/getAllBudgetOverBill',controller.getAllBudgetOverBill);
app.get('/api/getTotalExpenseFromClient/:ClientID', controller.getTotalExpenseFromClient);
app.get('/api/getClientIDOverCapacity',controller.getClientIDOverCapacity);
app.get('/api/getAllSuppliersInEvent/:EventID', controller.getAllSuppliersInEvent);
//Post
app.post('/api/insertNewEvent', controller.insertNewEvent);
app.post('/api/updateEvent', controller.updateEvent);
app.post('/api/updateBill', controller.updateBill);
//Delete
app.post('/api/deleteEventLongTimeAgo', controller.deleteEventLongTimeAgo);
//Invitation Table
//Get
app.get('/api/getAllInvitationFromOneEvent/:EventID', controller.getAllInvitationFromOneEvent);
//Post
app.post('/api/insertNewInvitation', controller.insertNewInvitation);
app.post('/api/updateInvitation', controller.updateInvitation);

//Requirements Table
app.get('/api/getAllRequirementFromOneEvent/:EventID', controller.getAllRequirementFromOneEvent);
app.get('/api/getAllOfferFromOfferID/:OfferId', controller.getAllOfferFromOfferID);
//Post
app.post('/api/insertNewRequirement', controller.insertNewRequirement);




app.post('/api/hello', controller.hello);

app.get('/api/hello', (req, res) => {
  res.send({ express: 'Hello From Express' });
});
// todo: 
app.get('/api/login/:pswd', (req, res) => {
    const password = req.params.pswd;
    res.json({success: (password == "<3holiday")});
})
app.get('/api/events', controller.getEvent);
app.post('/api/event/:name/', (req, res) => {});
app.post('/api/booking/:event/', (req, res) => {});
app.get('/api/events', (req, res) => {});


app.listen(port, () => console.log(`Listening on port ${port}`));