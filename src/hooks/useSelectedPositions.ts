import { useMemo } from '@tarojs/taro';

interface Player {
  position: number;
  role?: string | null;
}

const useSelectedPositions = (players: Array<Player> | null = []) => {
  return useMemo(
    () =>
      new Map(
        (players ? players.filter(({ position }) => position !== -1) : []).map(({ position, role }) => [
          position,
          role,
        ]),
      ),
    [players],
  );
};

export { useSelectedPositions };

export default useSelectedPositions;
