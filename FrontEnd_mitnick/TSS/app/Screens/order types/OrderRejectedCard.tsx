// Tailwind CSS setup for Order Rejected Card
import React from 'react';
import { View, Text, Image } from 'react-native';

const OrderRejectedCard = ({ companyName, quantity, amount, avgPrice, date, logoUrl }) => {
  return (
    <View className="w-[410px] h-[110px] bg-[#080A42] rounded-[20px] flex flex-col items-start p-[16px]">

      {/* Company Logo */}
      <Image 
        source={{ uri: logoUrl }} 
        className="w-[64px] h-[64px] rounded-[10px] border border-white" 
        resizeMode="contain"
      />

      {/* Company Name, Quantity, and Amount */}
      <View className="ml-[12px]">
        <Text className="text-white font-semibold text-[18px]">{companyName}</Text>
        <Text className="text-white font-medium text-[16px] mt-[4px]">Qty: {quantity} | Amt: {amount}</Text>
      </View>

      {/* Avg Price and Date */}
      <View className="absolute right-[16px] bottom-[16px]">
        <Text className="text-white font-medium text-[14px]">Avg Price: {avgPrice}</Text>
        <Text className="text-white font-medium text-[14px] mt-[4px]">Date: {date}</Text>
      </View>

      {/* Order Status */}
      <View className="absolute top-[16px] right-[16px] w-[112px] h-[34px] bg-[#FF0900] rounded-[5px] flex justify-center items-center">
        <Text className="text-white font-medium text-[12px]">Order Rejected</Text>
      </View>
    </View>
  );
};

export default OrderRejectedCard;
