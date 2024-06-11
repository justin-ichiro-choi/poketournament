// App.js

/*
    SETUP
*/
var express = require('express');   // We are using the express library for the web server
var app     = express();            // We need to instantiate an express object to interact with the server in our code
app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use(express.static('public'))

PORT        = 3298;                 // Set a port number at the top so it's easy to change in the future
var db = require('./database/db-connector');
const { engine } = require('express-handlebars');
var exphbs = require('express-handlebars');     // Import express-handlebars
app.engine('.hbs', engine({extname: ".hbs"}));  // Create an instance of the handlebars engine to process templates
app.set('view engine', '.hbs');                 // Tell express to use the handlebars engine whenever it encounters a *.hbs file.

/*
    ROUTES
*/
app.get('/trainers', function(req, res)
{  
        let query1;               // Define our query
        
        if (req.query.trainerName === undefined)
        {
            query1 = "SELECT * FROM Trainers;";
        }
        // If there is a query string, we assume this is a search, and return desired results
        else
        {
            query1 = `SELECT * FROM Trainers WHERE trainerName LIKE "${req.query.trainerName}%"`
        }

        db.pool.query(query1, function(error, rows, fields){    // Execute the query

            res.render('trainers', {data: rows});                  // Render the index.hbs file, and also send the renderer
        })                                                      // an object where 'data' is equal to the 'rows' we
    });                                               // TRAINERS PAGE + TABLE

app.get('/matches', function(req, res)
{  
    let query1;               // Define our query
    
    if (req.query.match === undefined)
    {
        query1 = "SELECT Matches.matchID, Matches.roundNumber, Matches.contestant1, Matches.contestant2, p1.trainerName as trainer1, p2.trainerName as trainer2 FROM Matches JOIN Trainers p1 on Matches.contestant1 = p1.trainerID JOIN Trainers p2 on Matches.contestant2 = p2.trainerID;"
    }
    // If there is a query string, we assume this is a search, and return desired results
    else
    {
        query1 = `SELECT * FROM Matches WHERE matchID LIKE "${req.query.trainerName}%"`
    }

    let query2;

    query2 = "SELECT * FROM Trainers;";
    
    db.pool.query(query1, function(error, rows, fields){    // Execute the query
        let matches = rows;
        
        db.pool.query(query2, (error, rows, fields) => {
            
            // Save the planets
            let trainerNames = rows;
            return res.render('matches', {data: matches, trainer: trainerNames});
        })
    })
});                                               // MACHES PAGE + TABLE

app.get('/', function(req, res)
{  
    return res.render('title');
});     // HOME PAGE

app.get('/moves', function(req, res)
{  
        let query1;               // Define our query
        
        if (req.query.trainerName === undefined)
        {
            query1 = "SELECT * FROM Moves;";
        }
        // If there is a query string, we assume this is a search, and return desired results
        else
        {
            query1 = `SELECT * FROM Moves WHERE moveName LIKE "${req.query.moveName}%"`
        }

        db.pool.query(query1, function(error, rows, fields){    // Execute the query

            res.render('moves', {data: rows});                  // Render the index.hbs file, and also send the renderer
        })                                                      // an object where 'data' is equal to the 'rows' we
});                                               // received back from the query


app.get('/pokemon', function(req, res)
{  
    let query1;               // Define our query
    
    if (req.query.pokemonName === undefined)
    {
        query1 = "SELECT * FROM Pokemon;";
    }
    // If there is a query string, we assume this is a search, and return desired results
    else
    {
        query1 = `SELECT * FROM Pokemon WHERE pokemonName LIKE "${req.query.pokemonName}%"`
    }

    db.pool.query(query1, function(error, rows, fields){    // Execute the query

        res.render('pokemon', {data: rows});                  // Render the index.hbs file, and also send the renderer
    })                                                      // an object where 'data' is equal to the 'rows' we
});                                               // received back from the query

app.get('/movesets', function(req, res)
{  
    let query1;               // Define our query
    
    if (req.query.moveSetID === undefined)
    {
        query1 = "SELECT * FROM PokemonMoveSet;";
    }
    // If there is a query string, we assume this is a search, and return desired results
    else
    {
        query1 = `SELECT * FROM PokemonMoveSet WHERE moveSetID LIKE "${req.query.moveSetID}%"`
    }

    db.pool.query(query1, function(error, rows, fields){    // Execute the query

        res.render('movesets', {data: rows});                  // Render the index.hbs file, and also send the renderer
    })                                                      // an object where 'data' is equal to the 'rows' we
});                                               // received back from the query

// app.js - ROUTES section

app.post('/add-trainer-form-ajax', function(req, res) 
{
    // Capture the incoming data and parse it back to a JS object
    let data = req.body;
    // Create the query and run it on the database
    query1 = `INSERT INTO Trainers (trainerName, trainerPhone, trainerEmail, numberOfWins) VALUES ('${data.name}', '${data.phoneNumber}', '${data.email}', ${data.numberOfWins})`;
    db.pool.query(query1, function(error, rows, fields){

        // Check to see if there was an error
        if (error) {

            // Log the error to the terminal so we know what went wrong, and send the visitor an HTTP response 400 indicating it was a bad request.
            console.log(error)
            res.sendStatus(400);
        }
        else
        {
            // If there was no error, perform a SELECT * on bsg_people
            query2 = `SELECT * FROM Trainers;`;
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

app.post('/add-match-form-ajax', function(req, res) 
{
    // Capture the incoming data and parse it back to a JS object
    let data = req.body;

    // Create the query and run it on the database
    query1 = `INSERT INTO Matches (roundNumber, contestant1, contestant2) VALUES ('${data.roundNumber}', '${data.contestant1}', ${data.contestant2})`;
    db.pool.query(query1, function(error, rows, fields){

        // Check to see if there was an error
        if (error) {

            // Log the error to the terminal so we know what went wrong, and send the visitor an HTTP response 400 indicating it was a bad request.
            console.log(error)
            res.sendStatus(400);
        }
        else
        {
            // If there was no error, perform a SELECT * on bsg_people
            query2 = `SELECT * FROM Matches;`;
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

app.post('/add-move-form-ajax', function(req, res) 
{
    // Capture the incoming data and parse it back to a JS object
    let data = req.body;

    // Create the query and run it on the database
    query1 = `INSERT INTO Moves (moveName, moveDescription, movePower, typeOfMove) VALUES ('${data.moveName}', '${data.moveDescription}', ${data.movePower}, '${data.moveType}')`;
    db.pool.query(query1, function(error, rows, fields){

        // Check to see if there was an error
        if (error) {

            // Log the error to the terminal so we know what went wrong, and send the visitor an HTTP response 400 indicating it was a bad request.
            console.log(error)
            res.sendStatus(400);
        }
        else
        {
            // If there was no error, perform a SELECT * on bsg_people
            query2 = `SELECT * FROM Moves;`;
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


app.delete('/delete-trainer-ajax/', function(req,res,next){
    let data = req.body;
    let trainerID = parseInt(data.id);
    let trainer_Cert_Delete = `DELETE FROM Trainers WHERE trainerID = ?`;
  
        // Run the 1st query
        db.pool.query(trainer_Cert_Delete, [trainerID], function(error, rows, fields){
            if (error) {

            // Log the error to the terminal so we know what went wrong, and send the visitor an HTTP response 400 indicating it was a bad request.
            console.log(error);
            res.sendStatus(400);
            }

            else
            {
                res.sendStatus(204)
            }
  })});

app.delete('/delete-match-ajax/', function(req,res,next){
  let data = req.body;
  let matchID = parseInt(data.id);
  let match_Cert_Delete = `DELETE FROM Matches WHERE matchID = ?`;

  db.pool.query(match_Cert_Delete, [matchID], function(error, rows, fields) {

        if (error) {
            console.log(error);
            res.sendStatus(400);
        } else {
            res.sendStatus(204);
        }
})});

app.delete('/delete-move-ajax/', function(req,res,next){
    let data = req.body;
    let moveID = parseInt(data.id);
    let move_Cert_Delete = `DELETE FROM Moves WHERE moveID = ?`;
  
    db.pool.query(move_Cert_Delete, [moveID], function(error, rows, fields) {
  
          if (error) {
              console.log(error);
              res.sendStatus(400);
          } else {
              res.sendStatus(204);
          }
  })});

app.put('/put-trainer-ajax', function(req,res,next){
    let data = req.body;

    let phone = (data.trainerPhone);
    let email = (data.trainerEmail);
    let numberOfWins = parseInt(data.numberOfWins);
    let trainerID = parseInt(data.trainerID);


    let queryUpdateWorld = `UPDATE Trainers SET trainerPhone = ?, trainerEmail = ?, numberOfWins = ? WHERE trainerID = ?;`;
    let query2 = `SELECT * FROM Trainers;`;

    // Run the 1st query
    db.pool.query(queryUpdateWorld, [phone, email, numberOfWins, trainerID], function(error, rows, fields){
        if (error) {

        // Log the error to the terminal so we know what went wrong, and send the visitor an HTTP response 400 indicating it was a bad request.
        console.log(error);
        res.sendStatus(400);

        } else {

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
        console.log('test')
})});

app.put('/put-match-ajax', function(req,res,next){
    let data = req.body;
  
    let homeworld = parseInt(data.homeworld);
    let person = parseInt(data.fullname);
  
    let queryUpdateWorld = `UPDATE bsg_people SET homeworld = ? WHERE bsg_people.id = ?`;
    let selectWorld = `SELECT * FROM bsg_planets WHERE id = ?`
  
          // Run the 1st query
          db.pool.query(queryUpdateWorld, [homeworld, person], function(error, rows, fields){
              if (error) {
  
              // Log the error to the terminal so we know what went wrong, and send the visitor an HTTP response 400 indicating it was a bad request.
              console.log(error);
              res.sendStatus(400);
              }
  
              // If there was no error, we run our second query and return that data so we can use it to update the people's
              // table on the front-end
              else
              {
                  // Run the second query
                  db.pool.query(selectWorld, [homeworld], function(error, rows, fields) {
  
                      if (error) {
                          console.log(error);
                          res.sendStatus(400);
                      } else {
                          res.send(rows);
                      }
                  })
              }
  })});
/*
    LISTENER
*/
app.listen(PORT, function(){            // This is the basic syntax for what is called the 'listener' which receives incoming requests on the specified PORT.
    console.log('Express started on http://localhost:' + PORT + '; press Ctrl-C to terminate.')
});