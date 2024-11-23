import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, Image, TextInput, TouchableOpacity } from 'react-native';
import { MaterialIcons, Ionicons } from '@expo/vector-icons'; // Icons from expo vector icons

// SearchBar Component
const SearchBar = () => {
  return (
    <View style={searchStyles.container}>
      <TouchableOpacity>
        <MaterialIcons name="map" size={24} color="#6c7072" />
      </TouchableOpacity>
      <TextInput
        style={searchStyles.input}
        placeholder="Search"
        placeholderTextColor="#6c7072"
      />
      <Image
        source={{ uri: 'https://placeholder.pics/svg/16x16' }}
        style={searchStyles.icon}
      />
    </View>
  );
};

// TabBar Component
const TabBar = ({ activeTab, setActiveTab, favorites }) => {
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

// FoodCard Component
const FoodCard = ({ name, discount, toggleFavorite, isFavorite }) => {
  return (
    <TouchableOpacity onPress={() => console.log(`Selected: ${name}`)} style={foodStyles.card}>
      <Image
        source={{ uri: 'https://placeholder.pics/svg/380x161' }}
        style={foodStyles.image}
      />
      <View style={foodStyles.infoContainer}>
        <Text style={foodStyles.foodName}>{name}</Text>
        <Text style={foodStyles.discount}>{discount}</Text>
        <TouchableOpacity onPress={() => toggleFavorite(name)} style={foodStyles.favoriteIcon}>
          <Text>{isFavorite ? '❤️' : '♡'}</Text>
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );
};

// Main App Component
export default function App() {
  const [activeTab, setActiveTab] = useState('Explore');
  const [favorites, setFavorites] = useState([]);

  // Toggle favorite function
  const toggleFavorite = (name) => {
    if (favorites.includes(name)) {
      setFavorites(favorites.filter((item) => item !== name));
    } else {
      setFavorites([...favorites, name]);
    }
  };

  return (
    <View style={{ flex: 1 }}>
      {/* Settings and Notifications Icons */}
      <View style={styles.headerIcons}>
        <TouchableOpacity style={styles.notificationIcon}>
          <Ionicons name="notifications-outline" size={24} color="black" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.settingsIcon}>
          <Ionicons name="settings-outline" size={24} color="black" />
        </TouchableOpacity>
      </View>

      {/* Search Bar (Sticky) */}
      <SearchBar />

      {/* Tab Bar */}
      <TabBar activeTab={activeTab} setActiveTab={setActiveTab} favorites={favorites} />

      {/* Scrollable Content */}
      <ScrollView style={styles.scrollContainer}>
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
              <Text style={styles.noFavoritesText}>No favorites added yet.</Text>
            )}
          </>
        )}
      </ScrollView>
    </View>
  );
}

// Styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    padding: 10,
  },
  scrollContainer: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    paddingHorizontal: 10,
  },
  headerIcons: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginTop: 15, // 15px top margin as requested
    marginBottom: 10,
  },
  notificationIcon: {
    marginRight: 15,
  },
  settingsIcon: {},
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginVertical: 10,
  },
  noFavoritesText: {
    fontSize: 16,
    textAlign: 'center',
    color: '#6c7072',
    marginTop: 20,
  },
});

const searchStyles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f5f7f8',
    borderRadius: 1000,
    paddingHorizontal: 8,
    height: 49,
    marginVertical: 15,
  },
  icon: {
    width: 16,
    height: 16,
    marginLeft: 12,
  },
  input: {
    flex: 1,
    fontSize: 16,
    color: '#6c7072',
    marginLeft: 10,
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
    width: 94,
    height: 1,
    backgroundColor: '#ff0000',
    position: 'absolute',
    bottom: 0,
  },
});

const foodStyles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    borderRadius: 8,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 2,
    backgroundColor: '#fff',
    marginVertical: 10,
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
    color: 'red',
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