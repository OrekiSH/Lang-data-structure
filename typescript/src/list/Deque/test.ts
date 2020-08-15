import { equal } from 'assert';
import Deque from './index';

describe('Deque', () => {
  it('enQueue', () => {
    const queue = new Deque<number>();
    queue.enQueueRear(1);
    queue.enQueueRear(2);
    queue.enQueueFront(3);

    equal(queue.rear(), 2);
    equal(queue.front(), 3);
  });
});