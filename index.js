const express = require("express");
const mongoose = require("mongoose");
const app = express();
const dotenv = require("dotenv");
dotenv.config();
// Middleware to parse JSON bodies
app.use(express.json());


// Import routes
const UserRoutes = require("./routes/UserRoutes");
const AdminRoutes = require("./routes/AdminRoutes");  // Correct import
const CourseRoutes = require("./routes/CourseRoutes");



app.use("/api/v1/user", UserRoutes);
app.use("/api/v1/admin", AdminRoutes); 
app.use("/api/v1/course", CourseRoutes);


// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(() => console.log("Connected to MongoDB"))
.catch((err) => console.error("MongoDB connection error:", err));

// Start server
app.listen(5001, () => {
    console.log("Server is running on port 5000");
});
