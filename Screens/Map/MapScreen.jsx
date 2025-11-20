import { View, Image, StyleSheet, Text, TouchableOpacity, Pressable, ActivityIndicator, Animated } from "react-native";
import Colors from "../../Utils/Colors";
import { useState, useEffect, useRef } from "react";
import { Asset } from "expo-asset";

export default function MapScreen({ navigation, route }) {
  const [selectedMarker, setSelectedMarker] = useState(null);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [confirmedQuest, setConfirmedQuest] = useState(null);
  const [isReady, setIsReady] = useState(false);
  const [showWeaverPopup, setShowWeaverPopup] = useState(false);
  const [showTradeConfirm, setShowTradeConfirm] = useState(false);
  const [showTradeSuccess, setShowTradeSuccess] = useState(false);
  
  const fadeAnim = useRef(new Animated.Value(0)).current;

  // Quest data - updated with new names
  const questData = {
    D1: { name: "Sewing Workshop", location: "Wellesley, MA", type: "desert" },
    D2: { name: "Pottery Workshop", location: "Newton, MA", type: "desert" },
    D3: { name: "Woodworking", location: "Newton, MA", type: "desert" },
    M1: { name: "Mountainous Quest 1", location: "Boston, MA", type: "mountainous" },
    M2: { name: "Mountainous Quest 2", location: "Boston, MA", type: "mountainous" },
    M3: { name: "Mountainous Quest 3", location: "Boston, MA", type: "mountainous" },
    A1: { name: "Aquatic Quest 1", location: "Boston, MA", type: "aquatic" },
    A2: { name: "Aquatic Quest 2", location: "Boston, MA", type: "aquatic" },
    A3: { name: "Aquatic Quest 3", location: "Boston, MA", type: "aquatic" },
    C1: { name: "Celestial Quest 1", location: "Boston, MA", type: "celestial" },
    C2: { name: "Celestial Quest 2", location: "Boston, MA", type: "celestial" },
    C3: { name: "Celestial Quest 3", location: "Boston, MA", type: "celestial" },
  };

  // Island type to image and color mapping
  const islandConfig = {
    desert: {
      image: require("../../assets/Images/Desert.png"),
      backgroundColor: Colors.desert,
    },
    mountainous: {
      image: require("../../assets/Images/Mountainous.png"),
      backgroundColor: Colors.mountainous,
    },
    aquatic: {
      image: require("../../assets/Images/Aquatic.png"),
      backgroundColor: Colors.aquatic,
    },
    celestial: {
      image: require("../../assets/Images/Celestial.png"),
      backgroundColor: Colors.celestial,
    },
  };

  // -------------------------------
  // 🔥 1. Preload ALL images before showing UI
  // -------------------------------
  useEffect(() => {
    async function loadAssets() {
      try {
        const images = [
          require("../../assets/Images/Desert.png"),
          require("../../assets/Images/Mountainous.png"),
          require("../../assets/Images/Aquatic.png"),
          require("../../assets/Images/Celestial.png"),
          require("../../assets/Images/D_Marker.png"),
          require("../../assets/Images/M_Marker.png"),
          require("../../assets/Images/A_Marker.png"),
          require("../../assets/Images/C_Marker.png"),
          require("../../assets/Images/D_Campaign.png"),
          require("../../assets/Images/M_Campaign.png"),
          require("../../assets/Images/A_Campaign.png"),
          require("../../assets/Images/C_Campaign.png"),
          require("../../assets/Images/Quest_Status.png"),
          require("../../assets/Images/Weaver.png"),
          require("../../assets/Images/Weaver_Hat.png"),
          require("../../assets/Images/Yellow-Potion.png"),
          require("../../assets/Images/Check.png"),
        ];
        
        const cacheImages = images.map((img) =>
          Asset.fromModule(img).downloadAsync()
        );
        
        await Promise.all(cacheImages);
        setIsReady(true);
      } catch (error) {
        console.error("Error loading assets:", error);
        setIsReady(true); // Still show UI even if loading fails
      }
    }
    loadAssets();
  }, []);

  // Check if returning from QuestConfig with confirmation
  useEffect(() => {
    if (route.params?.showConfirmation) {
      setConfirmedQuest({
        name: route.params.questName,
        location: route.params.location,
        type: route.params.questType,
      });
      setShowConfirmation(true);

      const timer = setTimeout(() => {
        setShowConfirmation(false);
        setConfirmedQuest(null);
      }, 1500);

      navigation.setParams({ showConfirmation: false });

      return () => clearTimeout(timer);
    }
  }, [route.params]);

  const handleQuestStatusPress = () => {
    navigation.navigate("QuestStatus");
  };

  const handleMarkerPress = (markerId, xPosition) => {
    setSelectedMarker({ id: markerId, xPosition });
  };

  const handleCampaignPress = (campaignId) => {
    console.log(`Campaign ${campaignId} pressed`);
    if (campaignId === "D_Campaign") {
      setShowWeaverPopup(true);
    }
  };

  const handleQuestNavigate = (markerId) => {
    const quest = questData[markerId];
    navigation.navigate("QuestConfig", {
      questName: quest.name,
      location: quest.location,
      questType: quest.type,
    });
  };

  const handleWeaverCampaign = () => {
    setShowWeaverPopup(false);
    const quest = questData["D1"]; // Sewing Workshop
    navigation.navigate("QuestConfig", {
      questName: quest.name,
      location: quest.location,
      questType: quest.type,
    });
  };

  const handleTradePotion = () => {
    setShowTradeConfirm(true);
  };

  const handleCancelTrade = () => {
    setShowTradeConfirm(false);
  };

  const handleConfirmTrade = () => {
    setShowTradeConfirm(false);
    setShowWeaverPopup(false);
    setShowTradeSuccess(true);

    // Fade in and out animation
    Animated.sequence([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 400,
        useNativeDriver: true,
      }),
      Animated.delay(400),
      Animated.timing(fadeAnim, {
        toValue: 0,
        duration: 400,
        useNativeDriver: true,
      }),
    ]).start(() => {
      setShowTradeSuccess(false);
      fadeAnim.setValue(0);
    });
  };

  const dismissPopup = () => {
    setSelectedMarker(null);
  };

  const dismissConfirmation = () => {
    setShowConfirmation(false);
    setConfirmedQuest(null);
  };

  const dismissWeaverPopup = () => {
    setShowWeaverPopup(false);
    setShowTradeConfirm(false);
  };

  const renderQuestPopup = (markerId, markerXPercent, markerYPercent) => {
    if (selectedMarker?.id !== markerId) return null;

    const quest = questData[markerId];
    const isRightSide = markerXPercent > 50;

    return (
      <TouchableOpacity
        style={[
          styles.questPopup,
          isRightSide ? styles.popupLeft : styles.popupRight,
          {
            top: markerYPercent + "%",
            [isRightSide ? "right" : "left"]:
              isRightSide
                ? 100 - markerXPercent + "%"
                : markerXPercent + 8 + "%",
          },
        ]}
        onPress={() => handleQuestNavigate(markerId)}
        activeOpacity={0.8}
      >
        <Text style={styles.questName}>{quest.name}</Text>
        <Text style={styles.questLocation}>{quest.location}</Text>
      </TouchableOpacity>
    );
  };

  // Show loading screen while assets load
  if (!isReady) {
    return (
      <View style={[styles.backgroundContainer, styles.loadingContainer]}>
        <ActivityIndicator size="large" color={Colors.main} />
        <Text style={styles.loadingText}>Loading World Map...</Text>
      </View>
    );
  }

  return (
    <Pressable style={{ flex: 1 }} onPress={dismissPopup}>
      <View style={styles.backgroundContainer}>
        {/* Title */}
        <View style={styles.titleContainer}>
          <Text style={styles.title}>World Map</Text>
        </View>

        {/* Mountainous Island - Top Left */}
        <View style={styles.mountainousIsland}>
          <Image
            style={styles.islandImage}
            source={require("../../assets/Images/Mountainous.png")}
            resizeMode="contain"
          />
        </View>

        {/* Desert Island - Top Right */}
        <View style={styles.desertIsland}>
          <Image
            style={styles.islandImage}
            source={require("../../assets/Images/Desert.png")}
            resizeMode="contain"
          />
        </View>

        {/* Aquatic Island - Bottom Left */}
        <View style={styles.aquaticIsland}>
          <Image
            style={styles.islandImage}
            source={require("../../assets/Images/Aquatic.png")}
            resizeMode="contain"
          />
        </View>

        {/* Celestial Island - Bottom Right */}
        <View style={styles.celestialIsland}>
          <Image
            style={styles.islandImage}
            source={require("../../assets/Images/Celestial.png")}
            resizeMode="contain"
          />
        </View>

        {/* MOUNTAINOUS MARKERS */}
        <TouchableOpacity
          style={[styles.marker, { top: "36%", left: "15%" }]}
          onPress={() => handleMarkerPress("M1", 15)}
        >
          <Image
            source={require("../../assets/Images/M_Marker.png")}
            style={styles.markerImage}
            resizeMode="contain"
          />
        </TouchableOpacity>
        {renderQuestPopup("M1", 15, 36)}

        <TouchableOpacity
          style={[styles.marker, { top: "42%", left: "40%" }]}
          onPress={() => handleMarkerPress("M2", 40)}
        >
          <Image
            source={require("../../assets/Images/M_Marker.png")}
            style={styles.markerImage}
            resizeMode="contain"
          />
        </TouchableOpacity>
        {renderQuestPopup("M2", 40, 42)}

        <TouchableOpacity
          style={[styles.marker, { top: "28%", left: "20%" }]}
          onPress={() => handleCampaignPress("M_Campaign")}
        >
          <Image
            source={require("../../assets/Images/M_Campaign.png")}
            style={styles.campaignImage}
            resizeMode="contain"
          />
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.marker, { top: "47%", left: "22%" }]}
          onPress={() => handleMarkerPress("M3", 22)}
        >
          <Image
            source={require("../../assets/Images/M_Marker.png")}
            style={styles.markerImage}
            resizeMode="contain"
          />
        </TouchableOpacity>
        {renderQuestPopup("M3", 22, 47)}

        {/* DESERT MARKERS */}
        <TouchableOpacity
          style={[styles.marker, { top: "20%", left: "45%" }]}
          onPress={() => handleMarkerPress("D1", 45)}
        >
          <Image
            source={require("../../assets/Images/D_Marker.png")}
            style={styles.markerImage}
            resizeMode="contain"
          />
        </TouchableOpacity>
        {renderQuestPopup("D1", 45, 20)}

        <TouchableOpacity
          style={[styles.marker, { top: "32%", left: "70%" }]}
          onPress={() => handleMarkerPress("D2", 70)}
        >
          <Image
            source={require("../../assets/Images/D_Marker.png")}
            style={styles.markerImage}
            resizeMode="contain"
          />
        </TouchableOpacity>
        {renderQuestPopup("D2", 70, 32)}

        <TouchableOpacity
          style={[styles.marker, { top: "25%", left: "64%" }]}
          onPress={() => handleCampaignPress("D_Campaign")}
        >
          <Image
            source={require("../../assets/Images/D_Campaign.png")}
            style={styles.campaignImage}
            resizeMode="contain"
          />
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.marker, { top: "38%", left: "82%" }]}
          onPress={() => handleMarkerPress("D3", 82)}
        >
          <Image
            source={require("../../assets/Images/D_Marker.png")}
            style={styles.markerImage}
            resizeMode="contain"
          />
        </TouchableOpacity>
        {renderQuestPopup("D3", 82, 38)}

        {/* AQUATIC MARKERS */}
        <TouchableOpacity
          style={[styles.marker, { top: "68%", left: "8%" }]}
          onPress={() => handleMarkerPress("A1", 8)}
        >
          <Image
            source={require("../../assets/Images/A_Marker.png")}
            style={styles.markerImage}
            resizeMode="contain"
          />
        </TouchableOpacity>
        {renderQuestPopup("A1", 8, 68)}

        <TouchableOpacity
          style={[styles.marker, { top: "72%", left: "39%" }]}
          onPress={() => handleMarkerPress("A2", 39)}
        >
          <Image
            source={require("../../assets/Images/A_Marker.png")}
            style={styles.markerImage}
            resizeMode="contain"
          />
        </TouchableOpacity>
        {renderQuestPopup("A2", 39, 72)}

        <TouchableOpacity
          style={[styles.marker, { top: "66%", left: "25%" }]}
          onPress={() => handleCampaignPress("A_Campaign")}
        >
          <Image
            source={require("../../assets/Images/A_Campaign.png")}
            style={styles.campaignImage}
            resizeMode="contain"
          />
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.marker, { top: "88%", left: "33%" }]}
          onPress={() => handleMarkerPress("A3", 33)}
        >
          <Image
            source={require("../../assets/Images/A_Marker.png")}
            style={styles.markerImage}
            resizeMode="contain"
          />
        </TouchableOpacity>
        {renderQuestPopup("A3", 33, 88)}

        {/* CELESTIAL MARKERS */}
        <TouchableOpacity
          style={[styles.marker, { top: "48%", left: "62%" }]}
          onPress={() => handleMarkerPress("C1", 62)}
        >
          <Image
            source={require("../../assets/Images/C_Marker.png")}
            style={styles.markerImage}
            resizeMode="contain"
          />
        </TouchableOpacity>
        {renderQuestPopup("C1", 62, 48)}

        <TouchableOpacity
          style={[styles.marker, { top: "54%", left: "78%" }]}
          onPress={() => handleMarkerPress("C2", 78)}
        >
          <Image
            source={require("../../assets/Images/C_Marker.png")}
            style={styles.markerImage}
            resizeMode="contain"
          />
        </TouchableOpacity>
        {renderQuestPopup("C2", 78, 54)}

        <TouchableOpacity
          style={[styles.marker, { top: "60%", left: "52%" }]}
          onPress={() => handleCampaignPress("C_Campaign")}
        >
          <Image
            source={require("../../assets/Images/C_Campaign.png")}
            style={styles.campaignImage}
            resizeMode="contain"
          />
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.marker, { top: "66%", left: "75%" }]}
          onPress={() => handleMarkerPress("C3", 75)}
        >
          <Image
            source={require("../../assets/Images/C_Marker.png")}
            style={styles.markerImage}
            resizeMode="contain"
          />
        </TouchableOpacity>
        {renderQuestPopup("C3", 75, 66)}

        {/* Quest Status Icon - Bottom Right Corner */}
        <TouchableOpacity
          style={styles.questStatusButton}
          onPress={handleQuestStatusPress}
          activeOpacity={0.7}
        >
          <View style={{ backgroundColor: Colors.main, flex: 1 }}>
            <Image
              style={styles.questStatusIcon}
              source={require("../../assets/Images/Quest_Status.png")}
              resizeMode="cover"
            />
          </View>
        </TouchableOpacity>
      </View>

      {/* Confirmation Modal */}
      {showConfirmation && confirmedQuest && (
        <Pressable style={styles.confirmationOverlay} onPress={dismissConfirmation}>
          <View
            style={[
              styles.confirmationCard,
              { backgroundColor: islandConfig[confirmedQuest.type].backgroundColor },
            ]}
          >
            <Text style={styles.confirmationTitle}>Quest Initiated !</Text>

            <View style={styles.confirmationContent}>
              <Image
                source={islandConfig[confirmedQuest.type].image}
                style={styles.confirmationIslandImage}
                resizeMode="contain"
              />

              <View style={styles.confirmationQuestBox}>
                <Text style={styles.confirmationQuestName}>
                  {confirmedQuest.name}
                </Text>
                <Text style={styles.confirmationQuestLocation}>
                  {confirmedQuest.location}
                </Text>
              </View>
            </View>
          </View>
        </Pressable>
      )}

      {/* Weaver Popup */}
      {showWeaverPopup && !showTradeConfirm && (
        <Pressable style={styles.weaverOverlay} onPress={dismissWeaverPopup}>
          <Pressable style={styles.weaverCard} onPress={(e) => e.stopPropagation()}>
            <Text style={styles.weaverSubtitle}>Sewing Expert of the Desert Region</Text>
            <Text style={styles.weaverTitle}>WEAVER</Text>

            <View style={styles.weaverContent}>
              <View style={styles.weaverImageBox}>
                <Image
                  source={require("../../assets/Images/Weaver.png")}
                  style={styles.weaverImage}
                  resizeMode="contain"
                />
              </View>
              <View style={styles.weaverHatBox}>
                <Image
                  source={require("../../assets/Images/Weaver_Hat.png")}
                  style={styles.weaverHatImage}
                  resizeMode="contain"
                />
              </View>
            </View>

            <Text style={styles.weaverQuote}>
              "You want a garment of mine, but you{'\n'}can barely take care of your own."
            </Text>

            <Text style={styles.bargainText}>Bargain?</Text>

            <TouchableOpacity
              style={styles.tradePotionButton}
              onPress={handleTradePotion}
              activeOpacity={0.8}
            >
              <Text style={styles.tradePotionText}>Trade Potion</Text>
              <Image
                source={require("../../assets/Images/Yellow-Potion.png")}
                style={styles.potionIcon}
                resizeMode="contain"
              />
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.campaignButton}
              onPress={handleWeaverCampaign}
              activeOpacity={0.8}
            >
              <Text style={styles.campaignButtonText}>Campaign for Trust</Text>
            </TouchableOpacity>
          </Pressable>
        </Pressable>
      )}

      {/* Trade Confirmation Popup */}
      {showTradeConfirm && (
        <Pressable style={styles.tradeConfirmOverlay}>
          <Pressable style={styles.tradeConfirmCard} onPress={(e) => e.stopPropagation()}>
            <Text style={styles.tradeConfirmTitle}>Trade with Weaver?</Text>

            <View style={styles.tradeHatImageContainer}>
              <Image
                source={require("../../assets/Images/Weaver_Hat.png")}
                style={styles.tradeHatImage}
                resizeMode="contain"
              />
            </View>

            <View style={styles.tradeDetails}>
              <Text style={styles.tradeLabel}>You Gain:</Text>
              <Text style={styles.tradeItemGain}>1x Weaver's Strawhat</Text>

              <Text style={[styles.tradeLabel, { marginTop: 20 }]}>You Lose:</Text>
              <Text style={styles.tradeItemLose}>1x Glowmelt Potion</Text>
            </View>

            <View style={styles.tradeButtons}>
              <TouchableOpacity
                style={styles.cancelButton}
                onPress={handleCancelTrade}
                activeOpacity={0.8}
              >
                <Text style={styles.cancelButtonText}>Cancel</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.tradeButton}
                onPress={handleConfirmTrade}
                activeOpacity={0.8}
              >
                <Text style={styles.tradeButtonText}>Trade</Text>
              </TouchableOpacity>
            </View>
          </Pressable>
        </Pressable>
      )}

      {/* Trade Success Animation */}
      {showTradeSuccess && (
        <View style={styles.tradeSuccessOverlay}>
          <Animated.View style={[styles.tradeSuccessContainer, { opacity: fadeAnim }]}>
            <Image
              source={require("../../assets/Images/Weaver_Hat.png")}
              style={styles.successHatImage}
              resizeMode="contain"
            />
            <Image
              source={require("../../assets/Images/Check.png")}
              style={styles.successCheckImage}
              resizeMode="contain"
            />
          </Animated.View>
        </View>
      )}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  backgroundContainer: {
    position: "absolute",
    zIndex: 1,
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "#0d1f1eff",
  },
  loadingContainer: {
    justifyContent: "center",
    alignItems: "center",
  },
  loadingText: {
    marginTop: 16,
    color: Colors.main,
    fontSize: 18,
    fontFamily: "main",
  },
  title: {
    color: Colors.main,
    zIndex: 3,
    alignSelf: "center",
    fontSize: 48,
    fontFamily: "main",
  },
  titleContainer: {
    position: "absolute",
    top: "6%",
    zIndex: 3,
    alignSelf: "center",
    width: 3000,
  },
  islandImage: {
    width: "100%",
    height: "100%",
  },
  mountainousIsland: {
    position: "absolute",
    top: "16%",
    left: "5%",
    width: "50%",
    height: "50%",
    zIndex: 2,
    shadowColor: Colors.mountainous,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.4,
    shadowRadius: 5,
    elevation: 10,
  },
  desertIsland: {
    position: "absolute",
    top: "7%",
    right: "9%",
    width: "45%",
    height: "45%",
    zIndex: 2,
    transform: [{ rotate: "310deg" }],
    shadowColor: Colors.desert,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.4,
    shadowRadius: 6,
    elevation: 10,
  },
  aquaticIsland: {
    position: "absolute",
    top: "55%",
    left: "7%",
    width: "50%",
    height: "50%",
    zIndex: 2,
    transform: [{ rotate: "355deg" }],
    shadowColor: Colors.aquatic,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.4,
    shadowRadius: 6,
    elevation: 10,
  },
  celestialIsland: {
    position: "absolute",
    top: "38%",
    left: "48%",
    width: "50%",
    height: "50%",
    zIndex: 2,
    transform: [{ rotate: "15deg" }],
    shadowColor: Colors.celestial,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 6,
    elevation: 10,
  },
  marker: {
    position: "absolute",
    width: 30,
    height: 30,
    zIndex: 5,
  },
  markerImage: {
    width: "100%",
    height: "100%",
  },
  campaignImage: {
    width: "100%",
    height: "100%",
  },
  questPopup: {
    position: "absolute",
    backgroundColor: Colors.main,
    borderRadius: 12,
    padding: 12,
    zIndex: 100,
    minWidth: 150,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5,
  },
  popupLeft: {},
  popupRight: {},
  questName: {
    fontFamily: "main",
    fontSize: 16,
    color: "#000",
    marginBottom: 4,
  },
  questLocation: {
    fontFamily: "main",
    fontSize: 14,
    color: "#333",
  },
  questStatusButton: {
    position: "absolute",
    bottom: "8%",
    right: "8%",
    width: 60,
    height: 60,
    borderRadius: 30,
    overflow: "hidden",
    zIndex: 10,
    elevation: 5,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
  },
  questStatusIcon: {
    width: "100%",
    height: "100%",
  },
  confirmationOverlay: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 5,
  },
  confirmationCard: {
    width: "85%",
    borderRadius: 20,
    padding: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.4,
    shadowRadius: 8,
    elevation: 10,
  },
  confirmationTitle: {
    fontSize: 32,
    fontFamily: "main",
    color: "#000",
    textAlign: "center",
  },
  confirmationContent: {
    flexDirection: "row",
    alignItems: "center",
  },
  confirmationIslandImage: {
    width: 150,
    height: 150,
  },
  confirmationQuestBox: {
    backgroundColor: Colors.main,
    borderRadius: 15,
    padding: 10,
    flex: 1,
    marginLeft: 5,
    borderWidth: 2,
    borderColor: "#000",
  },
  confirmationQuestName: {
    fontSize: 20,
    fontFamily: "main",
    color: "#000",
    marginBottom: 2,
    textAlign: "center",
  },
  confirmationQuestLocation: {
    fontSize: 16,
    fontFamily: "main",
    color: "#333",
    textAlign: "center",
  },
  // Weaver Popup Styles
  weaverOverlay: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 200,
  },
  weaverCard: {
    width: "85%",
    backgroundColor: '#CBAD80',
    borderRadius: 20,
    padding: 20,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.4,
    shadowRadius: 8,
    elevation: 10,
  },
  weaverSubtitle: {
    fontFamily: "main",
    fontSize: 14,
    color: "#000",
    textAlign: "center",
  },
  weaverTitle: {
    fontFamily: "main",
    fontSize: 36,
    color: "#000",
    textAlign: "center",
    marginBottom: 15,
  },
  weaverContent: {
    flexDirection: "row",
    width: "100%",
    marginBottom: 15,
  },
  weaverImageBox: {
    flex: 1,
    backgroundColor: "rgba(255,255,255,.2)",
    borderRadius: 10,
    aspectRatio: 1,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 10,
  },
  weaverImage: {
    width: "90%",
    height: "90%",
  },
  weaverHatBox: {
    width: 80,
    height: 80,
    backgroundColor: "rgba(255,255,255,.2)",
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  weaverHatImage: {
    width: "80%",
    height: "80%",
  },
  weaverQuote: {
    fontFamily: "main",
    fontSize: 16,
    color: "#000",
    textAlign: "center",
    marginBottom: 10,
  },
  bargainText: {
    fontFamily: "main",
    fontSize: 24,
    color: "#000",
    textAlign: "center",
    marginBottom: 15,
  },
  tradePotionButton: {
    backgroundColor: "#5a8a5a",
    borderRadius: 10,
    paddingVertical: 6,
    paddingHorizontal: 20,
    width: "100%",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 10,
  },
  tradePotionText: {
    fontFamily: "main",
    fontSize: 18,
    color: "#fff",
    marginRight: 10,
  },
  potionIcon: {
    width: 40,
    height: 40,
  },
  campaignButton: {
    backgroundColor: Colors.main,
    borderRadius: 10,
    paddingVertical: 12,
    paddingHorizontal: 20,
    width: "100%",
    borderWidth: 2,
    borderColor: "#000",
  },
  campaignButtonText: {
    fontFamily: "main",
    fontSize: 18,
    color: "#000",
    textAlign: "center",
  },
  // Trade Confirmation Styles
  tradeConfirmOverlay: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(0, 0, 0, 0.7)",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 300,
  },
  tradeConfirmCard: {
    width: "85%",
    backgroundColor: '#e8dcc4',
    borderRadius: 20,
    padding: 20,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.4,
    shadowRadius: 8,
    elevation: 10,
  },
  tradeConfirmTitle: {
    fontFamily: "main",
    fontSize: 28,
    color: "#000",
    textAlign: "center",
    marginBottom: 5,
  },
  tradeHatImageContainer: {
    width: 150,
    height: 150,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 5,
  },
  tradeHatImage: {
    width: "100%",
    height: "100%",
  },
  tradeDetails: {
    width: "100%",
    marginBottom: 25,
  },
  tradeLabel: {
    fontFamily: "main",
    fontSize: 18,
    color: "#000",
    marginBottom: 5,
  },
  tradeItemGain: {
    fontFamily: "main",
    fontSize: 16,
    color: "#2d7a2d",
    marginLeft: 10,
  },
  tradeItemLose: {
    fontFamily: "main",
    fontSize: 16,
    color: "#c74444",
    marginLeft: 10,
  },
  tradeButtons: {
    flexDirection: "row",
    width: "100%",
    justifyContent: "space-between",
  },
  cancelButton: {
    flex: 1,
    backgroundColor: "#b0b0b0",
    borderRadius: 30,
    paddingVertical: 15,
    marginRight: 10,
    borderWidth: 2,
    borderColor: "#000",
  },
  cancelButtonText: {
    fontFamily: "main",
    fontSize: 18,
    color: "#000",
    textAlign: "center",
  },
  tradeButton: {
    flex: 1,
    backgroundColor: "#5a8fd4",
    borderRadius: 30,
    paddingVertical: 15,
    borderWidth: 2,
    borderColor: "#000",
  },
  tradeButtonText: {
    fontFamily: "main",
    fontSize: 18,
    color: "#fff",
    textAlign: "center",
  },
  // Trade Success Animation Styles
  tradeSuccessOverlay: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: "center",
    alignItems: "center",
    zIndex: 400,
  },
  tradeSuccessContainer: {
    justifyContent: "center",
    alignItems: "center",
  },
  successHatImage: {
    width: 200,
    height: 200,
  },
  successCheckImage: {
    position: "absolute",
    width: 100,
    height: 100,
  },
});