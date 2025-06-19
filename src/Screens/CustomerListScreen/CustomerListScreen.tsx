import React, { useState } from 'react';
import { SafeAreaView, StyleSheet, Text, View } from 'react-native';
import RadioButtonOptions from '../../Components/RadioButtonOptions/RadioButtonOptions';
import SearchInput from '../../Components/SearchInput/SearchInput';
import Separator from '../../Components/Separator/Separator';
import UserList from './components/UserList';
import { useCustomerList } from '../../hooks/useCustomerList/useCustomerList';



// Static options for user type filter
const userOptions = [
  { value: 'ADMIN', label: 'Admin' },
  { value: 'MANAGER', label: 'Manager' },
];

const CustomerListScreen: React.FC = () => {
  // State for selected user type (Admin/Manager)
  const [selectedType, setSelectedType] = useState<'ADMIN' | 'MANAGER'>(
    'ADMIN',
  );

  // State for user search input
  const [searchText, setSearchText] = useState('');

  // Fetch users based on selected type using a custom GraphQL hook
  const { users, loading, isRefetching, refetch } =
    useCustomerList(selectedType);

  // Filter users locally by name
  const filteredUsers = users.filter(user =>
    user.name.toLowerCase().includes(searchText.toLowerCase()),
  );

  // Handler to update user type and reset search input
  const handleUserTypeSelection = (val: 'ADMIN' | 'MANAGER') => {
    setSearchText('');
    setSelectedType(val);
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Search input to filter users by name */}
      <SearchInput
        value={searchText}
        onChangeText={setSearchText}
        placeholder="Search by name"
      />

      {/* Radio button group to toggle between user roles */}
      <RadioButtonOptions
        title="User Types"
        onChange={val => handleUserTypeSelection(val)}
        options={userOptions}
        selectedValue={selectedType}
      />
      <Separator />
      <View style={styles.userListContainer}>
        {/* Display current filter type */}
        <Text style={styles.selectedUserTitle}>
          {selectedType === 'ADMIN' ? 'Admin Users' : 'Manager Users'}
        </Text>

        {/* User list component with loading, refresh, and data props */}
        <UserList
          users={filteredUsers}
          isLoading={loading}
          isRefetching={isRefetching}
          onRefresh={refetch}
          userRole={selectedType}
        />
      </View>
      <Separator />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  selectedUserTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 12,
  },
  userListContainer: {
    paddingHorizontal: 18,
    flex: 1,
  },
});

export default CustomerListScreen;
