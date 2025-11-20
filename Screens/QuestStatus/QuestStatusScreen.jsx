import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import Colors from "../../Utils/Colors";

export default function QuestStatusScreen({ navigation }) {

  const TYPE_COLORS = {
    desert: Colors.desert,       // orange
    mountainous: Colors.mountainous,  // teal
    aquatic: Colors.aquatic,      // blue
    celestial: Colors.celestial,    // lavender
  };

  const quests = [
    {
      id: 1,
      questTitle: "Jenkins' Campaign",
      status: "In Progress",
      description: "click for more details",
      type: "desert",
    },
    {
      id: 2,
      questTitle: "Mountainous Quest",
      status: "In Progress",
      description: "click for more details",
      type: "mountainous",
    },
    {
      id: 3,
      questTitle: "Mountainous Quest",
      status: "Completed",
      description: "click for Quest History",
      type: "mountainous",
    },
    {
      id: 4,
      questTitle: "Celestial Quest",
      status: "Invite Sentinel",
      description: "click for more details",
      type: "celestial",
    },
    {
      id: 5,
      questTitle: "Aquatic Quest",
      status: "In Progress",
      description: "click for more details",
      type: "aquatic",
    },
    {
      id: 6,
      questTitle: "Desert Workshop",
      status: "Completed",
      description: "click for Quest History",
      type: "desert",
    },
  ];

  /* COLORED WHEEL RENDERER */
  const renderWheel = (status, type) => {
    const color = TYPE_COLORS[type] || "#000";

    switch (status) {
      case "Completed":
        return (
          <View style={[styles.wheelCompleted, { backgroundColor: color }]}>
            <View style={styles.wheelCenter} />
          </View>
        );

      case "In Progress":
        return (
          <View style={[styles.wheelBase, { backgroundColor: "#d7cca5" }]}>
            <View
              style={[
                styles.wheelProgressArc,
                { borderColor: color, borderBottomColor: "transparent", borderLeftColor: "transparent" },
              ]}
            />
            <View style={[styles.wheelCenter, { backgroundColor: "#d7cca5" }]} />
          </View>
        );

      case "Invite Sentinel":
        return (
          <View style={[styles.wheelInvite, { borderColor: color }]}>
            <View style={styles.wheelInviteCenter} />
          </View>
        );

      default:
        return (
          <View style={[styles.wheelDefault, { borderColor: color }]}>
            <View style={styles.wheelDefaultCenter} />
          </View>
        );
    }
  };

  return (
    <View style={styles.container}>

      {/* Back Button */}
      <TouchableOpacity
        style={styles.backButton}
        onPress={() => navigation.goBack()}
      >
        <View style={styles.backButtonCircle}>
          <Text style={styles.backButtonText}>←</Text>
        </View>
      </TouchableOpacity>

      {/* Title */}
      <Text style={styles.title}>Quest Status</Text>

      {/* Scroll List */}
      <ScrollView
        style={{ width: "100%" }}
        contentContainerStyle={{ paddingBottom: 140 }}
        showsVerticalScrollIndicator={false}
      >
        {quests.map((quest) => (
          <TouchableOpacity
            key={quest.id}
            style={styles.questCardWrapper}
            activeOpacity={0.85}
            onPress={() =>
              navigation.navigate("QuestDetail", {
                questTitle: quest.questTitle,
                progressStatus: quest.status,
              })
            }
          >
            <View style={styles.questCard}>

              {/* Color‑coded Wheel */}
              <View style={styles.iconPlaceholder}>
                {renderWheel(quest.status, quest.type)}
              </View>

              {/* Text */}
              <View style={{ flex: 1 }}>
                <Text style={styles.questTitle}>{quest.questTitle}</Text>
                <Text style={styles.questStatus}>{quest.status}</Text>
                <Text style={styles.questDescription}>{quest.description}</Text>
              </View>

              {/* Dropdown placeholder */}
              <View style={styles.dropdownPlaceholder} />
            </View>
          </TouchableOpacity>
        ))}
      </ScrollView>

    </View>
  );
}

/* STYLES */
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#2d5a4a",
    paddingTop: 40,
    alignItems: "center",
  },

  backButton: {
    position: "absolute",
    top: 65,
    left: 20,
    zIndex: 10,
  },
  backButtonCircle: {
    width: 45,
    height: 45,
    borderRadius: 25,
    backgroundColor: Colors.main,
    justifyContent: "center",
    alignItems: "center",
  },
  backButtonText: {
    fontSize: 28,
    fontFamily: "main",
    color: "#000",
  },

  title: {
    fontSize: 46,
    fontFamily: "main",
    color: Colors.main,
    marginTop: 60,
    marginBottom: 20,
  },

  questCardWrapper: {
    alignItems: "center",
    width: "100%",
  },

  questCard: {
    backgroundColor: Colors.main,
    width: "88%",
    paddingVertical: 20,
    paddingHorizontal: 18,
    marginVertical: 15,
    borderRadius: 25,
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 2,
    borderColor: "#000",
    transform: [{ rotate: "-3deg" }],
    shadowColor: "#000",
    shadowOpacity: 0.3,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 4 },
    elevation: 5,
  },

  iconPlaceholder: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: "#d7cca5",
    borderWidth: 2,
    borderColor: "#000",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 15,
  },

  /* COLORED WHEELS */
  // Completed = full color ring
  wheelCompleted: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
  },
  wheelCenter: {
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: "#d7cca5",
  },

  // In Progress = arc
  wheelBase: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#d7cca5",
  },
  wheelProgressArc: {
    position: "absolute",
    width: 40,
    height: 40,
    borderRadius: 20,
    borderWidth: 6,
    borderBottomColor: "transparent",
    borderLeftColor: "transparent",
    transform: [{ rotate: "-20deg" }],
  },

  // Invite = hollow ring
  wheelInvite: {
    width: 40,
    height: 40,
    borderRadius: 20,
    borderWidth: 3,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#d7cca5",
  },
  wheelInviteCenter: {
    width: 18,
    height: 18,
    borderRadius: 9,
    backgroundColor: "#d7cca5",
  },

  // Default = dot
  wheelDefault: {
    width: 40,
    height: 40,
    borderRadius: 20,
    borderWidth: 3,
    justifyContent: "center",
    alignItems: "center",
  },
  wheelDefaultCenter: {
    width: 14,
    height: 14,
    borderRadius: 7,
    backgroundColor: "#000",
  },

  questTitle: {
    fontSize: 24,
    fontFamily: "main",
    color: "#000",
    marginBottom: 4,
  },
  questStatus: {
    fontSize: 30,
    fontFamily: "main",
    color: "#000",
    marginBottom: 4,
  },
  questDescription: {
    fontSize: 16,
    fontFamily: "main",
    color: "#000",
  },

  dropdownPlaceholder: {
    width: 26,
    height: 26,
    borderRadius: 6,
    borderWidth: 2,
    borderColor: "#000",
    backgroundColor: "#d7cca5",
    marginLeft: 10,
  },
});