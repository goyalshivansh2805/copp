import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  Image,
  StatusBar,
} from 'react-native';
import { Ionicons, Feather } from '@expo/vector-icons';
import { useCart } from '../context/CartContext';

const PRODUCTS = [
  {
    id: 1,
    name: 'Air Max 97',
    price: '$20.99',
    rating: 4.8,
    image: require('../assets/shoe1.png'),
  },
  {
    id: 2,
    name: 'React Presto',
    price: '$25.99',
    rating: 4.8,
    image: require('../assets/shoe2.png'),
  },
  {
    id: 3,
    name: 'Nike Legend Essential',
    price: '$22.99',
    rating: 4.8,
    image: require('../assets/shoe3.png'),
  },
  {
    id: 4,
    name: 'Nike Legend Essential',
    price: '$24.99',
    rating: 4.8,
    image: require('../assets/shoe4.png'),
  },
];

const CATEGORIES = [
  { name: 'Lifestyle', items: 35 },
  { name: 'Running', items: 24 },
  { name: 'Tennis', items: 13 },
];

export default function HomeScreen({ navigation }) {
  const { getTotalItems, latestOrder } = useCart();
  const [activeCategory, setActiveCategory] = useState(0);
  const [bookmarked, setBookmarked] = useState({});

  const toggleBookmark = (id) => {
    setBookmarked((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  const handleProductPress = (product) => {
    navigation.getParent()?.navigate('ProductDetail', { product });
  };

  const cartItemCount = getTotalItems();

  const getStatusColor = (status) => {
    switch (status) {
      case 'Processing':
        return '#F59E0B';
      case 'Shipped':
        return '#3B82F6';
      case 'Delivered':
        return '#10B981';
      default:
        return '#6B7280';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'Processing':
        return 'hourglass-outline';
      case 'Shipped':
        return 'airplane-outline';
      case 'Delivered':
        return 'checkmark-circle-outline';
      default:
        return 'cube-outline';
    }
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" />
      <ScrollView 
        style={styles.scrollView} 
        showsVerticalScrollIndicator={false}
      >
        {/* Header */}
        <View style={styles.header}>
          <View style={styles.menuButton}>
            <View style={styles.menuGrid}>
              <View style={styles.menuCircle} />
              <View style={styles.menuCircle} />
              <View style={styles.menuCircle} />
              <View style={styles.menuCircle} />
            </View>
          </View>
          <TouchableOpacity 
            style={styles.bagButton}
            onPress={() => navigation.navigate('CartTab')}
          >
            <Feather name="shopping-bag" size={24} color="#000" />
            {cartItemCount > 0 && (
              <View style={styles.badge}>
                <Text style={styles.badgeText}>{cartItemCount}</Text>
              </View>
            )}
          </TouchableOpacity>
        </View>

        {/* Title Section */}
        <View style={styles.titleSection}>
          <Text style={styles.title}>New Collection</Text>
          <Text style={styles.subtitle}>Explore the new collection of sneakers</Text>
        </View>

        {/* Blue Banner - Order Status */}
        {latestOrder ? (
          <View style={styles.banner}>
            <View style={styles.bannerContent}>
              <View style={styles.orderHeader}>
                <Text style={styles.orderLabel}>Latest Order</Text>
                <Text style={styles.orderId}>#{latestOrder.id}</Text>
              </View>
              
              <View style={styles.orderStatus}>
                <View style={styles.statusBadge}>
                  <Ionicons 
                    name={getStatusIcon(latestOrder.status)} 
                    size={20} 
                    color={getStatusColor(latestOrder.status)} 
                  />
                  <Text style={[styles.statusText, { color: getStatusColor(latestOrder.status) }]}>
                    {latestOrder.status}
                  </Text>
                </View>
              </View>

              <View style={styles.orderFooter}>
                <View>
                  <Text style={styles.deliveryLabel}>Estimated Delivery</Text>
                  <Text style={styles.deliveryDate}>{latestOrder.estimatedDelivery}</Text>
                </View>
                <TouchableOpacity 
                  style={styles.trackButton}
                  onPress={() => navigation.getParent()?.navigate('OrderStatus', { order: latestOrder })}
                >
                  <Text style={styles.trackButtonText}>Track</Text>
                  <Ionicons name="arrow-forward" size={16} color="#0066FF" />
                </TouchableOpacity>
              </View>
            </View>
          </View>
        ) : (
          <View style={styles.banner}>
            <View style={styles.bannerContent}>
              <View style={styles.emptyBanner}>
                <Ionicons name="gift-outline" size={48} color="rgba(255,255,255,0.3)" />
                <Text style={styles.emptyBannerText}>No orders yet</Text>
                <Text style={styles.emptyBannerSubtext}>Start shopping to track your orders</Text>
              </View>
            </View>
          </View>
        )}

        {/* Categories */}
        <View style={styles.categoriesContainer}>
          {CATEGORIES.map((category, index) => (
            <TouchableOpacity
              key={index}
              onPress={() => setActiveCategory(index)}
              style={styles.categoryButton}
            >
              <Text
                style={[
                  styles.categoryName,
                  activeCategory === index && styles.categoryNameActive,
                ]}
              >
                {category.name}
              </Text>
              <Text
                style={[
                  styles.categoryItems,
                  activeCategory === index && styles.categoryItemsActive,
                ]}
              >
                {category.items} Items
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* Products Grid */}
        <View style={styles.productsGrid}>
          {PRODUCTS.map((product) => (
            <TouchableOpacity 
              key={product.id} 
              style={styles.productCard}
              onPress={() => handleProductPress(product)}
              activeOpacity={0.7}
            >
              <View style={styles.productHeader}>
                <View style={styles.ratingContainer}>
                  <Ionicons name="star-outline" size={18} color="#D1D5DB" />
                  <Text style={styles.ratingText}>{product.rating}</Text>
                </View>
                <TouchableOpacity onPress={() => toggleBookmark(product.id)}>
                  <Feather
                    name="bookmark"
                    size={20}
                    color="#D1D5DB"
                  />
                </TouchableOpacity>
              </View>

              <View style={styles.productImageContainer}>
                <Image 
                  source={product.image} 
                  style={styles.productImage}
                  resizeMode="contain"
                />
              </View>

              <View style={styles.productInfo}>
                <Text style={styles.productName}>{product.name}</Text>
                <Text style={styles.productPrice}>{product.price}</Text>
              </View>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  scrollView: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 24,
    paddingTop: 16,
    paddingBottom: 8,
  },
  menuButton: {
    padding: 4,
  },
  menuGrid: {
    width: 22,
    height: 22,
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    alignContent: 'space-between',
  },
  menuCircle: {
    width: 8,
    height: 8,
    backgroundColor: '#000',
    borderRadius: 4,
  },
  bagButton: {
    padding: 4,
    position: 'relative',
  },
  badge: {
    position: 'absolute',
    top: 0,
    right: 0,
    backgroundColor: '#DC2626',
    borderRadius: 10,
    minWidth: 20,
    height: 20,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 5,
  },
  badgeText: {
    color: '#FFF',
    fontSize: 11,
    fontWeight: '700',
  },
  titleSection: {
    paddingHorizontal: 24,
    paddingTop: 24,
    paddingBottom: 20,
  },
  title: {
    fontSize: 30,
    fontWeight: '800',
    color: '#000000',
    marginBottom: 6,
    letterSpacing: -0.5,
  },
  subtitle: {
    fontSize: 14,
    fontWeight: '400',
    color: '#A8A8A8',
  },
  banner: {
    marginHorizontal: 24,
    height: 150,
    backgroundColor: '#0066FF',
    borderRadius: 24,
    marginBottom: 30,
    overflow: 'hidden',
  },
  bannerContent: {
    flex: 1,
    padding: 20,
    justifyContent: 'space-between',
  },
  orderHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  orderLabel: {
    fontSize: 13,
    fontWeight: '600',
    color: 'rgba(255,255,255,0.8)',
    textTransform: 'uppercase',
    letterSpacing: 1,
  },
  orderId: {
    fontSize: 14,
    fontWeight: '700',
    color: '#FFF',
  },
  orderStatus: {
    marginVertical: 8,
  },
  statusBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255,255,255,0.95)',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 12,
    alignSelf: 'flex-start',
    gap: 6,
  },
  statusText: {
    fontSize: 14,
    fontWeight: '700',
  },
  orderFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
  },
  deliveryLabel: {
    fontSize: 11,
    fontWeight: '500',
    color: 'rgba(255,255,255,0.7)',
    marginBottom: 2,
  },
  deliveryDate: {
    fontSize: 16,
    fontWeight: '700',
    color: '#FFF',
  },
  trackButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFF',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 12,
    gap: 4,
  },
  trackButtonText: {
    fontSize: 14,
    fontWeight: '700',
    color: '#0066FF',
  },
  emptyBanner: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  emptyBannerText: {
    fontSize: 16,
    fontWeight: '700',
    color: '#FFF',
    marginTop: 8,
  },
  emptyBannerSubtext: {
    fontSize: 12,
    fontWeight: '500',
    color: 'rgba(255,255,255,0.7)',
    marginTop: 4,
  },
  categoriesContainer: {
    flexDirection: 'row',
    paddingHorizontal: 24,
    marginBottom: 24,
    gap: 30,
  },
  categoryButton: {
    alignItems: 'flex-start',
  },
  categoryName: {
    fontSize: 18,
    fontWeight: '400',
    color: '#D1D5DB',
    marginBottom: 4,
  },
  categoryNameActive: {
    fontWeight: '700',
    color: '#000000',
  },
  categoryItems: {
    fontSize: 12,
    fontWeight: '400',
    color: '#D1D5DB',
  },
  categoryItemsActive: {
    color: '#6B7280',
  },
  productsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    paddingHorizontal: 20,
    paddingBottom: 40,
    justifyContent: 'space-between',
  },
  productCard: {
    width: '47.5%',
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 16,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 3,
  },
  productHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  ratingText: {
    fontSize: 13,
    color: '#6B7280',
    fontWeight: '500',
  },
  productImageContainer: {
    width: '100%',
    height: 110,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 12,
  },
  productImage: {
    width: '100%',
    height: '100%',
  },
  productInfo: {
    gap: 4,
  },
  productName: {
    fontSize: 13,
    color: '#9CA3AF',
    fontWeight: '400',
  },
  productPrice: {
    fontSize: 18,
    fontWeight: '700',
    color: '#000000',
  },
});

