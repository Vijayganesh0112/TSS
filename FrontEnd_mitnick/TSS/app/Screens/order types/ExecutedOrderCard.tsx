// Tailwind CSS setup for Executed Orders Card
import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Image } from 'react-native';

const ExecutedOrderCard = ({
  userId,
  companyName,
  quantity,
  amount,
  avgPrice,
  dateTime,
  onDownloadTokenInvoice,
  onDownloadRemainingInvoice,
  onShareTokenInvoice,
  onShareRemainingInvoice
}) => {
  const [expanded, setExpanded] = useState(false);

  return (
    <TouchableOpacity
      className={`w-[410px] ${expanded ? 'h-[232px]' : 'h-[110px]'} bg-[#080A42] border border-[#ACACAC] rounded-[20px] p-[10px] mb-[10px]`}
      onPress={() => setExpanded(!expanded)}
      activeOpacity={0.8}
    >
      {/* Collapsed State */}
      {!expanded && (
        <View>
          <Text className="text-[#F1BE49] font-semibold text-[18px]">User ID: {userId}</Text>
          <Text className="text-[#F1BE49] font-semibold text-[18px] mt-[4px]">Company Name: {companyName}</Text>
          <Text className="text-[#F1BE49] font-semibold text-[18px] mt-[4px]">Qty: {quantity} | Amt: {amount}</Text>
          <Text className="text-[#F1BE49] font-semibold text-[14px] mt-[4px]">Avg Price: {avgPrice}</Text>
          <Text className="text-[#636363] font-semibold text-[14px] mt-[4px]">Date & Time: {dateTime}</Text>
        </View>
      )}

      {/* Expanded State */}
      {expanded && (
        <View>
          <Text className="text-[#F1BE49] font-semibold text-[18px]">User ID: {userId}</Text>
          <Text className="text-[#F1BE49] font-semibold text-[18px] mt-[4px]">Company Name: {companyName}</Text>
          <Text className="text-[#F1BE49] font-semibold text-[18px] mt-[4px]">Qty: {quantity} | Amt: {amount}</Text>
          <Text className="text-[#F1BE49] font-semibold text-[14px] mt-[4px]">Avg Price: {avgPrice}</Text>
          <Text className="text-[#636363] font-semibold text-[14px] mt-[4px]">Date & Time: {dateTime}</Text>

          {/* Token Transaction Copy */}
          <TouchableOpacity
            className="w-[291px] h-[38px] bg-[#F1BE49] rounded-[10px] flex flex-row justify-between items-center px-[10px] mt-[12px]"
            onPress={onDownloadTokenInvoice}
          >
            <Text className="text-[#080A42] font-semibold text-[12.5px]">View Transaction Copy For 10% Token Amount</Text>
            <View className="flex flex-row">
              <TouchableOpacity onPress={onDownloadTokenInvoice}>
                <Image source={require('../icons/download-icon.png')} className="w-[24px] h-[24px] mr-[8px]" />
              </TouchableOpacity>
              <TouchableOpacity onPress={onShareTokenInvoice}>
                <Image source={require('../icons/share-icon.png')} className="w-[24px] h-[24px]" />
              </TouchableOpacity>
            </View>
          </TouchableOpacity>

          {/* Remaining Transaction Copy */}
          <TouchableOpacity
            className="w-[291px] h-[38px] bg-[#F1BE49] rounded-[10px] flex flex-row justify-between items-center px-[10px] mt-[12px]"
            onPress={onDownloadRemainingInvoice}
          >
            <Text className="text-[#080A42] font-semibold text-[12.5px]">View Transaction Copy For 90% Remaining Amount</Text>
            <View className="flex flex-row">
              <TouchableOpacity onPress={onDownloadRemainingInvoice}>
                <Image source={require('../icons/download-icon.png')} className="w-[24px] h-[24px] mr-[8px]" />
              </TouchableOpacity>
              <TouchableOpacity onPress={onShareRemainingInvoice}>
                <Image source={require('../icons/share-icon.png')} className="w-[24px] h-[24px]" />
              </TouchableOpacity>
            </View>
          </TouchableOpacity>
        </View>
      )}
    </TouchableOpacity>
  );
};

export default ExecutedOrderCard;
