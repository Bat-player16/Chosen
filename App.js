import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, } from 'react-native';
import * as Font from "expo-font"; // Import Font module
import TabNavigation from './Navigations/TabNavigation';
import { NavigationContainer } from "@react-navigation/native";
import Colors from './Utils/Colors';
import { useRef } from 'react'; // Add this line
export default function App() {
    const navigationRef = useRef();


  return (
  <View style={{ flex: 1, backgroundColor: "black" }}>
        <StatusBar
          hidden={false}
          backgroundColor={Colors.main}
        />
        <NavigationContainer ref={navigationRef}>
          <TabNavigation />
        </NavigationContainer>
      </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
