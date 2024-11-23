import React, { useRef, useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image, Animated } from 'react-native';

const FoodCard = ({ name, discount, toggleFavorite, isFavorite }) => {
    const scaleAnim = useRef(new Animated.Value(1)).current;
    const [favorite, setFavorite] = useState(isFavorite);

    // Handle Heart Click
    const handleHeartClick = () => {
        // Trigger animation
        Animated.sequence([
            Animated.timing(scaleAnim, {
                toValue: 1.3, // Scale up
                duration: 150,
                useNativeDriver: true,
            }),
            Animated.timing(scaleAnim, {
                toValue: 1, // Scale back to normal size
                duration: 150,
                useNativeDriver: true,
            }),
        ]).start(() => {
            toggleFavorite(name); // Update the parent state
            setFavorite(!favorite); // Toggle local favorite state
        });
    };

    return (
        <TouchableOpacity onPress={() => console.log(`Selected: ${name}`)} style={styles.card}>
            <Image
                source={{ uri: 'https://placeholder.pics/svg/380x161' }}
                style={styles.image}
            />
            <View style={styles.infoContainer}>
                <Text style={styles.foodName}>{name}</Text>
                <Text style={styles.discount}>{discount}</Text>
                <TouchableOpacity onPress={handleHeartClick} style={styles.favoriteIcon}>
                    <Animated.Text
                        style={{
                            fontSize: 28, // Larger size for the heart
                            color: favorite ? '#ff0000' : '#d3d3d3', // Red if favorite, grey otherwise
                            transform: [{ scale: scaleAnim }], // Scale animation
                        }}
                    >
                        {favorite ? '❤️' : '♡'}
                    </Animated.Text>
                </TouchableOpacity>
            </View>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    card: {
        flexDirection: 'row',
        borderRadius: 8,
        overflow: 'hidden',
        backgroundColor: '#fff',
        marginVertical: 10,
        elevation: 2,
    },
    image: {
        width: 100,
        height: 100,
    },
    infoContainer: {
        flex: 1,
        padding: 10,
        justifyContent: 'center',
    },
    foodName: {
        fontSize: 16,
        fontWeight: 'bold',
    },
    discount: {
        fontSize: 14,
        color: 'gray',
        marginTop: 5,
    },
    favoriteIcon: {
        position: 'absolute',
        top: 10,
        right: 10,
    },
});

export default FoodCard;
