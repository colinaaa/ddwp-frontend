import {
  useQuery as useApolloQuery,
  useMutation as useApolloMutation,
  useLazyQuery as useApolloLazyQuery,
} from 'taro-apollo-client';

import { Query, Mutation } from '@services/graphql';
import { client } from '@services/apollo';

type QueryKey = keyof typeof Query;

type MutationKey = keyof typeof Mutation;

const useLazyQuery = <Q, Arg>(query: QueryKey, args?: Arg) =>
  useApolloLazyQuery<Q, Arg>(Query[query], { client, variables: args });

const useQuery = <Q, Arg>(query: QueryKey, args?: Arg) =>
  useApolloQuery<Q, Arg>(Query[query], { client, variables: args });

const useMutation = <Q, Arg>(mutation: MutationKey) => useApolloMutation<Q, Arg>(Mutation[mutation], { client });

export { useQuery, useMutation, useLazyQuery };
