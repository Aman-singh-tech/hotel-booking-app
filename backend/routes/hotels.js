const express = require("express");
const {
  getHotels,
  getHotel,
  createHotel,
  updateHotel,
  deleteHotel,
} = require("../controllers/hotelController");
const { protect, authorizeAdmin } = require("../middleware/auth");

const router = express.Router();

router
  .route("/")
  .get(getHotels)
  .post(protect, authorizeAdmin, createHotel);

router
  .route("/:id")
  .get(getHotel)
  .put(protect, authorizeAdmin, updateHotel)
  .delete(protect, authorizeAdmin, deleteHotel);

module.exports = router;
