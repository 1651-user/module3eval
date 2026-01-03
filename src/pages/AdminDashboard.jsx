import { useState, useRef, useEffect } from 'react';
import { useRestaurant } from '../context/RestaurantContext';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import RestaurantCard from '../components/RestaurantCard';
import Navbar from '../components/Navbar';
import '../styles/Dashboard.css';

const AdminDashboard = () => {
    const { restaurants, addRestaurant } = useRestaurant();
    const { logout } = useAuth();
    const navigate = useNavigate();
    const searchInputRef = useRef(null);

    // Form states
    const [formData, setFormData] = useState({
        restaurantName: '',
        address: '',
        type: '',
        parkingLot: '',
        image: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=400&h=300&fit=crop'
    });

    // Search and filter states
    const [searchTerm, setSearchTerm] = useState('');
    const [typeFilter, setTypeFilter] = useState('');
    const [parkingFilter, setParkingFilter] = useState('');

    // Focus search input on component mount - demonstrating useRef
    useEffect(() => {
        if (searchInputRef.current) {
            searchInputRef.current.focus();
        }
    }, []);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        // EDGE CASE: Validate that form is not empty
        if (!formData.restaurantName.trim() ||
            !formData.address.trim() ||
            !formData.type ||
            !formData.parkingLot) {
            alert('Please fill in all fields before adding a restaurant');
            return;
        }

        // Add restaurant
        addRestaurant(formData);

        // Show success alert
        alert('Restaurant added successfully! ✅');

        // EDGE CASE: Clear form after successful addition
        setFormData({
            restaurantName: '',
            address: '',
            type: '',
            parkingLot: '',
            image: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=400&h=300&fit=crop'
        });
    };

    const handleLogout = () => {
        logout();
        navigate('/');
    };

    // Filter restaurants based on search and filters
    const filteredRestaurants = restaurants.filter(restaurant => {
        const matchesSearch =
            restaurant.restaurantName.toLowerCase().includes(searchTerm.toLowerCase()) ||
            restaurant.address.toLowerCase().includes(searchTerm.toLowerCase());

        const matchesType = !typeFilter || restaurant.type === typeFilter;
        const matchesParking = !parkingFilter || restaurant.parkingLot === parkingFilter;

        return matchesSearch && matchesType && matchesParking;
    });

    return (
        <div className="dashboard-container">
            <Navbar
                role="admin"
                onLogout={handleLogout}
                searchTerm={searchTerm}
                setSearchTerm={setSearchTerm}
                typeFilter={typeFilter}
                setTypeFilter={setTypeFilter}
                parkingFilter={parkingFilter}
                setParkingFilter={setParkingFilter}
                searchInputRef={searchInputRef}
            />

            <div className="dashboard-content">
                {/* Sidebar - Add Restaurant Form */}
                <aside className="sidebar">
                    <h2>Add Restaurant</h2>
                    <form onSubmit={handleSubmit} className="restaurant-form">
                        <div className="form-group">
                            <label htmlFor="restaurantName">Restaurant Name *</label>
                            <input
                                type="text"
                                id="restaurantName"
                                name="restaurantName"
                                value={formData.restaurantName}
                                onChange={handleInputChange}
                                placeholder="Enter restaurant name"
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="address">Address *</label>
                            <input
                                type="text"
                                id="address"
                                name="address"
                                value={formData.address}
                                onChange={handleInputChange}
                                placeholder="Enter address"
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="type">Type *</label>
                            <select
                                id="type"
                                name="type"
                                value={formData.type}
                                onChange={handleInputChange}
                            >
                                <option value="">Select type</option>
                                <option value="Rajasthani">Rajasthani</option>
                                <option value="Gujarati">Gujarati</option>
                                <option value="Mughlai">Mughlai</option>
                                <option value="Jain">Jain</option>
                                <option value="Thai">Thai</option>
                                <option value="North Indian">North Indian</option>
                                <option value="South Indian">South Indian</option>
                            </select>
                        </div>

                        <div className="form-group">
                            <label htmlFor="parkingLot">Parking Lot *</label>
                            <select
                                id="parkingLot"
                                name="parkingLot"
                                value={formData.parkingLot}
                                onChange={handleInputChange}
                            >
                                <option value="">Select parking availability</option>
                                <option value="true">Yes</option>
                                <option value="false">No</option>
                            </select>
                        </div>

                        <div className="form-group">
                            <label htmlFor="image">Image URL</label>
                            <input
                                type="text"
                                id="image"
                                name="image"
                                value={formData.image}
                                onChange={handleInputChange}
                                placeholder="Enter image URL"
                            />
                        </div>

                        <button type="submit" className="submit-btn">
                            Add Restaurant
                        </button>
                    </form>
                </aside>

                {/* Main Content - Restaurant Cards */}
                <main className="main-content">
                    <h2>Restaurant List ({filteredRestaurants.length})</h2>

                    {filteredRestaurants.length === 0 ? (
                        <div className="no-restaurants">
                            <p>No restaurants found</p>
                        </div>
                    ) : (
                        <div className="restaurant-grid">
                            {filteredRestaurants.map(restaurant => (
                                <RestaurantCard
                                    key={restaurant.restaurantID}
                                    restaurant={restaurant}
                                    isAdmin={true}
                                />
                            ))}
                        </div>
                    )}
                </main>
            </div>
        </div>
    );
};

export default AdminDashboard;
