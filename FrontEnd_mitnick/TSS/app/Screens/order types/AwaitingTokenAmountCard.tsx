// AwaitingTokenAmountCard.js
import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Alert,
} from "react-native";
import { formatDistanceToNowStrict, addHours } from "date-fns";
import ViewBankDetailsScreen from '../BankDetails';
import { fetchBankDetails } from '../BankDetails';
//need to work on this later
//import { fetchBankDetails, uploadTransactionCopy } from "../api/orders";

/**
 * Component to display and handle "Awaiting Token Amount" order card functionality.
 * Includes countdown timer, bank details retrieval, and transaction copy upload.
 */
const AwaitingTokenAmountCard = ({ order, onStatusChange }) => {
  const [timeLeft, setTimeLeft] = useState("");

  useEffect(() => {
    // Interval to calculate remaining time until the order expires
    const interval = setInterval(() => {
      const expirationTime = addHours(new Date(order.createdAt), 24); // Expiration time: 24 hours from creation
      const timeDiff = formatDistanceToNowStrict(expirationTime, {
        addSuffix: true, // Display time difference with suffix (e.g., "in 2 hours")
      });

      setTimeLeft(timeDiff);

      // If current time is past expiration time, mark order as "Order Rejected"
      if (new Date() >= expirationTime) {
        clearInterval(interval);
        onStatusChange(order.id, "Order Rejected");
      }
    }, 1000); // Update every second

    // Cleanup interval on component unmount
    return () => clearInterval(interval);
  }, [order.createdAt, order.id, onStatusChange]);

  

  /**
   * Handles fetching and displaying bank details for the order.
   */
  const handleFetchBankDetails = async () => {
    try {
      const response = await fetchBankDetails(); // Fetch bank details for the order
      if (response.success) {
        const bankDetails = response.data;
        Alert.alert("Bank Details", `${bankDetails.accountName}\n${bankDetails.accountNumber}\n${bankDetails.ifsc}`);
      } else {
        Alert.alert("Error", response.message || "Failed to fetch bank details.");
      }
    } catch (error) {
      Alert.alert("Error", "Failed to fetch bank details. Please try again later.");
    }
  };

  /**
   * Handles uploading a transaction copy for the order.
   
  const handleAttachTransactionCopy = async () => {
    try {
      const response = await uploadTransactionCopy(order.id);
      if (response.success) {
        Alert.alert("Success", "Transaction copy uploaded successfully.");
      } else {
        Alert.alert("Error", response.message || "Failed to upload transaction copy.");
      }
    } catch (error) {
      Alert.alert("Error", "Failed to upload transaction copy. Please try again later.");
    }
  };
*/
  return (
    <View className="bg-[#080A42] rounded-2xl p-5 my-2 w-[410px] h-[206px]">
      {/* Header with company name and order status */}
      <View className="flex-row justify-between items-center">
        <Text className="text-lg font-semibold text-white">{order.companyName}</Text>
        <View className="bg-[#F1BE49] px-2 py-1 rounded">
          <Text className="text-sm font-medium text-[#080A42]">Awaiting Token Amount</Text>
        </View>
      </View>

      {/* Order details: quantity and amount */}
      <Text className="text-base font-medium text-white my-1">Qty: {order.quantity} | Amt: {order.amount}</Text>

      {/* Token amount with countdown timer */}
      <Text className="text-xs font-semibold text-red-500 mb-2">
        Pay 10% of the trade i.e. {order.tokenAmount} (Time left: {timeLeft})
      </Text>

      {/* Button to fetch bank details */}
      <TouchableOpacity className="bg-[#F1BE49] rounded-lg py-2 my-1" onPress={handleFetchBankDetails}>
        <Text className="text-sm font-medium text-[#080A42]">Bank Account Details</Text>
      </TouchableOpacity>

      {/* Button to upload transaction copy */}
      {/* <TouchableOpacity className="bg-[#F1BE49] rounded-lg py-2 my-1" onPress={handleAttachTransactionCopy}>
        <Text className="text-sm font-medium text-[#080A42]">Attach transaction copy</Text>
      </TouchableOpacity> */}

      {/* Footer with average price and order creation date */}
      <Text className="text-sm font-medium text-white mt-2">Avg Price: {order.avgPrice} | Date: {order.date}</Text>
    </View>
  );
};

export default AwaitingTokenAmountCard;
