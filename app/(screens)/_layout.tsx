import { Stack } from 'expo-router';

export default function StandaloneScreensLayout() {
  return (
    <Stack>
      {/* This is the fix! It ensures no header is shown for any screen 
        (like lock-in.tsx) inside the app/(screens) folder. 
      */}
      <Stack.Screen name="lock-in" options={{ headerShown: false }} />
    </Stack>
  );
  
  /* Alternatively, to apply the rule to ALL future screens in the (screens) group:
    
    return (
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="lock-in" />
      </Stack>
    );
  */
}