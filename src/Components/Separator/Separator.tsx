import React from 'react';
import { View, StyleSheet } from 'react-native';

// Simple horizontal line used to separate sections visually.

const Separator = () => {
  return <View testID="separator" style={styles.separator} />;
};

const styles = StyleSheet.create({
  separator: {
    height: 1,
    backgroundColor: '#e0e0e0',
    marginVertical: 6,
    marginHorizontal:18
  },
});

export default Separator;
