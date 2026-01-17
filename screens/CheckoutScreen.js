import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  TextInput,
  StatusBar,
  Image,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useCart } from '../context/CartContext';

export default function CheckoutScreen({ navigation }) {
  const { cartTotal, cartItems, placeOrder, savedAddress } = useCart();
  
  const [email, setEmail] = useState('rumenhussen@gmail.com');
  const [phone, setPhone] = useState('+88-692 -764-269');
  const [address, setAddress] = useState('Newshall St 36, London, 12908 - UK');
  const [paymentMethod, setPaymentMethod] = useState('Paypal Card');

  const subtotal = cartTotal;
  const shipping = 40.90;
  const total = subtotal + shipping;

  const handlePayment = () => {
    const order = placeOrder({
      email,
      phone,
      address,
      paymentMethod,
    });

    navigation.navigate('OrderSuccess', { 
      orderId: order.id,
      total: order.total,
      estimatedDelivery: order.estimatedDelivery,
      items: order.items,
      address: { address },
    });
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
        <Text style={styles.headerTitle}>Checkout</Text>
        <View style={styles.backButton} />
      </View>

      <ScrollView 
        style={styles.scrollView}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {/* Contact Information */}
        <Text style={styles.sectionTitle}>Contact Information</Text>
        
        <View style={styles.inputGroup}>
          <View style={styles.iconContainer}>
            <Ionicons name="mail-outline" size={24} color="#6B7280" />
          </View>
          <View style={styles.inputContent}>
            <TextInput
              style={styles.input}
              value={email}
              onChangeText={setEmail}
              keyboardType="email-address"
            />
            <Text style={styles.inputLabel}>Email</Text>
          </View>
          <TouchableOpacity style={styles.editButton}>
            <Ionicons name="pencil" size={20} color="#6B7280" />
          </TouchableOpacity>
        </View>

        <View style={styles.inputGroup}>
          <View style={styles.iconContainer}>
            <Ionicons name="call-outline" size={24} color="#6B7280" />
          </View>
          <View style={styles.inputContent}>
            <TextInput
              style={styles.input}
              value={phone}
              onChangeText={setPhone}
              keyboardType="phone-pad"
            />
            <Text style={styles.inputLabel}>Phone</Text>
          </View>
          <TouchableOpacity style={styles.editButton}>
            <Ionicons name="pencil" size={20} color="#6B7280" />
          </TouchableOpacity>
        </View>

        {/* Address */}
        <Text style={styles.sectionTitle}>Address</Text>
        
        <TouchableOpacity style={styles.addressDropdown}>
          <Text style={styles.addressText}>{address}</Text>
          <Ionicons name="chevron-down" size={20} color="#6B7280" />
        </TouchableOpacity>

        {/* Map Preview */}
        <View style={styles.mapContainer}>
          <View style={styles.mapPlaceholder}>
            {/* Map grid pattern */}
            <View style={styles.mapGrid}>
              {[...Array(6)].map((_, row) => (
                <View key={row} style={styles.mapRow}>
                  {[...Array(8)].map((_, col) => (
                    <View key={col} style={styles.mapCell} />
                  ))}
                </View>
              ))}
            </View>
            {/* Location Pin */}
            <View style={styles.mapPin}>
              <View style={styles.pinCircle}>
                <Ionicons name="location" size={28} color="#FFF" />
              </View>
            </View>
          </View>
        </View>

        {/* Payment Method */}
        <Text style={styles.sectionTitle}>Payment Method</Text>
        
        <TouchableOpacity style={styles.paymentCard}>
          <View style={styles.paypalLogo}>
            <Text style={styles.paypalText}>P</Text>
          </View>
          <View style={styles.paymentInfo}>
            <Text style={styles.paymentName}>Paypal Card</Text>
            <Text style={styles.cardNumber}>**** **** 0696 4629</Text>
          </View>
          <Ionicons name="chevron-down" size={20} color="#6B7280" />
        </TouchableOpacity>

        {/* Summary */}
        <View style={styles.summarySection}>
          <View style={styles.summaryRow}>
            <Text style={styles.summaryLabel}>Subtotal</Text>
            <Text style={styles.summaryValue}>${subtotal.toFixed(2)}</Text>
          </View>

          <View style={styles.summaryRow}>
            <Text style={styles.summaryLabel}>Shopping</Text>
            <Text style={styles.summaryValue}>${shipping.toFixed(2)}</Text>
          </View>

          <View style={[styles.summaryRow, styles.totalRow]}>
            <Text style={styles.totalLabel}>Total Cost</Text>
            <Text style={styles.totalValue}>${total.toFixed(2)}</Text>
          </View>
        </View>

        <View style={{ height: 100 }} />
      </ScrollView>

      {/* Payment Button */}
      <View style={styles.bottomContainer}>
        <TouchableOpacity 
          style={styles.paymentButton}
          onPress={handlePayment}
        >
          <Text style={styles.paymentButtonText}>Payment</Text>
        </TouchableOpacity>
      </View>
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
  sectionTitle: {
    fontSize: 15,
    fontWeight: '700',
    color: '#1F2937',
    marginBottom: 14,
    marginTop: 16,
  },
  inputGroup: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    marginBottom: 14,
  },
  iconContainer: {
    marginRight: 16,
  },
  inputContent: {
    flex: 1,
  },
  input: {
    fontSize: 15,
    fontWeight: '600',
    color: '#1F2937',
    padding: 0,
    marginBottom: 2,
  },
  inputLabel: {
    fontSize: 11,
    color: '#9CA3AF',
  },
  editButton: {
    padding: 8,
  },
  addressDropdown: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    marginBottom: 14,
  },
  addressText: {
    fontSize: 14,
    color: '#6B7280',
    flex: 1,
  },
  mapContainer: {
    marginBottom: 24,
  },
  mapPlaceholder: {
    height: 120,
    borderRadius: 16,
    overflow: 'hidden',
    position: 'relative',
    backgroundColor: '#E8F4E8',
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
  paymentCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    marginBottom: 20,
  },
  paypalLogo: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: '#003087',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  paypalText: {
    fontSize: 24,
    fontWeight: '700',
    color: '#FFF',
  },
  paymentInfo: {
    flex: 1,
  },
  paymentName: {
    fontSize: 15,
    fontWeight: '700',
    color: '#1F2937',
    marginBottom: 2,
  },
  cardNumber: {
    fontSize: 13,
    color: '#9CA3AF',
  },
  summarySection: {
    marginBottom: 20,
    marginTop: 8,
  },
  summaryRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 14,
  },
  summaryLabel: {
    fontSize: 15,
    color: '#6B7280',
    fontWeight: '400',
  },
  summaryValue: {
    fontSize: 17,
    fontWeight: '600',
    color: '#1F2937',
  },
  totalRow: {
    marginTop: 6,
  },
  totalLabel: {
    fontSize: 16,
    fontWeight: '700',
    color: '#1F2937',
  },
  totalValue: {
    fontSize: 19,
    fontWeight: '700',
    color: '#1F2937',
  },
  bottomContainer: {
    backgroundColor: '#F8F9FA',
    paddingHorizontal: 20,
    paddingVertical: 16,
    paddingBottom: 30,
  },
  paymentButton: {
    backgroundColor: '#5B9FED',
    paddingVertical: 18,
    borderRadius: 50,
    alignItems: 'center',
  },
  paymentButtonText: {
    fontSize: 16,
    fontWeight: '700',
    color: '#FFFFFF',
  },
});
