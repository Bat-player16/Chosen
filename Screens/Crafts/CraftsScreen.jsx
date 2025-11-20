import { View, Text, Image, StyleSheet, TouchableOpacity, Pressable, Modal } from 'react-native'
import React, { useState } from 'react'
import Colors from '../../Utils/Colors'

export default function CraftsScreen({ navigation }) {
  const [currentPage, setCurrentPage] = useState(0); // 0 = Supernova Serum, 1 = Flask of Fluid Frost
  const [selectedMarker, setSelectedMarker] = useState(null);
  const [craftModalVisible, setCraftModalVisible] = useState(false);

  // Quest data
  const desertQuests = {
    D1: { name: "Sewing Workshop", location: "Wellesley, MA" },
    D2: { name: "Pottery Workshop", location: "Newton, MA" },
    D3: { name: "Woodworking", location: "Newton, MA" },
  };

  // Potion data
  const potions = {
    0: {
      name: 'Supernova Serum',
      image: require('../../assets/Images/Supernova_Serum.png'),
      loseItems: [
        '2x Solar Skates ⛸️',
        '2x Stardust ✨',
        '1x Desert Item'
      ]
    },
    1: {
      name: 'Flask of Fluid Frost',
      image: require('../../assets/Images/Flask_of_Fluid_Frost.png'),
      loseItems: [
        '1x Slippery Bananas 🍌',
        '1x Jellyfish Jingles 🪼',
        '1x Polkadot Pebbles 🪨'
      ]
    }
  };

  const handleMarkerPress = (questId) => {
    setSelectedMarker(questId);
  };

  const handleQuestNavigate = (questId) => {
    const quest = desertQuests[questId];
    navigation.navigate('Map', {
      screen: 'QuestConfig',
      params: {
        questName: quest.name,
        location: quest.location,
        questType: 'desert'
      }
    });
  };

  const handleCauldronPress = () => {
    setCraftModalVisible(true);
  };

  const handleCraftCancel = () => {
    setCraftModalVisible(false);
  };

  const handleCraftConfirm = () => {
    setCraftModalVisible(false);
    
    const currentPotion = potions[currentPage];
    
    navigation.navigate('Stash', {
      screen: 'StashScreen',
      params: {
        craftedItem: {
          image: currentPotion.image,
          name: currentPotion.name,
        }
      }
    });
  };

  const togglePage = () => {
    setCurrentPage(currentPage === 0 ? 1 : 0);
    setSelectedMarker(null);
  };

  // Render Page 1: Supernova Serum
  const renderSupernovaSerum = () => (
    <>
      {/* Potion Title */}
      <View style={styles.potionHeader}>
        <View style={styles.potionTitleWrapper}>
          <Text style={[styles.potionTitle, styles.titleShadow]}>Supernova Serum</Text>
          <Text style={[styles.potionTitle, styles.titleFront, 
    {opacity: 0.5}]}>Supernova Serum</Text>
        </View>
        <Image source={require('../../assets/Images/Supernova_Serum.png')} style={styles.potionIcon} resizeMode="contain" />
      </View>

      {/* Ingredients Section */}
      <View style={styles.ingredientsSection}>
        {/* Celestial Items - Completed */}
        <View style={styles.ingredientLine}>
          <View style={styles.checkboxContainer}>
            <Image source={require('../../assets/Images/Checkbox.png')} style={styles.checkbox} resizeMode="contain" />
            <Image source={require('../../assets/Images/Red_Check.png')} style={styles.redCheck} resizeMode="contain" />
          </View>
          <Text style={styles.ingredientMainText}>2x <Text style={{ color: Colors.celestial }}>Celestial</Text> Item</Text>
        </View>
        <View style={styles.subItem}>
          <View style={styles.checkboxContainer}>
            <Image source={require('../../assets/Images/Checkcircle.png')} style={styles.checkboxSmall} resizeMode="contain" />
            <Image source={require('../../assets/Images/Red_Check.png')} style={styles.redCheckSmall} resizeMode="contain" />
          </View>
          <Text style={styles.subItemText}>⛸️ Solar Skates</Text>
        </View>
        <View style={styles.subItem}>
          <View style={styles.checkboxContainer}>
            <Image source={require('../../assets/Images/Checkcircle.png')} style={styles.checkboxSmall} resizeMode="contain" />
            <Image source={require('../../assets/Images/Red_Check.png')} style={styles.redCheckSmall} resizeMode="contain" />
          </View>
          <Text style={styles.subItemText}>✨ Stardust</Text>
        </View>

        {/* Desert Items - Incomplete */}
        <View style={styles.ingredientLine}>
          <Image source={require('../../assets/Images/Checkbox.png')} style={styles.checkbox} resizeMode="contain" />
          <Text style={styles.ingredientMainText}> 1x <Text style={{ color: Colors.desert }}>Desert</Text> Item</Text>
        </View>
        <View style={styles.subItem}> 
          <Image source={require('../../assets/Images/Checkcircle.png')} style={styles.checkboxSmall} resizeMode="contain" />
          <Text style={styles.subItemText}>???</Text>      
        </View>
      </View>

      {/* Active Quests Section */}
      <View style={styles.questSection}>
        <Text style={styles.questSectionTitle}>Active Desert Quests</Text>
        <View style={styles.questSectionContainer}>
          {/* Left Side - Map with Markers */}
          <View style={styles.mapWrapper}>
            <Image source={require('../../assets/Images/Desert.png')} style={styles.mapBackground} resizeMode="contain" />
            
            {/* Marker 1 */}
            <TouchableOpacity style={[styles.mapMarker, { top: '15%', left: '45%' }]} onPress={() => handleMarkerPress('D1')}>
              <Image source={require('../../assets/Images/D_Marker.png')} style={styles.markerIcon} resizeMode="contain" />
            </TouchableOpacity>

            {/* Marker 2 */}
            <TouchableOpacity style={[styles.mapMarker, { top: '45%', left: '50%' }]} onPress={() => handleMarkerPress('D2')}>
              <Image source={require('../../assets/Images/D_Marker.png')} style={styles.markerIcon} resizeMode="contain" />
            </TouchableOpacity>

            {/* Marker 3 */}
            <TouchableOpacity style={[styles.mapMarker, { top: '65%', left: '40%' }]} onPress={() => handleMarkerPress('D3')}>
              <Image source={require('../../assets/Images/D_Marker.png')} style={styles.markerIcon} resizeMode="contain" />
            </TouchableOpacity>
          </View>

          {/* Right Side - Quest Info Popup */}
          {selectedMarker && (
            <TouchableOpacity 
              style={styles.questInfoBox} 
              onPress={() => handleQuestNavigate(selectedMarker)} 
              activeOpacity={0.8}
            >
              <Text style={styles.questInfoTitle}>{desertQuests[selectedMarker].name}</Text>
              <Text style={styles.questInfoLocation}>{desertQuests[selectedMarker].location}</Text>
            </TouchableOpacity>
          )}
        </View>
      </View>
    </>
  );

  // Render Page 2: Flask of Fluid Frost
  const renderFlaskOfFluidFrost = () => (
    <>
      {/* Potion Title */}
      <View style={styles.potionHeader}>
        <View style={styles.potionTitleWrapper}>
          <Text style={[styles.potionTitle, styles.titleShadow, { color: '#97e8ff' }]}>Flask of Fluid Frost</Text>
          <Text style={[styles.potionTitle, styles.titleFront, { color: '#36496b' }]}>Flask of Fluid Frost</Text>
        </View>
        <Image source={require('../../assets/Images/Flask_of_Fluid_Frost.png')} style={styles.potionIcon} resizeMode="contain" />
      </View>

      {/* Ingredients Section - All Complete */}
      <View style={styles.ingredientsSection}>
        {/* Aquatic Items */}
        <View style={styles.ingredientLine}>
          <View style={styles.checkboxContainer}>
            <Image source={require('../../assets/Images/Checkbox.png')} style={styles.checkbox} resizeMode="contain" />
            <Image source={require('../../assets/Images/Red_Check.png')} style={styles.redCheck} resizeMode="contain" />
          </View>
          <Text style={styles.ingredientMainText}>2x <Text style={{ color: Colors.aquatic }}>Aquatic</Text> Item</Text>
        </View>
        <View style={styles.subItem}>
          <View style={styles.checkboxContainer}>
            <Image source={require('../../assets/Images/Checkcircle.png')} style={styles.checkboxSmall} resizeMode="contain" />
            <Image source={require('../../assets/Images/Red_Check.png')} style={styles.redCheckSmall} resizeMode="contain" />
          </View>
          <Text style={styles.subItemText}>🍌 Slippery Bananas</Text>
        </View>
        <View style={styles.subItem}>
          <View style={styles.checkboxContainer}>
            <Image source={require('../../assets/Images/Checkcircle.png')} style={styles.checkboxSmall} resizeMode="contain" />
            <Image source={require('../../assets/Images/Red_Check.png')} style={styles.redCheckSmall} resizeMode="contain" />
          </View>
          <Text style={styles.subItemText}>🪼 Jellyfish Jingles</Text>
        </View>

        {/* Mountainous Items */}
        <View style={styles.ingredientLine}>
          <View style={styles.checkboxContainer}>
            <Image source={require('../../assets/Images/Checkbox.png')} style={styles.checkbox} resizeMode="contain" />
            <Image source={require('../../assets/Images/Red_Check.png')} style={styles.redCheck} resizeMode="contain" />
          </View>
          <Text style={styles.ingredientMainText}>1x <Text style={{ color: Colors.mountainous }}>Mountainous</Text> Item</Text>
        </View>
        <View style={styles.subItem}>
          <View style={styles.checkboxContainer}>
            <Image source={require('../../assets/Images/Checkcircle.png')} style={styles.checkboxSmall} resizeMode="contain" />
            <Image source={require('../../assets/Images/Red_Check.png')} style={styles.redCheckSmall} resizeMode="contain" />
          </View>
          <Text style={styles.subItemText}>🪨 Polkadot Pebbles</Text>
        </View>
      </View>

      {/* Craft Available Section */}
      <View style={styles.craftSection}>
        <Text style={styles.craftAvailableText}>CRAFT AVAILABLE!</Text>
        <TouchableOpacity onPress={handleCauldronPress} activeOpacity={0.7}>
          <Image source={require('../../assets/Images/Cauldron2.png')} style={styles.cauldronImage} resizeMode="contain" />
        </TouchableOpacity>
      </View>
    </>
  );

  return (
    <View style={styles.screenContainer}>
      {/* Header */}
      <Text style={styles.screenTitle}>My Potions</Text>

      {/* Book Container */}
      <View style={styles.bookContainer}>
        {/* Book Background */}
        <Image source={require('../../assets/Images/Craft_Book.png')} style={styles.bookImage} resizeMode="stretch" />
        
        {/* Content Area (NOT pressable) */}
        <View style={styles.contentArea}>
          {currentPage === 0 ? renderSupernovaSerum() : renderFlaskOfFluidFrost()}
        </View>

        {/* Invisible Touchable Area at Bottom for Page Transition */}
        <Pressable style={styles.pageTransitionArea} onPress={togglePage} />
      </View>

      {/* Table of Contents Button */}
      <TouchableOpacity style={styles.tocButton}>
        <Text style={styles.tocButtonText}>Table of Contents</Text>
      </TouchableOpacity>

      {/* CRAFT CONFIRMATION MODAL */}
      <Modal animationType="fade" transparent={true} visible={craftModalVisible}>
        <Pressable style={styles.craftModalOverlay} onPress={handleCraftCancel}>
          <Pressable style={styles.craftModalCard}>
            <Text style={styles.craftModalTitle}>{potions[currentPage].name}</Text>
            
            <Text style={styles.craftModalQuestion}>Would you like to craft this item?</Text>
            
            <View style={styles.craftModalSection}>
              <Text style={styles.craftModalSectionTitle}>You Gain:</Text>
              <Text style={styles.craftModalGainText}>
                1x {potions[currentPage].name}
              </Text>
            </View>

            <View style={styles.craftModalSection}>
              <Text style={styles.craftModalSectionTitle}>You Lose:</Text>
              {potions[currentPage].loseItems.map((item, index) => (
                <Text key={index} style={styles.craftModalLoseText}>{item}</Text>
              ))}
            </View>

            <View style={styles.craftModalButtons}>
              <TouchableOpacity style={styles.cancelButton} onPress={handleCraftCancel}>
                <Text style={styles.cancelButtonText}>Cancel</Text>
              </TouchableOpacity>
              
              <TouchableOpacity style={styles.craftButton} onPress={handleCraftConfirm}>
                <Text style={styles.craftButtonText}>Craft</Text>
              </TouchableOpacity>
            </View>
          </Pressable>
        </Pressable>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  // Screen Layout
  screenContainer: {
    flex: 1,
    backgroundColor: Colors.background,
    alignItems: 'center',
    paddingTop: 50,
  },
  screenTitle: {
    fontSize: 40,
    fontFamily: 'main',
    color: '#000',
    marginBottom: 20,
  },

  // Book Container
  bookContainer: {
    width: 550,
    height: 650,
    position: 'relative',
  },
  bookImage: {
    width: '100%',
    height: '100%',
    position: 'absolute',
  },
  contentArea: {
    flex: 1,
    marginHorizontal: 40,
    paddingTop: 30,
    paddingBottom: 80,
    pointerEvents: 'box-none',
  },
  pageTransitionArea: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: 50,
    backgroundColor: 'transparent',
  },

  // Potion Header
  potionHeader: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center', 
    left:'6%'
  },
  potionTitleWrapper: {
    position: 'relative',
    flex: 1,   
    left:'10%'
  },
  potionTitle: {
    fontSize: 40,
    fontFamily: 'potion',
    width: '67%',
    textAlign:'center',
    lineHeight:60,
  },
  titleShadow: {
    position: 'absolute',
    color: 'black',
    top: 2,
    left: 0,
    zIndex: 1,
  },
  titleFront: {
    color: '#FF9705',
    position: 'relative',
    zIndex: 2,
  },
  potionIcon: {
    width: 120,
    opacity:0.65, 
    height: 120,
    right:100, 
    transform: [{rotate: '345deg' }],
  },

  // Ingredients Section
  ingredientsSection: {
    marginBottom: 20, 
    paddingTop:10,
    marginHorizontal:100,
  },
  ingredientLine: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
    marginBottom: 5,
  },
  checkboxContainer: {
    position: 'relative',
    marginRight: 8,
  },
  checkbox: {
    width: 24,
    height: 24,
  },
  redCheck: {
    width: 24,
    height: 24,
    position: 'absolute',
    top: 0,
    left: 0,
  },
  ingredientMainText: {
    fontSize: 18,
    fontFamily: 'main',
    color: '#000',
  },
  subItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: 35,
    marginBottom: 4,
  },
  checkboxSmall: {
    width: 18,
    height: 18,
  },
  redCheckSmall: {
    width: 18,
    height: 18,
    position: 'absolute',
    top: 0,
    left: 0,
  },
  subItemText: {
    fontSize: 15,
    fontFamily: 'main',
    color: '#333',
  },

  // Quest Section
  questSection: {
    marginTop: 5,
    width:'65%', 
    alignSelf:'center' 
  },
  questSectionTitle: {
    fontSize: 24,
    fontFamily: 'main',
    color: '#000',
    textAlign: 'center',
    marginBottom: 10,
  },
  questSectionContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: Colors.desert,
    borderRadius: 15,
    borderWidth: 2,
    borderColor: '#000',
    padding: 10,
    height: 180,
  },
  mapWrapper: {
    width: '48%',
    height: '100%',
    position: 'relative',
    overflow: 'hidden',
  },
  mapBackground: {
    width: '100%',
    height: '100%',
  },
  mapMarker: {
    position: 'absolute',
    width: 20,
    height: 20,
  },
  markerIcon: {
    width: '100%',
    height: '100%',
  },
  questInfoBox: {
    width: '50%',
    height: '70%',
    backgroundColor: Colors.main,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: '#000',
    padding: 15,
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.4,
    shadowRadius: 4,
    elevation: 6,
  },
  questInfoTitle: {
    fontSize: 16,
    fontFamily: 'main',
    color: '#000',
    textAlign: 'center',
    marginBottom: 8,
  },
  questInfoLocation: {
    fontSize: 14,
    fontFamily: 'main',
    color: '#333',
    textAlign: 'center',
  },

  // Craft Section
  craftSection: {
    alignItems: 'center',
    marginTop: 10,
  },
  craftAvailableText: {
    fontSize: 30,
    fontFamily: 'main',
    color: '#ffffff',
    marginBottom: 15,
  },
  cauldronImage: {
    width: 250,
    height: 250,
    bottom:'18%'
  },

  // Table of Contents
  tocButton: {
    backgroundColor: Colors.main,
    paddingVertical: 12,
    paddingHorizontal: 25,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: '#000',
    marginTop: 15,
  },
  tocButtonText: {
    fontSize: 16,
    fontFamily: 'main',
    color: '#000',
  },

  // Craft Confirmation Modal
  craftModalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  craftModalCard: {
    width: '85%',
    maxWidth: 400,
    backgroundColor: '#e8dcc4',
    borderRadius: 20,
    padding: 25,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },
  craftModalTitle: {
    fontSize: 24,
    fontFamily: 'main',
    color: '#000',
    marginBottom: 15,
    textAlign: 'center',
  },
  craftModalQuestion: {
    fontSize: 18,
    fontFamily: 'main',
    color: '#333',
    marginBottom: 20,
    textAlign: 'center',
  },
  craftModalSection: {
    width: '100%',
    marginBottom: 15,
  },
  craftModalSectionTitle: {
    fontSize: 18,
    fontFamily: 'main',
    color: '#000',
    marginBottom: 8,
  },
  craftModalGainText: {
    fontSize: 16,
    fontFamily: 'main',
    color: '#2a7d2e',
    marginLeft: 15,
  },
  craftModalLoseText: {
    fontSize: 16,
    fontFamily: 'main',
    color: '#c94444',
    marginLeft: 15,
    marginBottom: 4,
  },
  craftModalButtons: {
    flexDirection: 'row',
    marginTop: 20,
    gap: 15,
  },
  cancelButton: {
    backgroundColor: '#9ca3af',
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 25,
    borderWidth: 2,
    borderColor: '#000',
  },
  cancelButtonText: {
    fontSize: 16,
    fontFamily: 'main',
    color: '#000',
  },
  craftButton: {
    backgroundColor: '#3b82f6',
    paddingVertical: 12,
    paddingHorizontal: 40,
    borderRadius: 25,
    borderWidth: 2,
    borderColor: '#000',
  },
  craftButtonText: {
    fontSize: 16,
    fontFamily: 'main',
    color: '#fff',
  },
});