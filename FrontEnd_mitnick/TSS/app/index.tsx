import { SafeAreaView ,Text } from "react-native";
import AadharLinkedMobileScreen from "./Screens/login";
//import {ConfirmPinScreen, EnterPinScreen, SetPinScreen} from "./Screens/setpin"
import OtpScreen from "./Screens/otp";
import OpenOrdersPage from "./Screens/openOrder"
//import ExecutedOrders from "./(tabs)/"
import UserProfileRegistration from "./Screens/userProfileReg"
import UserHomePage from "./Screens/UserHomePage";
import { Tabs } from 'expo-router';

export default function TabRoutes() {
   return <OpenOrdersPage orderId={0o1} />;
 }