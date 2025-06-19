import { NetworkStatus, useQuery } from '@apollo/client';
import { QueryResponse, QueryVariables, User } from '../../graphql/types';
import { LIST_ZELLER_CUSTOMERS } from '../../graphql/queries/listZellerCustomers';

/**
 * Custom hook to fetch and manage user list based on role (Admin or Manager).
 *
 * - Uses Apollo Client's `useQuery` to execute the `LIST_ZELLER_CUSTOMERS` GraphQL query.
 * - Accepts a role as input and applies it as a filter.
 * - Returns the user list, loading states, errors, and a refetch method.
 * - Also provides `isRefetching` to help distinguish between initial load and pull-to-refresh.
 */

export const useCustomerList = (role: 'ADMIN' | 'MANAGER') => {
  const { data, loading, error, refetch, networkStatus } = useQuery<
    QueryResponse,
    QueryVariables
  >(LIST_ZELLER_CUSTOMERS, {
    variables: {
      filter: {
        role: { eq: role },
      },
    },
    fetchPolicy: 'network-only',
    notifyOnNetworkStatusChange: true,
  });

  const users: User[] = data?.listZellerCustomers?.items ?? [];

  const isRefetching = networkStatus === NetworkStatus.refetch;

  return { users, loading, error, refetch, isRefetching: !!isRefetching };
};
