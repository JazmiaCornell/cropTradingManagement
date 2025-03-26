/*
    CS340 PROJECT GROUP 100
        VAULT 100 TRADING MANAGEMENT SYSTEM
    TEAM MEMBERS
        JAZMIA CORNELL, BRADLEY SOMMER
*/

/*
SET FOREIGN_KEY_CHECKS=0;
SET AUTOCOMMIT = 0;

-- Drop Tables
DROP TABLE IF EXISTS Trades;
DROP TABLE IF EXISTS Greenhouses_Crops;
DROP TABLE IF EXISTS Dwellers;
DROP TABLE IF EXISTS Greenhouses;
DROP TABLE IF EXISTS Crops;
DROP TABLE IF EXISTS Vaults;
DROP TABLE IF EXISTS ResourceTypes;
DROP TABLE IF EXISTS Resources;

*/

-- Create table for ResourceTypeS
CREATE TABLE ResourceTypes (
    type_id INT NOT NULL AUTO_INCREMENT,
    type_name VARCHAE(50) NOT NULL,
    PRIMARY KEY (type_id)
);


-- Create table for Resources
CREATE TABLE Resources (
    resource_id INT NOT NULL AUTO_INCREMENT,
    resource_name VARCHAR(75) NOT NULL,
    resource_type INT NOT NULL,
    PRIMARY KEY (resource_id),
    FOREIGN KEY (resource_type) REFERENCES ResourceTypes(type_id) ON DELETE CASCADE
);

-- Create table for Vaults
CREATE TABLE Vaults (
    vault_id INT NOT NULL AUTO_INCREMENT,
    overseer_name VARCHAR(145) NOT NULL,
    location VARCHAR(128) NOT NULL,
    PRIMARY KEY (vault_id)
);

-- Create table for Crops
CREATE TABLE Crops (
    crop_id INT NOT NULL AUTO_INCREMENT,
    crop_name VARCHAR(75) NOT NULL,
    avg_yield INT NOT NULL,
    PRIMARY KEY (crop_id)
);

-- Create table for Greenhouses
CREATE TABLE Greenhouses (
    greenhouse_id INT NOT NULL AUTO_INCREMENT,
    crop_yield INT NOT NULL,
    PRIMARY KEY (greenhouse_id)
);

-- Create table for Dwellers
CREATE TABLE Dwellers (
    dweller_id INT NOT NULL AUTO_INCREMENT,
    dweller_name VARCHAR(145) NOT NULL,
    birthdate DATE NOT NULL,
    work_location INT NULL,
    role VARCHAR(75) NOT NULL,
    PRIMARY KEY (dweller_id),
    FOREIGN KEY (work_location) REFERENCES Greenhouses(greenhouse_id) ON DELETE SET NULL
);

-- Create a PK for this table?
-- Create table for Greenhouses_Crops
CREATE TABLE Greenhouses_Crops (
    greenhouse_crop_id INT NOT NULL AUTO_INCREMENT,
    greenhouse_id INT NOT NULL,
    crop_id INT NOT NULL,
    PRIMARY KEY (greenhouse_crop_id),
    FOREIGN KEY (greenhouse_id) REFERENCES Greenhouses(greenhouse_id) ON DELETE CASCADE, 
    FOREIGN KEY (crop_id) REFERENCES Crops(crop_id) ON DELETE CASCADE
);

-- Create table for Trades
CREATE TABLE Trades (
    trade_id INT NOT NULL AUTO_INCREMENT,
    vault_id INT NULL,
    resource_id INT NULL,
    resource_amount INT NOT NULL,
    crop_id INT NULL,
    crop_amount INT NOT NULL,
    trade_date DATE NOT NULL,
    status INT NOT NULL DEFAULT 0,
    PRIMARY KEY (trade_id),
    FOREIGN KEY (vault_id) REFERENCES Vaults(vault_id) ON DELETE SET NULL, 
    FOREIGN KEY (resource_id) REFERENCES Resources(resource_id) ON DELETE SET NULL,
    FOREIGN KEY (crop_id) REFERENCES Crops(crop_id) ON DELETE SET NULL
);

/*
SET FOREIGN_KEY_CHECKS=1;
COMMIT;
*/
-- Add sample data below here:

-- ResourceTypes (categories of supplies other vaults might trade)
INSERT INTO ResourceTypes (type_name)
VALUES
    ('Healthcare'),
    ('Raw Material'),
    ('Technology');

-- Resources (various supplies other vaults might trade)
INSERT INTO Resources (resource_name, resource_type) 
VALUES
    ('Medical Supplies', 1),
    ('Water Purification Chips', 3),
    ('Steel', 2),
    ('Electronic Parts', 3),
    ('Chemical Components', 2);


-- Vaults (trading partners)
INSERT INTO Vaults (overseer_name, location) 
VALUES
    ('Sarah Mitchell', 'Vault 130'),
    ('Marcus Chen', 'Vault 225'),
    ('Elena Rodriguez', 'Vault 123'),
    ('James Wilson', 'Vault 66'),
    ('Diana Foster', 'Vault 42');

-- Crops (what Vault 100 can grow)
INSERT INTO Crops (crop_name, avg_yield) 
VALUES
    ('Corn', 1200),
    ('Potatoes', 1500),
    ('Wheat', 1000),
    ('Soybeans', 800),
    ('Tomatoes', 1300),
    ('Mushrooms', 600);

-- Greenhouses
INSERT INTO Greenhouses (crop_yield) 
VALUES
    (2000),
    (1500),
    (2500),
    (1200),
    (1800);

-- Dwellers (workers)
INSERT INTO Dwellers (dweller_name, birthdate, work_location, role) 
VALUES
    ('John Smith', '2040-05-15', 1, 'Greenhouse Manager'),
    ('Michael Wong', '2042-03-10', 2, 'Hydroponic Technician'),
    ('Sophie Anderson', '2046-01-18', 3, 'Crop Specialist'),
    ('David Kim', '2043-09-25', 4, 'Hydroponic Technician'),
    ('Maria Garcia', '2045-04-12', 5, 'Greenhouse Manager');

-- Greenhouse_Crops (which crops are grown where)
INSERT INTO Greenhouses_Crops (greenhouse_id, crop_id) 
VALUES
    (1, 1), -- Greenhouse 1 grows Corn
    (1, 2), -- Greenhouse 1 also grows Potatoes
    (2, 3), -- Greenhouse 2 grows Wheat
    (2, 4), -- Greenhouse 2 also grows Soybeans
    (3, 5), -- Greenhouse 3 grows Tomatoes
    (3, 6), -- Greenhouse 3 also grows Mushrooms
    (4, 1), -- Greenhouse 4 grows Corn
    (5, 5); -- Greenhouse 5 grows Tomatoes

-- default to pending for the trade status
-- Trades (recent trading history)
INSERT INTO Trades (vault_id, resource_id, resource_amount, crop_id, crop_amount, trade_date, status) 
VALUES
    (1, 1, 100, 1, 500, '2024-01-15', 1),  -- Completed trade
    (2, 2, 50, 2, 300, '2024-02-01', 1),   -- Completed trade
    (3, 3, 75, 3, 400, '2024-02-15', 0),   -- Pending trade
    (4, 4, 200, 4, 600, '2024-03-01', 1),  -- Completed trade
    (5, 5, 150, 5, 450, '2024-03-15', 2),  -- Denied trade
    (1, 5, 125, 6, 350, '2024-03-20', 0);  -- Pending trade

