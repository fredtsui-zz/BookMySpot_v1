const mysql = require('mysql');



const connection = mysql.createConnection({
    host: 'localhost',
    user: 'test',
    password: 'password',
    database: 'new_schema'
});


connection.connect(function(err) {
    if (err) throw err;
    console.log("Connected!");

    /* connection.query("DROP DATABASE booking", function (err, result) {
        if (err) throw err;
        console.log("Database created");
    });
    connection.query("CREATE DATABASE booking", function (err, result) {
        if (err) throw err;
        console.log("Database created");
    });
*/
});


function convert(is) {
    if (is == 1) {
        return true;
    } else {
        return false;
    }
}

module.exports = {

    getEvent: (req, res) => {


    },

    hello: (req, res) => {

    },

    // Location
    // Get

    getAllLocation: (req, res) => {

        connection.query("call getAllLocation()", function (err, result) {
            if (err) {
                console.log("err:", err);
            } else {
                res.send(result);
                console.log("results:", result);
            }

        });

        /* console.log(req.body);
        res.send(
            `I received your POST request. This is what you sent me: ${req.body.post}`,
        );*/
    },

    getLocationInCity: (req, res) => {
        var city = req.params.city;
        var province = req.params.province;
        connection.query("call getLocationInCity(?,?)", [city, province],function (err, result) {
            if (err) {
                console.log("err:", err);
            } else {
                res.send(result);
                console.log("results:", result);
            }
        });
    },

    getLocationWithCapabilityAndPrice: (req, res) => {
        var capability = req.params.capability;
        var price = req.params.price;
        console.log(capability,price);
        connection.query("call getLocationWithCapabilityAndPrice(?,?)", [price,capability],function (err, result) {
            if (err) {
                console.log("err:", err);
            } else {
                res.send(result);
                console.log("results:", result);
            }
        });
    },

    getAvailableLocations: (req, res) => {
        var StartTime = req.params.StartTime;
        var EndTime = req.params.EndTime;
        var invitees = req.params.invitees;
        connection.query("call getAvailableLocations(?,?,?)", [StartTime,EndTime,invitees],function (err, result) {
            if (err) {
                console.log("err:", err);
            } else {
                res.send(result);
                console.log("results:", result);
            }
        });
    },

    // Post

    insertLocation:(req, res) => {
        var LocationID = req.body.LocationID;
        var Capability = req.body.Capability;
        var Phone = req.body.Phone;
        var Price = req.body.Price;
        var Hours = req.body.Hours;
        var Address = req.body.Address;
        var City = req.body.City;
        var Province = req.body.Province;
        console.log(LocationID,Capability,Phone,Price,Hours,Address,
            City,Province);
        connection.query("call insertNewLocation(?,?,?,?,?,?,?,?)", [LocationID,Capability,Phone,Price,Hours,Address,
            City,Province],function (err, result) {
            if (err) {
                console.log("err:", err);
            } else {
                res.send(result);
                console.log("results:", result);
            }
        });
    },

    updateLocation:(req, res) => {
        var LocationID = req.body.LocationID;
        var Capability = req.body.Capability;
        var Phone = req.body.Phone;
        var Price = req.body.Price;
        var Hours = req.body.Hours;
        var Address = req.body.Address;
        var City = req.body.City;
        var Province = req.body.Province;
        console.log(LocationID,Capability,Phone,Price,Hours,Address,
            City,Province);
        connection.query("call updateLocation(?,?,?,?,?,?,?,?)", [LocationID,Capability,Phone,Price,Hours,Address,
            City,Province],function (err, result) {
            if (err) {
                console.log("err:", err);
            } else {
                res.send(result);
                console.log("results:", result);
            }
        });
    },


    getSuppliers:(req, res) => {
        var IsCater = req.params.IsCater;
        var IsFlower = req.params.IsFlower;
        var IsEntertainment = req.params.IsEntertainment;
        IsCater = convert(IsCater);
        IsFlower = convert(IsFlower);
        IsEntertainment = convert(IsEntertainment);
        connection.query("call getSuppliers(?,?,?)", [IsCater, IsFlower, IsEntertainment],function (err, result) {
            if (err) {
                console.log("err:", err);
            } else {
                res.send(result);
                console.log("results:", result);
            }
        });
    },

    insertNewSupplier: (req, res) => {
        var SupplierName = req.body.SupplierName;
        var IsFlower = req.body.IsFlower;
        var IsCater = req.body.IsCater;
        var IsEntertainment = req.body.IsEntertainment;
        IsCater = convert(IsCater);
        IsFlower = convert(IsFlower);
        IsEntertainment = convert(IsEntertainment);
        console.log(SupplierName,IsFlower,IsCater,IsEntertainment);
        connection.query("call insertNewSupplier(?,?,?,?)", [SupplierName,IsFlower,IsCater,IsEntertainment],function (err, result) {
            if (err) {
                console.log("err:", err);
            } else {
                res.send(result);
                console.log("results:", result);
            }
        });
    },

    updateSupplier: (req, res) => {
        var SupplierName = req.body.SupplierName;
        var IsFlower = req.body.IsFlower;
        var IsCater = req.body.IsCater;
        var IsEntertainment = req.body.IsEntertainment;
        console.log(SupplierName,IsFlower,IsCater,IsEntertainment);
        IsCater = convert(IsCater);
        IsFlower = convert(IsFlower);
        IsEntertainment = convert(IsEntertainment);
        console.log(SupplierName,IsFlower,IsCater,IsEntertainment);
        connection.query("call updateSupplier(?,?,?,?)", [SupplierName,IsCater,IsFlower,IsEntertainment],function (err, result) {
            if (err) {
                console.log("err:", err);
            } else {
                res.send(result);
                console.log("results:", result);
            }
        });
    },

    //LocationOffer
    //Get
    getAllSuppliersOfferLocation: (req, res) => {
        var locationName = req.params.locationName;
        var Season = req.params.Season;
        connection.query("call getAllSuppliersOfferLocation(?,?)", [locationName, Season],function (err, result) {
            if (err) {
                console.log("err:", err);
            } else {
                res.send(result);
                console.log("results:", result);
            }
        });
    },
    //Post
    insertNewLocationOffer: (req,res) => {
        var SupplierName = req.body.SupplierName;
        var LocationName = req.body.LocationName;
        var Season = req.body.Season;
        console.log(SupplierName,LocationName,Season);
        connection.query("call insertNewLocationOffer(?,?,?)", [SupplierName,LocationName,Season],function (err, result) {
            if (err) {
                console.log("err:", err);
            } else {
                res.send(result);
                console.log("results:", result);
            }
        });
    },

    updateLocationOffer: (req,res) => {
        var SupplierName = req.body.SupplierName;
        var LocationName = req.body.LocationName;
        var Season = req.body.Season;
        console.log(SupplierName,LocationName,Season);
        connection.query("call updateLocationOffer(?,?,?)", [SupplierName,LocationName,Season],function (err, result) {
            if (err) {
                console.log("err:", err);
            } else {
                res.send(result);
                console.log("results:", result);
            }
        });
    },
    //Options Table
    //Get
    getAllOptionWithType: (req,res) => {
        var Type = req.params.Type;
        connection.query("call getAllOptionWithType(?)", [Type],function (err, result) {
            if (err) {
                console.log("err:", err);
            } else {
                res.send(result);
                console.log("results:", result);
            }
        });
    },
    //Post
    insertNewOptions: (req, res) => {
        var OptionName = req.body.OptionName;
        var Type = req.body.Type;
        connection.query("call insertNewLocationOffer(?,?)", [OptionName,Type],function (err, result) {
            if (err) {
                console.log("err:", err);
            } else {
                res.send(result);
                console.log("results:", result);
            }
        });
    },

    //OptionOffer Table
    //Get

    getTypeMenuFromSupplier: (req, res) => {
        var SupplierName = req.params.SupplierName;
        var Type = req.params.Type;
        connection.query("call getTypeMenuFromSupplier(?,?)", [SupplierName, Type],function (err, result) {
            if (err) {
                console.log("err:", err);
            } else {
                res.send(result);
                console.log("results:", result);
            }
        });
    },

    getAllFromSupplier: (req, res) => {
        var SupplierName = req.params.SupplierName;
        connection.query("call getAllFromSupplier(?)", [SupplierName],function (err, result) {
            if (err) {
                console.log("err:", err);
            } else {
                res.send(result);
                console.log("results:", result);
            }
        });
    },

    getAllSuppliersOfOption: (req, res) => {
        var OptionName = req.params.OptionName;
        connection.query("call getAllSuppliersOfOption(?)", [OptionName],function (err, result) {
            if (err) {
                console.log("err:", err);
            } else {
                res.send(result);
                console.log("results:", result);
            }
        });
    },

    insertNewOptionOffer: (req, res) => {
        var OptionName = req.body.OptionName;
        var SupplierName = req.body.SupplierName;
        var Price = req.body.Price;
        var Stock = req.body.Stock;
        connection.query("call insertNewOptionOffer(?,?,?,?)", [OptionName,SupplierName,Price,Stock],function (err, result) {
            if (err) {
                console.log("err:", err);
            } else {
                res.send(result);
                console.log("results:", result);
            }
        });
    },

    updateOptionOffer: (req, res) => {
        var OfferID = req.body.OfferID;
        var Price = req.body.Price;
        var Stock = req.body.Stock;
        connection.query("call updateOptionOffer(?,?,?)", [OfferID,Stock,Price],function (err, result) {
            if (err) {
                console.log("err:", err);
            } else {
                res.send(result);
                console.log("results:", result);
            }
        });
    },

    //Clients Table
    //Get
    getAllClients: (req, res) => {
        connection.query("call getAllClients()", function (err, result) {
            if (err) {
                console.log("err:", err);
            } else {
                res.send(result);
                console.log("results:", result);
            }

        });
    },

    getClientsInfoWithClientID: (req, res) => {
        var ClientID = req.params.ClientID;
        connection.query("call getClientsInfoWithClientID(?)", [ClientID],function (err, result) {
            if (err) {
                console.log("err:", err);
            } else {
                res.send(result);
                console.log("results:", result);
            }
        });
    },
    //Post
    insertNewClients: (req, res) => {
        var ClientName = req.body.ClientName;
        var Address = req.body.Address;
        var Email = req.body.Email;
        var Phone = req.body.Phone;
        var BillingInfo = req.body.BillingInfo;
        connection.query("call insertNewClients(?,?,?,?,?)", [ClientName,Address,Email,Phone,BillingInfo],function (err, result) {
            if (err) {
                console.log("err:", err);
            } else {
                res.send(result);
                console.log("results:", result);
            }
        });
    },

    updateClients: (req, res) => {
        var ClientID = req.body.ClientID;
        var ClientName = req.body.ClientName;
        var Address = req.body.Address;
        var Email = req.body.Email;
        var Phone = req.body.Phone;
        var BillingInfo = req.body.BillingInfo;
        connection.query("call updateClients(?,?,?,?,?,?)", [ClientID,ClientName,Address,Email,Phone,BillingInfo],function (err, result) {
            if (err) {
                console.log("err:", err);
            } else {
                res.send(result);
                console.log("results:", result);
            }
        });
    },

    //Events Table
    //Get
    getAllEvents: (req, res) => {
        connection.query("call getAllEvents()", function (err, result) {
            if (err) {
                console.log("err:", err);
            } else {
                res.send(result);
                console.log("results:", result);
            }

        });
    },

    getAllEventsFromClient: (req, res) => {
        var ClientID = req.params.ClientID;
        connection.query("call getAllEventsFromClient(?)", [ClientID],function (err, result) {
            if (err) {
                console.log("err:", err);
            } else {
                res.send(result);
                console.log("results:", result);
            }
        });
    },

    getAllEventsInFuture: (req, res) => {
        connection.query("call getAllEventsInFuture()", function (err, result) {
            if (err) {
                console.log("err:", err);
            } else {
                res.send(result);
                console.log("results:", result);
            }

        });
    },

    getAllEventsInPast: (req, res) => {
        connection.query("call getAllEventsInPast()", function (err, result) {
            if (err) {
                console.log("err:", err);
            } else {
                res.send(result);
                console.log("results:", result);
            }

        });
    },

    getAllBudgetOverBill: (req, res) => {
        connection.query("call getAllBudgetOverBill()", function (err, result) {
            if (err) {
                console.log("err:", err);
            } else {
                res.send(result);
                console.log("results:", result);
            }

        });
    },

    getTotalExpenseFromClient: (req, res) => {
        var ClientID = req.params.ClientID;
        connection.query("call getTotalExpenseFromClient(?)", [ClientID],function (err, result) {
            if (err) {
                console.log("err:", err);
            } else {
                res.send(result);
                console.log("results:", result);
            }
        });
    },

    getClientIDOverCapacity: (req, res) => {
        connection.query("call getClientIDOverCapacity()", function (err, result) {
            if (err) {
                console.log("err:", err);
            } else {
                res.send(result);
                console.log("results:", result);
            }

        });
    },

    getAllSuppliersInEvent: (req, res) => {
        var EventID = req.params.EventID;
        connection.query("call getAllSuppliersInEvent(?)", [EventID],function (err, result) {
            if (err) {
                console.log("err:", err);
            } else {
                res.send(result);
                console.log("results:", result);
            }
        });
    },
    //Post
    insertNewEvent: (req, res) => {
        var ClientID = req.body.ClientID;
        var LocationName = req.body.LocationName;
        var Type = req.body.Type;
        var StartTime = req.body.StartTime;
        var EndTime = req.body.EndTime;
        var Budget = req.body.Budget;
        var NumberOfInvites = req.body.NumberOfInvites;
        var Bill = req.body.Bill;
        connection.query("call insertNewEvent(?,?,?,?,?,?,?,?)", [ClientID,LocationName,Type,StartTime,EndTime,Budget,
            NumberOfInvites,Bill],function (err, result) {
            if (err) {
                console.log("err:", err);
            } else {
                res.send(result);
                console.log("results:", result);
            }
        });
    },

    updateEvent: (req, res) => {
        var EventID = req.body.EventID;
        var StartTime = req.body.StartTime;
        var EndTime = req.body.EndTime;
        var Budget = req.body.Budget;
        var NumberOfInvites = req.body.NumberOfInvites;
        connection.query("call updateEvent(?,?,?,?,?)", [EventID,StartTime,EndTime,Budget,NumberOfInvites],function (err, result) {
            if (err) {
                console.log("err:", err);
            } else {
                res.send(result);
                console.log("results:", result);
            }
        });
    },

    updateBill: (req, res) => {
        var EventID = req.body.EventID;
        connection.query("call updateBill(?)", [EventID],function (err, result) {
            if (err) {
                console.log("err:", err);
            } else {
                res.send(result);
                console.log("results:", result);
            }
        });
    },
    //Delete
    deleteEventLongTimeAgo: (req, res) => {
        connection.query("call deleteEventLongTimeAgo()", [],function (err, result) {
            if (err) {
                console.log("err:", err);
            } else {
                res.send(result);
                console.log("results:", result);
            }
        });
    },

    //Invitation Table
    //Get
    getAllInvitationFromOneEvent: (req, res) => {
        var EventID = req.params.EventID;
        connection.query("call getAllRequirementFromOneEvent(?)", [EventID],function (err, result) {
            if (err) {
                console.log("err:", err);
            } else {
                res.send(result);
                console.log("results:", result);
            }
        });
    },

    //Post

    insertNewInvitation: (req, res) => {
        var EventID = req.body.EventID;
        var Email = req.body.Email;
        var InviteeName = req.body.InviteeName;
        connection.query("call insertNewInvitation(?,?,?)", [EventID,Email,InviteeName],function (err, result) {
            if (err) {
                console.log("err:", err);
            } else {
                res.send(result);
                console.log("results:", result);
            }
        });
    },

    updateInvitation: (req, res) => {
        var EventID = req.body.EventID;
        var Email = req.body.Email;
        var InviteeName = req.body.InviteeName;
        connection.query("call updateInvitation(?,?,?)", [EventID,Email,InviteeName],function (err, result) {
            if (err) {
                console.log("err:", err);
            } else {
                res.send(result);
                console.log("results:", result);
            }
        });
    },

    //Requirements Table
    //Get

    getAllRequirementFromOneEvent: (req, res) => {
        var EventID = req.params.EventID;
        connection.query("call getAllRequirementFromOneEvent(?)", [EventID],function (err, result) {
            if (err) {
                console.log("err:", err);
            } else {
                res.send(result);
                console.log("results:", result);
            }
        });
    },
    getAllOfferFromOfferID: (req, res) => {
        var OfferId = req.params.OfferId;
        connection.query("call getAllOfferFromOfferID(?)", [OfferId],function (err, result) {
            if (err) {
                console.log("err:", err);
            } else {
                res.send(result);
                console.log("results:", result);
            }
        });
    },

    //Post

    insertNewRequirement: (req, res) => {
        var EventID = req.body.EventID;
        var OfferId = req.body.OfferId;
        var Amount = req.body.Amount;
        connection.query("call insertNewRequirement(?,?,?)", [EventID,OfferId,Amount],function (err, result) {
            if (err) {
                console.log("err:", err);
            } else {
                res.send(result);
                console.log("results:", result);
            }
        });
    },

};
