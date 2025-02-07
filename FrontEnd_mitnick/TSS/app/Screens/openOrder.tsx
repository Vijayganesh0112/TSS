import React, { useEffect, useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, ActivityIndicator } from 'react-native';
import AwaitingTokenAmountCard from './order types/AwaitingTokenAmountCard';
import PendingPaymentCard from './order types/PendingPaymentCard';
import OrderRejectedCard from './order types/OrderRejectedCard';
import PaymentSuccessfulCard from './order types/PaymentSuccessfulCard';
import ExecutedOrderCard from './order types/ExecutedOrderCard';
import axios from 'axios';

const OrdersPage = () => {
  const [activeTab, setActiveTab] = useState('open'); // Default to Open Orders
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchOrders();

    // Polling for real-time updates
    const interval = setInterval(() => {
      fetchOrders();
    }, 5000); // Poll every 5 seconds

    return () => clearInterval(interval);
  }, [activeTab]);

  const fetchOrders = async () => {
    setLoading(true);
    try {
      const response = await axios.get(`/api/orders?type=${activeTab}`); // Fetch orders by type
      setOrders(response.data.orders);
    } catch (error) {
      console.error('Error fetching orders:', error);
    } finally {
      setLoading(false);
    }
  };

  const renderOrderCard = (order) => {
    switch (order.status) {
      case 'Awaiting Token Amount':
        return <AwaitingTokenAmountCard key={order.id} {...order} />;
      case 'Pending Payment Amount':
        return <PendingPaymentCard key={order.id} {...order} />;
      case 'Order Rejected':
        return <OrderRejectedCard key={order.id} {...order} />;
      case 'Payment Successful':
        return <PaymentSuccessfulCard key={order.id} {...order} />;
      case 'Completed':
        return <ExecutedOrderCard key={order.id} {...order} />;
      default:
        return null;
    }
  };

  return (
    <View className="flex-1 bg-gray-100">
      {/* Header */}
      <View className="bg-[#080A42] p-4 flex-row justify-between items-center">
        <Text className="text-[#F1BE49] text-lg font-bold">Orders</Text>
      </View>

      {/* Tabs */}
      <View className="flex-row border-b border-[#F1BE49]">
        <TouchableOpacity
          onPress={() => setActiveTab('open')}
          className={`flex-1 p-4 ${activeTab === 'open' ? 'border-b-2 border-[#F1BE49]' : ''}`}
        >
          <Text className={`text-center ${activeTab === 'open' ? 'text-[#F1BE49]' : 'text-gray-500'} font-semibold`}>
            Open Orders
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => setActiveTab('executed')}
          className={`flex-1 p-4 ${activeTab === 'executed' ? 'border-b-2 border-[#F1BE49]' : ''}`}
        >
          <Text className={`text-center ${activeTab === 'executed' ? 'text-[#F1BE49]' : 'text-gray-500'} font-semibold`}>
            Executed Orders
          </Text>
        </TouchableOpacity>
      </View>

      {/* Orders List */}
      {loading ? (
        <ActivityIndicator size="large" color="#F1BE49" className="mt-4" />
      ) : (
        <ScrollView contentContainerStyle={{ paddingBottom: 20 }}>
          {orders.length > 0 ? (
            orders.map((order) => renderOrderCard(order))
          ) : (
            <Text className="text-center text-gray-500 mt-4">No orders available.</Text>
          )}
        </ScrollView>
      )}
    </View>
  );
};

export default OrdersPage;
