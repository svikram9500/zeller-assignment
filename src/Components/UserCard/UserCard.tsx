import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { User } from '../../graphql/types';

type UserCardProps = {
  user: User;
  onPress?: () => void;
};

// Displays a user’s name, role, and avatar initial. Supports optional onPress.

const UserCard: React.FC<UserCardProps> = ({ user, onPress }) => {
  const { name, role } = user;
  const initial = name?.charAt(0).toUpperCase();

  return (
    <TouchableOpacity style={styles.card} onPress={onPress}>
      <View style={styles.avatar}>
        <Text style={styles.avatarText}>{initial}</Text>
      </View>
      <View style={styles.nameRoleContainer}>
        <Text style={styles.name}>{name}</Text>
        <Text style={styles.role}>{role}</Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    borderRadius: 10,
    padding: 12,
    marginBottom: 12,
    flexDirection: 'row',
    alignItems: 'center',
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 8,
    backgroundColor: '#eaf2ff',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
    overflow: 'hidden',
  },
  avatarText: {
    color: '#4a90e2',
    fontWeight: '600',
    fontSize: 16,
  },
  image: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  name: {
    fontSize: 16,
    fontWeight: '500',
  },
  role: {
    fontSize: 12,
    color: '#888',
    textTransform: 'capitalize',
  },
  nameRoleContainer: {
    gap: 5,
  },
});

export default UserCard;
