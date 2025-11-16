import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
// MaterialCommunityIcons is a standard icon set in Expo
import { MaterialCommunityIcons } from '@expo/vector-icons'; 
import styles from '../styles/app-styles';

export default function LockInScreen() {
  const router = useRouter();
  // Retrieve 'id' and the new 'assignmentName' parameter
  const { id, assignmentName } = useLocalSearchParams(); 

  // Timer state: 30 minutes * 60 seconds = 1800 seconds
  const initialTime = 30 * 60; 
  const [timeLeft, setTimeLeft] = useState(initialTime);

  // Timer logic
  useEffect(() => {
    //Check if time has run out
    if (timeLeft <= 0) {
      console.log('Focus Session Complete! Navigating home.');
      
      // Automatically navigate back to the previous screen (dashboard)
      router.back(); 
      return; // Stop the function here
    }

    // Set up the interval to decrement time every second
    const timer = setInterval(() => {
      setTimeLeft((prevTime) => prevTime - 1);
    }, 1000);

    // Clear interval on cleanup
    return () => clearInterval(timer);
  }, [timeLeft, router]); //Dependency array includes timeLeft and router

  // Format time (e.g., 30:00)
  const formatTime = (totalSeconds) => {
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;
    return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  };

  // Exit handler
  const handleExit = () => {
    // might add a confirmation prompt here before going back
    router.back(); 
  };

  return (
    <View style={styles.container_li}>
      
      {/* Status Confirmation */}
      <Text style={styles.statusText_li}>LOCKED IN</Text>
      
      {/* Giant Lock Icon */}
      <MaterialCommunityIcons 
        name="lock-clock" 
        size={100} 
        color="#8B5CF6" // Purple color for prominence
        style={{ marginBottom: 40 }}
      />

      {/* Countdown Timer */}
      <Text style={styles.timerText_li}>
        {formatTime(timeLeft)}
      </Text>
      
      {/* Display Assignment Name */}
      <Text style={styles.assignmentNameText_li}>
        {assignmentName || 'Unknown Assignment'} 
      </Text>
      
      {/* 3. Exit Button */}
      <TouchableOpacity style={styles.exitButton_li} onPress={handleExit}>
        <Text style={styles.exitButtonText_li}>Exit Session</Text>
      </TouchableOpacity>      
    </View>
  );
}