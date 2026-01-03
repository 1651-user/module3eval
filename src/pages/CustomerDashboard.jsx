import { useState, useRef, useEffect } from 'react';
import { useRestaurant } from '../context/RestaurantContext';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import RestaurantCard from '../components/RestaurantCard';
import Navbar from '../components/Navbar';
import '../styles/Dashboard.css';

const CustomerDashboard = () => {
    const { restaurants } = useRestaurant();
    const { logout } = useAuth();
    const navigate = useNavigate();
    const searchInputRef = useRef(null);

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
                role="customer"
                onLogout={handleLogout}
                searchTerm={searchTerm}
                setSearchTerm={setSearchTerm}
                typeFilter={typeFilter}
                setTypeFilter={setTypeFilter}
                parkingFilter={parkingFilter}
                setParkingFilter={setParkingFilter}
                searchInputRef={searchInputRef}
            />

            <div className="dashboard-content customer-view">
                {/* Main Content - Restaurant Cards */}
                <main className="main-content full-width">
                    <h2>Available Restaurants ({filteredRestaurants.length})</h2>

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
                                    isAdmin={false}
                                />
                            ))}
                        </div>
                    )}
                </main>
            </div>
        </div>
    );
};

export default CustomerDashboard;
