//Citation Scope: Setting up Node app, connectiong to database, and implementing CRUD operations
// Date: 12/07/2024
// Orginality: Adapted
// Source: https://github.com/osu-cs340-ecampus/nodejs-starter-app/

// SETUP
var express = require('express');  // using express for the web server
var app     = express(); // instantiate an express object to interact with the server in our code
app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use(express.static('public'))
PORT        = 8083;

const { engine } = require('express-handlebars');
var exphbs = require('express-handlebars'); // Import express-handlebars
app.engine('.hbs', engine({extname: ".hbs"})); // Create an instance of the handlebars engine to process templates
app.set('view engine', '.hbs'); // Tell express to use the handlebars engine whenever it encounters


// Database
var db = require('./database/db-connector');
const e = require('express');

// ROUTES

// Homepage Route
app.get('/', function(req, res) 
{
    res.render('index'); 
});

// Dwellers Routes
// read dwellers
app.get('/dwellers', function(req, res)
    {

        let query1 = "SELECT * FROM Dwellers";                

        let query2 = "SELECT * FROM Greenhouses";
        
        db.pool.query(query1, function(error, rows, fields){
            if (error) {
                console.log(error);
                res.sendStatus(400);
            }
            else 
            {
                let dwellers = rows;

                db.pool.query(query2, (error, rows, fields) => {
                    if (error) {
                        console.log(error);
                        res.sendStatus(400);
                    }
                    else {
                        let greenhouses = rows;
                        return res.render('dwellers', {data: dwellers, greenhouses: greenhouses})
                    }
                })
            }
        })
});

// create a new dweller 
app.post('/add-dwellers', function(req, res)
{
    let data = req.body;

    let work_location = parseInt(data.work_location);
    if (isNaN(work_location))
    {
        work_location = 'NULL'
    }

    query1 = `INSERT INTO Dwellers (dweller_name, birthdate, work_location, role) VALUES ('${data.dweller_name}', '${data.birthdate}', ${work_location}, '${data.role}')`;
    db.pool.query(query1, function(error, rows, fields){
        if (error) {
            console.log(error);
            res.sendStatus(400);
        }
        else
        {
            query2 = `SELECT * FROM Dwellers;`;
            db.pool.query(query2, function(error, rows, fields){
                if (error) {
                    console.log(error);
                    res.sendStatus(400);
                }
                else{
                    res.send(rows);
                }
            })
        }
    })
});

// Vaults Routes
// read vaults
app.get('/vaults', function(req, res)
    {
        let query1 = "SELECT * FROM Vaults";                     
        
        db.pool.query(query1, function(error, rows, fields){ 
            if (error) {
                console.log(error);
                res.sendStatus(400);
            }
            else {
                res.render('vaults', {data: rows});
            }                  
        })
});

// add new vault
app.post('/add-vaults', function(req, res)
{
    let data = req.body;


    query1 = `INSERT INTO Vaults (overseer_name, location) VALUES ('${data.overseer_name}', '${data.location}')`;
    db.pool.query(query1, function(error, rows, fields){
        if (error) {
            console.log(error);
            res.sendStatus(400);
        }
        else
        {
            query2 = `SELECT * FROM Vaults;`;
            db.pool.query(query2, function(error, rows, fields){
                if (error) {
                    console.log(error);
                    res.sendStatus(400);
                }
                else{
                    res.send(rows);
                }
            })
        }
    })
});

// ResourceTypes Routes
// read resource types
app.get('/resourceTypes', function(req, res)
    {
        let query1 = "SELECT * FROM ResourceTypes";                     
        
        db.pool.query(query1, function(error, rows, fields){  
            if (error){
                console.log(error);
                res.sendStatus(400);
            }
            else{
                res.render('resourceTypes', {data: rows});  
            }                     
        })
});

// add resource type
app.post('/add-resourceTypes', function(req, res)
{
    let data = req.body;


    query1 = `INSERT INTO ResourceTypes (type_name) VALUES ('${data.type_name}')`;
    db.pool.query(query1, function(error, rows, fields){
        if (error) {
            console.log(error);
            res.sendStatus(400);
        }
        else
        {
            query2 = `SELECT * FROM ResourceTypes;`;
            db.pool.query(query2, function(error, rows, fields){
                if (error) {
                    console.log(error);
                    res.sendStatus(400);
                }
                else{
                    res.send(rows);
                }
            })
        }
    })
});

// Resources Routes
// read resources
app.get('/resources', function(req, res)
    {
        let query1 = "SELECT * FROM Resources";                

        let query2 = "SELECT * FROM ResourceTypes";
        
        db.pool.query(query1, function(error, rows, fields){ 
            if (error) {
                console.log(error);
                res.sendStatus(400);
            }
            else {

                let resources = rows;

                db.pool.query(query2, (error, rows, fields) => {
                    if (error) {
                        console.log(error);
                        res.sendStatus(400);
                    } else {

                        let resourceTypes = rows;
                        return res.render('resources', {data: resources, resourceTypes: resourceTypes})
                    }
                })
            }
        })
});

// add resource
app.post('/add-resources', function(req, res)
{
    let data = req.body;


    query1 = `INSERT INTO Resources (resource_name, resource_type) VALUES ('${data.resource_name}', '${data.resource_type}')`;
    db.pool.query(query1, function(error, rows, fields){
        if (error) {
            console.log(error);
            res.sendStatus(400);
        }
        else
        {
            query2 = `SELECT * FROM Resources;`;
            db.pool.query(query2, function(error, rows, fields){
                if (error) {
                    console.log(error);
                    res.sendStatus(400);
                }
                else{
                    res.send(rows);
                }
            })
        }
    })
});


// Crops Routes
// read crops
app.get('/crops', function(req, res)
    {
        let query1 = "SELECT * FROM Crops";                     
        
        db.pool.query(query1, function(error, rows, fields){  
            if (error) {
                console.log(error);
                res.sendStatus(400);
            } else { 

                res.render('crops', {data: rows});     
            }            
        })
});

// add crop
app.post('/add-crops-ajax', function(req, res)
{
    // Capture the incoming data and parse it back to a JS object
    let data = req.body;

    // Create the query and run it on the database
    query1 = `INSERT INTO Crops (crop_name, avg_yield) VALUES ('${data.crop_name}', '${data.avg_yield}')`;
    db.pool.query(query1, function(error, rows, fields){

        // Check to see if there was an error
        if (error) {

            // Log the error to the terminal so we know what went wrong, and send the visitor an HTTP response 400 indicating it was a bad request.
            console.log(error);
            res.sendStatus(400);
        }
        else
        {
            // If there was no error, perform a SELECT * on Crops
            query2 = `SELECT * FROM Crops`;
            db.pool.query(query2, function(error, rows, fields){

                // If there was an error on the second query, send a 400
                if (error) {
                    
                    // Log the error to the terminal so we know what went wrong, and send the visitor an HTTP response 400 indicating it was a bad request.
                    console.log(error);
                    res.sendStatus(400);
                }
                // If all went well, send the results of the query back.
                else
                {
                    res.send(rows);
                }
            })
        }
    })
});

// delete crop
app.delete('/delete-crops-ajax', function(req, res, next)
{
    let data = req.body;
    let cropID = parseInt(data.crop_id)
    let deleteCrops = `DELETE FROM Crops WHERE crop_id = ?`;

        db.pool.query(deleteCrops, [cropID], function(error, rows, fields) {
            if (error) {
                // Log the error to the terminal so we know what went wrong, and send the visitor an HTTP response 400 indicating it was a bad request.
                console.log(error);
                res.sendStatus(400);
                } else {
                    res.sendStatus(204);
                }
        })
});

// Greenhouses Routes
// read greenhouses
app.get('/greenhouses', function(req, res)
    {
        let query1 = "SELECT * FROM Greenhouses";                    
        
        db.pool.query(query1, function(error, rows, fields){    
            if (error) {
                console.log(error);
                res.sendStatus(400);
            } else {
                res.render('greenhouses', {data: rows});
            }                  
        })
});

// add greenhouse
app.post('/add-greenhouses-ajax', function(req, res)
{
    // Capture the incoming data and parse it back to a JS object
    let data = req.body;

    // Create the query and run it on the database
    query1 = `INSERT INTO Greenhouses (crop_yield) VALUES ('${data.crop_yield}')`;
    db.pool.query(query1, function(error, rows, fields){

        // Check to see if there was an error
        if (error) {
            console.log(error);
            res.sendStatus(400);
        }
        else
        {
            // If there was no error, perform a SELECT * on Greenhouses
            query2 = `SELECT * FROM Greenhouses`;
            db.pool.query(query2, function(error, rows, fields){

                if (error) {
                    console.log(error);
                    res.sendStatus(400);
                }
                else
                {
                    res.send(rows);
                }
            })
        }
    })
});

// delete greenhouse
app.delete('/delete-greenhouses-ajax', function(req, res, next)
{
    let data = req.body;
    let greenhouseID = parseInt(data.greenhouse_id)
    let deleteGreenhouses = `DELETE FROM Greenhouses WHERE greenhouse_id = ?`;

        db.pool.query(deleteGreenhouses, [greenhouseID], function(error, rows, fields) {
            if (error) {
                // Log the error to the terminal so we know what went wrong, and send the visitor an HTTP response 400 indicating it was a bad request.
                console.log(error);
                res.sendStatus(400);
                } else {
                    res.sendStatus(204);
                }
        })
});

// Greenhouses_Crops Routes
// read greenhouses_crops
app.get('/greenhouses_crops', function(req, res)
    {   // define Greenhouses_Crops query
        let query1 = "SELECT Greenhouses_Crops.greenhouse_crop_id, Greenhouses_Crops.greenhouse_id, Greenhouses_Crops.crop_id, Crops.crop_name FROM Greenhouses_Crops INNER JOIN Crops ON Greenhouses_Crops.crop_id = Crops.crop_id;";              
        
        let query2 = "SELECT * FROM Crops;";

        let query3 = "SELECT * FROM Greenhouses;";

        db.pool.query(query1, function(error, rows, fields){               
            if (error) {
                console.log(error);
                res.sendStatus(400);
            } else {
                let greenhouses_crops = rows;

                db.pool.query(query2, (error, rows, fields) => {
                    if (error) {
                        console.log(error);
                        res.sendStatus(400);
                    } else {

                        let crops = rows;

                        db.pool.query(query3, (error, rows, fields) => {
                            if (error) {
                                console.log(error);
                                res.sendStatus(400);
                            } else {
                                let greenhouses = rows;
                                res.render('greenhouses_crops', {data: greenhouses_crops, crops:crops, greenhouses: greenhouses});  
                            }              
                        })
                    }
                })
            }
        })
});

// add greenhouses_crops
app.post('/add-greenhouses-crops-ajax', function(req, res)
{
    // Capture the incoming data and parse it back to a JS object
    let data = req.body;

    console.log("Incoming data:", data);

    // Create the query and run it on the database
    query1 = `INSERT INTO Greenhouses_Crops (greenhouse_id, crop_id) VALUES ('${data.greenhouse_id}', '${data.crop_id}')`;
    db.pool.query(query1, function(error, rows, fields){

        // Check to see if there was an error
        if (error) {

            // Log the error to the terminal so we know what went wrong, and send the visitor an HTTP response 400 indicating it was a bad request.
            console.log(error);
            res.sendStatus(400);
        }
        else
        {
            // If there was no error, perform a SELECT * on Greenhouses
            query2 = `SELECT Greenhouses_Crops.greenhouse_crop_id, Greenhouses_Crops.greenhouse_id, Greenhouses_Crops.crop_id, Crops.crop_name FROM Greenhouses_Crops INNER JOIN Crops ON Greenhouses_Crops.crop_id = Crops.crop_id`;

            db.pool.query(query2, function(error, rows, fields){

                // If there was an error on the second query, send a 400
                if (error) {
                    
                    // Log the error to the terminal so we know what went wrong, and send the visitor an HTTP response 400 indicating it was a bad request.
                    console.log(error);
                    res.sendStatus(400);
                }
                // If all went well, send the results of the query back.
                else
                {
                    res.send(rows);
                }
            })
        }
    })
});

// delete greenhouses_crops
app.delete('/delete-greenhouses-crops-ajax', function(req, res, next)
{
    let data = req.body;
    let greenhouseCropID = parseInt(data.greenhouse_crop_id)
    let deleteGreenhousesCrops = `DELETE FROM Greenhouses_Crops WHERE greenhouse_crop_id = ?`;

        db.pool.query(deleteGreenhousesCrops, [greenhouseCropID], function(error, rows, fields) {
            if (error) {
                // Log the error to the terminal so we know what went wrong, and send the visitor an HTTP response 400 indicating it was a bad request.
                console.log(error);
                res.sendStatus(400);
                } else {
                    res.sendStatus(204);
                }
        })
});

// update greenhouses_crops
app.put("/put-greenhouses-crops-ajax", function (req, res, next) {
    let data = req.body;
    console.log("Received data:", data);

    let cropID = parseInt(data.crop_id);
    let greenhouseCropID = parseInt(data.greenhouse_crop_id);
    let greenhouseID = parseInt(data.greenhouse_id);

    let queryUpdateGreenhousesCrops = `
        UPDATE Greenhouses_Crops
        SET crop_id = ?, greenhouse_id = ?
        WHERE greenhouse_crop_id = ?;`;

    db.pool.query(queryUpdateGreenhousesCrops, [cropID, greenhouseID, greenhouseCropID], function (error, rows, fields) {
        if (error) {
            console.error("Database query error:", error);
            return res.status(400).json({ error: "Database error" });
        }
        res.json({
            rows
        });
    });
});


// Trades Routes
// read trades
app.get('/trades', function(req, res)
    {
        let query1 = "SELECT * FROM Trades";  

        let query2 = "SELECT * FROM Vaults";

        let query3 = "SELECT * FROM Resources";

        let query4 = "SELECT * FROM Crops";

        db.pool.query(query1, function(error, rows, fields){ 
            if (error) {
                console.log(error);
                res.sendStatus(400);
            } else {
                let trades = rows;

                db.pool.query(query2, (error, rows, fields) => {
                    if (error) {
                        console.log(error);
                        res.sendStatus(400);
                    } else {
                        let vaults = rows;

                        db.pool.query(query3, (error, rows, fields) => {
                            if (error) {
                                console.log(error);
                                res.sendStatus(400);
                            } else {
                                let resources = rows;

                                db.pool.query(query4, (error, rows, fields) => {
                                    if (error) {
                                        console.log(error);
                                        res.sendStatus(400);
                                    } else {
                                        let crops = rows;

                                        return res.render('trades', {
                                        data: trades,
                                        vaults: vaults,
                                        resources: resources,
                                        crops: crops
                                        })
                                    }
                                })
                            }
                        })
                    }
                })
            }
        })
    }
);

// add trade
app.post('/add-trades', function(req, res)
{
    let data = req.body;

    // Handle optional ID fields
    // Check if the value is empty string or undefined first
    let vault_id = (!data.vault_id || data.vault_id === '') ? 'NULL' : parseInt(data.vault_id);
    let resource_id = (!data.resource_id || data.resource_id === '') ? 'NULL' : parseInt(data.resource_id);
    let crop_id = (!data.crop_id || data.crop_id === '') ? 'NULL' : parseInt(data.crop_id);

    // Additional validation to catch NaN
    if (isNaN(vault_id)) vault_id = 'NULL';
    if (isNaN(resource_id)) resource_id = 'NULL';
    if (isNaN(crop_id)) crop_id = 'NULL';

    // Create query using parameterized values for non-NULL
    let query1 = `
        INSERT INTO Trades 
        (vault_id, resource_id, resource_amount, crop_id, crop_amount, trade_date, status)
        VALUES 
        (${vault_id}, ${resource_id}, ?, ${crop_id}, ?, ?, ?)
    `;

    // Create params array for non-NULL fields
    let params = [
        data.resource_amount,
        data.crop_amount,
        data.trade_date,
        data.status
    ];
    db.pool.query(query1, params, function(error, rows, fields){
        if (error) {
            console.log(error);
            res.sendStatus(400);
        }
        else
        {
            query2 = `SELECT * FROM Trades;`;
            db.pool.query(query2, function(error, rows, fields){
                if (error) {
                    console.log("Error fetching trades:", error);
                    res.sendStatus(400);
                }
                else{
                    res.send(rows);
                }
            })
        }
    })
});

// update trade
app.put("/put-trades-ajax", function (req, res, next) {
    let data = req.body;
    console.log("Received data:", data);

    // Handle nullable fields
    let vault_id = data.vault_id === null ? 'NULL' : parseInt(data.vault_id);
    let resource_id = data.resource_id === null ? 'NULL' : parseInt(data.resource_id);
    let crop_id = data.crop_id === null ? 'NULL' : parseInt(data.crop_id);

    let queryUpdateTrades = `
        UPDATE Trades
        SET vault_id = ${vault_id}, 
            resource_id = ${resource_id}, 
            resource_amount = ?, 
            crop_id = ${crop_id}, 
            crop_amount = ?, 
            trade_date = ?,
            status = ?
        WHERE trade_id = ?;`;

    // Only include non-NULL values in the query parameters
    let queryParams = [
        data.resource_amount,
        data.crop_amount,
        data.trade_date,
        data.status,
        data.trade_id
    ];

    db.pool.query(queryUpdateTrades, queryParams, function (error, rows, fields) {
        if (error) {
            console.error("Database query error:", error);
            return res.status(400).json({ error: "Database error" });
        }
        res.json({
            rows
        });
    });
});

// LISTENER
app.listen(PORT, function(){            
    // This is the basic syntax for what is called the 'listener' which receives incoming requests on the specified PORT.
    console.log('Express started on http://localhost:' + PORT + '; press Ctrl-C to terminate.')
});