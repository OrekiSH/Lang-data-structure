import LinkedList from "../LinkedList";

export interface IDeque<T> {
  size(): number;
  enQueueRear(element: T): void;
  enQueueFront(element: T): void;
  deQueueRear(): T | null;
  deQueueFront(): T | null;
  rear(): T | null;
  front(): T | null;
}

export default class Deque<T> implements IDeque<T> {
  private list = new LinkedList<T>();

  size(): number {
    return this.list.size();
  }

  enQueueRear(element: T): void {
    this.list.append(element);
  }

  enQueueFront(element: T): void {
    this.list.add(0, element);
  }

  deQueueRear(): T | null {
    return this.list.remove(this.list.size() - 1);
  }

  deQueueFront(): T | null {
    return this.list.remove(0);
  }

  rear(): T | null {
    return this.list.get(this.list.size() - 1);
  }

  front(): T | null {
    return this.list.get(0);
  }
}