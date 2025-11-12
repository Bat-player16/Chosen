import { View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native';
import React from 'react';
import * as Sharing from 'expo-sharing';
import { useNavigation } from '@react-navigation/native';
import Colors from '../../Utils/Colors';

export default function FriendsScreen() {
  const navigation = useNavigation();

  const handleInviteFriends = async () => {
    const shareMessage = `Chosen Friend Request

Click the link below to become friends with [User]

https://www.youtube.com/watch?v=dQw4w9WgXcQ`;

    try {
      // Check if sharing is available
      if (await Sharing.isAvailableAsync()) {
        // Note: expo-sharing requires a file to share
        // For text sharing, you might want to use expo-sharing with a temporary file
        // or use the Share API from react-native instead
        console.log('Share message:', shareMessage);
        
        // Alternative: Use React Native's Share API
        const { Share } = require('react-native');
        await Share.share({
          message: shareMessage,
        });
      } else {
        console.log('Sharing is not available on this device');
      }
    } catch (error) {
      console.error('Error sharing:', error);
    }
  };

  const handleFriendPress = () => {
    navigation.navigate('FriendsDetails', {
      friendName: 'Franny',
      pronouns: 'she/her',
    });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Known Wanderers</Text>

      {/* Friend Item */}
      <TouchableOpacity style={styles.friendCard} onPress={handleFriendPress}>
        <Image
          source={require('../../assets/Images/PFP.png')}
          style={styles.avatar}
        />
        <View style={styles.friendInfo}>
          <Text style={styles.friendName }>Franny</Text>
                    <Text style={styles.friendPronouns}>(she/her)</Text>

        </View>
      </TouchableOpacity>

      {/* Invite Friends Button */}
      <TouchableOpacity style={styles.inviteButton} onPress={handleInviteFriends}>
        <Text style={styles.inviteButtonText}>Invite Friends</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
    padding: 20,
    paddingTop: 60,
  },
  header: {
    fontSize: 28,
    fontFamily: 'main',
    color: '#000',
    marginBottom: 30,
    textAlign: 'center',
  },
  friendCard: {
    backgroundColor: Colors.main,
    borderRadius: 20,
    flexDirection: 'row',
    alignItems: 'center',
    padding: 0,
    marginBottom: 20,
    borderWidth: 2,
    borderColor: '#000',
  },
  avatar: {
    width: 200,
    height: 100,
    borderRadius: 0,borderTopLeftRadius:25,
    borderBottomLeftRadius:25,
    backgroundColor: '#FFA500',
    marginRight: 15,
  },
  friendInfo: {
    flex: 1, justifyContent: 'center', alignItems: 'center'
  },
  friendName: {
    fontSize: 30,
    fontFamily: 'main',
    color: '#000', justifyContent: 'center', alignItems: 'center'
  },
  friendPronouns: {
    fontSize: 16,
    fontFamily: 'main',
    color: '#000', 
  },
  inviteButton: {
    backgroundColor: Colors.secondary,
    borderRadius: 20,
    padding: 15,
    alignItems: 'center',
    marginTop: 20,
    borderWidth: 2,
    borderColor: '#000',
  },
  inviteButtonText: {
    fontSize: 20,
    fontFamily: 'main',
    color: '#000',
  },
});