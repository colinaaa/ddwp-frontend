import {
  useQuery as useApolloQuery,
  useMutation as useApolloMutation,
  useLazyQuery as useApolloLazyQuery,
  useSubscription as useApolloSubscription,
  QueryHookOptions,
  LazyQueryHookOptions,
  MutationHookOptions,
  SubscriptionHookOptions,
} from 'taro-apollo-client';

import { Query, Mutation, Subscription } from '@services/graphql';
import { client } from '@services/apollo';

type QueryKey = keyof typeof Query;

type MutationKey = keyof typeof Mutation;

type SubscriptionKey = keyof typeof Subscription;

const useLazyQuery = <Q, Arg>(query: QueryKey, args?: Arg, options?: LazyQueryHookOptions<Q, Arg>) =>
  useApolloLazyQuery<Q, Arg>(Query[query], { client, variables: args, ...options });

const useQuery = <Q, Arg>(query: QueryKey, args?: Arg, options?: QueryHookOptions<Q, Arg>) =>
  useApolloQuery<Q, Arg>(Query[query], { client, variables: args, ...options });

const useMutation = <Q, Arg>(mutation: MutationKey, options?: MutationHookOptions<Q, Arg>) =>
  useApolloMutation<Q, Arg>(Mutation[mutation], { client, ...options });

const useSubscription = <Q, Arg>(sub: SubscriptionKey, args?: Arg, options?: SubscriptionHookOptions<Q, Arg>) =>
  useApolloSubscription<Q, Arg>(Subscription[sub], { client, variables: args, ...options });

export { useQuery, useMutation, useLazyQuery, useSubscription };
