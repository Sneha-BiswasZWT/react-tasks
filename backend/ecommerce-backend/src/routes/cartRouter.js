const express = require("express");
const router = express.Router();
const Controller = require("../controllers/cartController");
const { verifyToken, isAdmin, isCustomer } = require("../middlewares/auth");

//cart routes
router.post("/cart", verifyToken, Controller.addToCart);
router.get("/cart", verifyToken, Controller.getCartItems);
router.delete("/cart/:id", verifyToken, Controller.deleteCartItem);

//wishlist routes
router.post("/wishlist", verifyToken, isCustomer, Controller.addToWishlist);
router.get("/wishlist", verifyToken, isCustomer, Controller.getWishlistItems);
router.delete(
  "/wishlist/:id",
  verifyToken,
  isCustomer,
  Controller.deleteWishlistItem
);

module.exports = router;
