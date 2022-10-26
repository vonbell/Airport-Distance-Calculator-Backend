const express = require('express');
const router = express.Router();
var Amadeus = require('amadeus');

// dotenv variables
const { CLIENT_ID, CLIENT_SECRET } = require('./config');
// const API = `https://airport-distance-backend.herokuapp.com/`;

// Amadeus client for getting authToken to make call to amadeus API 
var amadeus = new Amadeus({
    clientId: CLIENT_ID,
    clientSecret: CLIENT_SECRET
});

// Endpoint
router.get(`/airports`, async (req, res, next) => {
    const { page, subType, keyword, countryCode } = req.query;
    // API call with params requested from client app
    const response = await amadeus.referenceData.locations.get({
        subType,
        keyword,
        "page[offset]": page * 10,
        "page[limit]": 5,
        countryCode
    }).then(function(response) {
        res.json(JSON.parse(response.body));
        console.log(response);
    }).catch(function(error) {
        res.json(error);
        console.error(error);
    });
});

// router.get(`/airport`, async (req, res, next) => {
//     // let locationId = 'AORD';
//     let id = req.query;
//     // API call with params requested from client app
//     const response = await amadeus.referenceData.location(id).get({id: 'AORD'})
//     .then(function(response) {
//         res.json(JSON.parse(response.body));
//         console.log(response);
//     }).catch(function(error) {
//         res.json(error);
//         console.error(error);
//     });
// });

module.exports = router;