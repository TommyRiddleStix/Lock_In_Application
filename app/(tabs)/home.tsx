import React from 'react';
import { View, Text, ScrollView, TouchableOpacity, StatusBar } from 'react-native';
import styles from '../styles/app-styles';

// Reusable Tab Bar Item
const TabItem = ({ icon, label, isActive }) => (
  <TouchableOpacity 
    style={styles.tabItem}
    // Friend's future functionality goes here: onPress={() => handleNavigation(label)}
  >
    <Text style={styles.tabIcon}>{icon}</Text>
    <Text style={[styles.tabLabel, isActive ? styles.tabLabelActive : styles.tabLabelInactive]}>
      {label}
    </Text>
  </TouchableOpacity>
);

const App = () => {
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
                <Text style={styles.itemTitle} numberOfLines={1}>Assignment name {i}</Text>
                <Text style={styles.itemSubtitle} numberOfLines={1}>Due [due date]</Text>
              </View>
              <Text style={styles.lockInButton}>Lock In</Text>
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