import { NumberUtils } from '@adam-sv/arc';

const { getRandomInt } = NumberUtils;

export const getData = () =>
  Array(50)
    .fill(0)
    .map((zero, index: number) => ({
      id: `${index}`,
      values: {
        id: index,
        alpha: getRandomInt(0, 10),
        beta: getRandomInt(0, 100),
        gamma: getRandomInt(0, 50),
        delta: getRandomInt(10, 25),
        epsilon: getRandomInt(23, 87),
      },
    }));
