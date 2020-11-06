import { Query as werewolfQuery } from './werewolf';
import { Query as undercoverQuery } from './undercover';

const Query = {
  ...werewolfQuery,
  ...undercoverQuery,
};

export { Query };

export default Query;
