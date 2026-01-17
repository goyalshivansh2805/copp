import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  Image,
  StatusBar,
  Dimensions,
} from 'react-native';
import { Ionicons, Feather } from '@expo/vector-icons';
import { useCart } from '../context/CartContext';

const { width } = Dimensions.get('window');

const SIZES = ['8', '8.5', '9', '9.5', '10', '10.5', '11', '11.5'];
const COLORS = [
  { id: 1, color: '#3B82F6', name: 'Royal Blue' },
  { id: 2, color: '#1F2937', name: 'Black' },
  { id: 3, color: '#DC2626', name: 'Red' },
  { id: 4, color: '#F59E0B', name: 'Amber' },
];

export default function ProductDetailScreen({ route, navigation }) {
  const { product } = route.params;
  const { addToCart, getTotalItems } = useCart();
  const [selectedSize, setSelectedSize] = useState('9.5');
  const [selectedColor, setSelectedColor] = useState(1);
  const [quantity, setQuantity] = useState(0);

  const handleAddToCart = () => {
    addToCart(product, selectedSize, selectedColor);
    setQuantity(quantity + 1);
  };

  const handleIncrement = () => {
    addToCart(product, selectedSize, selectedColor);
    setQuantity(quantity + 1);
  };

  const handleDecrement = () => {
    if (quantity > 0) {
      setQuantity(quantity - 1);
    }
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" />
      
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity 
          style={styles.headerButton}
          onPress={() => navigation.goBack()}
        >
          <Ionicons name="arrow-back" size={24} color="#000" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Product Details</Text>
        <TouchableOpacity 
          style={styles.headerButton}
          onPress={() => {
            navigation.navigate('Main', { screen: 'CartTab' });
          }}
        >
          <Feather name="shopping-bag" size={24} color="#000" />
          {getTotalItems() > 0 && (
            <View style={styles.badge}>
              <Text style={styles.badgeText}>{getTotalItems()}</Text>
            </View>
          )}
        </TouchableOpacity>
      </View>

      <ScrollView 
        style={styles.scrollView} 
        showsVerticalScrollIndicator={false}
      >
        {/* Product Image Section */}
        <View style={styles.imageSection}>
          <View style={styles.imageBackground}>
            <Image 
              source={product.image}
              style={styles.productImage}
              resizeMode="contain"
            />
          </View>
        </View>

        {/* Product Info */}
        <View style={styles.infoSection}>
          <View style={styles.nameSection}>
            <View>
              <Text style={styles.brandText}>Nike</Text>
              <Text style={styles.productName}>{product.name}</Text>
              <Text style={styles.categoryText}>Men's Running Shoes</Text>
            </View>
            <View style={styles.ratingBadge}>
              <Ionicons name="star" size={16} color="#F59E0B" />
              <Text style={styles.ratingText}>{product.rating}</Text>
            </View>
          </View>

          {/* Size Selector */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Select Size</Text>
            <View style={styles.sizeGrid}>
              {SIZES.map((size) => (
                <TouchableOpacity
                  key={size}
                  style={[
                    styles.sizeBox,
                    selectedSize === size && styles.sizeBoxActive,
                  ]}
                  onPress={() => setSelectedSize(size)}
                >
                  <Text
                    style={[
                      styles.sizeText,
                      selectedSize === size && styles.sizeTextActive,
                    ]}
                  >
                    {size}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>

          {/* Color Selector */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Select Color</Text>
            <View style={styles.colorGrid}>
              {COLORS.map((color) => (
                <TouchableOpacity
                  key={color.id}
                  style={[
                    styles.colorBox,
                    selectedColor === color.id && styles.colorBoxActive,
                  ]}
                  onPress={() => setSelectedColor(color.id)}
                >
                  <View 
                    style={[
                      styles.colorCircle,
                      { backgroundColor: color.color }
                    ]} 
                  />
                  {selectedColor === color.id && (
                    <Ionicons 
                      name="checkmark-circle" 
                      size={20} 
                      color="#0066FF" 
                      style={styles.checkmark}
                    />
                  )}
                </TouchableOpacity>
              ))}
            </View>
          </View>

          {/* Description */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Description</Text>
            <Text style={styles.descriptionText}>
              Experience ultimate comfort and style with these premium running shoes. 
              Featuring advanced cushioning technology and breathable mesh upper for 
              all-day comfort. Perfect for both athletic performance and casual wear.
            </Text>
          </View>

          {/* Features */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Features</Text>
            <View style={styles.featuresList}>
              <View style={styles.featureItem}>
                <Ionicons name="checkmark-circle" size={20} color="#0066FF" />
                <Text style={styles.featureText}>Breathable mesh upper</Text>
              </View>
              <View style={styles.featureItem}>
                <Ionicons name="checkmark-circle" size={20} color="#0066FF" />
                <Text style={styles.featureText}>Advanced cushioning system</Text>
              </View>
              <View style={styles.featureItem}>
                <Ionicons name="checkmark-circle" size={20} color="#0066FF" />
                <Text style={styles.featureText}>Durable rubber outsole</Text>
              </View>
              <View style={styles.featureItem}>
                <Ionicons name="checkmark-circle" size={20} color="#0066FF" />
                <Text style={styles.featureText}>Lightweight design</Text>
              </View>
            </View>
          </View>
        </View>
      </ScrollView>

      {/* Bottom Bar */}
      <View style={styles.bottomBar}>
        <View style={styles.priceSection}>
          <Text style={styles.priceLabel}>Total Price</Text>
          <Text style={styles.price}>{product.price}</Text>
        </View>
        
        {quantity === 0 ? (
          <TouchableOpacity 
            style={styles.addToCartButton}
            onPress={handleAddToCart}
          >
            <Feather name="shopping-bag" size={22} color="#FFF" />
            <Text style={styles.addToCartText}>Add to Bag</Text>
          </TouchableOpacity>
        ) : (
          <View style={styles.addToCartButton}>
            <TouchableOpacity 
              style={styles.quantityBtn}
              onPress={handleDecrement}
            >
              <Ionicons name="remove" size={20} color="#FFF" />
            </TouchableOpacity>
            
            <Text style={styles.quantityNumber}>{quantity}</Text>
            
            <TouchableOpacity 
              style={styles.quantityBtn}
              onPress={handleIncrement}
            >
              <Ionicons name="add" size={20} color="#FFF" />
            </TouchableOpacity>
          </View>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 50,
    paddingBottom: 16,
    backgroundColor: '#FFFFFF',
  },
  headerButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#F5F5F7',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
  },
  badge: {
    position: 'absolute',
    top: -2,
    right: -2,
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
  headerTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#000',
  },
  scrollView: {
    flex: 1,
  },
  imageSection: {
    alignItems: 'center',
    paddingVertical: 20,
    marginBottom: 20,
  },
  imageBackground: {
    width: width - 80,
    height: 280,
    backgroundColor: '#F5F5F7',
    borderRadius: 24,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  productImage: {
    width: '100%',
    height: '100%',
  },
  infoSection: {
    paddingHorizontal: 24,
    paddingBottom: 120,
  },
  nameSection: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 28,
  },
  brandText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#0066FF',
    marginBottom: 4,
    textTransform: 'uppercase',
    letterSpacing: 1,
  },
  productName: {
    fontSize: 26,
    fontWeight: '800',
    color: '#000',
    marginBottom: 4,
    letterSpacing: -0.5,
  },
  categoryText: {
    fontSize: 14,
    color: '#9CA3AF',
    fontWeight: '400',
  },
  ratingBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FEF3C7',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 12,
    gap: 4,
  },
  ratingText: {
    fontSize: 14,
    fontWeight: '700',
    color: '#92400E',
  },
  section: {
    marginBottom: 28,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#000',
    marginBottom: 16,
  },
  sizeGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  sizeBox: {
    width: 64,
    height: 48,
    backgroundColor: '#F5F5F7',
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    borderColor: 'transparent',
  },
  sizeBoxActive: {
    backgroundColor: '#0066FF',
    borderColor: '#0066FF',
  },
  sizeText: {
    fontSize: 15,
    fontWeight: '600',
    color: '#000',
  },
  sizeTextActive: {
    color: '#FFF',
  },
  colorGrid: {
    flexDirection: 'row',
    gap: 12,
  },
  colorBox: {
    width: 64,
    height: 64,
    backgroundColor: '#F5F5F7',
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    borderColor: 'transparent',
  },
  colorBoxActive: {
    borderColor: '#0066FF',
  },
  colorCircle: {
    width: 40,
    height: 40,
    borderRadius: 20,
  },
  checkmark: {
    position: 'absolute',
    top: 4,
    right: 4,
  },
  descriptionText: {
    fontSize: 15,
    lineHeight: 24,
    color: '#6B7280',
    fontWeight: '400',
  },
  featuresList: {
    gap: 12,
  },
  featureItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  featureText: {
    fontSize: 15,
    color: '#374151',
    fontWeight: '500',
  },
  bottomBar: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 24,
    paddingVertical: 20,
    backgroundColor: '#FFFFFF',
    borderTopWidth: 1,
    borderTopColor: '#F3F4F6',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: -4,
    },
    shadowOpacity: 0.08,
    shadowRadius: 12,
    elevation: 8,
  },
  priceSection: {
    flex: 1,
  },
  priceLabel: {
    fontSize: 13,
    color: '#9CA3AF',
    fontWeight: '500',
    marginBottom: 2,
  },
  price: {
    fontSize: 28,
    fontWeight: '800',
    color: '#000',
    letterSpacing: -0.5,
  },
  addToCartButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#0066FF',
    height: 56,
    paddingHorizontal: 32,
    borderRadius: 16,
    gap: 8,
    shadowColor: '#0066FF',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 6,
  },
  addToCartText: {
    fontSize: 16,
    fontWeight: '700',
    color: '#FFF',
  },
  quantityBtn: {
    padding: 8,
  },
  quantityNumber: {
    fontSize: 18,
    fontWeight: '700',
    color: '#FFF',
    minWidth: 40,
    textAlign: 'center',
  },
});
