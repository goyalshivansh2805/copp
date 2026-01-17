import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  TextInput,
  StatusBar,
} from 'react-native';
import { Ionicons, Feather } from '@expo/vector-icons';
import { useCart } from '../context/CartContext';

const PAYMENT_METHODS = [
  { id: 'card', name: 'Credit/Debit Card', icon: 'card-outline' },
  { id: 'upi', name: 'UPI', icon: 'phone-portrait-outline' },
  { id: 'cod', name: 'Cash on Delivery', icon: 'cash-outline' },
];

export default function CheckoutScreen({ navigation }) {
  const { cartItems, getTotalPrice, placeOrder, savedAddress } = useCart();
  const [selectedPayment, setSelectedPayment] = useState('card');
  const [useSavedAddress, setUseSavedAddress] = useState(!!savedAddress);
  const [formData, setFormData] = useState(
    savedAddress || {
      name: '',
      phone: '',
      address: '',
      city: '',
      pincode: '',
    }
  );

  const handlePlaceOrder = () => {
    // Validate form
    if (!formData.name || !formData.phone || !formData.address || !formData.city || !formData.pincode) {
      alert('Please fill all the fields');
      return;
    }

    // Place order with address
    const order = placeOrder(formData);
    
    // Navigate to success screen
    navigation.navigate('OrderSuccess', { 
      orderId: order.id,
      total: order.total,
      estimatedDelivery: order.estimatedDelivery,
      items: order.items,
      address: formData,
    });
  };

  const subtotal = getTotalPrice();
  const tax = subtotal * 0.1;
  const shipping = 0;
  const total = subtotal + tax + shipping;

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
        <Text style={styles.headerTitle}>Checkout</Text>
        <View style={styles.headerButton} />
      </View>

      <ScrollView 
        style={styles.scrollView}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {/* Shipping Address */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Ionicons name="location-outline" size={24} color="#0066FF" />
            <Text style={styles.sectionTitle}>Shipping Address</Text>
          </View>

          {savedAddress && (
            <TouchableOpacity 
              style={styles.savedAddressToggle}
              onPress={() => {
                setUseSavedAddress(!useSavedAddress);
                if (!useSavedAddress) {
                  setFormData(savedAddress);
                } else {
                  setFormData({
                    name: '',
                    phone: '',
                    address: '',
                    city: '',
                    pincode: '',
                  });
                }
              }}
            >
              <View style={styles.checkboxContainer}>
                <View style={[styles.checkbox, useSavedAddress && styles.checkboxChecked]}>
                  {useSavedAddress && <Ionicons name="checkmark" size={16} color="#FFF" />}
                </View>
                <Text style={styles.checkboxLabel}>Use saved address</Text>
              </View>
              {useSavedAddress && (
                <View style={styles.savedAddressPreview}>
                  <Text style={styles.savedAddressText}>{savedAddress.name}</Text>
                  <Text style={styles.savedAddressText}>{savedAddress.address}</Text>
                </View>
              )}
            </TouchableOpacity>
          )}

          <View style={styles.form}>
            <View style={styles.inputContainer}>
              <Text style={styles.inputLabel}>Full Name</Text>
              <TextInput
                style={styles.input}
                placeholder="Enter your name"
                value={formData.name}
                onChangeText={(text) => setFormData({...formData, name: text})}
              />
            </View>

            <View style={styles.inputContainer}>
              <Text style={styles.inputLabel}>Phone Number</Text>
              <TextInput
                style={styles.input}
                placeholder="Enter phone number"
                keyboardType="phone-pad"
                value={formData.phone}
                onChangeText={(text) => setFormData({...formData, phone: text})}
              />
            </View>

            <View style={styles.inputContainer}>
              <Text style={styles.inputLabel}>Address</Text>
              <TextInput
                style={[styles.input, styles.textArea]}
                placeholder="Enter your address"
                multiline
                numberOfLines={3}
                value={formData.address}
                onChangeText={(text) => setFormData({...formData, address: text})}
              />
            </View>

            <View style={styles.row}>
              <View style={[styles.inputContainer, { flex: 1, marginRight: 12 }]}>
                <Text style={styles.inputLabel}>City</Text>
                <TextInput
                  style={styles.input}
                  placeholder="City"
                  value={formData.city}
                  onChangeText={(text) => setFormData({...formData, city: text})}
                />
              </View>

              <View style={[styles.inputContainer, { flex: 1 }]}>
                <Text style={styles.inputLabel}>Pincode</Text>
                <TextInput
                  style={styles.input}
                  placeholder="Pincode"
                  keyboardType="number-pad"
                  value={formData.pincode}
                  onChangeText={(text) => setFormData({...formData, pincode: text})}
                />
              </View>
            </View>
          </View>
        </View>

        {/* Payment Method */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Ionicons name="wallet-outline" size={24} color="#0066FF" />
            <Text style={styles.sectionTitle}>Payment Method</Text>
          </View>

          <View style={styles.paymentMethods}>
            {PAYMENT_METHODS.map((method) => (
              <TouchableOpacity
                key={method.id}
                style={[
                  styles.paymentCard,
                  selectedPayment === method.id && styles.paymentCardActive,
                ]}
                onPress={() => setSelectedPayment(method.id)}
              >
                <View style={styles.paymentLeft}>
                  <View style={[
                    styles.paymentIcon,
                    selectedPayment === method.id && styles.paymentIconActive,
                  ]}>
                    <Ionicons 
                      name={method.icon} 
                      size={24} 
                      color={selectedPayment === method.id ? "#0066FF" : "#6B7280"} 
                    />
                  </View>
                  <Text style={[
                    styles.paymentName,
                    selectedPayment === method.id && styles.paymentNameActive,
                  ]}>
                    {method.name}
                  </Text>
                </View>
                {selectedPayment === method.id && (
                  <Ionicons name="checkmark-circle" size={24} color="#0066FF" />
                )}
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Order Summary */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Ionicons name="receipt-outline" size={24} color="#0066FF" />
            <Text style={styles.sectionTitle}>Order Summary</Text>
          </View>

          <View style={styles.summary}>
            <View style={styles.summaryRow}>
              <Text style={styles.summaryLabel}>Items ({cartItems.length})</Text>
              <Text style={styles.summaryValue}>${subtotal.toFixed(2)}</Text>
            </View>
            <View style={styles.summaryRow}>
              <Text style={styles.summaryLabel}>Shipping</Text>
              <Text style={styles.summaryValue}>Free</Text>
            </View>
            <View style={styles.summaryRow}>
              <Text style={styles.summaryLabel}>Tax (10%)</Text>
              <Text style={styles.summaryValue}>${tax.toFixed(2)}</Text>
            </View>
            <View style={styles.divider} />
            <View style={styles.summaryRow}>
              <Text style={styles.totalLabel}>Total</Text>
              <Text style={styles.totalValue}>${total.toFixed(2)}</Text>
            </View>
          </View>
        </View>

        <View style={{ height: 100 }} />
      </ScrollView>

      {/* Bottom Bar */}
      <View style={styles.bottomBar}>
        <View style={styles.totalSection}>
          <Text style={styles.totalBottomLabel}>Total Amount</Text>
          <Text style={styles.totalBottomValue}>${total.toFixed(2)}</Text>
        </View>
        <TouchableOpacity 
          style={styles.placeOrderButton}
          onPress={handlePlaceOrder}
        >
          <Text style={styles.placeOrderText}>Place Order</Text>
          <Ionicons name="arrow-forward" size={20} color="#FFF" />
        </TouchableOpacity>
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
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#000',
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: 20,
    paddingTop: 10,
  },
  section: {
    marginBottom: 24,
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#000',
  },
  form: {
    gap: 16,
  },
  inputContainer: {
    gap: 8,
  },
  inputLabel: {
    fontSize: 14,
    fontWeight: '600',
    color: '#374151',
  },
  input: {
    backgroundColor: '#F5F5F7',
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 14,
    fontSize: 15,
    color: '#000',
    borderWidth: 2,
    borderColor: 'transparent',
  },
  textArea: {
    height: 80,
    textAlignVertical: 'top',
    paddingTop: 14,
  },
  row: {
    flexDirection: 'row',
  },
  savedAddressToggle: {
    backgroundColor: '#EBF5FF',
    borderRadius: 16,
    padding: 16,
    marginBottom: 16,
    borderWidth: 2,
    borderColor: '#0066FF',
  },
  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    marginBottom: 8,
  },
  checkbox: {
    width: 24,
    height: 24,
    borderRadius: 6,
    borderWidth: 2,
    borderColor: '#0066FF',
    alignItems: 'center',
    justifyContent: 'center',
  },
  checkboxChecked: {
    backgroundColor: '#0066FF',
  },
  checkboxLabel: {
    fontSize: 15,
    fontWeight: '600',
    color: '#000',
  },
  savedAddressPreview: {
    paddingLeft: 36,
  },
  savedAddressText: {
    fontSize: 13,
    color: '#6B7280',
    lineHeight: 18,
  },
  paymentMethods: {
    gap: 12,
  },
  paymentCard: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#F5F5F7',
    borderRadius: 16,
    padding: 16,
    borderWidth: 2,
    borderColor: 'transparent',
  },
  paymentCardActive: {
    backgroundColor: '#EBF5FF',
    borderColor: '#0066FF',
  },
  paymentLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  paymentIcon: {
    width: 48,
    height: 48,
    borderRadius: 12,
    backgroundColor: '#E5E7EB',
    alignItems: 'center',
    justifyContent: 'center',
  },
  paymentIconActive: {
    backgroundColor: '#DBEAFE',
  },
  paymentName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#6B7280',
  },
  paymentNameActive: {
    color: '#000',
  },
  summary: {
    backgroundColor: '#F5F5F7',
    borderRadius: 16,
    padding: 20,
  },
  summaryRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  summaryLabel: {
    fontSize: 15,
    color: '#6B7280',
    fontWeight: '500',
  },
  summaryValue: {
    fontSize: 15,
    color: '#000',
    fontWeight: '600',
  },
  divider: {
    height: 1,
    backgroundColor: '#D1D5DB',
    marginVertical: 12,
  },
  totalLabel: {
    fontSize: 18,
    fontWeight: '700',
    color: '#000',
  },
  totalValue: {
    fontSize: 20,
    fontWeight: '800',
    color: '#0066FF',
  },
  bottomBar: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
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
  totalSection: {
    flex: 1,
  },
  totalBottomLabel: {
    fontSize: 13,
    color: '#9CA3AF',
    fontWeight: '500',
    marginBottom: 2,
  },
  totalBottomValue: {
    fontSize: 24,
    fontWeight: '800',
    color: '#000',
  },
  placeOrderButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#0066FF',
    paddingHorizontal: 32,
    paddingVertical: 16,
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
  placeOrderText: {
    fontSize: 16,
    fontWeight: '700',
    color: '#FFF',
  },
});

