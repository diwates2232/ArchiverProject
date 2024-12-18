const { fetchRegionData } = require("../services/excelService");

// Controller to handle region data request
const getRegionDetails = async (req, res) => {
    const { regionName } = req.params;

    try {
        const regionData = await fetchRegionData(regionName);

        if (!regionData) {
            return res.status(404).json({ error: "Region not found" });
        }

        res.status(200).json(regionData);
    } catch (error) {
        res.status(500).json({ error: "Internal server error", details: error.message });
    }
};

module.exports = { getRegionDetails };
