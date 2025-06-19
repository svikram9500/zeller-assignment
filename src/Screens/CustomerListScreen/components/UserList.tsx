import React from 'react';
import {
  FlatList,
  ActivityIndicator,
  RefreshControl,
  View,
  Text,
  StyleSheet,
} from 'react-native';
import { User } from '../../../graphql/types';
import UserCard from '../../../Components/UserCard/UserCard';
import { useNavigation } from '@react-navigation/native';

type Props = {
  users: User[];
  isLoading: boolean;
  isRefetching: boolean;
  onRefresh: () => void;
  userRole: 'ADMIN' | 'MANAGER';
};

/**
 * UserList component that handles:
 * - Initial loading state
 * - Pull-to-refresh loader
 * - Empty state display
 * - FlatList rendering of users
 */

const UserList: React.FC<Props> = ({
  users,
  isLoading,
  isRefetching,
  onRefresh,
  userRole,
}) => {
    const navigation = useNavigation()
  if (isLoading && !isRefetching) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator testID="ActivityIndicator" size="large" color="#000" />
      </View>
    );
  }

  if (users.length === 0) {
    return (
      <View style={styles.centered}>
        <Text>No {userRole.toLowerCase()} users found.</Text>
      </View>
    );
  }

  const handleItemClick = (itemId : string) => {
    navigation.navigate('UserDetailScreen',{id:itemId})
  } 

  return (
    <FlatList
      data={users}
      keyExtractor={item => item.id}
      renderItem={({ item }) => <UserCard user={item} onPress={() => handleItemClick(item.id)}/>}
      refreshControl={
        <RefreshControl refreshing={!!isRefetching} onRefresh={onRefresh} />
      }
      contentContainerStyle={{ paddingBottom: 20 }}
    />
  );
};

const styles = StyleSheet.create({
  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default UserList;
