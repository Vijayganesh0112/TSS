// Tailwind CSS setup for Payment Successful Card
import React from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';

const PaymentSuccessfulCard = ({ companyName, quantity, amount, avgPrice, date, daysToDeliver, logoUrl, onDownloadInvoice }) => {
  return (
    <View className="w-[410px] h-[167px] bg-[#080A42] rounded-[20px] flex flex-col items-start p-[16px]">

      {/* Company Logo */}
      <Image 
        source={{ uri: logoUrl }} 
        className="w-[64px] h-[64px] rounded-[10px] border border-white" 
        resizeMode="contain"
      />

      {/* Company Name, Quantity, and Amount */}
      <View className="mt-[8px] flex flex-col items-start">
        <Text className="text-white font-semibold text-[18px]">{companyName}</Text>
        <Text className="text-white font-medium text-[16px] mt-[4px]">Qty: {quantity} | Amt: {amount}</Text>
      </View>

      {/* Avg Price and Date */}
      <View className="absolute right-[16px] top-[16px]">
        <Text className="text-white font-medium text-[14px]">Avg Price: {avgPrice}</Text>
        <Text className="text-white font-medium text-[14px] mt-[4px]">Date: {date}</Text>
      </View>

      {/* Shares Delivery Info */}
      <View className="mt-[12px] flex flex-row items-center">
        <View className="w-[20px] h-[20px] bg-[#F1BE49] rounded-full" />
        <Text className="text-[#F1BE49] font-semibold text-[12px] ml-[8px]">Shares will be delivered in {daysToDeliver} days</Text>
      </View>

      {/* Download Invoice Button */}
      <TouchableOpacity 
        onPress={onDownloadInvoice} 
        className="mt-[12px] w-[372px] h-[30px] bg-[#F1BE49] rounded-[10px] flex flex-row justify-center items-center"
      >
        <Image 
          source={require('../icons/download-icon.png')} 
          className="w-[24px] h-[24px] mr-[8px]" 
          resizeMode="contain"
        />
        <Text className="text-[#080A42] font-medium text-[13px]">Download Invoice</Text>
      </TouchableOpacity>

      {/* Payment Status */}
      <View className="absolute top-[16px] right-[16px] w-[112px] h-[41px] bg-[#F1BE49] rounded-[5px] flex justify-center items-center">
        <Text className="text-[#080A42] font-medium text-[12px]">Payment Successful</Text>
      </View>
    </View>
  );
};

export default PaymentSuccessfulCard;
