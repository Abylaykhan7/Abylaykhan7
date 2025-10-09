import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function AnnouncementsScreen() {
  return (
    <View style={styles.container}>
      <Text>Announcements for pub meetups and events</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
