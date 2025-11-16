import React from 'react';
import { View, Text, ScrollView, TouchableOpacity, StatusBar } from 'react-native';
import { useRouter } from 'expo-router'; // 1. IMPORT ROUTER HOOK
import styles from '../styles/app-styles';

// Reusable Tab Bar Item
const TabItem = ({ icon, label, isActive }) => (
  <TouchableOpacity 
    style={styles.tabItem}
    // FRIEND'S LOGIC GOES HERE: onPress={() => handleNavigation(label)}
  >
    <Text style={styles.tabIcon}>{icon}</Text>
    <Text style={[styles.tabLabel, isActive ? styles.tabLabelActive : styles.tabLabelInactive]}>
      {label}
    </Text>
  </TouchableOpacity>
);

const App = () => {
  const router = useRouter(); // 2. INITIALIZE ROUTER

  // Mock function to generate the assignment name based on the item index
  const getAssignmentName = (id) => `Assignment Name ${id}`;

  // 3. NAVIGATION HANDLER FUNCTION
  const handleLockInPress = (assignmentId) => {
    const name = getAssignmentName(assignmentId);
    // FIX: Pass the assignment name using URL encoding to handle spaces
    router.push(`/(screens)/lock-in?id=${assignmentId}&assignmentName=${encodeURIComponent(name)}`);
  };

  return (
    // Main container
    <View style={styles.container}>
      
      {/* Set status bar style */}
      <StatusBar barStyle="light-content" backgroundColor="#4F46E5" />
      
      {/* 1. Header (Top Navigation) */}
      <View style={styles.header}>
        <View>
          <Text style={styles.headerTitle}>Assignment Dashboard</Text>
          <Text style={styles.headerSubtitle}>Welcome back!</Text>
        </View>
      </View>

      {/* 2. Main Scrollable Content Area */}
      <ScrollView contentContainerStyle={{ paddingBottom: 0 }} style={styles.scrollArea}>
        
        {/* List Section Title */}
        <Text style={styles.sectionTitle}>Upcoming Assignments</Text>
        
        <View style={styles.listContainer}>
          {[1, 2, 3, 4].map(i => (
            // List Item uses TouchableOpacity for interactive feedback
            <TouchableOpacity 
              key={i} 
              style={styles.listItem}
              activeOpacity={0.8}
            >
              <View style={styles.itemIcon}>
                <Text style={{ fontSize: 20 }}>💼</Text>
              </View>
              <View style={styles.itemTextContainer}>
                {/* Text uses numberOfLines for truncation on mobile */}
                <Text style={styles.itemTitle} numberOfLines={1}>{getAssignmentName(i)}</Text>
                <Text style={styles.itemSubtitle} numberOfLines={1}>Due [due date]</Text>
              </View>
              
              {/* BUTTON WRAPPER: This ensures the text itself is clickable */}
              <TouchableOpacity 
                style={{ marginLeft: 16 }}
                onPress={() => handleLockInPress(i)} // 4. CALL THE HANDLER ON CLICK
                activeOpacity={0.6}
              >
                <Text style={styles.lockInButton}>Lock In</Text>
              </TouchableOpacity>
              
            </TouchableOpacity>
          ))}
        </View>
        
        {/* Placeholder for extra bottom space */}
        <View style={styles.bottomSpacer} /> 
        
      </ScrollView>
    </View>
  );
};

export default App;