import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function ShopsScreen() {
  return (
    <View style={styles.container}>
      <Text>Partner shops with 10% discount</Text>
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
