import { pondNameZhCN } from '../utils/common';

Math.seed = new Date().getTime();

const itemFactory = () => {
  const importance = Math.floor(Math.random() * 11 - 5);
  const urgency = Math.floor(Math.random() * 11 - 5);
  return {
    importance,
    urgency,
    x: urgency + Math.random() * 0.4 - 0.2,
    y: importance + Math.random() * 0.4 - 0.2,
    belong: pondNameZhCN[Math.ceil(Math.random() * 7)],
    describe: 'testtesttesttest',
  };
};

const LENGTH = 100;

const quadrantData = [];
for (let i = 0; i < LENGTH; i++) {
  quadrantData.push(itemFactory());
}

export { quadrantData };
