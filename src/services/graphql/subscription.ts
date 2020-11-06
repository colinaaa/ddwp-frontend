import { Subscription as werewolfSubscription } from './werewolf';
import { Subscription as undercoverSubscription } from './undercover';

const Subscription = {
  ...werewolfSubscription,
  ...undercoverSubscription,
};

export { Subscription };

export default Subscription;
