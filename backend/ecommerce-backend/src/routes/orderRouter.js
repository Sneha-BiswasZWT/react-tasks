const express = require("express");
const router = express.Router();
const Controller = require("../controllers/orderController");
const { verifyToken, isAdmin, isCustomer } = require("../middlewares/auth");

//order routes
router.post("/orders", verifyToken, Controller.orderProduct);
router.get("/orders", verifyToken, isCustomer, Controller.orderHistory);
router.get("/orders/:id", verifyToken, Controller.orderDetails);
router.get("/allorders", verifyToken, isAdmin, Controller.getAllOrders);
router.put("/orders/:id", verifyToken, isAdmin, Controller.updateOrderStatus);

module.exports = router;
