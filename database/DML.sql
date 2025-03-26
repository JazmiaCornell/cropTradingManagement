-- These are some Database Manipulation queries for a partially implemented Project Website 
-- using the Vault 100 Crop Management System database.

-- crops.hbs

-- get all Crops' IDs, Names, and Average Yields
SELECT * FROM Crops;


-- add a new Crop
INSERT INTO Crops (crop_name, avg_yield) 
VALUES 
(
    '${data.crop_name}', 
    '${data.avg_yield}'
)

-- delete a crop
DELETE FROM Crops WHERE crop_id = ?;


-- greenhouses.hbs

-- get all Greenhouses' IDs, Crop Yields, Crops grown in Greenhouses
SELECT * FROM Greenhouses;

-- add a new Greenhouse
INSERT INTO Greenhouses (crop_yield) 
VALUES ('${data.crop_yield}');

-- delete a Greenhouse
DELETE FROM Greenhouses 
WHERE greenhouse_id = ?;


-- greenhouses_crops.hbs

-- get all Greenhouses and their associated Crops, returning greenhouse_crop_id, crop_name, and greenhouse_id
-- query1
SELECT Greenhouses_Crops.greenhouse_crop_id, Greenhouses_Crops.greenhouse_id, Greenhouses_Crops.crop_id, Crops.crop_name 
FROM Greenhouses_Crops 
INNER JOIN Crops 
ON Greenhouses_Crops.crop_id = Crops.crop_id

-- query2
SELECT * FROM Crops;

-- query3
SELECT * FROM Greenhouses;

-- add to Greenhouses_Crops
INSERT INTO Greenhouses_Crops (greenhouse_id, crop_id) 
VALUES 
(
    '${data.greenhouse_id}', 
    '${data.crop_id}'
)

-- delete from Greenhouses_Crops
DELETE FROM Greenhouses_Crops 
WHERE greenhouse_crop_id = ?;

-- update Greenhouses_Crops
UPDATE Greenhouses_Crops
SET crop_id = ?, greenhouse_id = ?
WHERE greenhouse_crop_id = ?;

-- dwellers.hbs

-- get all Dwellers' IDs, Names, Birthdates, Work Locations, Roles
-- query1
SELECT * FROM Dwellers;

-- returns foreign key (location) for dwellers
-- query2
SELECT * FROM Greenhouses;

-- add a new Dweller
INSERT INTO Dwellers (dweller_name, birthdate, work_location, role) 
VALUES ('${data.dweller_name}', '${data.birthdate}', ${work_location}, '${data.role}')


-- delete a Dweller
DELETE FROM Dwellers WHERE id = :dweller_id_from_dropdown_Input


-- vaults.hbs

-- get all Trading Vaults' IDs, Overseer Name, Vault Location
SELECT * FROM Vaults;

-- add a new Vault
INSERT INTO Vaults (overseer_name, location)
VALUES (
    '${data.overseer_name}', 
    '${data.location}'
)

-- resources.hbs

-- get all Resources' IDs, Names, Type IDs, Types
SELECT * FROM Resources;

-- get resource types names' for drop-down menu
SELECT * FROM ResourceTypes;

-- add a new Resource
INSERT INTO Resources (resource_name, resource_type) 
VALUES (
    '${data.resource_name}', 
    '${data.resource_type}'
)

-- resourceTypes.hbs

-- get all ResourceTypes
SELECT * FROM ResourceTypes;

-- add a new Resource Type
INSERT INTO ResourceTypes (type_name) 
VALUES (
    '${data.type_name}'
)

-- trades.hbs

-- get all Trades' IDs, Vault, Resources, Resource Types, Resource Quantity, Crop ID, Crop Quantity, Date, Status
SELECT * FROM Trades;
SELECT * FROM Vaults; -- get vault_id, location for drop-down
SELECT * FROM Resources; -- get resource_id, resource_name for drop-down
SELECT * FROM Crops; -- get crop_id, crop_name for drop-down

-- add a new Trade
INSERT INTO Trades (vault_id, resource_id, resource_amount, crop_id, crop_amount, trade_date, status) 
VALUES
(
    ${vault_id}, 
    ${resource_id}, 
    '${data.resource_amount}', 
    ${crop_id}, 
    '${data.crop_amount}', 
    '${data.trade_date}', 
    '${data.status}'
)

-- update Trades
UPDATE Trades
SET vault_id = ${vault_id}, 
    resource_id = ${resource_id}, 
    resource_amount = ?, 
    crop_id = ${crop_id}, 
    crop_amount = ?, 
    trade_date = ?,
    status = ?
WHERE trade_id = ?;`;