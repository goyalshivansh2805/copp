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
import { Ionicons } from '@expo/vector-icons';
import { useCart } from '../context/CartContext';

const GALLERY_IMAGES = [
  require('../assets/shoe1.png'),
  require('../assets/shoe2.png'),
  require('../assets/shoe3.png'),
];

const SIZE_TABS = ['EU', 'US', 'UK'];
const SIZES = ['38', '39', '40', '41', '42', '43'];

export default function ProductDetailScreen({ route, navigation }) {
  const { product } = route.params;
  const { addToCart, cartItems, updateQuantity, cartItemCount } = useCart();
  
  const [selectedSizeTab, setSelectedSizeTab] = useState('EU');
  const [selectedSize, setSelectedSize] = useState('40');
  const [showGoToCart, setShowGoToCart] = useState(false);

  const itemId = `${product.id}-${selectedSize}`;
  const cartItem = cartItems.find(item => item.itemId === itemId);
  const quantityInCart = cartItem ? cartItem.quantity : 0;

  const handleAddToCart = () => {
    addToCart({
      product,
      size: selectedSize,
      quantity: 1,
    });
    
    // Show "Go to Cart" popup for 2 seconds
    setShowGoToCart(true);
    setTimeout(() => {
      setShowGoToCart(false);
    }, 2000);
  };

  const handleIncrement = () => {
    updateQuantity(itemId, quantityInCart + 1);
    
    // Show "Go to Cart" popup for 2 seconds
    setShowGoToCart(true);
    setTimeout(() => {
      setShowGoToCart(false);
    }, 2000);
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#F8F9FA" />
      
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity 
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <Ionicons name="chevron-back" size={24} color="#1F2937" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Men's Shoes</Text>
        <TouchableOpacity 
          style={styles.cartButton}
          onPress={() => navigation.navigate('Main', { screen: 'CartTab' })}
        >
          <Ionicons name="bag-outline" size={26} color="#1F2937" />
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
        {/* Product Image with 360 Indicator */}
        <View style={styles.imageContainer}>
          <Image 
            source={product.image}
            style={styles.productImage}
            resizeMode="contain"
          />
          
          {/* 360 Rotation Indicator */}
          <View style={styles.rotationIndicator}>
            <Ionicons name="chevron-back" size={16} color="#5B9FED" style={styles.leftArrow} />
            <View style={styles.rotationArc} />
            <View style={styles.rotationButton}>
              <Ionicons name="arrow-forward" size={14} color="#FFF" />
            </View>
            <Ionicons name="chevron-forward" size={16} color="#5B9FED" style={styles.rightArrow} />
          </View>
        </View>

        {/* Badge */}
        <Text style={styles.badge}>{product.badge || 'BEST SELLER'}</Text>

        {/* Product Name */}
        <Text style={styles.productName}>{product.name}</Text>

        {/* Price */}
        <Text style={styles.price}>${product.price.toFixed(2)}</Text>

        {/* Description */}
        <Text style={styles.description}>
          Air Jordan is an American brand of basketball shoes athletic, casual, and style clothing produced by Nike...
        </Text>

        {/* Gallery */}
        <Text style={styles.sectionTitle}>Gallery</Text>
        <View style={styles.gallery}>
          {GALLERY_IMAGES.map((img, index) => (
            <View key={index} style={styles.galleryItem}>
              <Image 
                source={img}
                style={styles.galleryImage}
                resizeMode="contain"
              />
            </View>
          ))}
        </View>

        {/* Size Selector */}
        <View style={styles.sizeSection}>
          <Text style={styles.sectionTitle}>Size</Text>
          
          {/* Size Tabs */}
          <View style={styles.sizeTabs}>
            {SIZE_TABS.map((tab) => (
              <TouchableOpacity
                key={tab}
                style={styles.sizeTab}
                onPress={() => setSelectedSizeTab(tab)}
              >
                <Text style={[
                  styles.sizeTabText,
                  selectedSizeTab === tab && styles.sizeTabTextActive,
                ]}>
                  {tab}
                </Text>
              </TouchableOpacity>
            ))}
          </View>

          {/* Size Buttons */}
          <View style={styles.sizeButtons}>
            {SIZES.map((size) => (
              <TouchableOpacity
                key={size}
                style={[
                  styles.sizeButton,
                  selectedSize === size && styles.sizeButtonActive,
                ]}
                onPress={() => setSelectedSize(size)}
              >
                <Text style={[
                  styles.sizeButtonText,
                  selectedSize === size && styles.sizeButtonTextActive,
                ]}>
                  {size}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        <View style={{ height: 120 }} />
      </ScrollView>

      {/* Bottom Bar */}
      <View style={styles.bottomBar}>
        <View>
          <Text style={styles.priceLabel}>Price</Text>
          <Text style={styles.bottomPrice}>${product.price.toFixed(2)}</Text>
        </View>
        
        {quantityInCart > 0 ? (
          <View style={styles.quantitySelectorBottom}>
            <TouchableOpacity 
              style={styles.quantityBtnBottom}
              onPress={() => updateQuantity(itemId, quantityInCart - 1)}
            >
              <Ionicons name="remove" size={20} color="#5B9FED" />
            </TouchableOpacity>
            <Text style={styles.quantityNumberBottom}>{quantityInCart}</Text>
            <TouchableOpacity 
              style={styles.quantityBtnBottom}
              onPress={handleIncrement}
            >
              <Ionicons name="add" size={20} color="#5B9FED" />
            </TouchableOpacity>
          </View>
        ) : (
          <TouchableOpacity 
            style={styles.addToCartButton}
            onPress={handleAddToCart}
          >
            <Text style={styles.addToCartText}>Add To Cart</Text>
          </TouchableOpacity>
        )}
      </View>

      {/* Go to Cart Popup */}
      {showGoToCart && (
        <View style={styles.goToCartOverlay}>
          <TouchableOpacity 
            style={styles.goToCartButton}
            onPress={() => {
              setShowGoToCart(false);
              navigation.navigate('Main', { screen: 'CartTab' });
            }}
          >
            <Ionicons name="checkmark-circle" size={24} color="#10B981" />
            <Text style={styles.goToCartText}>Go to Cart</Text>
            <Ionicons name="arrow-forward" size={20} color="#5B9FED" />
          </TouchableOpacity>
        </View>
      )}
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
  backButton: {
    width: 40,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1F2937',
  },
  cartButton: {
    width: 40,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
  },
  cartBadge: {
    position: 'absolute',
    top: 4,
    right: 4,
    backgroundColor: '#FF6B6B',
    width: 18,
    height: 18,
    borderRadius: 9,
    alignItems: 'center',
    justifyContent: 'center',
  },
  cartBadgeText: {
    fontSize: 10,
    fontWeight: '700',
    color: '#FFF',
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: 20,
  },
  imageContainer: {
    width: '100%',
    height: 280,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 24,
    position: 'relative',
  },
  productImage: {
    width: '100%',
    height: '100%',
  },
  rotationIndicator: {
    position: 'absolute',
    bottom: 0,
    left: '10%',
    right: '10%',
    height: 40,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  leftArrow: {
    position: 'absolute',
    left: 0,
  },
  rightArrow: {
    position: 'absolute',
    right: 0,
  },
  rotationArc: {
    flex: 1,
    height: 2,
    backgroundColor: '#5B9FED',
    marginHorizontal: 30,
    borderRadius: 1,
  },
  rotationButton: {
    position: 'absolute',
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#5B9FED',
    alignItems: 'center',
    justifyContent: 'center',
  },
  badge: {
    fontSize: 12,
    fontWeight: '600',
    color: '#5B9FED',
    marginBottom: 8,
    letterSpacing: 0.3,
  },
  productName: {
    fontSize: 24,
    fontWeight: '700',
    color: '#1F2937',
    marginBottom: 12,
  },
  price: {
    fontSize: 22,
    fontWeight: '700',
    color: '#1F2937',
    marginBottom: 16,
  },
  description: {
    fontSize: 14,
    color: '#6B7280',
    lineHeight: 22,
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#1F2937',
    marginBottom: 16,
  },
  gallery: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: 32,
  },
  galleryItem: {
    width: 80,
    height: 80,
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  galleryImage: {
    width: '100%',
    height: '100%',
  },
  sizeSection: {
    marginBottom: 24,
  },
  sizeTabs: {
    flexDirection: 'row',
    gap: 24,
    marginBottom: 16,
  },
  sizeTab: {
    paddingVertical: 4,
  },
  sizeTabText: {
    fontSize: 15,
    fontWeight: '600',
    color: '#9CA3AF',
  },
  sizeTabTextActive: {
    color: '#1F2937',
  },
  sizeButtons: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  sizeButton: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  sizeButtonActive: {
    backgroundColor: '#5B9FED',
  },
  sizeButtonText: {
    fontSize: 15,
    fontWeight: '600',
    color: '#1F2937',
  },
  sizeButtonTextActive: {
    color: '#FFFFFF',
  },
  bottomBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 20,
    backgroundColor: '#FFFFFF',
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.08,
    shadowRadius: 12,
    elevation: 8,
  },
  priceLabel: {
    fontSize: 13,
    color: '#6B7280',
    marginBottom: 4,
  },
  bottomPrice: {
    fontSize: 20,
    fontWeight: '700',
    color: '#1F2937',
  },
  addToCartButton: {
    backgroundColor: '#5B9FED',
    paddingHorizontal: 48,
    paddingVertical: 16,
    borderRadius: 50,
  },
  addToCartText: {
    fontSize: 16,
    fontWeight: '700',
    color: '#FFFFFF',
  },
  quantitySelectorBottom: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F3F4F6',
    borderRadius: 50,
    paddingHorizontal: 20,
    paddingVertical: 16,
    gap: 16,
  },
  quantityBtnBottom: {
    width: 32,
    height: 32,
    alignItems: 'center',
    justifyContent: 'center',
  },
  quantityNumberBottom: {
    fontSize: 18,
    fontWeight: '700',
    color: '#1F2937',
    minWidth: 30,
    textAlign: 'center',
  },
  goToCartOverlay: {
    position: 'absolute',
    bottom: 90,
    left: 20,
    right: 20,
    alignItems: 'center',
  },
  goToCartButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 32,
    paddingVertical: 16,
    borderRadius: 50,
    gap: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 12,
    elevation: 8,
  },
  goToCartText: {
    fontSize: 16,
    fontWeight: '700',
    color: '#1F2937',
  },
});
