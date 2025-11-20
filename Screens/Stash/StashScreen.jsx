import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  Modal,
  Pressable,
  Animated,
} from 'react-native';
import Colors from '../../Utils/Colors';
import React, { useState, useEffect, useRef } from 'react';

export default function StashScreen({ route }) {
  const [activeCategory, setActiveCategory] = useState('Stash');
  const [selectedItem, setSelectedItem] = useState(null);
  const [itemModalVisible, setItemModalVisible] = useState(false);
  const [showCraftConfirmation, setShowCraftConfirmation] = useState(false);
  const fadeAnim = useRef(new Animated.Value(0)).current;

  // Initial items - now as state so we can add to it
  const [items, setItems] = useState({
    Stash: [
      {
        image: require('../../assets/Images/Purple-Potion.png'),
        name: 'Snugglebrew Potion',
        description:
          'You got this potion from Celestial island. This potion will grant you a calm, warm aura that brings comfort to those around you...',
      },
      {
        image: require('../../assets/Images/Yellow-Potion.png'),
        name: 'Glowmelt Potion',
        description:
          'Found deep within the Mountainous island caves. This potion glows gently and is said to melt away fear, giving you renewed courage...',
      },
      {
        image: require('../../assets/Images/Pink-Potion.png'),
        name: 'Lovelush Potion',
        description:
          'Discovered near the Aquatic island\'s coral springs. A bubbly potion that sparks joy, creativity, and affectionate energy...',
      },
    ],

    Clothes: [
      { image: require('../../assets/Images/Shirt.png'), name: 'Shirt' },
      { image: require('../../assets/Images/Pants.png'), name: 'Pants' },
      { image: require('../../assets/Images/Glasses.png'), name: 'Glasses' },
      { image: require('../../assets/Images/Tie.png'), name: 'Tie' },
      { image: require('../../assets/Images/Hat.png'), name: 'Hat' },
      { image: require('../../assets/Images/Fedora.png'), name: 'Fedora' },
    ],

    Food: [
      { image: require('../../assets/Images/Pizza.png'), name: 'Poppy Pizza' },
      { image: require('../../assets/Images/Bread.png'), name: 'Bountiful Bread' },
      { image: require('../../assets/Images/Rice.png'), name: 'Rich Rice' },
      { image: require('../../assets/Images/Jellyfish.png'), name: 'Jellyfish Jingle' },
    ],

    More: [
      { image: require('../../assets/Images/Potato.png'), name: 'Potato' },
      { image: require('../../assets/Images/Statue.png'), name: 'Statue' },
      { image: require('../../assets/Images/NFT.png'), name: 'NFT Artifact' },
    ],
  });

  const categories = [
    { id: 'Stash', icon: require('../../assets/Images/Stash.png') },
    { id: 'Clothes', icon: require('../../assets/Images/Clothes.png') },
    { id: 'Food', icon: require('../../assets/Images/Food.png') },
    { id: 'More', icon: require('../../assets/Images/More.png') },
  ];

  // Handle crafted item from navigation
  useEffect(() => {
    if (route?.params?.craftedItem) {
      const craftedItem = route.params.craftedItem;
      
      // Add the crafted item to the Stash category
      setItems(prevItems => ({
        ...prevItems,
        Stash: [...prevItems.Stash, craftedItem]
      }));

      // Ensure we're on the Stash category
      setActiveCategory('Stash');

      // Show confirmation image
      setShowCraftConfirmation(true);

      // Fade in animation
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 300,
        useNativeDriver: true,
      }).start();

      // Fade out after 1.2 seconds, then hide
      setTimeout(() => {
        Animated.timing(fadeAnim, {
          toValue: 0,
          duration: 300,
          useNativeDriver: true,
        }).start(() => {
          setShowCraftConfirmation(false);
        });
      }, 1200);
    }
  }, [route?.params?.craftedItem]);

  const currentItems = items[activeCategory];

  const openItemModal = (item) => {
    if (!item.name) return;
    setSelectedItem(item);
    setItemModalVisible(true);
  };

  const closeModal = () => {
    setItemModalVisible(false);
    setSelectedItem(null);
  };

  return (
    <View style={styles.container}>

      {/* Title */}
      <View style={styles.titleContainer}>
        <Text style={styles.title}>Stash</Text>
      </View>

      {/* Top Category Bar */}
      <View style={styles.categoryBar}>
        {categories.map((cat) => (
          <CategoryButton
            key={cat.id}
            icon={cat.icon}
            active={activeCategory === cat.id}
            onPress={() => setActiveCategory(cat.id)}
          />
        ))}
      </View>

      {/* Inventory Block */}
      <View style={styles.inventoryWrapper}>
        <View style={styles.inventoryGrid}>
          {Array.from({ length: 9 }).map((_, index) => {
            const item = currentItems[index];

            return (
              <TouchableOpacity
                key={index}
                style={styles.gridCell}
                onPress={() => item && openItemModal(item)}
                activeOpacity={item ? 0.7 : 1}
              >
                {item && (
                  <>
                    <Image
                      source={item.image}
                      style={styles.itemImage}
                      resizeMode="contain"
                    />
                    <Text style={styles.itemName}>{item.name}</Text>
                  </>
                )}
              </TouchableOpacity>
            );
          })}
        </View>
      </View>

      {/* ITEM POPUP MODAL */}
      <Modal animationType="fade" transparent={true} visible={itemModalVisible}>
        <Pressable style={styles.modalOverlay} onPress={closeModal}>
          <Pressable style={styles.modalCard}>

            {/* Close Button */}
            <TouchableOpacity style={styles.closeButton} onPress={closeModal}>
              <Text style={styles.closeText}>X</Text>
            </TouchableOpacity>

            {selectedItem && (
              <>
                <Text style={styles.modalTitle}>{selectedItem.name}</Text>

                <Image
                  source={selectedItem.image}
                  style={styles.modalImage}
                  resizeMode="contain"
                />

                <Text style={styles.modalDescription}>
                  {selectedItem.description}
                </Text>
              </>
            )}

          </Pressable>
        </Pressable>
      </Modal>

      {/* CRAFT CONFIRMATION POPUP */}
      {showCraftConfirmation && (
        <Animated.View style={[styles.craftConfirmationOverlay, { opacity: fadeAnim }]}>
          <Image
            source={require('../../assets/Images/Craft_Confirmation.png')}
            style={styles.craftConfirmationImage}
            resizeMode="contain"
          />
        </Animated.View>
      )}
    </View>
  );
}

function CategoryButton({ icon, active, onPress }) {
  return (
    <TouchableOpacity
      style={[styles.categoryButton, active && styles.activeCategory]}
      onPress={onPress}
    >
      <Image source={icon} style={styles.categoryIcon} resizeMode="contain" />
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.aquaticDark || Colors.background,
    alignItems: 'center',
  },

  titleContainer: {
    marginTop: '12%',
    marginBottom: 20,
  },

  title: {
    fontSize: 48,
    color: Colors.main,
    fontFamily: 'main',
  },

  categoryBar: {
    width: '90%',
    backgroundColor: Colors.card || '#d8c894',
    borderRadius: 12,
    paddingVertical: 15,
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 15,
  },

  categoryButton: {
    backgroundColor: '#d0d48f',
    width: 80,
    height: 80,
    borderRadius: 14,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#000',
  },

  activeCategory: {
    backgroundColor: '#ffffff',
    borderColor: Colors.main,
    borderWidth: 3,
  },

  categoryIcon: {
    width: '70%',
    height: '70%',
  },

  inventoryWrapper: {
    width: '90%',
    height: '60%',
    backgroundColor: '#d8c894',
    borderRadius: 12,
    paddingVertical: 15,
  },

  inventoryGrid: {
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
    borderWidth: 3,
    borderColor: '#000',
  },

  gridCell: {
    width: '33.33%',
    height: '33.33%',
    borderWidth: 2,
    borderColor: '#000',
    justifyContent: 'center',
    alignItems: 'center',
  },

  itemImage: {
    width: '80%',
    height: '60%',
    marginBottom: 4,
  },

  itemName: {
    fontFamily: 'main',
    fontSize: 16,
    color: '#000',
    textAlign: 'center',
    lineHeight: 18,
    paddingHorizontal: 4,
  },

  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.45)',
    justifyContent: 'center',
    alignItems: 'center',
  },

  modalCard: {
    width: '90%',
    backgroundColor: '#f3e7c7',
    borderRadius: 32,
    paddingTop: 40,
    paddingBottom: 35,
    paddingHorizontal: 25,
    alignItems: 'center',
    position: 'relative',

    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 6,
    elevation: 6,
  },

  closeButton: {
    position: 'absolute',
    top: 15,
    right: 15,
    backgroundColor: '#b7d29c',
    width: 38,
    height: 38,
    borderRadius: 19,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#000',
  },

  closeText: {
    fontSize: 20,
    fontFamily: 'main',
  },

  modalTitle: {
    fontSize: 32,
    fontFamily: 'main',
    marginBottom: 20,
    textAlign: 'center',
  },

  modalImage: {
    width: 200,
    height: 200,
    marginBottom: 25,
  },

  modalDescription: {
    fontSize: 18,
    fontFamily: 'main',
    lineHeight: 26,
    textAlign: 'center',
    paddingHorizontal: 10,
  },

  // Craft Confirmation Popup
  craftConfirmationOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1000,
  },
  craftConfirmationImage: {
    width: '80%',
    height: '50%',
  },
});