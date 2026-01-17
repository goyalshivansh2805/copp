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
});
