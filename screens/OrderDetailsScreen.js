import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  StatusBar,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const PROGRESS_STEPS = [
  { id: 1, label: 'Confirmed', icon: 'checkmark', completed: true },
  { id: 2, label: 'Packed', icon: 'cube', completed: true },
  { id: 3, label: 'Shipped', icon: 'car', completed: false },
  { id: 4, label: 'Delivered', icon: 'home', completed: false },
];

const GUIDES = [
  { 
    id: 1, 
    icon: 'play-circle', 
    iconColor: '#3B82F6',
    title: 'Quick Setup Guide', 
    subtitle: '3 min watch • Get up and running' 
  },
  { 
    id: 2, 
    icon: 'bulb', 
    iconColor: '#F59E0B',
    title: 'Pro Usage Tips', 
    subtitle: 'Maximize your product\'s potential' 
  },
  { 
    id: 3, 
    icon: 'color-wand', 
    iconColor: '#8B5CF6',
    title: 'Care Instructions', 
    subtitle: 'Keep it looking brand new' 
  },
];

export default function OrderDetailsScreen({ route, navigation }) {
  const { order } = route.params;
  const [summaryExpanded, setSummaryExpanded] = useState(false);

  const subtotal = order.total / 1.1;
  const tax = subtotal * 0.1;
  const delivery = 8.00;
  const discount = 10.00;

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" />
      
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity 
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <Ionicons name="chevron-back" size={24} color="#000" />
        </TouchableOpacity>
        <View style={styles.headerCenter}>
          <Text style={styles.headerTitle}>Order #{order.id}</Text>
          <Text style={styles.headerSubtitle}>PLACED JAN 17</Text>
        </View>
        <TouchableOpacity style={styles.menuButton}>
          <Ionicons name="ellipsis-horizontal" size={24} color="#000" />
        </TouchableOpacity>
      </View>

      <ScrollView 
        style={styles.scrollView}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {/* Delivery Status */}
        <View style={styles.deliverySection}>
          <Text style={styles.deliveryLabel}>ESTIMATED DELIVERY</Text>
          <View style={styles.deliveryRow}>
            <Text style={styles.deliveryDate}>Jan 22 – Jan 24</Text>
            <View style={styles.statusBadge}>
              <Text style={styles.statusText}>In Transit</Text>
            </View>
          </View>
        </View>

        {/* Progress Tracker */}
        <View style={styles.progressTracker}>
          {PROGRESS_STEPS.map((step, index) => (
            <View key={step.id} style={styles.progressStep}>
              <View style={[
                styles.progressIcon,
                step.completed && styles.progressIconCompleted,
              ]}>
                <Ionicons 
                  name={step.icon} 
                  size={20} 
                  color={step.completed ? '#FFF' : '#D1D5DB'} 
                />
              </View>
              {index < PROGRESS_STEPS.length - 1 && (
                <View style={[
                  styles.progressLine,
                  step.completed && styles.progressLineCompleted,
                ]} />
              )}
              <Text style={[
                styles.progressLabel,
                step.completed && styles.progressLabelCompleted,
              ]}>
                {step.label}
              </Text>
            </View>
          ))}
        </View>

        {/* Track Order Button */}
        <TouchableOpacity 
          style={styles.trackButton}
          onPress={() => navigation.navigate('OrderStatus', { order })}
        >
          <Ionicons name="location" size={20} color="#FFF" />
          <Text style={styles.trackButtonText}>Track Order</Text>
        </TouchableOpacity>

        {/* Action Buttons */}
        <View style={styles.actionButtons}>
          <TouchableOpacity style={styles.actionButton}>
            <Ionicons name="location-outline" size={18} color="#000" />
            <Text style={styles.actionButtonText}>Change Address</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.actionButton}>
            <Ionicons name="close-circle-outline" size={18} color="#000" />
            <Text style={styles.actionButtonText}>Cancel Order</Text>
          </TouchableOpacity>
        </View>

        {/* Order Summary */}
        <TouchableOpacity 
          style={styles.summarySection}
          onPress={() => setSummaryExpanded(!summaryExpanded)}
        >
          <View style={styles.summaryHeader}>
            <Text style={styles.summaryTitle}>Order Summary</Text>
            <Ionicons 
              name={summaryExpanded ? 'chevron-up' : 'chevron-down'} 
              size={20} 
              color="#6B7280" 
            />
          </View>

          {summaryExpanded && (
            <View style={styles.summaryContent}>
              <View style={styles.summaryRow}>
                <Text style={styles.summaryLabel}>Item subtotal</Text>
                <Text style={styles.summaryValue}>${subtotal.toFixed(2)}</Text>
              </View>
              <View style={styles.summaryRow}>
                <Text style={styles.summaryLabel}>Delivery</Text>
                <Text style={styles.summaryValue}>${delivery.toFixed(2)}</Text>
              </View>
              <View style={styles.summaryRow}>
                <Text style={styles.summaryLabel}>Tax</Text>
                <Text style={styles.summaryValue}>${tax.toFixed(2)}</Text>
              </View>
              <View style={styles.summaryRow}>
                <Text style={styles.discountLabel}>Discount</Text>
                <Text style={styles.discountValue}>-${discount.toFixed(2)}</Text>
              </View>
              <View style={styles.divider} />
              <View style={styles.summaryRow}>
                <Text style={styles.totalLabel}>Total</Text>
                <Text style={styles.totalValue}>${order.total.toFixed(2)}</Text>
              </View>
            </View>
          )}
        </TouchableOpacity>

        {/* Delivery Address */}
        <View style={styles.addressSection}>
          <View style={styles.addressHeader}>
            <Ionicons name="location" size={20} color="#6B7280" />
            <Text style={styles.addressTitle}>Delivery Address</Text>
          </View>
          <Text style={styles.addressText}>
            {order.address ? `${order.address.address}, ${order.address.city}` : '2847 Maple Street, Apt 4B, Springfield'}
          </Text>
        </View>

        {/* Getting Started */}
        <View style={styles.guidesSection}>
          <Text style={styles.guidesTitle}>Getting Started</Text>
          
          {GUIDES.map((guide) => (
            <TouchableOpacity key={guide.id} style={styles.guideCard}>
              <View style={[styles.guideIcon, { backgroundColor: guide.iconColor + '20' }]}>
                <Ionicons name={guide.icon} size={24} color={guide.iconColor} />
              </View>
              <View style={styles.guideContent}>
                <Text style={styles.guideTitle}>{guide.title}</Text>
                <Text style={styles.guideSubtitle}>{guide.subtitle}</Text>
              </View>
              <Ionicons name="chevron-forward" size={20} color="#D1D5DB" />
            </TouchableOpacity>
          ))}
        </View>

        {/* Product Guide Button */}
        <TouchableOpacity style={styles.productGuideButton}>
          <Ionicons name="book-outline" size={20} color="#FFF" />
          <Text style={styles.productGuideText}>Open Full Product Guide</Text>
        </TouchableOpacity>

        {/* Customer Feedback */}
        <View style={styles.feedbackSection}>
          <View style={styles.feedbackHeader}>
            <Text style={styles.feedbackTitle}>Customer Feedback</Text>
            <TouchableOpacity>
              <Text style={styles.seeAllText}>See all</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.ratingContainer}>
            <View style={styles.stars}>
              {[...Array(5)].map((_, i) => (
                <Ionicons key={i} name="star" size={16} color="#F59E0B" />
              ))}
            </View>
            <Text style={styles.ratingScore}>4.8</Text>
            <Text style={styles.reviewCount}>• 1.2k reviews</Text>
          </View>

          <View style={styles.reviewCard}>
            <Text style={styles.reviewText}>
              "Great quality and exactly as described. Delivery was fast and packaging was secure. 
              Highly recommend for daily use!"
            </Text>
            <View style={styles.reviewerInfo}>
              <View style={styles.reviewerAvatar}>
                <Text style={styles.reviewerInitials}>SM</Text>
              </View>
              <Text style={styles.reviewerName}>Sarah M.</Text>
              <View style={styles.verifiedBadge}>
                <Text style={styles.verifiedText}>VERIFIED BUYER</Text>
              </View>
            </View>
          </View>
        </View>

        {/* Share Section */}
        <View style={styles.shareSection}>
          <View style={styles.shareIconContainer}>
            <Ionicons name="share-social" size={32} color="#10B981" />
          </View>
          <Text style={styles.shareTitle}>Love your purchase?</Text>
          <Text style={styles.shareSubtitle}>
            Share your experience with friends and help them discover something great
          </Text>
          <TouchableOpacity style={styles.shareButton}>
            <Ionicons name="share-outline" size={18} color="#000" />
            <Text style={styles.shareButtonText}>Share with a friend</Text>
          </TouchableOpacity>
        </View>

        <View style={{ height: 100 }} />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F9FAFB',
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
  backButton: {
    width: 40,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerCenter: {
    flex: 1,
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#000',
  },
  headerSubtitle: {
    fontSize: 11,
    color: '#9CA3AF',
    fontWeight: '500',
    letterSpacing: 0.5,
  },
  menuButton: {
    width: 40,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    padding: 20,
  },
  deliverySection: {
    marginBottom: 20,
  },
  deliveryLabel: {
    fontSize: 11,
    fontWeight: '600',
    color: '#9CA3AF',
    letterSpacing: 0.5,
    marginBottom: 6,
  },
  deliveryRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  deliveryDate: {
    fontSize: 22,
    fontWeight: '800',
    color: '#000',
  },
  statusBadge: {
    backgroundColor: '#D1FAE5',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 12,
  },
  statusText: {
    fontSize: 12,
    fontWeight: '700',
    color: '#10B981',
  },
  progressTracker: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 24,
    paddingHorizontal: 10,
  },
  progressStep: {
    alignItems: 'center',
    flex: 1,
    position: 'relative',
  },
  progressIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: '#F3F4F6',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 8,
  },
  progressIconCompleted: {
    backgroundColor: '#10B981',
  },
  progressLine: {
    position: 'absolute',
    top: 24,
    left: '50%',
    right: '-50%',
    height: 2,
    backgroundColor: '#E5E7EB',
    zIndex: -1,
  },
  progressLineCompleted: {
    backgroundColor: '#10B981',
  },
  progressLabel: {
    fontSize: 11,
    fontWeight: '600',
    color: '#9CA3AF',
    textAlign: 'center',
  },
  progressLabelCompleted: {
    color: '#000',
  },
  trackButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#1F2937',
    paddingVertical: 16,
    borderRadius: 16,
    marginBottom: 16,
    gap: 8,
  },
  trackButtonText: {
    fontSize: 16,
    fontWeight: '700',
    color: '#FFF',
  },
  actionButtons: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: 24,
  },
  actionButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FFFFFF',
    paddingVertical: 14,
    borderRadius: 12,
    gap: 6,
  },
  actionButtonText: {
    fontSize: 13,
    fontWeight: '600',
    color: '#000',
  },
  summarySection: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 16,
    marginBottom: 16,
  },
  summaryHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  summaryTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#000',
  },
  summaryContent: {
    marginTop: 16,
  },
  summaryRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  summaryLabel: {
    fontSize: 14,
    color: '#6B7280',
  },
  summaryValue: {
    fontSize: 14,
    fontWeight: '600',
    color: '#000',
  },
  discountLabel: {
    fontSize: 14,
    fontWeight: '600',
    color: '#10B981',
  },
  discountValue: {
    fontSize: 14,
    fontWeight: '700',
    color: '#10B981',
  },
  divider: {
    height: 1,
    backgroundColor: '#E5E7EB',
    marginVertical: 12,
  },
  totalLabel: {
    fontSize: 16,
    fontWeight: '700',
    color: '#000',
  },
  totalValue: {
    fontSize: 18,
    fontWeight: '800',
    color: '#000',
  },
  addressSection: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 16,
    marginBottom: 24,
  },
  addressHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 8,
  },
  addressTitle: {
    fontSize: 14,
    fontWeight: '700',
    color: '#000',
  },
  addressText: {
    fontSize: 14,
    color: '#6B7280',
    lineHeight: 20,
  },
  guidesSection: {
    marginBottom: 16,
  },
  guidesTitle: {
    fontSize: 20,
    fontWeight: '800',
    color: '#000',
    marginBottom: 16,
  },
  guideCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 16,
    marginBottom: 12,
  },
  guideIcon: {
    width: 48,
    height: 48,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  guideContent: {
    flex: 1,
  },
  guideTitle: {
    fontSize: 15,
    fontWeight: '700',
    color: '#000',
    marginBottom: 2,
  },
  guideSubtitle: {
    fontSize: 13,
    color: '#6B7280',
  },
  productGuideButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#1F2937',
    paddingVertical: 16,
    borderRadius: 16,
    marginBottom: 24,
    gap: 8,
  },
  productGuideText: {
    fontSize: 16,
    fontWeight: '700',
    color: '#FFF',
  },
  feedbackSection: {
    marginBottom: 24,
  },
  feedbackHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  feedbackTitle: {
    fontSize: 20,
    fontWeight: '800',
    color: '#000',
  },
  seeAllText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#10B981',
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
    gap: 6,
  },
  stars: {
    flexDirection: 'row',
    gap: 2,
  },
  ratingScore: {
    fontSize: 16,
    fontWeight: '700',
    color: '#000',
  },
  reviewCount: {
    fontSize: 14,
    color: '#9CA3AF',
  },
  reviewCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 16,
  },
  reviewText: {
    fontSize: 14,
    color: '#374151',
    lineHeight: 20,
    marginBottom: 12,
  },
  reviewerInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  reviewerAvatar: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#E0E7FF',
    alignItems: 'center',
    justifyContent: 'center',
  },
  reviewerInitials: {
    fontSize: 12,
    fontWeight: '700',
    color: '#4F46E5',
  },
  reviewerName: {
    fontSize: 14,
    fontWeight: '600',
    color: '#000',
  },
  verifiedBadge: {
    backgroundColor: '#DBEAFE',
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 6,
  },
  verifiedText: {
    fontSize: 10,
    fontWeight: '700',
    color: '#3B82F6',
    letterSpacing: 0.5,
  },
  shareSection: {
    backgroundColor: '#D1FAE5',
    borderRadius: 20,
    padding: 24,
    alignItems: 'center',
  },
  shareIconContainer: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: '#FFF',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 16,
  },
  shareTitle: {
    fontSize: 20,
    fontWeight: '800',
    color: '#000',
    marginBottom: 8,
  },
  shareSubtitle: {
    fontSize: 14,
    color: '#6B7280',
    textAlign: 'center',
    marginBottom: 16,
    lineHeight: 20,
  },
  shareButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFF',
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 12,
    gap: 6,
  },
  shareButtonText: {
    fontSize: 15,
    fontWeight: '700',
    color: '#000',
  },
});

