import { equal } from 'assert';
import ArrayList from './index';

describe('Array List', () => {
  it('append & remove', () => {
    const list = new ArrayList<number>();
    list.append(1);
    list.append(2);
    list.append(3);

    list.remove(1);

    equal(list.get(1), 3);

    list.append(4);
    equal(list.last(), 4);
  });

  it('add & remove', () => {
    const list = new ArrayList<number>();
    list.add(0, 1);
    list.append(2);
    list.add(0, 3);

    equal(list.last(), 2);

    list.remove(0);

    equal(list.get(0), 1);
  });
});