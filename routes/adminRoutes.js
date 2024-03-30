const express = require("express");
const router = express.Router();
const { generateShortLink ,redirectToOriginalUrl} = require("../controllers/Controller");
router.post('/link', generateShortLink);
router.get('/:shortenlink', redirectToOriginalUrl);

module.exports = router;
