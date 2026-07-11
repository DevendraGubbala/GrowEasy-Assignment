const express = require("express");
const multer = require("multer");
const Papa = require("papaparse");
const fs = require("fs");

const router = express.Router();
const upload = multer({ dest: "uploads/" });

router.post("/upload", upload.single("file"), async (req, res) => {
  try {
    // Read uploaded CSV
    const csvFile = fs.readFileSync(req.file.path, "utf8");

    // Parse CSV
    const parsed = Papa.parse(csvFile, {
      header: true,
      skipEmptyLines: true,
    });

    const parsedRecords = [];
    const skippedRecords = [];

    parsed.data.forEach((row) => {
      const name =
        row.Name ||
        row.name ||
        row.FullName ||
        row.fullName ||
        "";

      const email =
        row.Email ||
        row.email ||
        "";

      const phone =
        row.Phone ||
        row.phone ||
        row.Mobile ||
        row.mobile ||
        "";

      const city =
        row.City ||
        row.city ||
        "";

      const state =
        row.State ||
        row.state ||
        "";

      const company =
        row.Company ||
        row.company ||
        "";

      // Skip if both email and phone are missing
      if (!email && !phone) {
        skippedRecords.push(row);
        return;
      }

      parsedRecords.push({
        created_at: new Date().toISOString(),
        name: name,
        email: email,
        country_code: "+91",
        mobile_without_country_code: phone.replace("+91", ""),
        company: company,
        city: city,
        state: state,
        country: "India",
        lead_owner: "",
        crm_status: "GOOD_LEAD_FOLLOW_UP",
        crm_note: "",
        data_source: "",
        possession_time: "",
        description: "",
      });
    });

    const aiResponse = {
      parsedRecords,
      skippedRecords,
      totalImported: parsedRecords.length,
      totalSkipped: skippedRecords.length,
    };

    // Delete uploaded file
    fs.unlinkSync(req.file.path);

    // Send response
    res.json(aiResponse);

  } catch (error) {
    console.error(error);

    res.status(500).json({
      error: error.message,
    });
  }
});

module.exports = router;