import { View, Text } from "react-native";
import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import CraftsScreen from "../Screens/Crafts/CraftsScreen";
import QuestConfig from "../Screens/Questing/QuestConfig";
const Stack = createStackNavigator();

export default function ProfileNavigation() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="CraftsScreen" component={CraftsScreen} />
      <Stack.Screen name="QuestConfig" component={QuestConfig} />
    </Stack.Navigator>
  );
}
