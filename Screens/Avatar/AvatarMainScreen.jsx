import { View, Text, Image, TouchableOpacity, StyleSheet, Alert, Animated, ActivityIndicator, Pressable } from 'react-native';
import React, { useState, useRef, useEffect } from 'react';
import { MaterialCommunityIcons, FontAwesome6 } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import Colors from '../../Utils/Colors';

export default function AvatarMainScreen() {
  const navigation = useNavigation();
  
  // Track which category catalogue is open
  const [openCategory, setOpenCategory] = useState(null);
  const [selectedCategoryIndex, setSelectedCategoryIndex] = useState(null);
  
  // Track if skin tone catalogue is open
  const [skinToneCatalogueOpen, setSkinToneCatalogueOpen] = useState(false);
  
  // Track selected avatar skin tone (default to medium)
  const [selectedAvatarSkin, setSelectedAvatarSkin] = useState('medium');
  
  // Track selected clothing items for each category
  const [selectedClothing, setSelectedClothing] = useState({
    hat: null,
    shirt: null,
    pants: null,
    glasses: null,
    wand: null
  });
  
  // Track loading states for images
  const [loadingImages, setLoadingImages] = useState({});
  
  // Track if clothing images are ready to prevent flicker
  const [clothingImagesReady, setClothingImagesReady] = useState({});
  
  // Animation value for catalogue vertical expansion
  const expandAnim = useRef(new Animated.Value(0)).current;
  
  // Animation value for horizontal skin tone catalogue expansion
  const horizontalExpandAnim = useRef(new Animated.Value(0)).current;
  
  // Preload all clothing images on mount
  useEffect(() => {
    const preloadImages = async () => {
      // Mark all as ready immediately to prevent flicker
      setClothingImagesReady({
        shirt: { 0: true, 1: true, 2: true },
        pants: { 0: true, 1: true },
        hat: { 0: true },
        glasses: { 0: true },
        wand: { 0: true }
      });
    };
    
    preloadImages();
  }, []);
  
  // Clothing categories configuration
  const categories = [
    { id: 'hat', icon: require('../../assets/Images/Hat_Icon.png'), item: '../../assets/Images/Hat_1.png' },
    { id: 'shirt', icon: require('../../assets/Images/Shirt_Icon.png'), item: '../../assets/Images/Shirt_1.png' },
    { id: 'pants', icon: require('../../assets/Images/Pants_Icon.png'), item: '../../assets/Images/Pants_1.png' },
    { id: 'glasses', icon: require('../../assets/Images/Glasses_Icon.png'), item: '../../assets/Images/Glasses_1.png' },
    { id: 'wand', icon: require('../../assets/Images/Wand_Icon.png'), item: '../../assets/Images/Wand_1.png' }
  ];
  
  // Clothing size and position adjustments
  const clothingAdjustments = {
    shirt: {
      0: { sizeMultiplier: .86, leftOffset: 5, topOffset: -1 },   // Shirt_1.png
      1: { sizeMultiplier: 1.0, leftOffset: 0, topOffset: 0 },   // Shirt_2.png
      2: { sizeMultiplier: .7, leftOffset: 10, topOffset: 0 },   // Shirt_3.png
    },
    pants: {
      0: { sizeMultiplier: .84, leftOffset: 8, topOffset: .4 },   // Pants_1.png
      1: { sizeMultiplier: .6, leftOffset: 16, topOffset: 0 },   // Pants_2.png
    }
  };
  
  // Avatar skin tone options
  const avatarSkins = [
    { id: 'light', image: require('../../assets/Images/Avatar_Light.png') },
    { id: 'medium', image: require('../../assets/Images/Avatar_Medium.png') },
    { id: 'dark', image: require('../../assets/Images/Avatar_Dark.png') }
  ];
  
  // Handle category icon press
  const handleCategoryPress = (categoryId, index) => {
    if (openCategory === categoryId) {
      // Close if already open
      closeCatalogue();
    } else {
      // Close skin tone catalogue if open
      if (skinToneCatalogueOpen) {
        closeSkinToneCatalogue();
      }
      // Open new category
      setOpenCategory(categoryId);
      setSelectedCategoryIndex(index);
      expandAnim.setValue(0);
      Animated.timing(expandAnim, {
        toValue: 1,
        duration: 300,
        useNativeDriver: false
      }).start();
    }
  };
  
  // Handle skin tone button press
  const handleSkinTonePress = () => {
    if (skinToneCatalogueOpen) {
      closeSkinToneCatalogue();
    } else {
      // Close clothing catalogue if open
      if (openCategory) {
        closeCatalogue();
      }
      setSkinToneCatalogueOpen(true);
      horizontalExpandAnim.setValue(0);
      Animated.timing(horizontalExpandAnim, {
        toValue: 1,
        duration: 300,
        useNativeDriver: false
      }).start();
    }
  };
  
  // Close catalogue
  const closeCatalogue = () => {
    Animated.timing(expandAnim, {
      toValue: 0,
      duration: 300,
      useNativeDriver: false
    }).start(() => {
      setOpenCategory(null);
      setSelectedCategoryIndex(null);
    });
  };
  
  // Close skin tone catalogue
  const closeSkinToneCatalogue = () => {
    Animated.timing(horizontalExpandAnim, {
      toValue: 0,
      duration: 300,
      useNativeDriver: false
    }).start(() => {
      setSkinToneCatalogueOpen(false);
    });
  };
  
  // Handle image loading
  const handleImageLoadStart = (key) => {
    setLoadingImages(prev => ({ ...prev, [key]: true }));
  };
  
  const handleImageLoadEnd = (key) => {
    setLoadingImages(prev => ({ ...prev, [key]: false }));
  };
  
  // Handle clothing item selection
  const handleClothingSelect = (categoryId, itemIndex) => {
    setSelectedClothing({
      ...selectedClothing,
      [categoryId]: itemIndex
    });
    closeCatalogue();
  };
  
  // Handle avatar skin selection
  const handleAvatarSkinSelect = (skinId) => {
    setSelectedAvatarSkin(skinId);
    closeSkinToneCatalogue();
  };
  
  // Handle cancel selection
  const handleCancelSelection = (categoryId) => {
    setSelectedClothing({
      ...selectedClothing,
      [categoryId]: null
    });
    closeCatalogue();
  };
  
  // Handle confirm button press
  const handleConfirm = () => {
    Alert.alert(
      'Confirm Changes?',
      '',
      [
        {
          text: 'Cancel',
          style: 'cancel'
        },
        {
          text: 'Confirm',
          onPress: () => navigation.navigate('Map')
        }
      ]
    );
  };
  
  // Get the image source for a category (icon or selected item)
  const getCategoryImage = (category) => {
    if (selectedClothing[category.id] !== null) {
      const itemIndex = selectedClothing[category.id];
      // Return the selected clothing item image
      switch(category.id) {
        case 'hat':
          return require('../../assets/Images/Hat_1.png');
        case 'shirt':
          if (itemIndex === 0) return require('../../assets/Images/Shirt_1.png');
          if (itemIndex === 1) return require('../../assets/Images/Shirt_2.png');
          if (itemIndex === 2) return require('../../assets/Images/Shirt_3.png');
          return require('../../assets/Images/Mystery.png');
        case 'pants':
          if (itemIndex === 0) return require('../../assets/Images/Pants_1.png');
          if (itemIndex === 1) return require('../../assets/Images/Pants_2.png');
          return require('../../assets/Images/Mystery.png');
        case 'glasses':
          return require('../../assets/Images/Glasses_1.png');
        case 'wand':
          return require('../../assets/Images/Wand_1.png');
        default:
          return category.icon;
      }
    }
    return category.icon;
  };
  
  // Get the current avatar image
  const getCurrentAvatarImage = () => {
    switch(selectedAvatarSkin) {
      case 'light':
        return require('../../assets/Images/Avatar_Light.png');
      case 'dark':
        return require('../../assets/Images/Avatar_Dark.png');
      case 'medium':
      default:
        return require('../../assets/Images/Avatar_Medium.png');
    }
  };
  
  // Get clothing item image for rendering on avatar
  const getClothingItemImage = (categoryId, itemIndex) => {
    switch(categoryId) {
      case 'hat':
        return require('../../assets/Images/Hat_1.png');
      case 'shirt':
        if (itemIndex === 0) return require('../../assets/Images/Shirt_1.png');
        if (itemIndex === 1) return require('../../assets/Images/Shirt_2.png');
        if (itemIndex === 2) return require('../../assets/Images/Shirt_3.png');
        return null; // Don't render Mystery.png on avatar
      case 'pants':
        if (itemIndex === 0) return require('../../assets/Images/Pants_1.png');
        if (itemIndex === 1) return require('../../assets/Images/Pants_2.png');
        return null; // Don't render Mystery.png on avatar
      case 'glasses':
        return require('../../assets/Images/Glasses_1.png');
      case 'wand':
        return require('../../assets/Images/Wand_1.png');
      default:
        return null;
    }
  };
  
  // Render catalogue items
  const renderCatalogue = () => {
    if (!openCategory || selectedCategoryIndex === null) return null;
    
    // Calculate the top position based on selected category index
    // Each button is 65px + 10px margin = 75px spacing
    const buttonHeight = 0;
    const catalogueFullHeight = 530; // 6 items * 75px + padding
    const topPosition = 40 + (selectedCategoryIndex * buttonHeight);
    
    const animatedHeight = expandAnim.interpolate({
      inputRange: [0, 1],
      outputRange: [buttonHeight, catalogueFullHeight]
    });
    
    const animatedOpacity = expandAnim.interpolate({
      inputRange: [0, 0.3, 1],
      outputRange: [0, 0, 1]
    });
    
    return (
      <View style={styles.catalogueContainer}>
        <Animated.View 
          style={[
            styles.catalogue,
            { 
              top: topPosition,
              height: animatedHeight,
              opacity: 1
            }
          ]}
        >
          <Animated.View style={{ opacity: animatedOpacity }}>
            {/* Cancel button at top */}
            <TouchableOpacity 
              style={styles.catalogueItem}
              onPress={() => handleCancelSelection(openCategory)}
            >
              <MaterialCommunityIcons name="cancel" size={40} color="#333" />
            </TouchableOpacity>
            
            {/* 5 clothing items */}
            {[...Array(5)].map((_, index) => {
              const imageKey = `${openCategory}-${index}`;
              
              // Determine which image to show based on category and index
              let imageSource;
              if (openCategory === 'shirt' && index < 3) {
                // Shirts have 3 variants
                imageSource = index === 0 ? require('../../assets/Images/Shirt_1.png') :
                              index === 1 ? require('../../assets/Images/Shirt_2.png') :
                              require('../../assets/Images/Shirt_3.png');
              } else if (openCategory === 'pants' && index < 2) {
                // Pants have 2 variants
                imageSource = index === 0 ? require('../../assets/Images/Pants_1.png') :
                              require('../../assets/Images/Pants_2.png');
              } else if (openCategory === 'hat' && index === 0) {
                imageSource = require('../../assets/Images/Hat_1.png');
              } else if (openCategory === 'glasses' && index === 0) {
                imageSource = require('../../assets/Images/Glasses_1.png');
              } else if (openCategory === 'wand' && index === 0) {
                imageSource = require('../../assets/Images/Wand_1.png');
              } else {
                // All other slots show Mystery.png
                imageSource = require('../../assets/Images/Mystery.png');
              }
              
              return (
                <TouchableOpacity 
                  key={index}
                  style={styles.catalogueItem}
                  onPress={() => handleClothingSelect(openCategory, index)}
                >
                  {loadingImages[imageKey] && (
                    <ActivityIndicator 
                      size="small" 
                      color={Colors.background}
                      style={styles.loadingIndicator}
                    />
                  )}
                  <Image 
                    source={imageSource}
                    style={styles.catalogueItemImage}
                    resizeMode="contain"
                    onLoadStart={() => handleImageLoadStart(imageKey)}
                    onLoadEnd={() => handleImageLoadEnd(imageKey)}
                    onLoad={() => handleImageLoadEnd(imageKey)}
                  />
                </TouchableOpacity>
              );
            })}
          </Animated.View>
        </Animated.View>
      </View>
    );
  };
  
  // Render horizontal skin tone catalogue
  const renderSkinToneCatalogue = () => {
    if (!skinToneCatalogueOpen) return null;
    
    const animatedWidth = horizontalExpandAnim.interpolate({
      inputRange: [0, 1],
      outputRange: [65, 235] // 3 items * 65px + 2 gaps * 10px + padding
    });
    
    const animatedOpacity = horizontalExpandAnim.interpolate({
      inputRange: [0, 0.3, 1],
      outputRange: [0, 0, 1]
    });
    
    return (
      <View style={styles.skinToneCatalogueContainer}>
        <Animated.View 
          style={[
            styles.skinToneCatalogue,
            { 
              width: animatedWidth,
              opacity: 1
            }
          ]}
        >
          <Animated.View style={[styles.skinToneRow, { opacity: animatedOpacity }]}>
            {avatarSkins.map((skin) => {
              const imageKey = `avatar-${skin.id}`;
              return (
                <TouchableOpacity 
                  key={skin.id}
                  style={styles.skinToneItem}
                  onPress={() => handleAvatarSkinSelect(skin.id)}
                >
                  {loadingImages[imageKey] && (
                    <ActivityIndicator 
                      size="small" 
                      color={Colors.background}
                      style={styles.loadingIndicator}
                    />
                  )}
                  <Image 
                    source={skin.image}
                    style={styles.skinToneItemImage}
                    resizeMode="contain"
                    onLoadStart={() => handleImageLoadStart(imageKey)}
                    onLoadEnd={() => handleImageLoadEnd(imageKey)}
                    onLoad={() => handleImageLoadEnd(imageKey)}
                  />
                </TouchableOpacity>
              );
            })}
          </Animated.View>
        </Animated.View>
      </View>
    );
  };
  
  // Render clothing on avatar
  const renderAvatarClothing = () => {
    // Helper function to get adjustments for clothing
    const getClothingAdjustments = (categoryId, itemIndex) => {
      return clothingAdjustments[categoryId]?.[itemIndex] || { sizeMultiplier: 1.0, leftOffset: 0, topOffset: 0 };
    };

    return (
      <>
        {/* Hat */}
        {selectedClothing.hat !== null && getClothingItemImage('hat', selectedClothing.hat) && (
          <Image 
            source={getClothingItemImage('hat', selectedClothing.hat)}
            style={[styles.clothingOverlay, styles.hatPosition]}
            resizeMode="contain"
          />
        )}
        
        {/* Shirt */}
        {selectedClothing.shirt !== null && getClothingItemImage('shirt', selectedClothing.shirt) && (
          <Image 
            source={getClothingItemImage('shirt', selectedClothing.shirt)}
            style={[
              styles.clothingOverlay, 
              styles.shirtPosition,
              {
                width: 200 * getClothingAdjustments('shirt', selectedClothing.shirt).sizeMultiplier,
                height: 200 * getClothingAdjustments('shirt', selectedClothing.shirt).sizeMultiplier,
                left: `${16 + getClothingAdjustments('shirt', selectedClothing.shirt).leftOffset}%`,
                top: `${32 + getClothingAdjustments('shirt', selectedClothing.shirt).topOffset}%`
              }
            ]}
            resizeMode="contain"
          />
        )}
        
        {/* Pants */}
        {selectedClothing.pants !== null && getClothingItemImage('pants', selectedClothing.pants) && (
          <Image 
            source={getClothingItemImage('pants', selectedClothing.pants)}
            style={[
              styles.clothingOverlay, 
              styles.pantsPosition,
              {
                width: 200 * getClothingAdjustments('pants', selectedClothing.pants).sizeMultiplier,
                height: 200 * getClothingAdjustments('pants', selectedClothing.pants).sizeMultiplier,
                left: `${14 + getClothingAdjustments('pants', selectedClothing.pants).leftOffset}%`,
                top: `${50 + getClothingAdjustments('pants', selectedClothing.pants).topOffset}%`
              }
            ]}
            resizeMode="contain"
          />
        )}
        
        {/* Glasses */}
        {selectedClothing.glasses !== null && getClothingItemImage('glasses', selectedClothing.glasses) && (
          <Image 
            source={getClothingItemImage('glasses', selectedClothing.glasses)}
            style={[styles.clothingOverlay, styles.glassesPosition]}
            resizeMode="contain"
          />
        )}
        
        {/* Wand */}
        {selectedClothing.wand !== null && getClothingItemImage('wand', selectedClothing.wand) && (
          <Image 
            source={getClothingItemImage('wand', selectedClothing.wand)}
            style={[styles.clothingOverlay, styles.wandPosition]}
            resizeMode="contain"
          />
        )}
      </>
    );
  };
  
  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton}>
          <MaterialCommunityIcons name="chevron-left" size={32} color="#333" />
        </TouchableOpacity>
        <Text style={styles.headerText}>Build your{'\n'}Character...</Text>
      </View>
      
      <View style={styles.mainContent}>
        {/* Left column - Category icons */}
        <View style={styles.leftColumn}>
          {categories.map((category, index) => (
            <TouchableOpacity 
              key={category.id}
              style={styles.categoryButton}
              onPress={() => handleCategoryPress(category.id, index)}
            >
              <Image 
                source={getCategoryImage(category)}
                style={styles.categoryIcon}
                resizeMode="contain"
              />
            </TouchableOpacity>
          ))}
        </View>
        
        {/* Right side - Avatar with clothing */}
        <View style={styles.avatarContainer}>
          {/* Skin tone selector button */}
          <View style={styles.skinToneButtonContainer}>
            <TouchableOpacity 
              style={styles.skinToneButton}
              onPress={handleSkinTonePress}
            >
              <Image 
                source={getCurrentAvatarImage()}
                style={styles.skinToneButtonImage}
                resizeMode="contain"
              />
            </TouchableOpacity>
          </View>
          
          {/* Base avatar */}
          <Image 
            source={getCurrentAvatarImage()}
            style={styles.avatar}
            resizeMode="contain"
          />
          
          {/* Clothing overlays */}
          {renderAvatarClothing()}
        </View>
        
        {/* Overlay to detect outside taps */}
        {(openCategory || skinToneCatalogueOpen) && (
          <Pressable 
            style={styles.overlayAbsolute}
            onPress={() => {
              if (openCategory) closeCatalogue();
              if (skinToneCatalogueOpen) closeSkinToneCatalogue();
            }}
          />
        )}
        
        {/* Catalogues rendered last so they receive touches first */}
        {renderCatalogue()}
        {renderSkinToneCatalogue()}
      </View>
      
      {/* Confirm button */}
      <TouchableOpacity 
        style={styles.confirmButton}
        onPress={handleConfirm}
      >
        <Text style={styles.confirmButtonText}>---&gt;</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    paddingTop: '14%',
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  backButton: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: Colors.main,
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerText: {
    fontSize: 30,
    fontWeight: 'bold',
    marginLeft: '18%',
    color: 'black',
    fontFamily: 'main', 
    alignSelf: 'center',
  },
  mainContent: {
    flex: 1,
    flexDirection: 'row',
    paddingHorizontal: 10,
  },
  overlayAbsolute: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: 5,
  },
  leftColumn: {
    width: 80,
    justifyContent: 'space-evenly',
    paddingVertical: 40,
    position: 'relative',
    zIndex: 10,
    bottom:'5%'
  },
  categoryButton: {
    width: 65,
    height: 65,
    backgroundColor: Colors.main,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 5,
  },
  categoryIcon: {
    width: 50,
    height: 50,
  },
  catalogueContainer: {
    position: 'absolute',
    left: 10,
    top: 0,
    bottom: 0,
    width: 80,
    zIndex: 15,
    pointerEvents: 'box-none',
  },
  catalogue: {
    position: 'absolute',
    left: 0,
    width: 80,
    backgroundColor: '#F2F2CF',
    borderRadius: 8,
    paddingVertical: 10,
    justifyContent: 'flex-start',
    alignItems: 'center',
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  catalogueItem: {
    width: 65,
    height: 65,
    backgroundColor: 'rgba(0, 0, 0, 0.15)',
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 10,
  },
  catalogueItemImage: {
    width: 50,
    height: 50,
  },
  loadingIndicator: {
    position: 'absolute',
  },
  avatarContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
    zIndex: 1,
  },
  skinToneButtonContainer: {
    position: 'absolute',
    top: 0,
    alignItems: 'center',
    zIndex: 20,
  },
  skinToneButton: {
    width: 65,
    height: 65,
    backgroundColor: Colors.main,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  skinToneButtonImage: {
    width: 50,
    height: 50,
  },
  skinToneCatalogueContainer: {
    position: 'absolute',
    top: 0,
    left: '23%',
    right: 0,
    alignItems: 'center',
    zIndex: 25,
    pointerEvents: 'box-none',
  },
  skinToneCatalogue: {
    backgroundColor: '#F2F2CF',
    borderRadius: 8,
    paddingVertical: 10,
    paddingHorizontal: 5,
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  skinToneRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  skinToneItem: {
    width: 65,
    height: 65,
    backgroundColor: 'rgba(0, 0, 0, 0.15)',
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 5,
  },
  skinToneItemImage: {
    width: 50,
    height: 50,
  },
  avatar: {
    width: 400,
    height: 400, 
    bottom:'2%', 
    zIndex:1
  },
  clothingOverlay: {
    position: 'absolute',
  },
  hatPosition: {
    top: '8%',
    left: '29%',
    width: 100,
    height: 100,
    zIndex:4
  },
  shirtPosition: {
    top: '32%',
    left: '16%',
    width: 200,
    height: 200,
    zIndex:4
  },
  pantsPosition: {
    top: '50%',
    left: '14%',
    width: 200,
    height: 200, 
    zIndex:2
  },
  glassesPosition: {
    top: '15.5%',
    left: '36%',
    width: 85,
    height: 85,
    zIndex:3
  },
  wandPosition: {
    top: '51%',
    right: '2%',
    width: 100,
    height: 100,
    zIndex:0
  },
  confirmButton: {
    position: 'absolute',
    bottom: 40,
    right: 30,
    backgroundColor: Colors.main,
    paddingHorizontal: 25,
    paddingVertical: 6,
    borderRadius: 8,
    zIndex: 30,
  },
  confirmButtonText: {
    fontSize: 28,
    fontWeight: 'bold',
    fontFamily: 'main',
    color: 'black',
  },
});