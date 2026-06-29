const mongoose = require("mongoose");
const dotenv = require("dotenv");
const User = require("./models/User");
const Hotel = require("./models/Hotel");
const Booking = require("./models/Booking");
const bcrypt = require("bcrypt");

dotenv.config();

mongoose.connect(process.env.MONGODB_URI);

const seedData = async () => {
  try {
    await User.deleteMany();
    await Hotel.deleteMany();
    await Booking.deleteMany();

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash("admin123", salt);

    const admin = await User.create({
      name: "Admin User",
      email: "admin@example.com",
      password: hashedPassword,
      isAdmin: true,
    });

    const user = await User.create({
      name: "Test User",
      email: "user@example.com",
      password: await bcrypt.hash("user123", salt),
      isAdmin: false,
    });

    await Hotel.insertMany([
      {
        name: "Grand Hotel Resort",
        description: "A luxury resort with beautiful views and top-notch facilities.",
        city: "New York",
        address: "123 5th Ave, NY 10001",
        pricePerNight: 250,
        facilities: ["Free Wi-Fi", "Pool", "Spa", "Gym", "Restaurant"],
        rating: 5,
        photos: ["https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&q=80&w=1000"],
      },
      {
        name: "Cozy Inn",
        description: "A small and comfortable inn perfect for short stays.",
        city: "San Francisco",
        address: "456 Market St, SF 94103",
        pricePerNight: 100,
        facilities: ["Free Wi-Fi", "Breakfast"],
        rating: 4,
        photos: ["https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?auto=format&fit=crop&q=80&w=1000"],
      },
    ]);

    console.log("Data Destroyed and Seeded Successfully");
    process.exit();
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
};

seedData();
