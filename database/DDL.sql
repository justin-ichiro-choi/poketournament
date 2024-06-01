
-- Trainers
-- trainerID: int, not NULL, PK, auto_increment, 
-- trainerName: varchar, not NULL
-- trainerPhone: varchar(12), not NULL
-- trainerEmail: varchar(40)
-- NumberOfWins: int, not NULL
-- Relationship: a 1:M relationship between Trainers and Pokémon.
--		An individual trainer can have 6 different Pokemon data records associated based on the trainerID.
--		Foreign Key for this relationship will be trainerID when in the Pokemon Schema
CREATE OR REPLACE TABLE Trainers (
    trainerID INT(12) NOT NULL AUTO_INCREMENT,
    trainerName VARCHAR(50) NOT NULL,
    trainerPhone VARCHAR(12) NOT NULL,
    trainerEmail VARCHAR(40),
    numberOfWins INT NOT NULL,
    PRIMARY KEY (trainerID)
);

-- Pokémon
-- pokemonID: (PK, autoincrement)
-- pokemonName: varchar(30), not NULL
-- pokemonLevel: int, not NULL
-- primaryType: varchar(12), not NULL, Foreign Key: (Example: Fire, Dark)
-- secondaryType: varchar(12) (Example: Fire, Dark)
-- heldItem: varchar(17)
-- trainerID: Foreign Key
-- movesetID: Foreign Key
-- Relationship: Many to One: Many Pokemon can be associated with Trainer: Foreign Key: trainerID
CREATE OR REPLACE TABLE Pokemon (
    pokemonID INT(12) NOT NULL AUTO_INCREMENT,
    pokemonName VARCHAR(30) NOT NULL,
    pokemonLevel INT NOT NULL,
    primaryType VARCHAR(12) NOT NULL,
    secondaryType VARCHAR(12),
    heldItem VARCHAR(17),
    trainerID INT,
    movesetID INT,
    PRIMARY KEY (pokemonID),
    FOREIGN KEY (trainerID) REFERENCES Trainers(trainerID),
    FOREIGN KEY (movesetID) REFERENCES PokemonMoveSet(moveSetID)
);

-- Matches
-- matchID: (int, autoincrement, not null) - Primary Key
-- roundNumber(int, not null)
-- contestant1: Foreign Key - trainerID 
-- contestant2: Foreign Key - trainerID
-- Relationship: a One to Many relationship between Matches and Trainers is implemented.
--		Each individual trainer can take part in multiple matches as part of the tournament. 

CREATE OR REPLACE TABLE Matches (
    matchID INT(12) NOT NULL AUTO_INCREMENT,
    roundNumber INT(4) NOT NULL,
    contestant1 INT,
    contestant2 INT,
    PRIMARY KEY (matchID),
    FOREIGN KEY (contestant1) REFERENCES Trainers(trainerID),
    FOREIGN KEY (contestant2) REFERENCES Trainers(trainerID)
);

-- Moves
-- moveID: Primary Key - int
-- moveName: (varchar: - Primary Key)
-- moveDescription: (varchar, not NULL)
-- movePower:  
-- moveDescription: (varchar, not NULL)
-- typeOfMove: (varchar)
CREATE OR REPLACE TABLE Moves (
    moveID INT(12) NOT NULL AUTO_INCREMENT,
    moveName VARCHAR(30) NOT NULL,
    moveDescription VARCHAR(255) NOT NULL,
    movePower INT,
    typeOfMove VARCHAR(12),
    PRIMARY KEY (moveID)
);

-- Moveset
-- pokemonID: Foreign Key
-- moveSetID: Primary Key
-- moveOne: Foreign Key
-- moveTwo: Foreign Key
-- moveThree: Foreign Key
-- moveFour: Foreign Key
CREATE OR REPLACE TABLE PokemonMoveSet (
    pokemonID INT(12),
    moveSetID INT(12) NOT NULL AUTO_INCREMENT,
    moveOne INT NOT NULL,
    moveTwo INT NOT NULL,
    moveThree INT NOT NULL,
    moveFour INT NOT NULL,
    PRIMARY KEY (moveSetID),
    FOREIGN KEY (pokemonID) REFERENCES Pokemon(pokemonID),
    FOREIGN KEY (moveOne) REFERENCES Moves(moveID),
    FOREIGN KEY (moveTwo) REFERENCES Moves(moveID),
    FOREIGN KEY (moveThree) REFERENCES Moves(moveID),
    FOREIGN KEY (moveFour) REFERENCES Moves(moveID)
);

-- Insert into Trainers table
INSERT INTO Trainers (trainerName, trainerPhone, trainerEmail, NumberOfWins) 
VALUES 
    ('Ash Ketchum', '123-456-7890', 'ash@example.com', 10),
    ('Misty', '987-654-3210', 'misty@example.com', 8),
    ('Brock', '555-555-5555', 'brock@example.com', 12);


-- Insert into Pokemon table
INSERT INTO Pokemon (pokemonName, pokemonLevel, primaryType, secondaryType, heldItem, trainerID, movesetID) 
VALUES 
    ('Pikachu', 50, 'Electric', NULL, 'Light Ball', 1, 1),
    ('Charizard', 55, 'Fire', 'Flying', 'Charizardite X', 1, 2),
    ('Starmie', 48, 'Water', 'Psychic', NULL, 2, 3),
    ('Onix', 45, 'Rock', 'Ground', 'Everstone', 3, 4);


-- Insert into Matches table
INSERT INTO Matches (roundNumber, contestant1, contestant2)
VALUES 
    (1, 1, 2),
    (1, 3, 1),
    (2, 2, 3);

-- Insert into Moves table
INSERT INTO Moves (moveName, moveDescription, movePower, typeOfMove) 
VALUES 
    ('Thunderbolt', 'A strong electric attack', 90, 'Electric'),
    ('Flamethrower', 'A powerful fire attack', 95, 'Fire'),
    ('Water Pulse', 'A water attack that may confuse', 60, 'Water'),
    ('Rock Slide', 'Hurls large boulders at the opposing team', 75, 'Rock');


-- Insert into Moveset table
INSERT INTO PokemonMoveSet (pokemonID, moveOne, moveTwo, moveThree, moveFour) 
VALUES 
    (1, 1, 4, NULL, NULL),
    (2, 2, 4, NULL, NULL),
    (3, 3, NULL, NULL, NULL),
    (4, 4, NULL, NULL, NULL);