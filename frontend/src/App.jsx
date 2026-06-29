import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import HotelDetails from "./pages/HotelDetails";
import Bookings from "./pages/Bookings";

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="min-h-screen flex flex-col">
          <Navbar />
          <main className="flex-grow bg-gray-50">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/hotels/:id" element={<HotelDetails />} />
              <Route path="/bookings" element={<Bookings />} />
            </Routes>
          </main>
          <footer className="bg-gray-800 text-white text-center p-4">
            <p>&copy; 2026 HotelBooking. All rights reserved.</p>
          </footer>
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;
