import { Mutation as werewolfMutation } from './werewolf';
import { Mutation as undercoverMutation } from './undercover';

const Mutation = {
  ...werewolfMutation,
  ...undercoverMutation,
};

export { Mutation };

export default Mutation;
