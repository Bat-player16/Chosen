import { View, Text } from "react-native";
import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import StashScreen from "../Screens/Friends/FriendsScreen"; 
const Stack = createStackNavigator();

export default function ProfileNavigation() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="StashScreen" component={StashScreen} />
    </Stack.Navigator>
  );
}
