const xlsx = require("xlsx");
const path = require("path");
const ping = require("ping");

// Paths for archivers and controllers Excel sheets
const archiverPath = path.join(__dirname, "../data/ArchiverData.xlsx");
const controllerPath = path.join(__dirname, "../data/ControllerData.xlsx");

// Function to fetch data from Excel and ping devices
const fetchRegionData = async (regionName) => {
    // Read Excel files
    const archiverWorkbook = xlsx.readFile(archiverPath);
    const controllerWorkbook = xlsx.readFile(controllerPath);
    
    const archiverSheet = archiverWorkbook.Sheets[archiverWorkbook.SheetNames[0]];
    const controllerSheet = controllerWorkbook.Sheets[controllerWorkbook.SheetNames[0]];

    const archiverData = xlsx.utils.sheet_to_json(archiverSheet);
    const controllerData = xlsx.utils.sheet_to_json(controllerSheet);

    // Filter archiver and controller data by region
    const regionArchivers = archiverData.filter((row) => row.Location.toLowerCase() === regionName.toLowerCase());
    const regionControllers = controllerData.filter((row) => row.Location.toLowerCase() === regionName.toLowerCase());

    // Ping devices to check status
    for (const device of [...regionArchivers, ...regionControllers]) {
        device.status = await pingDevice(device["Ip Address of archiver"] || device["Ip Address of controller"]);
    }

    return { archivers: regionArchivers, controllers: regionControllers };
};

// Function to ping a device
const pingDevice = (ip) => {
    return new Promise((resolve) => {
        ping.sys.probe(ip, (isAlive) => {
            resolve(isAlive ? "Online" : "Offline");
        });
    });
};

module.exports = { fetchRegionData };
