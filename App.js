import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View } from 'react-native';
import * as Font from "expo-font";
import TabNavigation from './Navigations/TabNavigation';
import TutorialScreen from './Screens/Tutorial/TutorialScreen';
import { NavigationContainer } from "@react-navigation/native";
import Colors from './Utils/Colors';
import { useRef, useEffect, useState } from 'react';

export default function App() {
  const [fontsLoaded, setFontsLoaded] = useState(false);
  const [tutorialComplete, setTutorialComplete] = useState(false);

  useEffect(() => {
    async function loadFonts() {
      try {
        console.log("🔤 Starting font loading...");

        await Font.loadAsync({
          "main": require("./assets/Fonts/ArchitectsDaughter-Regular.ttf"),
          "potion": require("./assets/Fonts/Splash-Regular.ttf"),
        });

        console.log("✅ Fonts loaded successfully!");
        setFontsLoaded(true);
      } catch (error) {
        console.error("❌ Font loading failed:", error);
        console.error("Font error details:", error.message);
      }
    }

    loadFonts();
  }, []);

  const navigationRef = useRef();

  const handleTutorialComplete = () => {
    setTutorialComplete(true);
  };

  if (!tutorialComplete) {
    return (
      <View style={{ flex: 1, backgroundColor: "black" }}>
        <StatusBar
          hidden={false}
          backgroundColor={Colors.main}
        />
        <TutorialScreen onComplete={handleTutorialComplete} />
      </View>
    );
  }

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