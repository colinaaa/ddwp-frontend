import Query from './query';
import Mutation from './mutation';
import Subscription from './subscription';

export type MutationKey = keyof typeof Mutation;
export type QueryKey = keyof typeof Query;
export type SubscriptionKey = keyof typeof Subscription;

export * from './query';
export * from './mutation';
export * from './subscription';

export * from './__generated__/';

export { Query, Mutation, Subscription };
