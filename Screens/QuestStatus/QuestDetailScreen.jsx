import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import Colors from "../../Utils/Colors";

export default function QuestDetailScreen({ navigation, route }) {
  const {
    questTitle = "Quest Name",
    progressStatus = "In Progress",
  } = route.params || {};

  // LOG DATA (newest → oldest automatically sorted)
  const logEntries = [
    {
      date: "Friday, December 19",
      text: "Wanderers embarked on second quest",
    },
    {
      date: "Wednesday, December 17",
      text: "[user1] accepted invite",
    },
    {
      date: "Wednesday, December 17",
      text: "[user2] sent invite for second quest",
    },
    {
      date: "Saturday, December 13",
      text: "Wanderers embarked on first quest",
    },
    {
      date: "Saturday, December 6",
      text: "[user2] accepted invite",
    },
    {
      date: "Friday, December 5",
      text: "[user1] started this campaign with [user2] and sent an invite",
    },
  ];

  // Newest first (descending)
  const sortedLogs = [...logEntries].sort((a, b) =>
    new Date(b.date + " 2024") - new Date(a.date + " 2024")
  );

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

      {/* Scroll View */}
      <ScrollView
        style={styles.scroll}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 80 }}
      >
        {/* Main Content Card */}
        <View style={styles.mainCard}>
          {/* Big Icon Placeholder */}
          <View style={styles.bigIconPlaceholder} />

          {/* Quest Title */}
          <Text style={styles.questName}>{questTitle}</Text>
          <Text style={styles.questSubtitle}>{progressStatus}</Text>

          {/* Action Buttons */}
          <View style={styles.buttonRow}>
            <TouchableOpacity style={styles.actionButton}>
              <View style={styles.actionIcon} />
              <Text style={styles.actionLabel}>Send Invite</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.actionButton}>
              <View style={styles.actionIcon} />
              <Text style={styles.actionLabel}>Wanderers</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.actionButton}>
              <View style={styles.actionIcon} />
              <Text style={styles.actionLabel}>Playback</Text>
            </TouchableOpacity>
          </View>

          {/* Wanderer Log */}
          <Text style={styles.logTitle}>Wanderer Log</Text>

          <View style={styles.logBox}>
            {sortedLogs.map((entry, index) => (
              <View key={index} style={styles.logItem}>
                <Text style={styles.logDate}>{entry.date}</Text>
                <Text style={styles.logText}>{entry.text}</Text>
              </View>
            ))}
          </View>
        </View>
      </ScrollView>
    </View>
  );
}

// STYLES
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
    alignItems: "center", 
  },

  scroll: {
    width: "100%",
    marginTop: 20,
  },

  backButton: {
    position: "absolute",
    top: 70,
    left: 20,
    zIndex: 10,
  },
  backButtonCircle: {
    width: 50,
    height: 50,
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
    marginTop: 110,
  },

  mainCard: {
    width: "90%",
    backgroundColor: "#d4c796",
    borderRadius: 25,
    paddingVertical: 25,
    paddingHorizontal: 20,
    alignSelf: "center",
    marginTop: 30,
    borderWidth: 1,
    borderColor: "#000",
    shadowColor: "#000",
    shadowOpacity: 0.35,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 4 },
  },

  bigIconPlaceholder: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: "#c1904f",
    alignSelf: "center",
    marginBottom: 15,
  },

  questName: {
    fontSize: 34,
    fontFamily: "main",
    textAlign: "center",
    marginBottom: 5,
  },

  questSubtitle: {
    fontSize: 24,
    fontFamily: "main",
    textAlign: "center",
    marginBottom: 20,
  },

  /* Buttons */
  buttonRow: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginBottom: 25,
  },

  actionButton: {
    alignItems: "center",
  },

  actionIcon: {
    width: 60,
    height: 60,
    borderRadius: 10,
    backgroundColor: "#d7cca5",
    borderWidth: 3,
    borderColor: "#000",
  },

  actionLabel: {
    fontSize: 16,
    fontFamily: "main",
    marginTop: 8,
  },

  /* Log Section */
  logTitle: {
    fontSize: 26,
    fontFamily: "main",
    marginBottom: 10,
  },

  logBox: {
    backgroundColor: "#e8dcb4",
    padding: 20,
    borderRadius: 20,
    borderWidth: 2,
    borderColor: "#000",
  },

  logItem: {
    marginBottom: 22,
  },

  logDate: {
    fontSize: 18,
    fontFamily: "main",
    fontWeight: "bold",
    marginBottom: 3,
  },

  logText: {
    fontSize: 18,
    fontFamily: "main",
    lineHeight: 26,
  },
});