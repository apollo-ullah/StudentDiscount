import * as Location from 'expo-location';
import React, { useState, useEffect } from 'react';
import { Alert, View, Text, StyleSheet } from 'react-native';
import * as Notifications from 'expo-notifications';

// Configure notification handler
Notifications.setNotificationHandler({
    handleNotification: async () => ({
        shouldShowAlert: true,
        shouldPlaySound: false,
        shouldSetBadge: false,
    }),
});

const LocationScreen = () => {
    const [location, setLocation] = useState(null);

    // Request permissions for notifications
    useEffect(() => {
        const requestNotificationPermission = async () => {
            const { status } = await Notifications.requestPermissionsAsync();
            if (status !== 'granted') {
                Alert.alert('Notification Permission Denied', 'Push notifications won’t work.');
            }
        };
        requestNotificationPermission();
    }, []);

    // Request permissions and get location
    useEffect(() => {
        (async () => {
            let { status } = await Location.requestForegroundPermissionsAsync();
            if (status !== 'granted') {
                Alert.alert('Permission Denied', 'Location permission is required to use this feature.');
                return;
            }

            let loc = await Location.getCurrentPositionAsync({});
            setLocation(loc);

            if (loc) {
                const { latitude, longitude } = loc.coords;
                checkGeofence(latitude, longitude);
            }
        })();
    }, []);

    // Haversine distance calculation
    const haversineDistance = (lat1, lon1, lat2, lon2) => {
        const toRad = (angle) => (angle * Math.PI) / 180;
        const R = 6371e3; // Earth radius in meters
        const φ1 = toRad(lat1);
        const φ2 = toRad(lat2);
        const Δφ = toRad(lat2 - lat1);
        const Δλ = toRad(lon2 - lon1);

        const a = Math.sin(Δφ / 2) ** 2 +
            Math.cos(φ1) * Math.cos(φ2) * Math.sin(Δλ / 2) ** 2;
        const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

        return R * c; // Distance in meters
    };

    // Check if user is near a geofenced location
    const checkGeofence = async (userLat, userLon) => {
        for (const location of geofencedLocations) {
            const distance = haversineDistance(userLat, userLon, location.latitude, location.longitude);
            if (distance < location.radius) {
                await Notifications.scheduleNotificationAsync({
                    content: {
                        title: 'Discount Alert!',
                        body: `You are near ${location.name}. Don’t forget to use your discount!`,
                    },
                    trigger: null, // Send immediately
                });
            }
        }
    };

    return (
        <View style={styles.container}>
            {location ? (
                <Text>Current Location: {`Latitude: ${location.coords.latitude}, Longitude: ${location.coords.longitude}`}</Text>
            ) : (
                <Text>Fetching location...</Text>
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
    },
});

const geofencedLocations = [
    { name: 'Poulet Rouge', latitude: 45.504, longitude: -73.567, radius: 500 },
    { name: 'Lulu\'s', latitude: 45.506, longitude: -73.565, radius: 300 },
];

export default LocationScreen;
