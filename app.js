const express = require("express");
const adminRoutes = require("./routes/adminRoutes");
const mongoose = require("mongoose");
const bodyParser = require('body-parser');
const cors = require('cors');


const app = express();


// Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

// Connect to MongoDB
mongoose.connect(
  "mongodb+srv://mernstackchain:mUeEBhB2ct1cGkFR@cluster0.d3656hr.mongodb.net/myDatabase"
).then(() => {
  console.log("MongoDB is connected");
}).catch((err) => {
  console.error("MongoDB connection error:", err);
});


app.use("/generate", adminRoutes);
app.use("/getLink", adminRoutes);

// Start the server
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
