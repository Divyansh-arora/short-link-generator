const { nanoid } = require("nanoid");
const Url = require("../models/url");

module.exports = {
  redirectToOriginalUrl: async (req, res) => {
    try {
      const shortLink = req.params.shortenlink;
      const username = req.query.username;
      console.log(username, "username");
      console.log(shortLink, "shortLink");

      // Query the database directly
      const urlEntry = await Url.findOne({ shortLink, username });
      if (urlEntry) {
        // Redirect to original URL
        return res.redirect(urlEntry.originalUrl);
      } else {
        return res.status(404).send('Short link not found');
      }
    } catch (error) {
      console.error("Error finding URL entry:", error);
      return res.status(500).json({ error: 'Internal Server Error' });
    }
  },

  // Generate short link API endpoint
  generateShortLink: async (req, res) => {
    try {
      const { url, username } = req.body;
      if (!url || !username) {
        return res.status(400).json({ error: "URL and username are required" });
      }

      const shortLink = nanoid(8);
      const urlEntry = new Url({ originalUrl: url, shortLink, username });
      await urlEntry.save();

      res.json({
        shortLink: `${req.protocol}://${req.get("host")}/${shortLink}`,
        username: username,
      });
    } catch (error) {
      console.error("Error generating short link:", error);
      return res.status(500).json({ error: "Internal Server Error" });
    }
  },
};
