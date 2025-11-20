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

  const [items, setItems] = useState({
    Stash: [
      {
        image: require('../../assets/Images/Purple-Potion.png'),
        name: 'Snugglebrew Potion',
        description: 'You got this potion from Celestial island...',
        count: 1,
      },
      {
        image: require('../../assets/Images/Yellow-Potion.png'),
        name: 'Glowmelt Potion',
        description: 'Found deep within the Mountainous island caves...',
        count: 1,
      },
      {
        image: require('../../assets/Images/Pink-Potion.png'),
        name: 'Lovelush Potion',
        description: 'Discovered near the Aquatic island’s coral springs...',
        count: 1,
      },
    ],

    Clothes: [
      { image: require('../../assets/Images/Shirt.png'), name: 'Shirt', count: 1 },
      { image: require('../../assets/Images/Pants.png'), name: 'Pants', count: 1 },
      { image: require('../../assets/Images/Glasses.png'), name: 'Glasses', count: 1 },
      { image: require('../../assets/Images/Tie.png'), name: 'Tie', count: 1 },
      { image: require('../../assets/Images/Hat.png'), name: 'Hat', count: 1 },
      { image: require('../../assets/Images/Fedora.png'), name: 'Fedora', count: 1 },
    ],

    Food: [
      { image: require('../../assets/Images/Pizza.png'), name: 'Poppy Pizza', count: 1 },
      { image: require('../../assets/Images/Bread.png'), name: 'Bountiful Bread', count: 1 },
      { image: require('../../assets/Images/Rice.png'), name: 'Rich Rice', count: 1 },
      { image: require('../../assets/Images/Jellyfish.png'), name: 'Jellyfish Jingle', count: 1 },
    ],

    More: [
      { image: require('../../assets/Images/Potato.png'), name: 'Potato', count: 1 },
      { image: require('../../assets/Images/Statue.png'), name: 'Statue', count: 1 },
      { image: require('../../assets/Images/NFT.png'), name: 'NFT Artifact', count: 1 },
    ],
  });

  const categories = [
    { id: 'Stash', icon: require('../../assets/Images/Stash.png') },
    { id: 'Clothes', icon: require('../../assets/Images/Clothes.png') },
    { id: 'Food', icon: require('../../assets/Images/Food.png') },
    { id: 'More', icon: require('../../assets/Images/More.png') },
  ];

  useEffect(() => {
    if (route?.params?.craftedItem) {
      const craftedItem = route.params.craftedItem;

      setItems((prev) => {
        const stash = [...prev.Stash];

        const existingIndex = stash.findIndex((i) => i.name === craftedItem.name);

        if (existingIndex !== -1) {
          stash[existingIndex].count += 1;
        } else {
          stash.push({ ...craftedItem, count: 1 });
        }

        return { ...prev, Stash: stash };
      });

      setActiveCategory('Stash');

      setShowCraftConfirmation(true);

      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 250,
        useNativeDriver: true,
      }).start();

      setTimeout(() => {
        Animated.timing(fadeAnim, {
          toValue: 0,
          duration: 250,
          useNativeDriver: true,
        }).start(() => setShowCraftConfirmation(false));
      }, 1200);
    }
  }, [route?.params?.craftedItem]);

  const currentItems = items[activeCategory];

  const openItemModal = (item) => {
    setSelectedItem(item);
    setItemModalVisible(true);
  };

  const closeModal = () => {
    setSelectedItem(null);
    setItemModalVisible(false);
  };

  return (
    <View style={styles.container}>
      <View style={styles.titleContainer}>
        <Text style={styles.title}>Stash</Text>
      </View>

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

      <View style={styles.inventoryWrapper}>
        <View style={styles.inventoryGrid}>
          {Array.from({ length: 9 }).map((_, index) => {
            const item = currentItems[index];

            return (
              <TouchableOpacity
                key={index}
                style={styles.gridCell}
                onPress={() => item && openItemModal(item)}
              >
                {item && (
                  <View style={styles.itemWrapper}>
                    <Image source={item.image} style={styles.itemImage} resizeMode="contain" />

                    {/* Counter ALWAYS shown */}
                    <View style={styles.counterBadge}>
                      <Text style={styles.counterText}>x{item.count}</Text>
                    </View>

                    <Text style={styles.itemName}>{item.name}</Text>
                  </View>
                )}
              </TouchableOpacity>
            );
          })}
        </View>
      </View>

      <Modal animationType="fade" transparent={true} visible={itemModalVisible}>
        <Pressable style={styles.modalOverlay} onPress={closeModal}>
          <Pressable style={styles.modalCard}>

            <TouchableOpacity style={styles.closeButton} onPress={closeModal}>
              <Text style={styles.closeText}>X</Text>
            </TouchableOpacity>

            {selectedItem && (
              <>
                <Text style={styles.modalTitle}>{selectedItem.name}</Text>
                <Image source={selectedItem.image} style={styles.modalImage} resizeMode="contain" />
                <Text style={styles.modalDescription}>{selectedItem.description}</Text>
              </>
            )}

          </Pressable>
        </Pressable>
      </Modal>

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
    backgroundColor: Colors.card,
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
    backgroundColor: '#fff',
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
    backgroundColor: Colors.card,
    borderRadius: 12,
    paddingVertical: 15,
  },

  inventoryGrid: {
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
    borderWidth: 3,
    borderColor: '#000',
    backgroundColor: '#d8c894', // full tan grid
  },

  gridCell: {
    width: '33.33%',
    height: '33.33%',
    borderWidth: 2,
    borderColor: '#000',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#d8c894',
  },

  itemWrapper: {
    width: '100%',
    alignItems: 'center',
    position: 'relative',
  },

  itemImage: {
    width: '85%',
    height: '65%',
    marginBottom: 6,
  },

  itemName: {
    fontFamily: 'main',
    fontSize: 15,
    color: '#000',
    textAlign: 'center',
    lineHeight: 18,
  },

  counterBadge: {
    position: 'absolute',
    top: 4,
    right: 8,
    backgroundColor: '#000',
    borderRadius: 12,
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderWidth: 2,
    borderColor: '#fff',
  },

  counterText: {
    color: '#fff',
    fontFamily: 'main',
    fontSize: 13,
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
  },

  modalImage: {
    width: 200,
    height: 200,
    marginBottom: 25,
  },

  modalDescription: {
    fontSize: 18,
    fontFamily: 'main',
    textAlign: 'center',
    lineHeight: 26,
  },

  craftConfirmationOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0,0,0,0.3)',
    justifyContent: 'center',
    alignItems: 'center',
  },

  craftConfirmationImage: {
    width: '80%',
    height: '50%',
  },
});