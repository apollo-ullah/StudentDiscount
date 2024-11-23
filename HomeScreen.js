import React, { useState, useRef } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, Animated } from 'react-native';
import { MaterialIcons, Ionicons, Feather } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { BlurView } from 'expo-blur';
import FoodCard from './FoodCard';

// SearchBar Component
const SearchBar = () => {
    const [isFocused, setIsFocused] = useState(false);
    const scaleAnim = useRef(new Animated.Value(1)).current;

    const handleFocus = () => {
        setIsFocused(true);
        Animated.spring(scaleAnim, {
            toValue: 1.02,
            friction: 3,
            useNativeDriver: true,
        }).start();
    };

    const handleBlur = () => {
        setIsFocused(false);
        Animated.spring(scaleAnim, {
            toValue: 1,
            friction: 3,
            useNativeDriver: true,
        }).start();
    };

    return (
        <Animated.View style={[searchStyles.container, { transform: [{ scale: scaleAnim }] }]}>
            <MaterialIcons name="map" size={24} color="#ff3b30" style={searchStyles.mapIcon} />
            <TextInput
                style={searchStyles.input}
                placeholder="Discover restaurants nearby..."
                placeholderTextColor="#9ca3af"
                onFocus={handleFocus}
                onBlur={handleBlur}
            />
            {isFocused && (
                <TouchableOpacity style={searchStyles.filterButton}>
                    <Feather name="sliders" size={20} color="#ff3b30" />
                </TouchableOpacity>
            )}
        </Animated.View>
    );
};

// TabBar Component
const TabBar = ({ activeTab, setActiveTab }) => {
    const tabs = ['Explore', 'Favorites', 'Food', 'Other'];

    return (
        <View style={tabStyles.container}>
            {tabs.map((tab) => (
                <TouchableOpacity
                    key={tab}
                    onPress={() => setActiveTab(tab)}
                    style={tabStyles.tabButton}
                >
                    <Text style={[tabStyles.tabText, activeTab === tab && tabStyles.activeTabText]}>
                        {tab}
                    </Text>
                    {activeTab === tab && <View style={tabStyles.indicator} />}
                </TouchableOpacity>
            ))}
        </View>
    );
};

// HomeScreen Component
const HomeScreen = () => {
    const navigation = useNavigation();
    const [activeTab, setActiveTab] = useState('Explore');
    const [favorites, setFavorites] = useState([]);
    const scrollY = useRef(new Animated.Value(0)).current;

    const toggleFavorite = (name) => {
        if (favorites.includes(name)) {
            setFavorites(favorites.filter((item) => item !== name));
        } else {
            setFavorites([...favorites, name]);
        }
    };

    return (
        <View style={styles.container}>
            <BlurView intensity={50} style={styles.header}>
                <Text style={styles.headerTitle}>Discover</Text>
                <TouchableOpacity>
                    <Ionicons name="notifications-outline" size={24} color="#1f2937" />
                </TouchableOpacity>
            </BlurView>

            <SearchBar />
            <TabBar activeTab={activeTab} setActiveTab={setActiveTab} />

            <Animated.ScrollView
                style={styles.scrollContainer}
                showsVerticalScrollIndicator={false}
                onScroll={Animated.event(
                    [{ nativeEvent: { contentOffset: { y: scrollY } } }],
                    { useNativeDriver: true }
                )}
                scrollEventThrottle={16}
            >
                {activeTab === 'Explore' && (
                    <>
                        <Text style={styles.sectionTitle}>Near You</Text>
                        <FoodCard
                            name="Ganadara"
                            discount="15% Discount"
                            toggleFavorite={toggleFavorite}
                            isFavorite={favorites.includes('Ganadara')}
                        />
                        <Text style={styles.sectionTitle}>Recommended</Text>
                        <FoodCard
                            name="Poulet Rouge"
                            discount="15% Discount"
                            toggleFavorite={toggleFavorite}
                            isFavorite={favorites.includes('Poulet Rouge')}
                        />
                    </>
                )}
                {activeTab === 'Favorites' && (
                    <>
                        {favorites.length > 0 ? (
                            favorites.map((item) => (
                                <FoodCard
                                    key={item}
                                    name={item}
                                    discount="15% Discount"
                                    toggleFavorite={toggleFavorite}
                                    isFavorite={favorites.includes(item)}
                                />
                            ))
                        ) : (
                            <View style={styles.emptyStateContainer}>
                                <Ionicons name="heart-outline" size={64} color="#ff3b30" />
                                <Text style={styles.noFavoritesText}>No favorites yet</Text>
                                <Text style={styles.noFavoritesSubtext}>
                                    Save your favorite restaurants to access them quickly
                                </Text>
                            </View>
                        )}
                    </>
                )}
            </Animated.ScrollView>

            {/* Maps Button */}
            <TouchableOpacity
                style={styles.mapButton}
                onPress={() => navigation.navigate('Map')}
            >
                <Text style={styles.mapButtonText}>View Nearby Discounts</Text>
            </TouchableOpacity>
        </View>
    );
};

// Styles
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f5f5f5',
        paddingHorizontal: 10,
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingVertical: 10,
        paddingHorizontal: 15,
        backgroundColor: '#ffffffcc',
        borderRadius: 10,
        marginTop: 15,
    },
    headerTitle: {
        fontSize: 24,
        fontWeight: 'bold',
    },
    scrollContainer: {
        flex: 1,
    },
    sectionTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        marginVertical: 10,
    },
    emptyStateContainer: {
        alignItems: 'center',
        marginVertical: 20,
    },
    noFavoritesText: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#6c7072',
        marginTop: 10,
    },
    noFavoritesSubtext: {
        fontSize: 14,
        color: '#9ca3af',
        textAlign: 'center',
        marginHorizontal: 20,
    },
    mapButton: {
        marginVertical: 15,
        backgroundColor: '#ff0000',
        paddingVertical: 12,
        borderRadius: 8,
        alignItems: 'center',
        justifyContent: 'center',
    },
    mapButtonText: {
        fontSize: 16,
        color: '#fff',
        fontWeight: 'bold',
    },
});

const searchStyles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#f5f7f8',
        borderRadius: 50,
        paddingHorizontal: 10,
        height: 50,
        marginVertical: 15,
    },
    input: {
        flex: 1,
        fontSize: 16,
        color: '#6c7072',
        marginLeft: 10,
    },
    mapIcon: {
        marginRight: 10,
    },
});

const tabStyles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        backgroundColor: '#fff',
        height: 48,
    },
    tabButton: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    tabText: {
        fontSize: 16,
        color: '#6c7072',
    },
    activeTabText: {
        color: '#ff0000',
    },
    indicator: {
        height: 3,
        backgroundColor: '#ff0000',
        borderRadius: 2,
    },
});

export default HomeScreen;
