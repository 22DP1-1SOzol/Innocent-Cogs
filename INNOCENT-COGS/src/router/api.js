// router/api.js
const express = require('express');
const router = express.Router();

// Example route that saves text
router.post('/save-text', async (req, res) => {
  try {
    // Validate data (if needed)
    if (!req.body.text) {
      return res.status(400).json({ error: "Text is required!" });
    }

    // Assume saveTextToDatabase is a function that saves the text to your database
    await saveTextToDatabase(req.body.text);
    
    res.status(200).json({ message: "Text saved successfully!" });
  } catch (err) {
    console.error(err); // Log error details for debugging
    res.status(500).json({ error: 'Something went wrong! Please try again later.' });
  }
});

module.exports = router;
