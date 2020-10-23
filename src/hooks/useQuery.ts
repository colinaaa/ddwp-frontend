import { useQuery as useApolloQuery, useMutation as useApolloMutation } from 'taro-apollo-client';

import { Query, Mutation } from '@services/graphql';
import { client } from '@services/apollo';

type QueryKey = keyof typeof Query;

type MutationKey = keyof typeof Mutation;

const useQuery = <Q, Arg>(query: QueryKey, args?: Arg) => {
  return useApolloQuery<Q, Arg>(Query[query], { client, variables: args });
};

const useMutation = (mutation: MutationKey) => {
  return useApolloMutation(Mutation[mutation], { client });
};

export { useQuery, useMutation };
