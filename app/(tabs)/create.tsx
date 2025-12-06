import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, ScrollView, StatusBar, Alert, Platform } from 'react-native';
import { useRouter } from 'expo-router';
import DateTimePicker from '@react-native-community/datetimepicker'; 
import styles from '../styles/app-styles.js';
import { useAssignments } from '../_context/AssignmentsContext.js'; 

export default function CreateScreen() {
  const [name, setName] = useState('');
  const [date, setDate] = useState(new Date()); 
  const [showPicker, setShowPicker] = useState(false); 
  
  // State for Length, Priority, and Icon
  const [taskLength, setTaskLength] = useState('short'); 
  const [priority, setPriority] = useState('medium');    
  const [icon, setIcon] = useState('');

  const { addAssignment } = useAssignments(); 
  const router = useRouter();

  const handleDateChange = (event, selectedDate) => {
    if (Platform.OS === 'android') setShowPicker(false);
    if (selectedDate) {
      setDate(selectedDate);
    }
  };

  const handleCreate = () => {
    if (!name.trim()) {
      Alert.alert('Error', 'Please enter an assignment name');
      return;
    }
    // Pass icon to context
    addAssignment(name, date, taskLength, priority, icon);
    
    // Reset form
    setName('');
    setDate(new Date());
    setTaskLength('short');
    setPriority('medium');
    setIcon(''); // Reset to default
    
    router.push('/(tabs)/'); 
  };

  const renderOption = (label, value, currentValue, setter) => (
    <TouchableOpacity 
      style={[styles.optionButton, currentValue === value && styles.optionButtonActive]} 
      onPress={() => setter(value)}
    >
      <Text style={[styles.optionText, currentValue === value && styles.optionTextActive]}>
        {label}
      </Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#4F46E5" />

      <View style={styles.header}>
        <View>
          <Text style={styles.headerTitle}>New Assignment</Text>
          <Text style={styles.headerSubtitle}>Add to your workload</Text>
        </View>
      </View>

      <ScrollView style={styles.scrollArea}>
        <View style={styles.formContainer}>
          <Text style={styles.label}>Assignment Name</Text>
          <TextInput
            style={styles.input}
            placeholder="e.g. Math Final Project"
            placeholderTextColor="#9CA3AF"
            value={name}
            onChangeText={setName}
          />

          {/* New Icon Input */}
          <Text style={styles.label}>Task Icon (Emoji)</Text>
          <TextInput
            style={styles.input}
            placeholder="e.g. 💼"
            placeholderTextColor="#9CA3AF"
            value={icon}
            onChangeText={setIcon}
            maxLength={2} // Limit mainly to single emoji/char
          />

          <Text style={styles.label}>Due Date</Text>
          {Platform.OS === 'ios' ? (
            <View style={[styles.inputButton, { alignItems: 'flex-start', paddingVertical: 10 }]}>
               <DateTimePicker
                  value={date}
                  mode="date"
                  display="default"
                  onChange={handleDateChange}
                  minimumDate={new Date()}
                  style={{ alignSelf: 'flex-start' }} 
                />
            </View>
          ) : (
            <>
              <TouchableOpacity style={styles.inputButton} onPress={() => setShowPicker(true)}>
                <Text style={styles.inputText}>
                  {date.toDateString()} 
                </Text>
              </TouchableOpacity>
              {showPicker && (
                <DateTimePicker
                  value={date}
                  mode="date"
                  display="default"
                  onChange={handleDateChange}
                  minimumDate={new Date()}
                />
              )}
            </>
          )}

          <Text style={styles.label}>Expected Task Length</Text>
          <View style={styles.selectionRow}>
            {renderOption('Short (30m)', 'short', taskLength, setTaskLength)}
            {renderOption('Medium (1h)', 'medium', taskLength, setTaskLength)}
            {renderOption('Long (2h+)', 'long', taskLength, setTaskLength)}
          </View>

          <Text style={styles.label}>Task Priority</Text>
          <View style={styles.selectionRow}>
            {renderOption('Low', 'low', priority, setPriority)}
            {renderOption('Medium', 'medium', priority, setPriority)}
            {renderOption('High', 'high', priority, setPriority)}
          </View>

          <TouchableOpacity style={styles.createButton} onPress={handleCreate}>
            <Text style={styles.createButtonText}>Create Assignment</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
}