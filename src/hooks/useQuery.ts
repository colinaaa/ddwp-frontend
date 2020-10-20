import { useQuery as useApolloQuery, useMutation as useApolloMutation } from 'taro-apollo-client';

import { Query, Mutation } from '@services/graphql';
import { client } from '@services/apollo';

type QueryKey = keyof typeof Query;

type MutationKey = keyof typeof Mutation;

const useQuery = (query: QueryKey) => {
  return useApolloQuery(Query[query], { client });
};

const useMutation = (mutation: MutationKey) => {
  return useApolloMutation(Mutation[mutation], { client });
};

export { useQuery, useMutation };
