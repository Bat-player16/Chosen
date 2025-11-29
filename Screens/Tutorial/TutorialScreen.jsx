import { View, Image, TouchableOpacity, Text, StyleSheet, Dimensions } from 'react-native';
import React, { useState } from 'react';

const { width, height } = Dimensions.get('window');

const tutorialImages = [
  require("../../assets/Images/Tutorial_1.png"),
  require("../../assets/Images/Tutorial_2.png"),
  require("../../assets/Images/Tutorial_3.png"),
  require("../../assets/Images/Tutorial_4.png"),
];

export default function TutorialScreen({ onComplete }) {
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleNext = () => {
    if (currentIndex < tutorialImages.length - 1) {
      setCurrentIndex(currentIndex + 1);
    } else {
      onComplete();
    }
  };

  const isLastScreen = currentIndex === tutorialImages.length - 1;

  return (
    <View style={styles.container}>
      <Image
        source={tutorialImages[currentIndex]}
        style={styles.image}
        resizeMode="cover"
      />
      <TouchableOpacity 
        style={styles.button}
        onPress={handleNext}
        activeOpacity={0.7}
      >
        <Text style={styles.buttonText}>
          {isLastScreen ? 'Finish' : 'Continue'}
        </Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
  },
  image: {
    width: width,
    height: height,
  },
  button: {
    position: 'absolute',
    bottom: 40,
    alignSelf: 'center',
    backgroundColor: '#4A7C59',
    paddingHorizontal: 40,
    paddingVertical: 10,
    borderRadius: 8, borderWidth: 2, borderColor: '#ffffff',   
  },
  buttonText: {
    color: 'white',
    fontSize: 20,
    fontWeight: '600',
  },
});