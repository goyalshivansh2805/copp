import React, { useEffect } from 'react';
import {
  StyleSheet,
  Text,
  View,
  StatusBar,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function OrderSuccessScreen({ route, navigation }) {
  const { orderId, total, estimatedDelivery, items, address } = route.params;

  useEffect(() => {
    // Auto redirect to order details after 2 seconds
    const timer = setTimeout(() => {
      navigation.replace('OrderDetails', { 
        order: { 
          id: orderId, 
          total, 
          estimatedDelivery,
          status: 'Shipping',
          items: items || [],
          address: address,
        } 
      });
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#F8F9FA" />
      
      {/* Success Icon */}
      <View style={styles.iconContainer}>
        <View style={styles.checkCircle}>
          <Ionicons name="checkmark" size={60} color="#FFF" />
        </View>
      </View>

      {/* Success Message */}
      <Text style={styles.title}>Order confirmed</Text>
      <Text style={styles.subtitle}>Your payment was successful.</Text>

      {/* Rating */}
      <View style={styles.ratingContainer}>
        <Text style={styles.ratingText}>Rated </Text>
        <Text style={styles.ratingScore}>4.6/5</Text>
        <Text style={styles.ratingText}> by verified buyers</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8F9FA',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 40,
  },
  iconContainer: {
    marginBottom: 32,
  },
  checkCircle: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: '#5B9FED',
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: '700',
    color: '#1F2937',
    marginBottom: 12,
  },
  subtitle: {
    fontSize: 16,
    color: '#6B7280',
    marginBottom: 32,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  ratingText: {
    fontSize: 15,
    color: '#6B7280',
  },
  ratingScore: {
    fontSize: 15,
    fontWeight: '700',
    color: '#10B981',
  },
});
