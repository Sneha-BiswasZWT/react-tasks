const express = require("express");
const app = express();
const { connectDB } = require("./config");

const port = 5000;

// routes IMPORTS
const authRoutes = require("./src/routes/authrouter");
const userRoutes = require("./src/routes/userRouter");
const productRoutes = require("./src/routes/productRouter");
const cartRoutes = require("./src/routes/cartRouter");
const orderRoutes = require("./src/routes/orderRouter");

const log = require("./src/middlewares/log");
const cors = require("cors");
app.use(cors()); // Allow frontend to access backend
//connect to database
connectDB();
app.use((req, res, next) => {
  res.set("Cache-Control", "no-store");
  next();
});

//middlewares
app.use(express.json()); // for parsing application/json
app.use(express.urlencoded({ extended: false }));
app.use(log);

//routes
app.use("/api", userRoutes);
app.use("/api", productRoutes);
app.use("/api", authRoutes);
app.use("/api", cartRoutes);
app.use("/api", orderRoutes);

//PORT
app.listen(port, () => {
  console.log(`\nServer is running on http://localhost:${port}`);
});
