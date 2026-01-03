import { createContext, useContext, useState, useEffect } from 'react';

const RestaurantContext = createContext(null);

export const useRestaurant = () => {
    const context = useContext(RestaurantContext);
    if (!context) {
        throw new Error('useRestaurant must be used within RestaurantProvider');
    }
    return context;
};

export const RestaurantProvider = ({ children }) => {
    const [restaurants, setRestaurants] = useState([]);

    useEffect(() => {
        // Load restaurants from localStorage on mount
        const storedRestaurants = localStorage.getItem('evalData');
        if (storedRestaurants) {
            setRestaurants(JSON.parse(storedRestaurants));
        }
    }, []);

    // Sync to localStorage whenever restaurants change
    useEffect(() => {
        if (restaurants.length >= 0) {
            localStorage.setItem('evalData', JSON.stringify(restaurants));
        }
    }, [restaurants]);

    const addRestaurant = (restaurant) => {
        const newRestaurant = {
            ...restaurant,
            restaurantID: Date.now() // Auto-generate ID
        };
        setRestaurants(prev => [...prev, newRestaurant]);
        return newRestaurant;
    };

    const updateRestaurant = (restaurantID, updatedData) => {
        setRestaurants(prev =>
            prev.map(restaurant =>
                restaurant.restaurantID === restaurantID
                    ? { ...restaurant, ...updatedData }
                    : restaurant
            )
        );
    };

    const deleteRestaurant = (restaurantID) => {
        setRestaurants(prev =>
            prev.filter(restaurant => restaurant.restaurantID !== restaurantID)
        );
    };

    const getRestaurantById = (restaurantID) => {
        return restaurants.find(restaurant => restaurant.restaurantID === restaurantID);
    };

    const value = {
        restaurants,
        addRestaurant,
        updateRestaurant,
        deleteRestaurant,
        getRestaurantById
    };

    return (
        <RestaurantContext.Provider value={value}>
            {children}
        </RestaurantContext.Provider>
    );
};
