import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import React, { useState } from 'react';
import Colors from '../../Utils/Colors';

export default function QuestConfig({ navigation, route }) {
  const { questName = "Quest Name", location = "Location", questType = "desert" } = route.params || {};
  const [selectedFriends, setSelectedFriends] = useState([]);

  const toggleFriend = (friendName) => {
    if (selectedFriends.includes(friendName)) {
      setSelectedFriends(selectedFriends.filter(name => name !== friendName));
    } else {
      setSelectedFriends([...selectedFriends, friendName]);
    }
  };

  const handleConfirm = () => {
    console.log("Quest confirmed with friends:", selectedFriends);
    // Navigate back and trigger confirmation view
    navigation.navigate('MapScreen', { 
      showConfirmation: true,
      questName,
      location,
      questType
    });
  };

  return (
    <View style={styles.container}>
      {/* Back Button - Outside centered container */}
      <TouchableOpacity 
        style={styles.backButton}
        onPress={() => navigation.goBack()}
      >
        <View style={styles.backButtonCircle}>
          <Text style={styles.backButtonText}>←</Text>
        </View>
      </TouchableOpacity>

      {/* Centered Content Container */}
      <View style={styles.centeredContainer}>
        {/* Title */}
        <Text style={styles.title}>Form your Party</Text>

        {/* Quest Info Card */}
        <View style={styles.questCard}>
          <Text style={styles.inviteText}>Invite</Text>
          <Text style={styles.inviteText}>Friends</Text>
          
          {/* Friend Card - Tilted */}
          <View style={styles.friendCardContainer}>
            <TouchableOpacity 
              style={styles.friendCard}
              onPress={() => toggleFriend('Franny')}
              activeOpacity={0.8}
            >
              <View style={styles.profilePictureContainer}>
                <Image
                  source={require("../../assets/Images/PFP.png")}
                  style={styles.profilePicture}
                  resizeMode="cover"
                />
                {selectedFriends.includes('Franny') && (
                  <View style={styles.checkmarkOverlay}>
                    <Image
                      source={require("../../assets/Images/Check.png")}
                      style={styles.checkmark}
                      resizeMode="contain"
                    />
                  </View>
                )}
              </View>
              <Text style={styles.friendName}>Franny</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Confirm Button */}
        <TouchableOpacity 
          style={styles.confirmButton}
          onPress={handleConfirm}
          activeOpacity={0.8}
        >
          <Text style={styles.confirmButtonText}>Confirm Quest</Text>
        </TouchableOpacity>

        {/* Location Text */}
        <Text style={styles.locationText}>{questName} ({location})</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  backButton: {
    position: 'absolute',
    top: 40,
    left: 20,
    zIndex: 10,
  },
  backButtonCircle: {
    width: 45,
    height: 45,
    borderRadius: 25,
    backgroundColor: Colors.main,
    justifyContent: 'center',
    top: 15,
    alignItems: 'center',
  },
  backButtonText: {
    fontSize: 28,
    color: '#000',
    fontFamily: 'main',
  },
  centeredContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 40,
    fontFamily: 'main',
    color: Colors.main,
    marginBottom: 30,
  },
  questCard: {
    width: '75%',
    backgroundColor: Colors.main,
    borderRadius: 2,
    padding: 20,
    transform: [{ rotate: '-7.72deg' }],
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 6,
    elevation: 8,
  },
  inviteText: {
    fontSize: 36,
    fontFamily: 'main',
    color: '#000',
    textAlign: 'center',
    lineHeight: 36,
  },
  friendCardContainer: {
    marginTop: 10,
    width: '100%',
    alignItems: 'center',
  },
  friendCard: {
    alignItems: 'center',
  },
  profilePictureContainer: {
    width: 100,
    height: 100,
    borderRadius: 99,
    borderWidth: 1,
    overflow: 'hidden',
    backgroundColor: Colors.main,
    marginBottom: 8,
    position: 'relative',
  },
  profilePicture: {
    width: '100%',
    height: '100%',
  },
  checkmarkOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(64, 164, 97, 0.6)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  checkmark: {
    width: '60%',
    height: '60%',
  },
  friendName: {
    fontSize: 18,
    fontFamily: 'main',
    color: '#000',
  },
  confirmButton: {
    marginTop: 40,
    backgroundColor: Colors.main,
    paddingVertical: 15,
    paddingHorizontal: 40,
    borderRadius: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5,
  },
  confirmButtonText: {
    fontSize: 20,
    fontFamily: 'main',
    color: '#000',
  },
  locationText: {
    fontSize: 16,
    fontFamily: 'main',
    color: Colors.main,
    marginTop: 20,
  },
});