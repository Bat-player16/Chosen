import { View, Image, StyleSheet } from "react-native";
import Colors from "../../Utils/Colors";
export default function MapScreen() {
        <View style={{ flex: 1 }}>
          {/* Background with pitch black and translucent image */}
          <View style={styles.backgroundContainer}>
            <Image
              style={styles.backgroundImage}
              source={require("../../assets/Images/Full_Map.png")}
              resizeMode="cover"
            />
          </View>
        </View>
}

const styles = StyleSheet.create({
  backgroundContainer: {
    position: "absolute",
    zIndex: 1,
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "#000000", // Pitch black background
  },
  backgroundImage: {
    height: "100%",
    width: "100%",
  },
  container: {
    flex: 1,
    paddingHorizontal: 20,
    backgroundColor: Colors.background,
  },
});