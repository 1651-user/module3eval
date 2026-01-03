import { useNavigate } from 'react-router-dom';
import { useRestaurant } from '../context/RestaurantContext';
import '../styles/RestaurantCard.css';

const RestaurantCard = ({ restaurant, isAdmin }) => {
    const navigate = useNavigate();
    const { deleteRestaurant } = useRestaurant();

    const handleUpdate = () => {
        navigate(`/admin/restaurants/update/${restaurant.restaurantID}`);
    };

    const handleDelete = () => {
        // EDGE CASE: Show confirm dialog before deleting
        const confirmed = confirm('Are you sure you want to delete this restaurant?');

        if (confirmed) {
            deleteRestaurant(restaurant.restaurantID);

            // Show success alert
            alert('Restaurant deleted successfully! ✅');
        }
    };

    // Use a default image if none provided
    const imageUrl = restaurant.image || 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=400&h=300&fit=crop';

    // Normalize parking lot value
    const hasParking = restaurant.parkingLot === 'true' || restaurant.parkingLot === true;

    return (
        <div className="restaurant-card">
            <img
                src={imageUrl}
                alt={restaurant.restaurantName}
                className="restaurant-image"
                onError={(e) => {
                    e.target.onerror = null; // Prevent infinite loop
                    e.target.src = 'https://via.placeholder.com/300x200/007bff/ffffff?text=Restaurant';
                }}
            />

            <div className="restaurant-info">
                <h3>{restaurant.restaurantName}</h3>
                <p className="address">📍 {restaurant.address}</p>
                <p className="type">{restaurant.type}</p>
                <p className="parking">
                    🅿️ Parking: {hasParking ? 'Available' : 'Not Available'}
                </p>

                {isAdmin && (
                    <div className="card-actions">
                        <button onClick={handleUpdate} className="update-btn">
                            Update
                        </button>
                        <button onClick={handleDelete} className="delete-btn">
                            Delete
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
};

export default RestaurantCard;
