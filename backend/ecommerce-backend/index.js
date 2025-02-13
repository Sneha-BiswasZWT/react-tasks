const express = require("express");
const app = express();
const { connectDB } = require("./config");
const path = require("path");

const port = 5000;

// Route Imports
const authRoutes = require("./src/routes/authrouter");
const userRoutes = require("./src/routes/userRouter");
const productRoutes = require("./src/routes/productRouter");
const cartRoutes = require("./src/routes/cartRouter");
const orderRoutes = require("./src/routes/orderRouter");

const log = require("./src/middlewares/log");
const cors = require("cors");

// ✅ CORS Middleware (Fixed)
const corsOptions = {
  origin: "http://localhost:5173", // Ensure this matches frontend URL
  credentials: true, // Allow cookies & credentials
  methods: ["GET", "POST", "PUT", "DELETE"],
  allowedHeaders: ["Content-Type", "Authorization"],
};
app.use(cors(corsOptions)); // ✅ Fixed this line

// Connect to Database
connectDB();

// Disable Cache
app.use((req, res, next) => {
  res.set("Cache-Control", "no-store");
  next();
});

// Middlewares
app.use(express.json()); // Parse JSON
app.use(express.urlencoded({ extended: false })); // Parse Form Data
app.use(log); // Custom Logging Middleware

// Routes
app.use("/api", userRoutes);
app.use("/api", productRoutes);
app.use("/api", authRoutes);
app.use("/api", cartRoutes);
app.use("/api", orderRoutes);
app.use("/uploads", express.static(path.join(__dirname, "src", "uploads")));

// Start Server
app.listen(port, () => {
  console.log(`\n✅ Server is running on http://localhost:${port}`);
});
