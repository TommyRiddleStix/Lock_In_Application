import React from 'react';
import { View, Text, ScrollView, TouchableOpacity, StatusBar } from 'react-native';
import styles from '../styles/app-styles';

function trophy({index}, {number}, {isUnlocked}, {message}){
  if(isUnlocked){
    return(
    <>
      <View key={index} style = {styles.lockSelect}>
        <Text style={styles.achievementText}>Acheivement</Text>
        <Text style={styles.achievementText}>{number}}</Text>
        <Text style={{ fontSize: 120 }}>🏆</Text>
      </View>
    </>
    );
  }
  else{
    return(
    <>
      <View key={index} style = {styles.lockSelect}>
        <Text style={styles.achievementText}>Acheivement</Text>
        <Text style={styles.achievementText}>{number}</Text>
        <Text style={{ fontSize: 120 }}>🔒</Text>
      </View>
    </>
    );
  }
}


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
  let count = 0;
  return (
    // Main container
    <View style={styles.container}>
      
      {/* Set status bar style */}
      <StatusBar barStyle="light-content" backgroundColor="#4F46E5" />
      
      {/* 1. Header (Top Navigation) */}
      <View style={styles.header}>
        <View>
          <Text style={styles.headerTitle}>Achievements</Text>
        </View>
      </View>

      {/* 2. Main Scrollable Content Area */}
      <ScrollView contentContainerStyle={{ paddingBottom: 0 }} style={styles.scrollArea}>
        
      

      <View style={styles.listContainer2}>
          {[1, 2, 3, 4].map((i, index1) => (
            // List Item uses TouchableOpacity for interactive feedback
            <View key={index1} style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
              {[1, 2].map((j, index2) => (
              <View key={index2} style = {styles.lockSelect}>
                <Text style={styles.achievementText}>Acheivement</Text>
                <Text style={styles.achievementText}>{++count}</Text>
                <Text style={{ fontSize: 120 }}>🔒</Text>
              </View>
              ))}
            </View>
          ))}
        </View>
        
        {/* Placeholder for extra bottom space */}
        <View style={styles.bottomSpacer} /> 
        
      </ScrollView>
    </View>
  );
};

export default App;
