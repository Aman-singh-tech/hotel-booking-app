import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import api from "../api";
import { Search, MapPin, Star, ArrowRight } from "lucide-react";

const Home = () => {
  const [hotels, setHotels] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchHotels();
  }, []);

  const fetchHotels = async (query = "") => {
    setLoading(true);
    try {
      const res = await api.get(`/hotels?search=${query}`);
      setHotels(res.data.data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (e) => {
    e.preventDefault();
    fetchHotels(search);
  };

  return (
    <div className="w-full">
      {/* Hero Section */}
      <div 
        className="relative h-[60vh] bg-cover bg-center flex items-center justify-center"
        style={{ backgroundImage: "url('https://images.unsplash.com/photo-1542314831-c53cd4b85ca4?auto=format&fit=crop&q=80&w=2000')" }}
      >
        <div className="absolute inset-0 bg-black opacity-50"></div>
        <div className="relative z-10 text-center px-4 w-full max-w-4xl">
          <h1 className="text-5xl md:text-6xl font-extrabold text-white mb-6 tracking-tight">
            Find Your Perfect Stay
          </h1>
          <p className="text-xl text-gray-200 mb-10">
            Discover luxury hotels, cozy inns, and unforgettable experiences.
          </p>
          
          <form onSubmit={handleSearch} className="flex bg-white rounded-full shadow-2xl p-2 max-w-2xl mx-auto items-center">
            <div className="pl-4 text-gray-400">
              <Search className="h-6 w-6" />
            </div>
            <input
              type="text"
              placeholder="Where are you going? (e.g., New York)"
              className="w-full p-4 rounded-full border-none focus:ring-0 text-lg outline-none"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
            <button 
              type="submit" 
              className="bg-blue-600 text-white px-8 py-4 rounded-full font-bold hover:bg-blue-700 transition-colors shadow-md"
            >
              Search
            </button>
          </form>
        </div>
      </div>

      {/* Explore Hotels Section */}
      <div className="container mx-auto px-4 py-16">
        <div className="flex justify-between items-end mb-10">
          <div>
            <h2 className="text-3xl font-bold text-gray-900 mb-2">Explore Hotels</h2>
            <p className="text-gray-600">Handpicked accommodations for your next adventure.</p>
          </div>
          <button onClick={() => fetchHotels("")} className="text-blue-600 font-semibold hover:text-blue-800 flex items-center">
            View All <ArrowRight className="h-4 w-4 ml-1" />
          </button>
        </div>

        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[1, 2, 3].map(n => (
              <div key={n} className="bg-gray-200 animate-pulse h-80 rounded-2xl"></div>
            ))}
          </div>
        ) : hotels.length === 0 ? (
          <div className="text-center py-20 bg-gray-50 rounded-2xl border border-gray-100">
            <h3 className="text-2xl font-semibold text-gray-700 mb-2">No hotels found</h3>
            <p className="text-gray-500">Try adjusting your search criteria.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {hotels.map((hotel) => (
              <Link to={`/hotels/${hotel._id}`} key={hotel._id} className="group cursor-pointer">
                <div className="bg-white rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-100 h-full flex flex-col">
                  
                  {/* Image Container with Hover Effect */}
                  <div className="relative h-60 overflow-hidden">
                    <img 
                      src={hotel.photos[0]} 
                      alt={hotel.name} 
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" 
                    />
                    <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-2 py-1 rounded-lg flex items-center font-bold text-sm shadow-sm text-gray-800">
                      <Star className="h-4 w-4 text-yellow-500 mr-1 fill-yellow-500" />
                      {hotel.rating}
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-6 flex flex-col flex-grow">
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="text-xl font-bold text-gray-900 group-hover:text-blue-600 transition-colors line-clamp-1">
                        {hotel.name}
                      </h3>
                    </div>
                    
                    <div className="flex items-center text-gray-500 mb-4 text-sm">
                      <MapPin className="h-4 w-4 mr-1 flex-shrink-0" />
                      <span className="truncate">{hotel.city} • {hotel.address}</span>
                    </div>

                    <div className="mt-auto pt-4 border-t border-gray-100 flex justify-between items-center">
                      <div>
                        <span className="text-2xl font-bold text-blue-600">${hotel.pricePerNight}</span>
                        <span className="text-gray-500 text-sm"> / night</span>
                      </div>
                      <span className="bg-blue-50 text-blue-600 px-4 py-2 rounded-lg font-semibold group-hover:bg-blue-600 group-hover:text-white transition-colors">
                        Book
                      </span>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Home;
