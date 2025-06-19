import React from 'react';
import { renderHook, waitFor } from '@testing-library/react-native';
import { MockedProvider } from '@apollo/client/testing';
import { useCustomerList } from './useCustomerList';
import { LIST_ZELLER_CUSTOMERS } from '../../graphql/queries/listZellerCustomers';

const mockUsers = [
  {
    id: '1',
    name: 'Vikram Singh',
    email: 'vikram@example.com',
    role: 'ADMIN',
  },
  {
    id: '2',
    name: 'Alice',
    email: 'alice@example.com',
    role: 'ADMIN',
  },
];

const mocks = [
  {
    request: {
      query: LIST_ZELLER_CUSTOMERS,
      variables: {
        filter: {
          role: { eq: 'ADMIN' },
        },
      },
    },
    result: {
      data: {
        listZellerCustomers: {
          items: mockUsers,
          nextToken: null,
        },
      },
    },
  },
];

describe('useCustomerList', () => {
  it('returns user list for given role and handles loading state', async () => {
    const wrapper = ({ children }: any) => (
      <MockedProvider mocks={mocks} addTypename={false}>
        {children}
      </MockedProvider>
    );

    const { result } = renderHook(() => useCustomerList('ADMIN'), { wrapper });

    // Initially loading should be true
    expect(result.current.loading).toBe(true);

    // Wait for data to be loaded
    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });

    expect(result.current.users.length).toBe(2);
    expect(result.current.users[0].name).toBe('Vikram Singh');
    expect(result.current.isRefetching).toBe(false);
    expect(result.current.error).toBeUndefined();
  });
});
