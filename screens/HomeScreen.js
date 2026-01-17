import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  Image,
  TextInput,
  StatusBar,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useCart } from '../context/CartContext';

const BRANDS = [
  { id: 1, name: 'Nike', logo: '✓', selected: true },
  { id: 2, name: 'puma', logo: '🐆', selected: false },
  { id: 3, name: 'UNDER ARMOUR', logo: 'UA', selected: false },
  { id: 4, name: 'adidas', logo: '⚽', selected: false },
  { id: 5, name: 'CONVERSE', logo: '★', selected: false },
];

const POPULAR_SHOES = [
  {
    id: 1,
    name: 'Nike Jordan',
    price: 493.00,
    badge: 'BEST SELLER',
    image: require('../assets/shoe1.png'),
  },
  {
    id: 2,
    name: 'Nike Air Max',
    price: 897.99,
    badge: 'BEST SELLER',
    image: require('../assets/shoe2.png'),
  },
];

const NEW_ARRIVAL = {
  id: 3,
  name: 'Nike Air Jordan',
  price: 849.69,
  badge: 'BEST CHOICE',
  image: require('../assets/shoe3.png'),
};

export default function HomeScreen({ navigation }) {
  const { cartItemCount, latestOrder } = useCart();

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#F8F9FA" />
      
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.menuButton}>
          <View style={styles.dotsGrid}>
            <View style={styles.dot} />
            <View style={styles.dot} />
            <View style={styles.dot} />
            <View style={styles.dot} />
          </View>
        </TouchableOpacity>
        
        <View style={styles.locationContainer}>
          <Text style={styles.locationLabel}>Store location</Text>
          <View style={styles.locationRow}>
            <Ionicons name="location" size={18} color="#FF6B6B" />
            <Text style={styles.locationText}>Mondolibug, Sylhet</Text>
          </View>
        </View>
        
        <TouchableOpacity 
          style={styles.cartButton}
          onPress={() => navigation.navigate('Main', { screen: 'CartTab' })}
        >
          <Ionicons name="bag-outline" size={28} color="#1F2937" />
          {cartItemCount > 0 && (
            <View style={styles.cartBadge}>
              <Text style={styles.cartBadgeText}>{cartItemCount}</Text>
            </View>
          )}
        </TouchableOpacity>
      </View>

      <ScrollView 
        style={styles.scrollView}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {/* Search Bar */}
        <View style={styles.searchContainer}>
          <Ionicons name="search" size={24} color="#9CA3AF" />
          <TextInput
            style={styles.searchInput}
            placeholder="Looking for shoes"
            placeholderTextColor="#9CA3AF"
          />
        </View>

        {/* Order Status Banner */}
        {latestOrder ? (
          <TouchableOpacity 
            style={styles.orderBanner}
            onPress={() => navigation.navigate('OrderDetails', { order: latestOrder })}
          >
            <View style={styles.orderBannerContent}>
              <View style={styles.orderBannerIcon}>
                <Ionicons name="cube-outline" size={24} color="#5B9FED" />
              </View>
              <View style={styles.orderBannerText}>
                <Text style={styles.orderBannerTitle}>Your Order is {latestOrder.status}</Text>
                <Text style={styles.orderBannerSubtitle}>
                  Order #{latestOrder.id} • {latestOrder.items?.length || 0} item(s)
                </Text>
              </View>
              <Ionicons name="chevron-forward" size={24} color="#5B9FED" />
            </View>
          </TouchableOpacity>
        ) : (
          <View style={styles.orderBanner}>
            <View style={styles.orderBannerContent}>
              <View style={styles.orderBannerIcon}>
                <Ionicons name="bag-outline" size={24} color="#5B9FED" />
              </View>
              <View style={styles.orderBannerText}>
                <Text style={styles.orderBannerTitle}>No orders yet</Text>
                <Text style={styles.orderBannerSubtitle}>Start shopping to place your first order</Text>
              </View>
            </View>
          </View>
        )}

        {/* Popular Shoes */}
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Popular Shoes</Text>
          <TouchableOpacity>
            <Text style={styles.seeAllText}>See all</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.popularGrid}>
          {POPULAR_SHOES.map((shoe) => (
            <TouchableOpacity
              key={shoe.id}
              style={styles.productCard}
              onPress={() => navigation.navigate('ProductDetail', { product: shoe })}
            >
              <View style={styles.productImageContainer}>
                <Image 
                  source={shoe.image}
                  style={styles.productImage}
                  resizeMode="contain"
                />
              </View>
              <Text style={styles.productBadge}>{shoe.badge}</Text>
              <Text style={styles.productName}>{shoe.name}</Text>
              <Text style={styles.productPrice}>${shoe.price.toFixed(2)}</Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* New Arrivals */}
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>New Arrivals</Text>
          <TouchableOpacity>
            <Text style={styles.seeAllText}>See all</Text>
          </TouchableOpacity>
        </View>

        <TouchableOpacity
          style={styles.newArrivalCard}
          onPress={() => navigation.navigate('ProductDetail', { product: NEW_ARRIVAL })}
        >
          <View style={styles.newArrivalInfo}>
            <Text style={styles.newArrivalBadge}>{NEW_ARRIVAL.badge}</Text>
            <Text style={styles.newArrivalName}>{NEW_ARRIVAL.name}</Text>
            <Text style={styles.newArrivalPrice}>${NEW_ARRIVAL.price.toFixed(2)}</Text>
          </View>
          <View style={styles.newArrivalImageContainer}>
            <Image 
              source={NEW_ARRIVAL.image}
              style={styles.newArrivalImage}
              resizeMode="contain"
            />
          </View>
        </TouchableOpacity>

        <View style={{ height: 100 }} />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8F9FA',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 12,
    paddingBottom: 16,
    backgroundColor: '#F8F9FA',
  },
  menuButton: {
    width: 48,
    height: 48,
    alignItems: 'center',
    justifyContent: 'center',
  },
  dotsGrid: {
    width: 32,
    height: 32,
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 6,
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#1F2937',
  },
  locationContainer: {
    flex: 1,
    alignItems: 'center',
  },
  locationLabel: {
    fontSize: 11,
    color: '#9CA3AF',
    marginBottom: 2,
  },
  locationRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  locationText: {
    fontSize: 15,
    fontWeight: '600',
    color: '#1F2937',
  },
  cartButton: {
    width: 48,
    height: 48,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
  },
  cartBadge: {
    position: 'absolute',
    top: 8,
    right: 8,
    backgroundColor: '#FF6B6B',
    width: 18,
    height: 18,
    borderRadius: 9,
    alignItems: 'center',
    justifyContent: 'center',
  },
  cartBadgeText: {
    fontSize: 9,
    fontWeight: '700',
    color: '#FFF',
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: 20,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 50,
    paddingHorizontal: 20,
    paddingVertical: 16,
    marginBottom: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  searchInput: {
    flex: 1,
    fontSize: 15,
    color: '#1F2937',
    marginLeft: 12,
  },
  orderBanner: {
    backgroundColor: '#E8F4FF',
    borderRadius: 16,
    padding: 16,
    marginBottom: 28,
  },
  orderBannerContent: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  orderBannerIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    justifyContent: 'center',
  },
  orderBannerText: {
    flex: 1,
  },
  orderBannerTitle: {
    fontSize: 15,
    fontWeight: '700',
    color: '#1F2937',
    marginBottom: 4,
  },
  orderBannerSubtitle: {
    fontSize: 13,
    color: '#6B7280',
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#1F2937',
  },
  seeAllText: {
    fontSize: 13,
    fontWeight: '600',
    color: '#5B9FED',
  },
  popularGrid: {
    flexDirection: 'row',
    gap: 16,
    marginBottom: 32,
  },
  productCard: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 12,
    elevation: 3,
  },
  productImageContainer: {
    width: '100%',
    height: 120,
    marginBottom: 12,
  },
  productImage: {
    width: '100%',
    height: '100%',
  },
  productBadge: {
    fontSize: 11,
    fontWeight: '600',
    color: '#5B9FED',
    marginBottom: 4,
    letterSpacing: 0.3,
  },
  productName: {
    fontSize: 16,
    fontWeight: '700',
    color: '#1F2937',
    marginBottom: 8,
  },
  productPrice: {
    fontSize: 17,
    fontWeight: '700',
    color: '#1F2937',
  },
  newArrivalCard: {
    flexDirection: 'row',
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    padding: 20,
    marginBottom: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 12,
    elevation: 3,
  },
  newArrivalInfo: {
    flex: 1,
    justifyContent: 'center',
  },
  newArrivalBadge: {
    fontSize: 12,
    fontWeight: '600',
    color: '#5B9FED',
    marginBottom: 6,
    letterSpacing: 0.3,
  },
  newArrivalName: {
    fontSize: 20,
    fontWeight: '700',
    color: '#1F2937',
    marginBottom: 10,
  },
  newArrivalPrice: {
    fontSize: 18,
    fontWeight: '700',
    color: '#1F2937',
  },
  newArrivalImageContainer: {
    width: 140,
    height: 140,
  },
  newArrivalImage: {
    width: '100%',
    height: '100%',
  },
});
