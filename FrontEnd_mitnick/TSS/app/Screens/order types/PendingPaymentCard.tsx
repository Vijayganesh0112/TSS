import React from 'react';
import { View, Text, TouchableOpacity, Image } from 'react-native';
import { useTailwind } from 'tailwind-rn'; // Tailwind CSS for styling


const PendingPaymentCard = ({ companyName, quantity, amount, avgPrice, date, logoUrl, onBankDetailsPress, onAttachTransactionPress }) => {
  const tailwind = useTailwind();

  return (
    <View style={tailwind('bg-[#080A42] rounded-2xl p-4 w-[410px] h-[194px] relative')}> {/* Main card container */}
      {/* Company Logo */}
      <Image
        source={{ uri: logoUrl }}
        style={tailwind('w-16 h-16 bg-white border border-white rounded-lg absolute top-4 left-4')}
      />

      {/* Company Name */}
      <Text style={tailwind('text-white font-semibold text-lg absolute top-6 left-24')}>
        {companyName}
      </Text>

      {/* Quantity and Amount */}
      <Text style={tailwind('text-white font-medium text-base absolute top-16 left-24')}>
        Qty: {quantity} | Amt: {amount}
      </Text>

      {/* Average Price */}
      <Text style={tailwind('text-white font-medium text-sm absolute top-36 left-72')}>
        Avg Price: {avgPrice}
      </Text>

      {/* Date */}
      <Text style={tailwind('text-white font-medium text-sm absolute top-40 left-72')}>
        Date: {date}
      </Text>

      {/* Payment Reminder */}
      <View style={tailwind('absolute top-20 left-14 flex-row items-center')}>
        <View style={tailwind('w-5 h-5 bg-red-500 rounded-full flex items-center justify-center')}>
          <Text style={tailwind('text-white font-bold text-xs')}>⏰</Text>
        </View>
        <Text style={tailwind('text-red-500 font-semibold text-xs ml-2')}>
          Pay 90% of the trade i.e. *price*
        </Text>
      </View>

      {/* Bank Account Details Button */}
      <TouchableOpacity
        style={tailwind('absolute top-32 left-14 w-[180px] h-[30px] bg-[#F1BE49] rounded-md flex items-center justify-center')}
        onPress={onBankDetailsPress}
      >
        <Text style={tailwind('text-[#080A42] font-medium text-sm')}>Bank Account Details</Text>
      </TouchableOpacity>

      {/* Attach Transaction Copy Button */}
      <TouchableOpacity
        style={tailwind('absolute top-40 left-14 w-[180px] h-[30px] bg-[#F1BE49] rounded-md flex items-center justify-center')}
        onPress={onAttachTransactionPress}
      >
        <Text style={tailwind('text-[#080A42] font-medium text-sm')}>Attach transaction copy</Text>
      </TouchableOpacity>

      {/* Status Badge */}
      <View style={tailwind('absolute top-4 right-4 w-[112px] h-[41px] bg-[#F1BE49] rounded-md flex items-center justify-center')}>
        <Text style={tailwind('text-[#080A42] font-medium text-xs')}>Pending Payment Amount</Text>
      </View>
    </View>
  );
};

export default PendingPaymentCard;
