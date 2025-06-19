import { gql } from '@apollo/client';

export const GET_ZELLER_CUSTOMER = gql`
  query GetZellerCustomer($id: String!) {
    getZellerCustomer(id: $id) {
      id
      name
      email
      role
    }
  }
`;
