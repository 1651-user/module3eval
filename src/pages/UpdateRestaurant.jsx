import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useRestaurant } from '../context/RestaurantContext';
import '../styles/UpdateRestaurant.css';

const UpdateRestaurant = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const { getRestaurantById, updateRestaurant } = useRestaurant();

    const [formData, setFormData] = useState({
        restaurantName: '',
        address: '',
        type: '',
        parkingLot: '',
        image: ''
    });

    useEffect(() => {
        // Pre-fill form with existing restaurant data
        const restaurant = getRestaurantById(Number(id));
        if (restaurant) {
            setFormData({
                restaurantName: restaurant.restaurantName,
                address: restaurant.address,
                type: restaurant.type,
                parkingLot: restaurant.parkingLot,
                image: restaurant.image
            });
        } else {
            navigate('/admin/dashboard');
        }
    }, [id, getRestaurantById, navigate]);

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
            alert('Please fill in all fields before updating the restaurant');
            return;
        }

        // EDGE CASE: Show confirm dialog before updating
        const confirmed = confirm('Are you sure you want to update this restaurant?');

        if (confirmed) {
            updateRestaurant(Number(id), formData);

            // Show success alert
            alert('Restaurant updated successfully! ✅');

            // Redirect back to dashboard
            navigate('/admin/dashboard');
        }
    };

    const handleCancel = () => {
        navigate('/admin/dashboard');
    };

    return (
        <div className="update-container">
            <div className="update-box">
                <h1>Update Restaurant</h1>

                <form onSubmit={handleSubmit} className="update-form">
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

                    <div className="button-group">
                        <button type="submit" className="update-btn">
                            Update Restaurant
                        </button>
                        <button type="button" onClick={handleCancel} className="cancel-btn">
                            Cancel
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default UpdateRestaurant;
