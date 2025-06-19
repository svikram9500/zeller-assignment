import React from 'react';
import {
  ActivityIndicator,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { useQuery } from '@apollo/client';
import { GET_ZELLER_CUSTOMER } from '../../graphql/queries/getZellerCustomer';
import { RouteProp, useRoute } from '@react-navigation/native';
import Header from '../../Components/Header/Header';

type RootStackParamList = {
  UserDetail: { id: string };
};

type UserDetailRouteProp = RouteProp<RootStackParamList, 'UserDetail'>;

/**
 * user detail screen which contain basic user details
 */

const UserDetailScreen: React.FC = () => {
  const { params } = useRoute<UserDetailRouteProp>();
  const { data, loading, error } = useQuery(GET_ZELLER_CUSTOMER, {
    variables: { id: params.id },
  });

  if (loading) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" color="#000" />
      </View>
    );
  }

  if (error || !data?.getZellerCustomer) {
    return (
      <View style={styles.centered}>
        <Text>Error loading user</Text>
      </View>
    );
  }

  const { name, email, role } = data.getZellerCustomer;

  return (
    <SafeAreaView style={styles.container}>
      <Header title="User Details" />
      <View style={styles.userDetailContainer}>
        <Text style={styles.title}>User Details</Text>
        <Text>Name: {name}</Text>
        <Text>Email: {email}</Text>
        <Text>Role: {role}</Text>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  userDetailContainer: {
    padding: 18,
  },
  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 16,
  },
});

export default UserDetailScreen;
