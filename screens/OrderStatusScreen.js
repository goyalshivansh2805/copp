import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  StatusBar,
  Linking,
  Clipboard,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const TIMELINE_STEPS = [
  { 
    id: 1, 
    title: 'Order confirmed', 
    date: 'JAN 17, 2026 • 10:23 AM',
    description: 'Your order has been received and confirmed.',
    icon: 'checkmark',
    color: '#10B981',
    status: 'completed',
  },
  { 
    id: 2, 
    title: 'Packed', 
    date: 'JAN 17, 2026 • 3:45 PM',
    description: 'Package is ready and will be shipped soon.',
    icon: 'cube',
    color: '#10B981',
    status: 'completed',
  },
  { 
    id: 3, 
    title: 'Shipped', 
    date: 'EXPECTED JAN 19, 2026',
    description: 'Package is in transit with our carrier partner.',
    icon: 'car',
    color: '#3B82F6',
    status: 'current',
  },
  { 
    id: 4, 
    title: 'Delivered', 
    date: 'EXPECTED JAN 22',
    description: '',
    icon: 'home',
    color: '#D1D5DB',
    status: 'pending',
  },
];

export default function OrderStatusScreen({ route, navigation }) {
  const { order } = route.params;
  const trackingNumber = 'DHL9876543210US';

  const copyToClipboard = () => {
    Clipboard.setString(trackingNumber);
  };

  const openCarrierSite = () => {
    Linking.openURL('https://www.dhl.com/tracking');
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" />
      
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity 
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <Ionicons name="chevron-back" size={26} color="#000" />
        </TouchableOpacity>
        <View style={styles.headerCenter}>
          <Text style={styles.headerTitle}>Order Tracking</Text>
          <Text style={styles.headerSubtitle}>ORDER #{order.id}</Text>
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
        {/* Map Section with Truck Icon */}
        <View style={styles.mapSection}>
          <View style={styles.gridBackground}>
            {[...Array(8)].map((_, row) => (
              <View key={row} style={styles.gridRow}>
                {[...Array(6)].map((_, col) => (
                  <View key={col} style={styles.gridCell} />
                ))}
              </View>
            ))}
          </View>
          <View style={styles.truckIconContainer}>
            <View style={styles.truckIconOuter}>
              <View style={styles.truckIconInner}>
                <Ionicons name="car" size={40} color="#FFF" />
              </View>
            </View>
          </View>
        </View>

        {/* Current Location Card */}
        <View style={styles.locationCard}>
          <View style={styles.locationIcon}>
            <Ionicons name="location" size={24} color="#3B82F6" />
          </View>
          <View style={styles.locationContent}>
            <Text style={styles.locationLabel}>CURRENT LOCATION</Text>
            <Text style={styles.locationAddress}>Distribution Center, Los Angeles</Text>
          </View>
        </View>

        {/* Arrival Status Card */}
        <View style={styles.statusCard}>
          <View style={styles.statusHeader}>
            <View>
              <Text style={styles.statusBadge}>IN TRANSIT</Text>
              <Text style={styles.arrivalTitle}>Arriving Thursday</Text>
              <Text style={styles.estimatedDate}>Estimated Jan 22 - Jan 24</Text>
            </View>
            <View style={styles.calendarIcon}>
              <Ionicons name="calendar" size={28} color="#3B82F6" />
            </View>
          </View>
          <View style={styles.progressBarContainer}>
            <View style={styles.progressBar}>
              <View style={styles.progressFill} />
            </View>
          </View>
        </View>

        {/* Tracking Timeline */}
        <View style={styles.timelineSection}>
          <Text style={styles.timelineTitle}>Tracking Timeline</Text>
          
          <View style={styles.timeline}>
            {TIMELINE_STEPS.map((step, index) => (
              <View key={step.id} style={styles.timelineItem}>
                <View style={styles.timelineIconColumn}>
                  <View style={[
                    styles.stepIcon,
                    { backgroundColor: step.color },
                  ]}>
                    <Ionicons 
                      name={step.icon} 
                      size={22} 
                      color={step.status === 'pending' ? '#9CA3AF' : '#FFF'} 
                    />
                  </View>
                  {index < TIMELINE_STEPS.length - 1 && (
                    <View style={[
                      styles.connectorLine,
                      step.status === 'completed' && styles.connectorLineActive,
                    ]} />
                  )}
                </View>
                
                <View style={styles.timelineContent}>
                  <Text style={[
                    styles.stepTitle,
                    step.status === 'pending' && styles.stepTitlePending,
                  ]}>
                    {step.title}
                  </Text>
                  <Text style={[
                    styles.stepDate,
                    step.status === 'current' && styles.stepDateCurrent,
                  ]}>
                    {step.date}
                  </Text>
                  {step.description !== '' && (
                    <Text style={styles.stepDescription}>{step.description}</Text>
                  )}
                </View>
              </View>
            ))}
          </View>
        </View>

        {/* Carrier Information */}
        <View style={styles.carrierSection}>
          <View style={styles.carrierCard}>
            <View style={styles.dhlLogo}>
              <Text style={styles.dhlText}>DHL</Text>
            </View>
            <View style={styles.carrierInfo}>
              <Text style={styles.carrierName}>DHL Global Mail</Text>
              <Text style={styles.carrierService}>International Express Shipping</Text>
            </View>
          </View>

          <View style={styles.trackingNumberSection}>
            <View>
              <Text style={styles.trackingLabel}>TRACKING NUMBER</Text>
              <Text style={styles.trackingNumberText}>{trackingNumber}</Text>
            </View>
            <TouchableOpacity 
              style={styles.copyButton}
              onPress={copyToClipboard}
            >
              <Ionicons name="copy-outline" size={20} color="#6B7280" />
            </TouchableOpacity>
          </View>

          <TouchableOpacity 
            style={styles.carrierButton}
            onPress={openCarrierSite}
          >
            <Ionicons name="open-outline" size={18} color="#FFF" />
            <Text style={styles.carrierButtonText}>Track on carrier site</Text>
          </TouchableOpacity>
        </View>

        {/* Help Section */}
        <TouchableOpacity style={styles.helpSection}>
          <Text style={styles.helpText}>Need help with this order?</Text>
        </TouchableOpacity>

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
    fontSize: 17,
    fontWeight: '700',
    color: '#000',
  },
  headerSubtitle: {
    fontSize: 11,
    color: '#9CA3AF',
    fontWeight: '600',
    letterSpacing: 0.5,
    marginTop: 2,
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
    paddingTop: 0,
  },
  mapSection: {
    height: 200,
    backgroundColor: '#E0E7FF',
    position: 'relative',
    overflow: 'hidden',
  },
  gridBackground: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    flexDirection: 'column',
  },
  gridRow: {
    flexDirection: 'row',
    flex: 1,
  },
  gridCell: {
    flex: 1,
    borderWidth: 0.5,
    borderColor: '#C7D2FE',
  },
  truckIconContainer: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    marginLeft: -50,
    marginTop: -50,
  },
  truckIconOuter: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: '#BFDBFE',
    alignItems: 'center',
    justifyContent: 'center',
  },
  truckIconInner: {
    width: 70,
    height: 70,
    borderRadius: 35,
    backgroundColor: '#3B82F6',
    alignItems: 'center',
    justifyContent: 'center',
  },
  locationCard: {
    flexDirection: 'row',
    backgroundColor: '#FFFFFF',
    marginHorizontal: 20,
    marginTop: -30,
    borderRadius: 16,
    padding: 16,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
    marginBottom: 16,
  },
  locationIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: '#EFF6FF',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  locationContent: {
    flex: 1,
  },
  locationLabel: {
    fontSize: 11,
    fontWeight: '700',
    color: '#9CA3AF',
    letterSpacing: 0.5,
    marginBottom: 4,
  },
  locationAddress: {
    fontSize: 16,
    fontWeight: '700',
    color: '#000',
  },
  statusCard: {
    backgroundColor: '#FFFFFF',
    marginHorizontal: 20,
    borderRadius: 20,
    padding: 20,
    marginBottom: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  statusHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 16,
  },
  statusBadge: {
    fontSize: 12,
    fontWeight: '800',
    color: '#3B82F6',
    letterSpacing: 0.5,
    marginBottom: 8,
  },
  arrivalTitle: {
    fontSize: 26,
    fontWeight: '800',
    color: '#000',
    marginBottom: 4,
  },
  estimatedDate: {
    fontSize: 14,
    color: '#6B7280',
    fontWeight: '500',
  },
  calendarIcon: {
    width: 50,
    height: 50,
    borderRadius: 12,
    backgroundColor: '#EFF6FF',
    alignItems: 'center',
    justifyContent: 'center',
  },
  progressBarContainer: {
    marginTop: 4,
  },
  progressBar: {
    height: 8,
    backgroundColor: '#E5E7EB',
    borderRadius: 4,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    width: '65%',
    backgroundColor: '#3B82F6',
    borderRadius: 4,
  },
  timelineSection: {
    paddingHorizontal: 20,
    marginBottom: 24,
  },
  timelineTitle: {
    fontSize: 20,
    fontWeight: '800',
    color: '#000',
    marginBottom: 20,
  },
  timeline: {
    paddingLeft: 4,
  },
  timelineItem: {
    flexDirection: 'row',
    marginBottom: 4,
  },
  timelineIconColumn: {
    alignItems: 'center',
    marginRight: 16,
    width: 48,
  },
  stepIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    alignItems: 'center',
    justifyContent: 'center',
  },
  connectorLine: {
    width: 3,
    flex: 1,
    backgroundColor: '#E5E7EB',
    marginVertical: 4,
  },
  connectorLineActive: {
    backgroundColor: '#10B981',
  },
  timelineContent: {
    flex: 1,
    paddingBottom: 20,
    paddingTop: 4,
  },
  stepTitle: {
    fontSize: 17,
    fontWeight: '700',
    color: '#000',
    marginBottom: 4,
  },
  stepTitlePending: {
    color: '#9CA3AF',
  },
  stepDate: {
    fontSize: 13,
    fontWeight: '600',
    color: '#9CA3AF',
    marginBottom: 6,
  },
  stepDateCurrent: {
    color: '#3B82F6',
  },
  stepDescription: {
    fontSize: 14,
    color: '#6B7280',
    lineHeight: 20,
  },
  carrierSection: {
    paddingHorizontal: 20,
    marginBottom: 16,
  },
  carrierCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 16,
    marginBottom: 16,
  },
  dhlLogo: {
    width: 60,
    height: 60,
    backgroundColor: '#FFCC00',
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 16,
  },
  dhlText: {
    fontSize: 20,
    fontWeight: '800',
    color: '#D40511',
    fontStyle: 'italic',
  },
  carrierInfo: {
    flex: 1,
  },
  carrierName: {
    fontSize: 16,
    fontWeight: '700',
    color: '#000',
    marginBottom: 2,
  },
  carrierService: {
    fontSize: 13,
    color: '#6B7280',
    fontWeight: '500',
  },
  trackingNumberSection: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#F9FAFB',
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
  },
  trackingLabel: {
    fontSize: 11,
    fontWeight: '700',
    color: '#9CA3AF',
    letterSpacing: 0.5,
    marginBottom: 6,
  },
  trackingNumberText: {
    fontSize: 16,
    fontWeight: '700',
    color: '#000',
  },
  copyButton: {
    width: 40,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 10,
  },
  carrierButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#3B82F6',
    paddingVertical: 16,
    borderRadius: 16,
    gap: 8,
  },
  carrierButtonText: {
    fontSize: 16,
    fontWeight: '700',
    color: '#FFF',
  },
  helpSection: {
    backgroundColor: '#FFFFFF',
    marginHorizontal: 20,
    borderRadius: 16,
    paddingVertical: 20,
    alignItems: 'center',
    marginBottom: 20,
  },
  helpText: {
    fontSize: 15,
    fontWeight: '600',
    color: '#6B7280',
  },
});
