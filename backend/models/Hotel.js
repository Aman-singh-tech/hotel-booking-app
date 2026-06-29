const mongoose = require("mongoose");

const hotelSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Please add a name"],
      trim: true,
      maxlength: [100, "Name can not be more than 100 characters"],
    },
    description: {
      type: String,
      required: [true, "Please add a description"],
      maxlength: [1000, "Description can not be more than 1000 characters"],
    },
    city: {
      type: String,
      required: [true, "Please add a city"],
    },
    address: {
      type: String,
      required: [true, "Please add an address"],
    },
    photos: {
      type: [String],
      default: ["https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&q=80&w=1000"],
    },
    pricePerNight: {
      type: Number,
      required: [true, "Please add price per night"],
    },
    facilities: {
      type: [String],
      required: [true, "Please add facilities"],
    },
    rating: {
      type: Number,
      min: [1, "Rating must be at least 1"],
      max: [5, "Rating must can not be more than 5"],
      default: 4,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Hotel", hotelSchema);
