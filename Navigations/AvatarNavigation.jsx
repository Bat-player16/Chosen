import { View, Text } from "react-native";
import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import AvatarMainScreen from "../Screens/Avatar/AvatarMainScreen";
const Stack = createStackNavigator();

export default function ProfileNavigation() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="AvatarMainScreen" component={AvatarMainScreen} />
    </Stack.Navigator>
  );
}
