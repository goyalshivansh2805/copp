import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  StatusBar,
  Image,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const REVIEWS = [
  {
    id: 1,
    name: 'Sarah M.',
    initials: 'SM',
    verified: true,
    hasVideo: true,
    rating: 5,
    text: 'The sound quality is exceptional. Battery life easily lasts through my workday...',
  },
  {
    id: 2,
    name: 'John K.',
    initials: 'JK',
    verified: false,
    hasVideo: false,
    rating: 4,
    text: 'Great product! Works well on all my devices. Well organized...',
  },
];

export default function OrderSuccessScreen({ route, navigation }) {
  const { orderId, total, estimatedDelivery, items, address } = route.params;
  const currentDate = new Date().toLocaleDateString('en-US', { 
    month: 'short', 
    day: 'numeric',
    year: 'numeric',
  });

  // Get first item for display
  const firstItem = items && items.length > 0 ? items[0] : null;

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" />
      
      <ScrollView 
        style={styles.scrollView}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {/* Success Header */}
        <View style={styles.successHeader}>
          <View style={styles.successIcon}>
            <Ionicons name="checkmark" size={32} color="#10B981" />
          </View>
          <View style={styles.successTextContainer}>
            <Text style={styles.successTitle}>Order confirmed</Text>
            <Text style={styles.successSubtitle}>
              Payment successful • {currentDate}
            </Text>
          </View>
        </View>

        {/* Order Info Card */}
        <View style={styles.orderInfoCard}>
          <View style={styles.orderInfoRow}>
            <View style={styles.orderInfoItem}>
              <Text style={styles.orderInfoLabel}>ORDER ID</Text>
              <Text style={styles.orderInfoValue}>#{orderId}</Text>
            </View>
            <View style={[styles.orderInfoItem, { alignItems: 'flex-end' }]}>
              <Text style={styles.orderInfoLabel}>DELIVERY DATE</Text>
              <Text style={styles.orderInfoValue}>{estimatedDelivery}</Text>
            </View>
          </View>

          {/* Product Info */}
          <View style={styles.productInfo}>
            <View style={styles.productImageBox}>
              {firstItem ? (
                <Image 
                  source={firstItem.product.image}
                  style={styles.productImageDisplay}
                  resizeMode="contain"
                />
              ) : (
                <View style={styles.productImagePlaceholder}>
                  <Ionicons name="cube-outline" size={40} color="#9CA3AF" />
                </View>
              )}
            </View>
            <View style={styles.productDetails}>
              <Text style={styles.productName}>
                {firstItem ? firstItem.product.name : 'Product'}
              </Text>
              {items && items.length > 1 && (
                <Text style={styles.moreItemsText}>
                  +{items.length - 1} more {items.length - 1 === 1 ? 'item' : 'items'}
                </Text>
              )}
              <View style={styles.deliveryAddress}>
                <Ionicons name="location-outline" size={16} color="#6B7280" />
                <Text style={styles.addressText}>
                  {address ? `${address.address}, ${address.city}` : 'Delivery address'}
                </Text>
              </View>
            </View>
          </View>

          {/* Delivery Slot */}
          <View style={styles.deliverySlot}>
            <View style={styles.deliverySlotLeft}>
              <Ionicons name="time-outline" size={24} color="#6366F1" />
              <View>
                <Text style={styles.deliverySlotLabel}>DELIVERY SLOT</Text>
                <Text style={styles.deliverySlotTime}>10:00 AM - 11:00 AM</Text>
              </View>
            </View>
            <TouchableOpacity style={styles.editButton}>
              <Ionicons name="pencil-outline" size={18} color="#6366F1" />
              <Text style={styles.editButtonText}>EDIT</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Customer Reviews */}
        <View style={styles.reviewsSection}>
          <View style={styles.reviewsHeader}>
            <Text style={styles.reviewsTitle}>Customer Reviews</Text>
            <View style={styles.ratingBadge}>
              <Ionicons name="star" size={20} color="#F59E0B" />
              <Text style={styles.ratingText}>4.8</Text>
              <Text style={styles.ratingCount}>(2.8k)</Text>
            </View>
          </View>

          <ScrollView 
            horizontal 
            showsHorizontalScrollIndicator={false}
            style={styles.reviewsScroll}
          >
            {REVIEWS.map((review) => (
              <View key={review.id} style={styles.reviewCard}>
                <View style={styles.reviewHeader}>
                  <View style={styles.reviewerInfo}>
                    <View style={styles.avatar}>
                      <Text style={styles.avatarText}>{review.initials}</Text>
                    </View>
                    <View>
                      <Text style={styles.reviewerName}>{review.name}</Text>
                      {review.verified && (
                        <Text style={styles.verifiedBadge}>VERIFIED</Text>
                      )}
                    </View>
                  </View>
                  {review.hasVideo && (
                    <View style={styles.videoBadge}>
                      <Ionicons name="play-circle-outline" size={16} color="#6366F1" />
                      <Text style={styles.videoText}>Video</Text>
                    </View>
                  )}
                </View>

                <Text style={styles.reviewText}>{review.text}</Text>

                <View style={styles.starsContainer}>
                  {[...Array(5)].map((_, i) => (
                    <Ionicons 
                      key={i} 
                      name={i < review.rating ? 'star' : 'star-outline'} 
                      size={16} 
                      color="#F59E0B" 
                    />
                  ))}
                </View>
              </View>
            ))}
          </ScrollView>

          <View style={styles.recommendBadge}>
            <Ionicons name="checkmark-circle" size={20} color="#10B981" />
            <Text style={styles.recommendText}>
              98% of customers recommend this product
            </Text>
          </View>
        </View>

        <View style={{ height: 120 }} />
      </ScrollView>

      {/* Bottom Actions */}
      <View style={styles.bottomActions}>
        <TouchableOpacity 
          style={styles.trackButton}
          onPress={() => navigation.navigate('OrderStatus', { 
            order: { 
              id: orderId, 
              total, 
              estimatedDelivery,
              status: 'Processing',
              items: items || [],
              address: address,
            } 
          })}
        >
          <Text style={styles.trackButtonText}>Track order</Text>
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={styles.detailsButton}
          onPress={() => navigation.navigate('OrderDetails', { 
            order: { 
              id: orderId, 
              total, 
              estimatedDelivery,
              status: 'Processing',
              items: items || [],
              address: address,
            } 
          })}
        >
          <Text style={styles.detailsButtonText}>Order details</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F9FAFB',
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    padding: 20,
    paddingTop: 60,
  },
  successHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 24,
    gap: 16,
  },
  successIcon: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: '#D1FAE5',
    alignItems: 'center',
    justifyContent: 'center',
  },
  successTextContainer: {
    flex: 1,
  },
  successTitle: {
    fontSize: 28,
    fontWeight: '800',
    color: '#000',
    marginBottom: 4,
  },
  successSubtitle: {
    fontSize: 14,
    color: '#6B7280',
  },
  orderInfoCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    padding: 20,
    marginBottom: 24,
  },
  orderInfoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 24,
    paddingBottom: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#F3F4F6',
  },
  orderInfoItem: {
    flex: 1,
  },
  orderInfoLabel: {
    fontSize: 11,
    fontWeight: '600',
    color: '#9CA3AF',
    letterSpacing: 0.5,
    marginBottom: 6,
  },
  orderInfoValue: {
    fontSize: 16,
    fontWeight: '700',
    color: '#000',
  },
  productInfo: {
    flexDirection: 'row',
    marginBottom: 20,
    gap: 16,
  },
  productImageBox: {
    width: 80,
    height: 80,
    borderRadius: 16,
    backgroundColor: '#1F2937',
    padding: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  productImagePlaceholder: {
    width: '100%',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  productImageDisplay: {
    width: '100%',
    height: '100%',
  },
  moreItemsText: {
    fontSize: 13,
    color: '#6B7280',
    fontWeight: '500',
    marginTop: 2,
  },
  productDetails: {
    flex: 1,
    justifyContent: 'center',
  },
  productName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#000',
    lineHeight: 22,
  },
  deliveryAddress: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    marginTop: 8,
  },
  addressText: {
    fontSize: 13,
    color: '#6B7280',
    flex: 1,
  },
  deliverySlot: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#EEF2FF',
    borderRadius: 16,
    padding: 16,
  },
  deliverySlotLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    flex: 1,
  },
  deliverySlotLabel: {
    fontSize: 11,
    fontWeight: '700',
    color: '#6366F1',
    letterSpacing: 0.5,
    marginBottom: 4,
  },
  deliverySlotTime: {
    fontSize: 16,
    fontWeight: '700',
    color: '#000',
  },
  editButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  editButtonText: {
    fontSize: 13,
    fontWeight: '700',
    color: '#6366F1',
    letterSpacing: 0.5,
  },
  reviewsSection: {
    marginBottom: 24,
  },
  reviewsHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  reviewsTitle: {
    fontSize: 22,
    fontWeight: '800',
    color: '#000',
  },
  ratingBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  ratingText: {
    fontSize: 18,
    fontWeight: '700',
    color: '#000',
  },
  ratingCount: {
    fontSize: 14,
    color: '#9CA3AF',
  },
  reviewsScroll: {
    marginBottom: 16,
  },
  reviewCard: {
    width: 280,
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 16,
    marginRight: 12,
  },
  reviewHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 12,
  },
  reviewerInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  avatar: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: '#E0E7FF',
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatarText: {
    fontSize: 14,
    fontWeight: '700',
    color: '#4F46E5',
  },
  reviewerName: {
    fontSize: 15,
    fontWeight: '700',
    color: '#000',
    marginBottom: 2,
  },
  verifiedBadge: {
    fontSize: 10,
    fontWeight: '700',
    color: '#10B981',
    letterSpacing: 0.5,
  },
  videoBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  videoText: {
    fontSize: 13,
    fontWeight: '600',
    color: '#6366F1',
  },
  reviewText: {
    fontSize: 14,
    color: '#374151',
    lineHeight: 20,
    marginBottom: 12,
  },
  starsContainer: {
    flexDirection: 'row',
    gap: 4,
  },
  recommendBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 12,
  },
  recommendText: {
    fontSize: 13,
    fontWeight: '600',
    color: '#374151',
    flex: 1,
  },
  bottomActions: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    padding: 20,
    paddingBottom: 28,
    gap: 12,
    backgroundColor: '#F9FAFB',
  },
  trackButton: {
    backgroundColor: '#1F2937',
    paddingVertical: 18,
    borderRadius: 16,
    alignItems: 'center',
  },
  trackButtonText: {
    fontSize: 16,
    fontWeight: '700',
    color: '#FFF',
  },
  detailsButton: {
    backgroundColor: '#FFFFFF',
    paddingVertical: 18,
    borderRadius: 16,
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#E5E7EB',
  },
  detailsButtonText: {
    fontSize: 16,
    fontWeight: '700',
    color: '#000',
  },
});
