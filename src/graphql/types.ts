export type User = {
    id: string;
    name: string;
    role: 'ADMIN' | 'MANAGER';
    email: string;
  };
  
  export type QueryResponse = {
    listZellerCustomers: {
      items: User[];
      nextToken: string | null;
    };
  };
  
  export type QueryVariables = {
    filter: {
      role: {
        eq: 'ADMIN' | 'MANAGER';
      };
    };
  };
  