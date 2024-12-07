const express = require("express");
const { getRegionDetails } = require("../controllers/regionControllers");

const router = express.Router();

// Route to fetch region details
router.get("/:regionName", getRegionDetails);

module.exports = router;
