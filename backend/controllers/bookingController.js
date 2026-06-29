const Booking = require("../models/Booking");
const Hotel = require("../models/Hotel");

// @desc    Get all bookings (Admin gets all, User gets theirs)
// @route   GET /api/bookings
// @access  Private
exports.getBookings = async (req, res, next) => {
  try {
    let query;
    if (req.user.isAdmin) {
      query = Booking.find().populate({
        path: "hotel",
        select: "name city",
      }).populate({
        path: "user",
        select: "name email",
      });
    } else {
      query = Booking.find({ user: req.user.id }).populate({
        path: "hotel",
        select: "name city photos",
      });
    }

    const bookings = await query;
    res.status(200).json({ success: true, count: bookings.length, data: bookings });
  } catch (error) {
    next(error);
  }
};

// @desc    Get single booking
// @route   GET /api/bookings/:id
// @access  Private
exports.getBooking = async (req, res, next) => {
  try {
    const booking = await Booking.findById(req.params.id).populate({
      path: "hotel",
      select: "name city pricePerNight",
    });

    if (!booking) {
      return res.status(404).json({ success: false, error: "Booking not found" });
    }

    if (booking.user.toString() !== req.user.id && !req.user.isAdmin) {
      return res.status(401).json({ success: false, error: "Not authorized to view this booking" });
    }

    res.status(200).json({ success: true, data: booking });
  } catch (error) {
    next(error);
  }
};

// @desc    Create new booking
// @route   POST /api/bookings
// @access  Private
exports.createBooking = async (req, res, next) => {
  try {
    req.body.user = req.user.id;
    const hotel = await Hotel.findById(req.body.hotel);
    
    if (!hotel) {
      return res.status(404).json({ success: false, error: "Hotel not found" });
    }

    const booking = await Booking.create(req.body);
    res.status(201).json({ success: true, data: booking });
  } catch (error) {
    next(error);
  }
};

// @desc    Cancel booking
// @route   PUT /api/bookings/:id/cancel
// @access  Private
exports.cancelBooking = async (req, res, next) => {
  try {
    const booking = await Booking.findById(req.params.id);

    if (!booking) {
      return res.status(404).json({ success: false, error: "Booking not found" });
    }

    if (booking.user.toString() !== req.user.id && !req.user.isAdmin) {
      return res.status(401).json({ success: false, error: "Not authorized to cancel this booking" });
    }

    booking.status = "cancelled";
    await booking.save();

    res.status(200).json({ success: true, data: booking });
  } catch (error) {
    next(error);
  }
};
