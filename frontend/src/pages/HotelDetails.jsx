import { useState, useEffect, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../api";
import { AuthContext } from "../context/AuthContext";
import { MapPin, Calendar, CreditCard, Check } from "lucide-react";

const HotelDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);
  
  const [hotel, setHotel] = useState(null);
  const [loading, setLoading] = useState(true);
  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");
  const [bookingSuccess, setBookingSuccess] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchHotel();
  }, [id]);

  const fetchHotel = async () => {
    try {
      const res = await api.get(`/hotels/${id}`);
      setHotel(res.data.data);
    } catch (err) {
      setError("Failed to load hotel details.");
    } finally {
      setLoading(false);
    }
  };

  const handleBooking = async (e) => {
    e.preventDefault();
    if (!user) {
      navigate("/login");
      return;
    }
    
    setError("");
    try {
      // Calculate total cost roughly
      const days = (new Date(checkOut) - new Date(checkIn)) / (1000 * 60 * 60 * 24);
      if (days <= 0) {
        setError("Check-out date must be after check-in date.");
        return;
      }
      const totalCost = days * hotel.pricePerNight;

      await api.post("/bookings", {
        hotel: hotel._id,
        checkIn,
        checkOut,
        totalCost
      });
      setBookingSuccess(true);
    } catch (err) {
      setError(err.response?.data?.error || "Failed to book hotel.");
    }
  };

  if (loading) return <div className="text-center p-12 text-xl">Loading...</div>;
  if (!hotel) return <div className="text-center p-12 text-xl text-red-600">{error}</div>;

  return (
    <div className="container mx-auto p-4 py-8">
      <div className="bg-white rounded-xl shadow-lg overflow-hidden">
        <div className="md:flex">
          <div className="md:flex-shrink-0 md:w-1/2">
            <img className="h-full w-full object-cover" src={hotel.photos[0]} alt={hotel.name} />
          </div>
          <div className="p-8 md:w-1/2 flex flex-col justify-between">
            <div>
              <div className="flex justify-between items-start">
                <h1 className="text-3xl font-bold text-gray-900 mb-2">{hotel.name}</h1>
                <div className="bg-blue-100 text-blue-800 text-sm font-bold px-3 py-1 rounded-full">
                  ★ {hotel.rating}
                </div>
              </div>
              
              <div className="flex items-center text-gray-600 mb-6">
                <MapPin className="h-4 w-4 mr-1" />
                <span>{hotel.address}, {hotel.city}</span>
              </div>
              
              <p className="text-gray-700 mb-6 line-clamp-4">{hotel.description}</p>
              
              <h3 className="font-semibold text-lg mb-2">Facilities:</h3>
              <div className="flex flex-wrap gap-2 mb-8">
                {hotel.facilities.map((fac, idx) => (
                  <span key={idx} className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm">
                    {fac}
                  </span>
                ))}
              </div>
            </div>

            <div className="bg-gray-50 p-6 rounded-lg border border-gray-200">
              <div className="flex justify-between items-center mb-4">
                <span className="text-gray-600">Price per night</span>
                <span className="text-3xl font-bold text-blue-600">${hotel.pricePerNight}</span>
              </div>
              
              {bookingSuccess ? (
                <div className="bg-green-100 text-green-800 p-4 rounded-lg flex items-center justify-center">
                  <Check className="h-5 w-5 mr-2" />
                  Booking Confirmed!
                </div>
              ) : (
                <form onSubmit={handleBooking} className="space-y-4">
                  {error && <div className="text-red-500 text-sm">{error}</div>}
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm text-gray-600 mb-1">Check In</label>
                      <input type="date" required className="w-full border rounded p-2" value={checkIn} onChange={e => setCheckIn(e.target.value)} />
                    </div>
                    <div>
                      <label className="block text-sm text-gray-600 mb-1">Check Out</label>
                      <input type="date" required className="w-full border rounded p-2" value={checkOut} onChange={e => setCheckOut(e.target.value)} />
                    </div>
                  </div>
                  <button type="submit" className="w-full bg-blue-600 text-white font-bold py-3 rounded-lg hover:bg-blue-700 flex justify-center items-center">
                    <CreditCard className="h-5 w-5 mr-2" />
                    Book Now
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HotelDetails;
