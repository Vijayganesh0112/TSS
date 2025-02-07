import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
  Image,
} from 'react-native';
import { fetchExecutedOrders } from '../api/orders';
//import { downloadInvoice } from '../utils/fileUtils';

const ExecutedOrders = () => {
  const [orders, setOrders] = useState([]);
  const [expandedOrderId, setExpandedOrderId] = useState(null);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);

  useEffect(() => {
    loadOrders();
  }, []);

  const loadOrders = async () => {
    try {
      if (!hasMore) return;

      const response = await fetchExecutedOrders(page);
      if (response.length > 0) {
        setOrders((prevOrders) => [...prevOrders, ...response]);
        setPage((prevPage) => prevPage + 1);
      } else {
        setHasMore(false);
      }
    } catch (error) {
      console.error('Failed to load executed orders:', error);
    } finally {
      setLoading(false);
    }
  };

  const toggleExpand = (orderId) => {
    setExpandedOrderId((prevId) => (prevId === orderId ? null : orderId));
  };

  const renderOrderCard = ({ item }) => {
    const isExpanded = item.orderId === expandedOrderId;
    return (
      <TouchableOpacity onPress={() => toggleExpand(item.orderId)}>
        <View style={styles.cardContainer}>
          {/* <Image source={{ uri: item.logo }} style={styles.companyLogo} /> */}
          <Text style={styles.companyName}>{item.stockName}</Text>
          <Text style={styles.details}>Qty: {item.quantity} | Amt: {item.totalAmount}</Text>
          <Text style={styles.details}>Price: {item.stockPrice} | Date: {item.date}</Text>
          {isExpanded && (
            <TouchableOpacity
              style={styles.downloadButton}
              onPress={() => downloadInvoice(item.invoiceUrl)}
            >
              <Text style={styles.downloadText}>Download Invoice</Text>
            </TouchableOpacity>
          )}
        </View>
      </TouchableOpacity>
    );
  };

  const groupOrdersByDate = () => {
    const grouped = {};
    orders.forEach((order) => {
      const date = new Date(order.date);
      const today = new Date();
      let key = '';

      if (
        date.getFullYear() === today.getFullYear() &&
        date.getMonth() === today.getMonth() &&
        date.getDate() === today.getDate()
      ) {
        key = 'Today';
      } else if (
        date.getFullYear() === today.getFullYear() &&
        date.getMonth() === today.getMonth() &&
        date.getDate() === today.getDate() - 1
      ) {
        key = 'Yesterday';
      } else {
        key = date.toLocaleString('default', {
          month: 'long',
          year: 'numeric',
        });
      }

      if (!grouped[key]) {
        grouped[key] = [];
      }
      grouped[key].push(order);
    });
    return grouped;
  };

  const groupedOrders = groupOrdersByDate();
  const groupedKeys = Object.keys(groupedOrders);

  return (
    <View style={styles.container}>
      {loading && <ActivityIndicator size="large" color="#0000ff" />}
      {!loading && groupedKeys.length === 0 && (
        <Text style={styles.noOrdersText}>No executed orders available</Text>
      )}
      <FlatList
        data={groupedKeys}
        keyExtractor={(item) => item}
        renderItem={({ item }) => (
          <View>
            <Text style={styles.dateHeader}>{item}</Text>
            <FlatList
              data={groupedOrders[item]}
              keyExtractor={(order) => order.orderId}
              renderItem={renderOrderCard}
              onEndReached={loadOrders}
              onEndReachedThreshold={0.1}
            />
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
    padding: 10,
  },
  dateHeader: {
    fontSize: 18,
    fontWeight: 'bold',
    marginVertical: 10,
    color: '#333',
  },
  cardContainer: {
    backgroundColor: '#080A42',
    padding: 10,
    borderRadius: 8,
    marginBottom: 10,
  },
  companyLogo: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginBottom: 10,
  },
  companyName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#FFF',
  },
  details: {
    fontSize: 14,
    color: '#BBB',
    marginTop: 5,
  },
  downloadButton: {
    marginTop: 10,
    backgroundColor: '#F1BE49',
    paddingVertical: 8,
    borderRadius: 5,
    alignItems: 'center',
  },
  downloadText: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#080A42',
  },
  noOrdersText: {
    textAlign: 'center',
    fontSize: 16,
    color: '#333',
    marginTop: 20,
  },
});

export default ExecutedOrders;
