import Colors from "../Utils/Colors";
import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Image } from "react-native";

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
          height: 85,
        },
        tabBarLabelStyle: {
          fontSize: 14,
          fontFamily: "main",
          marginBottom: 8,
        },
      }}
    >

      {/* FRIENDS */}
      <Tab.Screen
        name="Friends"
        component={FriendsStackNavigation}
        options={{
          tabBarIcon: ({ focused }) => (
            <Image
              source={require("../assets/Images/Friends.png")}
              style={{
                width: 28,
                height: 28,
                tintColor: focused ? "#000" : "#666",
              }}
              resizeMode="contain"
            />
          ),
        }}
      />

      {/* STASH */}
      <Tab.Screen
        name="Stash"
        component={StashNavigation}
        options={{
          tabBarIcon: ({ focused }) => (
            <Image
              source={require("../assets/Images/Stash.png")}
              style={{
                width: 28,
                height: 28,
                tintColor: focused ? "#000" : "#666",
              }}
              resizeMode="contain"
            />
          ),
        }}
      />

      {/* MAP */}
      <Tab.Screen
        name="Map"
        component={MapStackNavigation}
        options={{
          tabBarIcon: ({ focused }) => (
            <Image
              source={require("../assets/Images/Map.png")}
              style={{
                width: 32,
                height: 32,
                tintColor: focused ? "#000" : "#666",
              }}
              resizeMode="contain"
            />
          ),
        }}
      />

      {/* CRAFTS */}
      <Tab.Screen
        name="Crafts"
        component={CraftsStackNavigation}
        options={{
          tabBarIcon: ({ focused }) => (
            <Image
              source={require("../assets/Images/Crafts.png")}
              style={{
                width: 28,
                height: 28,
                tintColor: focused ? "#000" : "#666",
              }}
              resizeMode="contain"
            />
          ),
        }}
      />

      {/* AVATAR */}
      <Tab.Screen
        name="Avatar"
        component={AvatarNavigation}
        options={{
          tabBarIcon: ({ focused }) => (
            <Image
              source={require("../assets/Images/Avatar.png")}
              style={{
                width: 30,
                height: 30,
                tintColor: focused ? "#000" : "#666",
              }}
              resizeMode="contain"
            />
          ),
        }}
      />

    </Tab.Navigator>
  );
}