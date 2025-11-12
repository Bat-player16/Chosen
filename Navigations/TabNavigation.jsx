import Colors from "../Utils/Colors";
import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import AntDesign from "@expo/vector-icons/AntDesign";
import MapStackNavigation from "./MapStackNavigation";
import StashNavigation from "./StashNavigation";
import FriendsStackNavigation from "./FriendsStackNavigation";
import CraftsStackNavigation from "./CraftsStackNavigation";
import AvatarNavigation from "./AvatarNavigation";
const Tab = createBottomTabNavigator();

export default function TabNavigation() {
  return (
    <Tab.Navigator
    initialRouteName="Map"
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          backgroundColor: Colors.main,
          borderTopWidth: 1,
          borderTopColor: "black",
        },
      }}
    >
      <Tab.Screen
        name="Friends"
        component={FriendsStackNavigation}
        options={{
          tabBarIcon: ({ focused, color, size }) => (
            <AntDesign
              name="plus"
              size={24}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Stash"
        component={StashNavigation}
        options={{
          tabBarIcon: ({ focused, color, size }) => (
            <AntDesign
              name="plus"
              size={24}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Map"
        component={MapStackNavigation}
        options={{
          tabBarIcon: ({ focused, color, size }) => (
            <AntDesign
              name="plus"
              size={24}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Crafts"
        component={CraftsStackNavigation}
        options={{
          tabBarIcon: ({ focused, color, size }) => (
          <AntDesign
              name="plus"
              size={24}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Avatar"
        component={AvatarNavigation}
        options={{
          tabBarIcon: ({ focused, color, size }) => (
          <AntDesign
              name="plus"
              size={24}
            />
          ),
        }}
      />
    </Tab.Navigator>
  );
}
