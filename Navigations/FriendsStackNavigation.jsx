import { View, Text } from "react-native";
import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import FriendsScreen from "../Screens/Friends/FriendsScreen";   
import FriendsDetails from "../Screens/Friends/FriendsDetails";
const Stack = createStackNavigator();

export default function ProfileNavigation() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="FriendsScreen" component={FriendsScreen} />
      <Stack.Screen name="FriendsDetails" component={FriendsDetails} />
    </Stack.Navigator>
  );
}
