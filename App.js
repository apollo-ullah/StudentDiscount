import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, Image, TextInput, TouchableOpacity } from 'react-native';

// SearchBar Component
const SearchBar = () => {
  return (
    <View style={searchStyles.container}>
      <Image
        source={{ uri: 'https://placeholder.pics/svg/16x16' }}
        style={searchStyles.icon}
      />
      <TextInput
        style={searchStyles.input}
        placeholder="Search"
        placeholderTextColor="#6c7072"
      />
    </View>
  );
};

// TabBar Component
const TabBar = () => {
  const [activeTab, setActiveTab] = useState('Explore');
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

// PromoBanner Component
const PromoBanner = () => {
  return (
    <View style={promoStyles.container}>
      <Image
        source={{ uri: 'https://placeholder.pics/svg/380x160' }}
        style={promoStyles.image}
      />
      <View style={promoStyles.overlay}>
        <Text style={promoStyles.text}>Promotional Text Here</Text>
      </View>
    </View>
  );
};

// FoodCard Component
const FoodCard = ({ name, discount }) => {
  return (
    <View style={foodStyles.card}>
      <Image
        source={{ uri: 'https://placeholder.pics/svg/380x161' }}
        style={foodStyles.image}
      />
      <View style={foodStyles.infoContainer}>
        <Text style={foodStyles.foodName}>{name}</Text>
        <Text style={foodStyles.discount}>{discount}</Text>
        <TouchableOpacity style={foodStyles.favoriteIcon}>
          <Text>❤️</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

// Main App Component
export default function App() {
  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>DishCount!</Text>
      <Text style={styles.subtitle}>Discounts that taste as good as they sound.</Text>
      <SearchBar />
      <TabBar />
      <PromoBanner />
      <Text style={styles.sectionTitle}>Near You</Text>
      <FoodCard name="Ganadara" discount="15% Discount" />
      <Text style={styles.sectionTitle}>Recommended</Text>
      <FoodCard name="Poulet Rouge" discount="15% Discount" />
      <FoodCard name="Poulet Rouge" discount="15% Discount" />
    </ScrollView>
  );
}

// Styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    padding: 10,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 16,
    color: '#555',
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginVertical: 10,
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
    marginRight: 12,
  },
  input: {
    flex: 1,
    fontSize: 16,
    color: '#6c7072',
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

const promoStyles = StyleSheet.create({
  container: {
    position: 'relative',
    width: '100%',
    height: 160,
    borderRadius: 10,
    overflow: 'hidden',
    marginBottom: 20,
  },
  image: {
    width: '100%',
    height: '100%',
  },
  overlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
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
