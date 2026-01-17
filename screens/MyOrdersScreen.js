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
import { useCart } from '../context/CartContext';

export default function MyOrdersScreen({ navigation }) {
  const { orders } = useCart();

  const getStatusColor = (status) => {
    switch (status) {
      case 'Processing':
        return '#F59E0B';
      case 'Shipped':
        return '#3B82F6';
      case 'Delivered':
        return '#10B981';
      default:
        return '#6B7280';
    }
  };

  if (orders.length === 0) {
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
          <Text style={styles.headerTitle}>My Orders</Text>
          <View style={styles.headerButton} />
        </View>

        {/* Empty State */}
        <View style={styles.emptyContainer}>
          <View style={styles.emptyIconContainer}>
            <Ionicons name="receipt-outline" size={80} color="#D1D5DB" />
          </View>
          <Text style={styles.emptyTitle}>No orders yet</Text>
          <Text style={styles.emptyText}>Your order history will appear here</Text>
          <TouchableOpacity 
            style={styles.shopNowButton}
            onPress={() => navigation.navigate('HomeTab')}
          >
            <Text style={styles.shopNowText}>Start Shopping</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }

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
        <Text style={styles.headerTitle}>My Orders ({orders.length})</Text>
        <View style={styles.headerButton} />
      </View>

      <ScrollView 
        style={styles.scrollView}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {orders.map((order) => (
          <TouchableOpacity 
            key={order.id}
            style={styles.orderCard}
            onPress={() => navigation.getParent()?.navigate('OrderDetails', { order })}
          >
            <View style={styles.orderHeader}>
              <View>
                <Text style={styles.orderId}>Order #{order.id}</Text>
                <Text style={styles.orderDate}>
                  {new Date(order.date).toLocaleDateString('en-US', { 
                    month: 'short', 
                    day: 'numeric',
                    year: 'numeric',
                  })}
                </Text>
              </View>
              
              <View style={[styles.statusBadge, { backgroundColor: getStatusColor(order.status) + '20' }]}>
                <Text style={[styles.statusText, { color: getStatusColor(order.status) }]}>
                  {order.status}
                </Text>
              </View>
            </View>

            <View style={styles.orderItems}>
              {order.items.slice(0, 3).map((item, index) => (
                <View key={item.itemId} style={styles.orderItemPreview}>
                  <Image 
                    source={item.product.image}
                    style={styles.previewImage}
                    resizeMode="contain"
                  />
                </View>
              ))}
              {order.items.length > 3 && (
                <View style={styles.moreItemsBadge}>
                  <Text style={styles.moreItemsText}>+{order.items.length - 3}</Text>
                </View>
              )}
            </View>

            <View style={styles.orderFooter}>
              <View>
                <Text style={styles.totalLabel}>Total Amount</Text>
                <Text style={styles.totalAmount}>${order.total.toFixed(2)}</Text>
              </View>
              
              <View style={styles.viewDetailsButton}>
                <Text style={styles.viewDetailsText}>View Details</Text>
                <Ionicons name="chevron-forward" size={16} color="#0066FF" />
              </View>
            </View>
          </TouchableOpacity>
        ))}
      </ScrollView>
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
    paddingBottom: 20,
  },
  emptyContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 40,
  },
  emptyIconContainer: {
    width: 160,
    height: 160,
    borderRadius: 80,
    backgroundColor: '#F5F5F7',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 24,
  },
  emptyTitle: {
    fontSize: 24,
    fontWeight: '800',
    color: '#000',
    marginBottom: 8,
  },
  emptyText: {
    fontSize: 15,
    color: '#9CA3AF',
    marginBottom: 32,
    textAlign: 'center',
  },
  shopNowButton: {
    backgroundColor: '#0066FF',
    paddingHorizontal: 40,
    paddingVertical: 16,
    borderRadius: 16,
  },
  shopNowText: {
    fontSize: 16,
    fontWeight: '700',
    color: '#FFF',
  },
  orderCard: {
    backgroundColor: '#F5F5F7',
    borderRadius: 20,
    padding: 16,
    marginBottom: 16,
  },
  orderHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 16,
  },
  orderId: {
    fontSize: 16,
    fontWeight: '700',
    color: '#000',
    marginBottom: 4,
  },
  orderDate: {
    fontSize: 13,
    color: '#6B7280',
  },
  statusBadge: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 12,
  },
  statusText: {
    fontSize: 12,
    fontWeight: '700',
  },
  orderItems: {
    flexDirection: 'row',
    gap: 8,
    marginBottom: 16,
  },
  orderItemPreview: {
    width: 64,
    height: 64,
    backgroundColor: '#FFF',
    borderRadius: 12,
    padding: 8,
  },
  previewImage: {
    width: '100%',
    height: '100%',
  },
  moreItemsBadge: {
    width: 64,
    height: 64,
    backgroundColor: '#FFF',
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  moreItemsText: {
    fontSize: 16,
    fontWeight: '700',
    color: '#6B7280',
  },
  orderFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  totalLabel: {
    fontSize: 12,
    color: '#6B7280',
    marginBottom: 2,
  },
  totalAmount: {
    fontSize: 18,
    fontWeight: '800',
    color: '#000',
  },
  viewDetailsButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFF',
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 12,
    gap: 4,
  },
  viewDetailsText: {
    fontSize: 14,
    fontWeight: '700',
    color: '#0066FF',
  },
});

