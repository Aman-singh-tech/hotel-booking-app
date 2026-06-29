import { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import api from "../api";
import { AuthContext } from "../context/AuthContext";
import { Calendar, MapPin, XCircle } from "lucide-react";

const Bookings = () => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const { user } = useContext(AuthContext);

  useEffect(() => {
    fetchBookings();
  }, []);

  const fetchBookings = async () => {
    try {
      const res = await api.get("/bookings");
      setBookings(res.data.data);
    } catch (err) {
      setError("Failed to load bookings.");
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = async (id) => {
    if (!window.confirm("Are you sure you want to cancel this booking?")) return;
    try {
      await api.put(`/bookings/${id}/cancel`);
      fetchBookings(); // Refresh the list
    } catch (err) {
      alert("Failed to cancel booking.");
    }
  };

  if (loading) return <div className="text-center p-12 text-xl">Loading...</div>;

  return (
    <div className="container mx-auto p-4 py-8">
      <h1 className="text-3xl font-bold mb-8">My Bookings</h1>
      
      {error && <div className="bg-red-100 text-red-700 p-4 rounded mb-6">{error}</div>}
      
      {bookings.length === 0 ? (
        <div className="bg-white p-12 rounded-lg shadow text-center">
          <p className="text-xl text-gray-500 mb-4">You have no bookings yet.</p>
          <Link to="/" className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700">
            Explore Hotels
          </Link>
        </div>
      ) : (
        <div className="space-y-6">
          {bookings.map((booking) => (
            <div key={booking._id} className="bg-white rounded-lg shadow-md overflow-hidden flex flex-col md:flex-row">
              <img 
                src={booking.hotel.photos[0]} 
                alt={booking.hotel.name} 
                className="w-full md:w-64 h-48 md:h-auto object-cover"
              />
              <div className="p-6 flex-grow flex flex-col justify-between">
                <div>
                  <div className="flex justify-between items-start">
                    <h2 className="text-2xl font-bold text-gray-900 mb-1">{booking.hotel.name}</h2>
                    <span className={`px-3 py-1 rounded-full text-sm font-semibold ${
                      booking.status === "confirmed" ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"
                    }`}>
                      {booking.status.toUpperCase()}
                    </span>
                  </div>
                  <div className="flex items-center text-gray-600 mb-4">
                    <MapPin className="h-4 w-4 mr-1" />
                    <span>{booking.hotel.city}</span>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4 bg-gray-50 p-4 rounded-lg mb-4">
                    <div>
                      <span className="text-sm text-gray-500 block">Check In</span>
                      <span className="font-medium flex items-center">
                        <Calendar className="h-4 w-4 mr-2 text-blue-600" />
                        {new Date(booking.checkIn).toLocaleDateString()}
                      </span>
                    </div>
                    <div>
                      <span className="text-sm text-gray-500 block">Check Out</span>
                      <span className="font-medium flex items-center">
                        <Calendar className="h-4 w-4 mr-2 text-blue-600" />
                        {new Date(booking.checkOut).toLocaleDateString()}
                      </span>
                    </div>
                  </div>
                </div>
                
                <div className="flex justify-between items-center mt-4 pt-4 border-t border-gray-100">
                  <div className="text-xl font-bold text-gray-900">
                    Total: <span className="text-blue-600">${booking.totalCost}</span>
                  </div>
                  {booking.status === "confirmed" && (
                    <button 
                      onClick={() => handleCancel(booking._id)}
                      className="text-red-600 hover:text-red-800 flex items-center font-medium"
                    >
                      <XCircle className="h-5 w-5 mr-1" />
                      Cancel Booking
                    </button>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Bookings;
