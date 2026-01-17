import React, { useState } from 'react';
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

const TABS = ['Tracking', 'Order Details', 'Setup', 'Reviews'];

const TRACKING_TIMELINE = [
  { id: 1, title: 'Delivered', completed: false },
  { id: 2, title: 'Out for delivery', completed: false },
  { id: 3, title: 'In transit', time: 'Today at 9:42 AM', completed: true, current: true },
  { id: 4, title: 'Shipped', time: 'Jan 18 at 2:15 PM', completed: true },
  { id: 5, title: 'Packed', time: 'Jan 18 at 10:30 AM', completed: true },
  { id: 6, title: 'Order confirmed', time: 'Jan 17 at 8:20 PM', completed: true },
];

export default function OrderDetailsScreen({ route, navigation }) {
  const { order } = route.params;
  const [activeTab, setActiveTab] = useState('Tracking');

  const firstItem = order.items && order.items.length > 0 ? order.items[0] : null;

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
        <Text style={styles.headerTitle}>Order Details</Text>
        <View style={styles.backButton} />
      </View>

      <ScrollView 
        style={styles.scrollView}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {/* Order Info Card */}
        <View style={styles.orderCard}>
          <View style={styles.orderHeader}>
            <View>
              <Text style={styles.orderLabel}>ORDER ID</Text>
              <Text style={styles.orderId}>#{order.id}</Text>
            </View>
            <View style={{ alignItems: 'flex-end' }}>
              <Text style={styles.orderLabel}>DELIVERY DATE</Text>
              <Text style={styles.deliveryDate}>Jan 22, 2026</Text>
            </View>
          </View>

          {/* Product Info */}
          <View style={styles.productRow}>
            <View style={styles.productImageBox}>
              {firstItem ? (
                <Image 
                  source={firstItem.product.image}
                  style={styles.productImage}
                  resizeMode="contain"
                />
              ) : (
                <View style={styles.productImagePlaceholder}>
                  <Ionicons name="cube-outline" size={32} color="#9CA3AF" />
                </View>
              )}
            </View>
            <View style={styles.productInfo}>
              <Text style={styles.productName}>
                {firstItem ? firstItem.product.name : 'Product'}
              </Text>
              <View style={styles.ratingRow}>
                <Ionicons name="star" size={14} color="#F59E0B" />
                <Text style={styles.ratingText}>4.5/5</Text>
              </View>
            </View>
            <View style={styles.statusBadge}>
              <Ionicons name="cube-outline" size={16} color="#5B9FED" />
              <Text style={styles.statusText}>Shipping</Text>
            </View>
          </View>

          {/* Action Buttons */}
          <View style={styles.actionButtons}>
            <TouchableOpacity style={styles.trackButton}>
              <Text style={styles.trackButtonText}>Track Order</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.cancelButton}>
              <Text style={styles.cancelButtonText}>Cancel Order</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Tabs */}
        <View style={styles.tabsContainer}>
          {TABS.map((tab) => (
            <TouchableOpacity
              key={tab}
              style={styles.tab}
              onPress={() => setActiveTab(tab)}
            >
              <Ionicons 
                name={
                  tab === 'Tracking' ? 'location-outline' :
                  tab === 'Order Details' ? 'document-text-outline' :
                  tab === 'Setup' ? 'bulb-outline' :
                  'star-outline'
                } 
                size={22} 
                color={activeTab === tab ? '#5B9FED' : '#9CA3AF'} 
              />
              <Text style={[
                styles.tabText,
                activeTab === tab && styles.tabTextActive
              ]}>
                {tab}
              </Text>
              {activeTab === tab && <View style={styles.tabIndicator} />}
            </TouchableOpacity>
          ))}
        </View>

        {/* Tracking Content */}
        {activeTab === 'Tracking' && (
          <>
            {/* Carrier Info */}
            <View style={styles.infoSection}>
              <Text style={styles.infoLabel}>Carrier</Text>
              <Text style={styles.infoValue}>UPS</Text>
            </View>

            <View style={styles.infoSection}>
              <Text style={styles.infoLabel}>Tracking number</Text>
              <Text style={styles.infoValue}>12999AA10123456784</Text>
            </View>

            <View style={styles.infoSection}>
              <Text style={styles.infoLabel}>Last update</Text>
              <Text style={styles.infoValue}>Today at 9:42 AM</Text>
            </View>

            {/* Map */}
            <View style={styles.mapContainer}>
              <View style={styles.mapGrid}>
                {[...Array(6)].map((_, row) => (
                  <View key={row} style={styles.mapRow}>
                    {[...Array(8)].map((_, col) => (
                      <View key={col} style={styles.mapCell} />
                    ))}
                  </View>
                ))}
              </View>
              <View style={styles.mapPin}>
                <View style={styles.pinCircle}>
                  <Ionicons name="location" size={24} color="#FFF" />
                </View>
              </View>
            </View>

            {/* Tracking Timeline */}
            <View style={styles.timelineSection}>
              <Text style={styles.timelineTitle}>Tracking timeline</Text>
              
              <View style={styles.timeline}>
                {TRACKING_TIMELINE.map((item, index) => (
                  <View key={item.id} style={styles.timelineItem}>
                    <View style={styles.timelineLeftColumn}>
                      <View style={[
                        styles.timelineDot,
                        item.current && styles.timelineDotCurrent,
                        item.completed && !item.current && styles.timelineDotCompleted,
                      ]} />
                      {index < TRACKING_TIMELINE.length - 1 && (
                        <View style={styles.timelineLine} />
                      )}
                    </View>
                    <View style={styles.timelineContent}>
                      <Text style={[
                        styles.timelineTitle,
                        item.current && styles.timelineTitleCurrent,
                      ]}>
                        {item.title}
                      </Text>
                      {item.time && (
                        <Text style={styles.timelineTime}>{item.time}</Text>
                      )}
                    </View>
                  </View>
                ))}
              </View>
            </View>

            {/* Bottom Buttons */}
            <TouchableOpacity style={styles.primaryButton}>
              <Text style={styles.primaryButtonText}>Track on carrier site</Text>
              <Ionicons name="open-outline" size={18} color="#FFF" />
            </TouchableOpacity>

            <TouchableOpacity style={styles.secondaryButton}>
              <Text style={styles.secondaryButtonText}>Need help</Text>
              <Ionicons name="help-circle-outline" size={18} color="#5B9FED" />
            </TouchableOpacity>
          </>
        )}

        {/* Order Details Content */}
        {activeTab === 'Order Details' && (
          <>
            {/* Items Section */}
            <Text style={styles.sectionTitle}>Items</Text>
            
            {order.items && order.items.map((item, index) => (
              <View key={index} style={styles.orderItemCard}>
                <View style={styles.orderItemImageBox}>
                  <Image 
                    source={item.product.image}
                    style={styles.productImage}
                    resizeMode="contain"
                  />
                </View>
                <View style={styles.orderItemInfo}>
                  <Text style={styles.orderItemName}>{item.product.name}</Text>
                  <Text style={styles.orderItemQty}>Qty: {item.quantity}</Text>
                  <Text style={styles.orderItemPrice}>${parseFloat(item.product.price).toFixed(2)}</Text>
                </View>
                <View style={styles.orderItemRating}>
                  <Ionicons name="star" size={16} color="#F59E0B" />
                  <Text style={styles.orderItemRatingText}>4.5/5</Text>
                </View>
              </View>
            ))}

            {/* Total Section */}
            <View style={styles.totalCard}>
              <View style={styles.totalHeader}>
                <Text style={styles.totalTitle}>Total</Text>
                <Text style={styles.totalAmount}>${parseFloat(order.total).toFixed(2)}</Text>
                <Ionicons name="chevron-up" size={20} color="#9CA3AF" />
              </View>
              
              <View style={styles.totalBreakdown}>
                <View style={styles.totalRow}>
                  <Text style={styles.totalLabel}>Subtotal</Text>
                  <Text style={styles.totalValue}>${(parseFloat(order.total) - 22.50).toFixed(2)}</Text>
                </View>
                <View style={styles.totalRow}>
                  <Text style={styles.totalLabel}>Shipping</Text>
                  <Text style={styles.totalValue}>Free</Text>
                </View>
                <View style={styles.totalRow}>
                  <Text style={styles.totalLabel}>Tax</Text>
                  <Text style={styles.totalValue}>$22.50</Text>
                </View>
              </View>
            </View>

            {/* Delivery Address */}
            <View style={styles.addressSection}>
              <View style={styles.addressHeader}>
                <Text style={styles.addressTitle}>Delivery address</Text>
                <TouchableOpacity style={styles.editButton}>
                  <Ionicons name="create-outline" size={18} color="#6B7280" />
                  <Text style={styles.editButtonText}>Edit</Text>
                </TouchableOpacity>
              </View>
              <Text style={styles.addressName}>Alex Johnson</Text>
              <Text style={styles.addressLine}>742 Evergreen Terrace</Text>
              <Text style={styles.addressLine}>Portland, OR 97205</Text>
            </View>

            {/* Phone Number */}
            <View style={styles.phoneSection}>
              <Text style={styles.phoneTitle}>Phone number</Text>
              <Text style={styles.phoneNumber}>(503) 555-0142</Text>
            </View>
          </>
        )}

        {/* Setup Content */}
        {activeTab === 'Setup' && (
          <>
            <Text style={styles.setupIntro}>
              Here's how you'll use your product once it arrives.
            </Text>

            {/* Video Player */}
            <View style={styles.videoContainer}>
              <View style={styles.videoBox}>
                <TouchableOpacity style={styles.playButton}>
                  <Ionicons name="play" size={32} color="#1F2937" />
                </TouchableOpacity>
              </View>
              <Text style={styles.videoTitle}>Quick setup guide (2 min)</Text>
              <Text style={styles.videoSubtitle}>Get started in minutes</Text>
            </View>

            {/* Quick Setup */}
            <View style={styles.setupSection}>
              <View style={styles.setupHeader}>
                <Ionicons name="information-circle-outline" size={20} color="#1F2937" />
                <Text style={styles.setupTitle}>Quick setup</Text>
              </View>
              
              <View style={styles.setupSteps}>
                <View style={styles.setupStep}>
                  <Text style={styles.stepNumber}>1</Text>
                  <Text style={styles.stepText}>
                    Charge your headphones fully before first use (about 2 hours)
                  </Text>
                </View>
                <View style={styles.setupStep}>
                  <Text style={styles.stepNumber}>2</Text>
                  <Text style={styles.stepText}>
                    Download the companion app to customize sound profiles
                  </Text>
                </View>
                <View style={styles.setupStep}>
                  <Text style={styles.stepNumber}>3</Text>
                  <Text style={styles.stepText}>
                    Hold the power button for 3 seconds to enter pairing mode
                  </Text>
                </View>
                <View style={styles.setupStep}>
                  <Text style={styles.stepNumber}>4</Text>
                  <Text style={styles.stepText}>
                    Select "WH-Headphones" from your Bluetooth menu
                  </Text>
                </View>
              </View>
            </View>

            {/* Usage Tips */}
            <View style={styles.setupSection}>
              <View style={styles.setupHeader}>
                <Ionicons name="play-outline" size={20} color="#1F2937" />
                <Text style={styles.setupTitle}>Usage tips</Text>
              </View>
              
              <View style={styles.tipsList}>
                <View style={styles.tipItem}>
                  <View style={styles.bullet} />
                  <Text style={styles.tipText}>Press once to play/pause music</Text>
                </View>
                <View style={styles.tipItem}>
                  <View style={styles.bullet} />
                  <Text style={styles.tipText}>Double-press to skip tracks</Text>
                </View>
                <View style={styles.tipItem}>
                  <View style={styles.bullet} />
                  <Text style={styles.tipText}>Hold to activate voice assistant</Text>
                </View>
                <View style={styles.tipItem}>
                  <View style={styles.bullet} />
                  <Text style={styles.tipText}>Swipe up/down on right earcup for volume</Text>
                </View>
              </View>
            </View>

            {/* Care Instructions */}
            <View style={styles.setupSection}>
              <View style={styles.setupHeader}>
                <Ionicons name="heart-outline" size={20} color="#1F2937" />
                <Text style={styles.setupTitle}>Care instructions</Text>
              </View>
              
              <View style={styles.tipsList}>
                <View style={styles.tipItem}>
                  <View style={styles.bullet} />
                  <Text style={styles.tipText}>Store in the included case when not in use</Text>
                </View>
                <View style={styles.tipItem}>
                  <View style={styles.bullet} />
                  <Text style={styles.tipText}>Clean ear cushions with a soft, dry cloth</Text>
                </View>
                <View style={styles.tipItem}>
                  <View style={styles.bullet} />
                  <Text style={styles.tipText}>Avoid exposing to extreme temperatures</Text>
                </View>
                <View style={styles.tipItem}>
                  <View style={styles.bullet} />
                  <Text style={styles.tipText}>Keep away from moisture and liquids</Text>
                </View>
              </View>
            </View>
          </>
        )}

        {/* Reviews Content */}
        {activeTab === 'Reviews' && (
          <>
            {/* Rating Summary */}
            <View style={styles.ratingSummary}>
              <View style={styles.ratingHeader}>
                <Ionicons name="star" size={48} color="#F59E0B" />
                <Text style={styles.ratingScore}>4.6</Text>
              </View>
              <Text style={styles.reviewCount}>1,247</Text>
              <Text style={styles.reviewsLabel}>reviews</Text>
            </View>

            {/* Rating Breakdown */}
            <View style={styles.ratingBreakdown}>
              {[
                { stars: 5, count: 892, percentage: 0.715 },
                { stars: 4, count: 234, percentage: 0.188 },
                { stars: 3, count: 78, percentage: 0.063 },
                { stars: 2, count: 28, percentage: 0.022 },
                { stars: 1, count: 15, percentage: 0.012 },
              ].map((item) => (
                <View key={item.stars} style={styles.ratingRow}>
                  <Text style={styles.starNumber}>{item.stars}</Text>
                  <Ionicons name="star-outline" size={16} color="#9CA3AF" />
                  <View style={styles.ratingBarContainer}>
                    <View 
                      style={[
                        styles.ratingBarFill, 
                        { width: `${item.percentage * 100}%` }
                      ]} 
                    />
                  </View>
                  <Text style={styles.ratingCount}>{item.count}</Text>
                </View>
              ))}
            </View>

            {/* Reviews List */}
            <View style={styles.reviewsList}>
              {/* Review 1 */}
              <View style={styles.reviewCard}>
                <View style={styles.reviewHeader}>
                  <View style={styles.reviewerInfo}>
                    <Text style={styles.reviewerName}>Sarah M.</Text>
                    <View style={styles.verifiedBadge}>
                      <Ionicons name="checkmark-circle" size={16} color="#10B981" />
                      <Text style={styles.verifiedText}>Verified</Text>
                    </View>
                  </View>
                  <Text style={styles.reviewDate}>Jan 10, 2026</Text>
                </View>
                
                <View style={styles.reviewStars}>
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Ionicons key={star} name="star" size={18} color="#F59E0B" />
                  ))}
                </View>
                
                <Text style={styles.reviewTitle}>Best headphones I've owned</Text>
                <Text style={styles.reviewText}>
                  The noise cancellation is incredible. I use these daily for work calls and they make a huge difference in sound quality.
                </Text>
              </View>

              {/* Review 2 */}
              <View style={styles.reviewCard}>
                <View style={styles.reviewHeader}>
                  <View style={styles.reviewerInfo}>
                    <Text style={styles.reviewerName}>Michael R.</Text>
                    <View style={styles.verifiedBadge}>
                      <Ionicons name="checkmark-circle" size={16} color="#10B981" />
                      <Text style={styles.verifiedText}>Verified</Text>
                    </View>
                  </View>
                  <Text style={styles.reviewDate}>Jan 8, 2026</Text>
                </View>
                
                <View style={styles.reviewStars}>
                  {[1, 2, 3, 4].map((star) => (
                    <Ionicons key={star} name="star" size={18} color="#F59E0B" />
                  ))}
                  <Ionicons name="star-outline" size={18} color="#D1D5DB" />
                </View>
                
                <Text style={styles.reviewTitle}>Great comfort, long battery life</Text>
                <Text style={styles.reviewText}>
                  Very comfortable for long wearing sessions. Battery easily lasts all day. Only minor complaint is the case is a bit bulky.
                </Text>
              </View>
            </View>

            {/* View All Button */}
            <TouchableOpacity style={styles.viewAllButton}>
              <Text style={styles.viewAllButtonText}>View All reviews</Text>
              <Ionicons name="open-outline" size={18} color="#FFF" />
            </TouchableOpacity>
          </>
        )}

        <View style={{ height: 40 }} />
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
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: 20,
  },
  orderCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 16,
    marginBottom: 16,
  },
  orderHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  orderLabel: {
    fontSize: 11,
    color: '#9CA3AF',
    fontWeight: '600',
    letterSpacing: 0.5,
    marginBottom: 4,
  },
  orderId: {
    fontSize: 15,
    fontWeight: '700',
    color: '#1F2937',
  },
  deliveryDate: {
    fontSize: 15,
    fontWeight: '700',
    color: '#1F2937',
  },
  productRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  productImageBox: {
    width: 56,
    height: 56,
    backgroundColor: '#FEF3C7',
    borderRadius: 12,
    marginRight: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  productImage: {
    width: '100%',
    height: '100%',
  },
  productImagePlaceholder: {
    width: '100%',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  productInfo: {
    flex: 1,
  },
  productName: {
    fontSize: 15,
    fontWeight: '700',
    color: '#1F2937',
    marginBottom: 4,
  },
  ratingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  ratingText: {
    fontSize: 13,
    fontWeight: '600',
    color: '#1F2937',
  },
  statusBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#EFF6FF',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 12,
    gap: 4,
  },
  statusText: {
    fontSize: 13,
    fontWeight: '600',
    color: '#5B9FED',
  },
  actionButtons: {
    flexDirection: 'row',
    gap: 12,
  },
  trackButton: {
    flex: 1,
    backgroundColor: '#5B9FED',
    paddingVertical: 12,
    borderRadius: 12,
    alignItems: 'center',
  },
  trackButtonText: {
    fontSize: 14,
    fontWeight: '700',
    color: '#FFF',
  },
  cancelButton: {
    flex: 1,
    backgroundColor: '#F8F9FA',
    paddingVertical: 12,
    borderRadius: 12,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#5B9FED',
  },
  cancelButtonText: {
    fontSize: 14,
    fontWeight: '700',
    color: '#5B9FED',
  },
  tabsContainer: {
    flexDirection: 'row',
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 4,
    marginBottom: 20,
  },
  tab: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: 12,
    position: 'relative',
  },
  tabText: {
    fontSize: 11,
    fontWeight: '600',
    color: '#9CA3AF',
    marginTop: 4,
  },
  tabTextActive: {
    color: '#5B9FED',
  },
  tabIndicator: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: 2,
    backgroundColor: '#5B9FED',
    borderRadius: 1,
  },
  infoSection: {
    marginBottom: 16,
  },
  infoLabel: {
    fontSize: 14,
    color: '#6B7280',
    marginBottom: 4,
  },
  infoValue: {
    fontSize: 16,
    fontWeight: '700',
    color: '#1F2937',
  },
  mapContainer: {
    height: 120,
    borderRadius: 16,
    overflow: 'hidden',
    position: 'relative',
    backgroundColor: '#E8F4E8',
    marginBottom: 20,
  },
  mapGrid: {
    flex: 1,
  },
  mapRow: {
    flexDirection: 'row',
    flex: 1,
  },
  mapCell: {
    flex: 1,
    borderWidth: 0.5,
    borderColor: '#D4ECD4',
  },
  mapPin: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    marginLeft: -20,
    marginTop: -20,
  },
  pinCircle: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#5B9FED',
    alignItems: 'center',
    justifyContent: 'center',
  },
  timelineSection: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 16,
    marginBottom: 16,
  },
  timelineTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#1F2937',
    marginBottom: 16,
  },
  timeline: {
    paddingLeft: 8,
  },
  timelineItem: {
    flexDirection: 'row',
    paddingBottom: 16,
  },
  timelineLeftColumn: {
    alignItems: 'center',
    marginRight: 16,
  },
  timelineDot: {
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: '#E5E7EB',
  },
  timelineDotCurrent: {
    width: 14,
    height: 14,
    borderRadius: 7,
    backgroundColor: '#1F2937',
  },
  timelineDotCompleted: {
    backgroundColor: '#D1D5DB',
  },
  timelineLine: {
    width: 2,
    flex: 1,
    backgroundColor: '#E5E7EB',
    marginVertical: 4,
  },
  timelineContent: {
    flex: 1,
    paddingTop: -2,
  },
  timelineTitle: {
    fontSize: 15,
    fontWeight: '600',
    color: '#9CA3AF',
    marginBottom: 2,
  },
  timelineTitleCurrent: {
    color: '#1F2937',
    fontWeight: '700',
  },
  timelineTime: {
    fontSize: 13,
    color: '#9CA3AF',
  },
  primaryButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#5B9FED',
    paddingVertical: 16,
    borderRadius: 50,
    marginBottom: 12,
    gap: 8,
  },
  primaryButtonText: {
    fontSize: 15,
    fontWeight: '700',
    color: '#FFF',
  },
  secondaryButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FFFFFF',
    paddingVertical: 16,
    borderRadius: 50,
    borderWidth: 1,
    borderColor: '#5B9FED',
    gap: 8,
  },
  secondaryButtonText: {
    fontSize: 15,
    fontWeight: '700',
    color: '#5B9FED',
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#1F2937',
    marginBottom: 16,
  },
  orderItemCard: {
    flexDirection: 'row',
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 16,
    marginBottom: 16,
    alignItems: 'center',
  },
  orderItemImageBox: {
    width: 72,
    height: 72,
    backgroundColor: '#FEF3C7',
    borderRadius: 16,
    marginRight: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
  orderItemInfo: {
    flex: 1,
  },
  orderItemName: {
    fontSize: 16,
    fontWeight: '700',
    color: '#1F2937',
    marginBottom: 4,
  },
  orderItemQty: {
    fontSize: 14,
    color: '#6B7280',
    marginBottom: 6,
  },
  orderItemPrice: {
    fontSize: 18,
    fontWeight: '700',
    color: '#1F2937',
  },
  orderItemRating: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  orderItemRatingText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#1F2937',
  },
  totalCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 20,
    marginBottom: 16,
  },
  totalHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
    paddingBottom: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#F3F4F6',
  },
  totalTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#1F2937',
    flex: 1,
  },
  totalAmount: {
    fontSize: 18,
    fontWeight: '700',
    color: '#1F2937',
    marginRight: 8,
  },
  totalBreakdown: {
    gap: 12,
  },
  totalRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  totalLabel: {
    fontSize: 15,
    color: '#6B7280',
  },
  totalValue: {
    fontSize: 15,
    fontWeight: '600',
    color: '#1F2937',
  },
  addressSection: {
    marginBottom: 20,
  },
  addressHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  addressTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#6B7280',
  },
  editButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  editButtonText: {
    fontSize: 15,
    color: '#6B7280',
  },
  addressName: {
    fontSize: 16,
    fontWeight: '700',
    color: '#1F2937',
    marginBottom: 4,
  },
  addressLine: {
    fontSize: 15,
    color: '#1F2937',
    lineHeight: 22,
  },
  phoneSection: {
    marginBottom: 20,
  },
  phoneTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#6B7280',
    marginBottom: 8,
  },
  phoneNumber: {
    fontSize: 16,
    fontWeight: '700',
    color: '#1F2937',
  },
  setupIntro: {
    fontSize: 15,
    color: '#6B7280',
    marginBottom: 20,
    lineHeight: 22,
  },
  videoContainer: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 16,
    marginBottom: 20,
  },
  videoBox: {
    height: 180,
    backgroundColor: '#F3F4F6',
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 16,
  },
  playButton: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 12,
    elevation: 8,
  },
  videoTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#1F2937',
    marginBottom: 4,
  },
  videoSubtitle: {
    fontSize: 14,
    color: '#6B7280',
  },
  setupSection: {
    marginBottom: 24,
  },
  setupHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 16,
  },
  setupTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#1F2937',
  },
  setupSteps: {
    gap: 16,
  },
  setupStep: {
    flexDirection: 'row',
    gap: 12,
  },
  stepNumber: {
    fontSize: 15,
    fontWeight: '600',
    color: '#9CA3AF',
    width: 20,
  },
  stepText: {
    flex: 1,
    fontSize: 15,
    color: '#1F2937',
    lineHeight: 22,
  },
  tipsList: {
    gap: 12,
  },
  tipItem: {
    flexDirection: 'row',
    gap: 12,
    alignItems: 'flex-start',
  },
  bullet: {
    width: 4,
    height: 4,
    borderRadius: 2,
    backgroundColor: '#9CA3AF',
    marginTop: 9,
  },
  tipText: {
    flex: 1,
    fontSize: 15,
    color: '#1F2937',
    lineHeight: 22,
  },
  ratingSummary: {
    alignItems: 'center',
    paddingVertical: 24,
  },
  ratingHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 8,
  },
  ratingScore: {
    fontSize: 56,
    fontWeight: '700',
    color: '#1F2937',
  },
  reviewCount: {
    fontSize: 20,
    fontWeight: '600',
    color: '#6B7280',
  },
  reviewsLabel: {
    fontSize: 16,
    color: '#9CA3AF',
  },
  ratingBreakdown: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 20,
    marginBottom: 20,
    gap: 12,
  },
  ratingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  starNumber: {
    fontSize: 15,
    fontWeight: '600',
    color: '#6B7280',
    width: 12,
  },
  ratingBarContainer: {
    flex: 1,
    height: 8,
    backgroundColor: '#E5E7EB',
    borderRadius: 4,
    overflow: 'hidden',
  },
  ratingBarFill: {
    height: '100%',
    backgroundColor: '#F59E0B',
    borderRadius: 4,
  },
  ratingCount: {
    fontSize: 15,
    fontWeight: '600',
    color: '#6B7280',
    width: 40,
    textAlign: 'right',
  },
  reviewsList: {
    gap: 16,
    marginBottom: 20,
  },
  reviewCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 20,
  },
  reviewHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  reviewerInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  reviewerName: {
    fontSize: 16,
    fontWeight: '700',
    color: '#1F2937',
  },
  verifiedBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  verifiedText: {
    fontSize: 13,
    fontWeight: '600',
    color: '#10B981',
  },
  reviewDate: {
    fontSize: 13,
    color: '#9CA3AF',
  },
  reviewStars: {
    flexDirection: 'row',
    gap: 4,
    marginBottom: 12,
  },
  reviewTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#1F2937',
    marginBottom: 8,
  },
  reviewText: {
    fontSize: 15,
    color: '#6B7280',
    lineHeight: 22,
  },
  viewAllButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#5B9FED',
    paddingVertical: 16,
    borderRadius: 50,
    gap: 8,
  },
  viewAllButtonText: {
    fontSize: 15,
    fontWeight: '700',
    color: '#FFF',
  },
});
