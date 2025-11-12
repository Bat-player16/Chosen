import { View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native';
import Colors from '../../Utils/Colors';
import React from 'react';
import { useNavigation } from '@react-navigation/native';
import { AntDesign } from '@expo/vector-icons';

export default function FriendsDetails() {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      {/* Back Button */}
      <TouchableOpacity 
        style={styles.backButton}
        onPress={() => navigation.goBack()}
      >
        <AntDesign name="left" size={24} color="#000" />
      </TouchableOpacity>

      {/* Main Content Card */}
      <View style={styles.contentCard}>
        {/* Avatar */}
        <Image
          source={require('../../assets/Images/PFP.png')}
          style={styles.avatar}
        />

        {/* Name and Pronouns */}
        <Text style={styles.name}>Franny (she/her)</Text>

        {/* Quest Description */}
        <Text style={styles.description}>
          You and Franny have completed 3 Quests together! You have accumulated 29 coins and the following special items:
        </Text>

        {/* Special Items List */}
        <View style={styles.itemsList}>
          <Text style={styles.item}>
            • <Text style={{fontFamily: "main", color: "#9783a6"}}>Mystic Node Wing</Text> from the Celestial Forest
          </Text>
          <Text style={styles.item}>
            • <Text style={{fontFamily: "main", color: "#9cc4c4"}}>Grott's Beard</Text> from the Mountain Tops
          </Text>
          <Text style={styles.item}>
            • A <Text style={{fontFamily: "main", color: "#D1FDA0"}}>Smooth River Rock</Text> from Aquatic Arena
          </Text>
        </View>

        {/* Invite Button */}
        <Text style={styles.inviteText}>
          Invite Franny on another Quest?
        </Text>
      </View>
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
  backButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: Colors.main,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
    borderWidth: 2,
    borderColor: '#000',
  },
  contentCard: {
    backgroundColor: Colors.main,
    borderRadius: 20,
    padding: 15,
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#000',
  },
  avatar: {
    width: 250,
    height: 250,
    borderRadius: 999,
    backgroundColor: '#FFA500',
    marginBottom: 15,
    borderWidth: 3,
    borderColor: '#000',
  },
  name: {
    fontSize: 24,
    fontFamily: 'main',
    color: '#000',
    marginBottom: 20,
  },
  description: {
    fontSize: 16,
    fontFamily: 'main',
    color: '#000',
    textAlign: 'center',
    marginBottom: 15,
    lineHeight: 24,
  },
  itemsList: {
    width: '100%',
    marginBottom: 5,
    paddingHorizontal: 10,
  },
  item: {
    fontSize: 14,
    fontFamily: 'main',
    color: '#000',
    marginBottom: 8,
    lineHeight: 20,
  },
  itemName: {
    color: '#4169E1', // Blue color for item names
    fontFamily: 'main',
  },
  inviteText: {
    fontSize: 24,
    fontFamily: 'main',
    color: '#8B4513', // Brown color similar to the image
    textAlign: 'center',
  },
});