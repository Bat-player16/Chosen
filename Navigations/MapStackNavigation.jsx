import { View, Text } from "react-native";
import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import MapScreen from "../Screens/Map/MapScreen";   
import QuestConfig from "../Screens/Questing/QuestConfig";   
import QuestStatusScreen from "../Screens/QuestStatus/QuestStatusScreen";
import QuestDetailScreen from "../Screens/QuestStatus/QuestDetailScreen";
const Stack = createStackNavigator();

export default function ProfileNavigation() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="MapScreen" component={MapScreen} />
      <Stack.Screen name="QuestConfig" component={QuestConfig} />
      <Stack.Screen name="QuestStatus" component={QuestStatusScreen} />
      <Stack.Screen name="QuestDetail" component={QuestDetailScreen} />
    </Stack.Navigator>
  );
}
