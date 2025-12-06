import React, { useMemo } from 'react';
import { View, Text, ScrollView, TouchableOpacity, StatusBar } from 'react-native';
import { useRouter } from 'expo-router';
// Using the .js extension for reliable resolution
import styles from '../styles/app-styles.js'; 
import { useAssignments } from '../_context/AssignmentsContext.js'; 

const App = () => {
  const router = useRouter();
  const { assignments } = useAssignments(); 

  const handleLockInPress = (assignment) => {
    router.push(`/(screens)/lock-in?id=${assignment.id}&assignmentName=${encodeURIComponent(assignment.name)}`);
  };

  // Helper to calculate days remaining
  const getDaysText = (dateStringOrObject) => {
    if (!dateStringOrObject) return 'No date';
    
    const dueDate = new Date(dateStringOrObject);
    const today = new Date();
    
    // Reset hours to compare just the dates
    dueDate.setHours(0,0,0,0);
    today.setHours(0,0,0,0);

    // Check if date is valid (handles mock data like "Tomorrow")
    if (isNaN(dueDate.getTime())) return dateStringOrObject;

    const diffTime = dueDate - today;
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    if (diffDays < 0) return 'Overdue';
    if (diffDays === 0) return 'Due today';
    if (diffDays === 1) return 'Due tomorrow';
    return `Due in ${diffDays} days`;
  };

//Color logic
  const getAssignmentColors = (priority, length) => {
    const pMap = { low: 1, medium: 2, high: 3 };
    const lMap = { short: 1, medium: 2, long: 3 };
    
    const pVal = pMap[priority] || 2; 
    const lVal = lMap[length] || 2;   
    
    const score = pVal + lVal; 

    switch (score) {
      case 2: return { bg: '#86EFAC', text: '#1F2937', sub: '#374151' }; // Green 300
      case 3: return { bg: '#BEF264', text: '#1F2937', sub: '#374151' }; // Lime 300
      case 4: return { bg: '#FCD34D', text: '#1F2937', sub: '#374151' }; // Amber 300
      case 5: return { bg: '#FCA5A5', text: '#1F2937', sub: '#374151' }; // Red 300
      case 6: return { bg: '#F87171', text: '#1F2937', sub: '#374151' }; // Red 400
      default: return { bg: '#FFFFFF', text: '#1F2937', sub: '#6B7280' }; 
    }
  };

  const sortedAssignments = useMemo(() => {
    return [...assignments].sort((a, b) => {
      const dateA = new Date(a.dueDate);
      const dateB = new Date(b.dueDate);
      
      const isValidA = !isNaN(dateA.getTime());
      const isValidB = !isNaN(dateB.getTime());

      if (isValidA && isValidB) return dateA - dateB;
      if (isValidA) return -1;
      if (isValidB) return 1;
      return 0;
    });
  }, [assignments]);

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#4F46E5" />
      
      <View style={styles.header}>
        <View>
          <Text style={styles.headerTitle}>Assignment Dashboard</Text>
          <Text style={styles.headerSubtitle}>Welcome back!</Text>
        </View>
      </View>

      <ScrollView contentContainerStyle={{ paddingBottom: 0 }} style={styles.scrollArea}>
        <Text style={styles.sectionTitle}>Upcoming Assignments</Text>
        
        <View style={styles.listContainer}>
          {sortedAssignments.map((assignment) => {
            const colors = getAssignmentColors(assignment.priority, assignment.length);

            return (
              <TouchableOpacity 
                key={assignment.id} 
                style={[styles.listItem, { backgroundColor: colors.bg }]} 
                activeOpacity={0.8}
              >
                <View style={styles.itemIcon}>
                  <Text style={{ fontSize: 20 }}>{assignment.icon || '💼'}</Text>
                </View>
                <View style={styles.itemTextContainer}>
                  <Text style={[styles.itemTitle, { color: colors.text }]} numberOfLines={1}>
                    {assignment.name}
                  </Text>
                  <Text style={[styles.itemSubtitle, { color: colors.sub }]} numberOfLines={1}>
                    {getDaysText(assignment.dueDate)}
                  </Text>
                </View>
                
                <TouchableOpacity 
                  style={{ marginLeft: 16 }} 
                  onPress={() => handleLockInPress(assignment)} 
                  activeOpacity={0.6}
                >
                  <Text style={styles.lockInButton}>Lock In</Text>
                </TouchableOpacity>
              </TouchableOpacity>
            );
          })}
          
          {assignments.length === 0 && (
            <Text style={{ textAlign: 'center', marginTop: 20, color: '#6B7280' }}>
              No assignments yet. Go to Create!
            </Text>
          )}
        </View>
        <View style={styles.bottomSpacer} /> 
      </ScrollView>
    </View>
  );
};

export default App;