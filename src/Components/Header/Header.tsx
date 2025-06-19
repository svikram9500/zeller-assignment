import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';

type HeaderProps = {
  title: string;
  showBackButton?: boolean;
};

/**
 * Reusable custom header component for the entire application.
 * 
 * - Displays a dynamic title via the `title` prop.
 * - Includes an optional back button (`showBackButton`) for navigation.
 * - Can be extended with additional optional props (e.g., right actions, icons).
 */

const Header: React.FC<HeaderProps> = ({ title, showBackButton = true }) => {
  const navigation = useNavigation();

  return (
    <View style={styles.headerContainer}>
      {showBackButton && (
        <TouchableOpacity
          onPress={() => navigation.pop()}
          style={styles.backButton}
        >
          <Text style={{ fontSize: 18 }}>Back</Text>
        </TouchableOpacity>
      )}
      <Text style={styles.title}>{title}</Text>
      <View style={styles.rightPlaceholder} />
    </View>
  );
};

const styles = StyleSheet.create({
  headerContainer: {
    height: 56,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderColor: '#e3e3e3',
    justifyContent: 'space-between',
  },
  backButton: {
    paddingRight: 16,
  },
  title: {
    fontSize: 18,
    fontWeight: '600',
    flex: 1,
    textAlign: 'center',
    color: '#000',
  },
  rightPlaceholder: {
    width: 40,
  },
});

export default Header;
