import React, { useEffect, useState } from 'react';
import { View, Text, Alert } from 'react-native';
import axios from 'axios';

// Fetch bank details from the database
const fetchBankDetails = async () => { 
  try {
    const response = await axios.get('http://10.0.2.2:4000/admin/bank');
    const data = response.data;
    return data;
  } catch (error) {
    throw new Error(`Error: ${error.message}`);
  }
};

const ViewBankDetailsScreen = () => {
  const [bankDetails, setBankDetails] = useState({
    accountNumber: '',
    ifscCode: '',
    accountHolderName: '',
    upiId: '',
  });

  useEffect(() => {
    const fetchDetails = async () => {
      try {
        const data = await fetchBankDetails();
        setBankDetails({
          accountNumber: data[0].BankAcc,
          ifscCode: data[0].IFSC,
          accountHolderName: data[0].AccHolder,
          upiId: data[0].UPIID,
        });
      } catch (error) {
        Alert.alert(`Error: ${error.message}`);
      }
    };

    fetchDetails();
  }, []);

  return (
    <View className="flex-1 bg-gray-100 p-4">
      <View className="bg-[#F1BE49] p-4 rounded-lg flex-row justify-between items-center">
        <Text className="text-[#080A42] text-lg font-bold">Bank Details</Text>
      </View>

      <View className="bg-[#080A42] p-4 rounded-lg mt-4">
        <Text className="text-white text-base font-semibold mb-2">Bank Account No:</Text>
        <Text className="text-white text-base mb-4">{bankDetails.accountNumber}</Text>

        <Text className="text-white text-base font-semibold mb-2">IFSC Code:</Text>
        <Text className="text-white text-base mb-4">{bankDetails.ifscCode}</Text>

        <Text className="text-white text-base font-semibold mb-2">Account Holder Name:</Text>
        <Text className="text-white text-base mb-4">{bankDetails.accountHolderName}</Text>

        <Text className="text-white text-base font-semibold mb-2">UPI ID:</Text>
        <Text className="text-white text-base mb-4">{bankDetails.upiId}</Text>
      </View>
    </View>
  );
};

export { fetchBankDetails };
export default ViewBankDetailsScreen;