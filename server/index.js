const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
dotenv.config();

//Import Database
const connectDB = require("./src/config/connectDB");

// Import routes
const imageKitRoutes = require("./src/routes/imagekit.route");
const authRoutes = require("./src/routes/auth.route");
const bookRoutes = require("./src/routes/book.route");
const borrowRoutes = require("./src/routes/borrow.route");
const userRoutes = require("./src/routes/user.route");

//Import Rate Limit
const rateLimit = require("express-rate-limit");

const app = express();

const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

connectDB(); // Connect to the database when the server starts

app.set("trust proxy", 1);

const authLimiter = rateLimit({
  windowMs: 10 * 60 * 1000, // 10 minutes
  max: 5, // Only 5 attempts allowed
  message: "Too many login attempts. Try again in 10 minutes.",
});

app.use("/api/auth", authLimiter); // stricter for auth

// Use routes
app.use("/api/imagekit", imageKitRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/books", bookRoutes);
app.use("/api/borrows", borrowRoutes);
app.use("/api/users", userRoutes);

//Use Job
require("./src/job/email.reminder");

app.get("/", (req, res) => {
  res.send("API is running...");
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
