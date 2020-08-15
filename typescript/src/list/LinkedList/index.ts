import IList from '../IList';

class ListNode<T> {
  element: T | null;
  next: ListNode<T> | null;
  prev: ListNode<T> | null;

  constructor(element: T | null, next: ListNode<T> | null, prev: ListNode<T> | null) {
    this.element = element;
    this.next = next;
    this.prev = prev;
  }
}

export default class LinkedList<T> implements IList<T> {
  private head: ListNode<T>;
  private tail: ListNode<T>;
  private length: number = 0;

  private getNode(index: number): ListNode<T> {
    if (index < 0 || index >= this.length) {
      throw new RangeError(`index: ${index}, size: ${this.length}`);
    }

    const beforeMid = index <= (this.length >> 1);
    let current: ListNode<T> = beforeMid ? this.head : this.tail;

    if (beforeMid) {
      for (let i = 0; i < index; i += 1) {
        if (current.next) current = current.next;
      }
    } else {
      for (let i = this.length - 1; i > index; i -= 1) {
        if (current.prev) current = current.prev;
      }
    }

    return current;
  }

  constructor() {
    this.head = new ListNode<T>(null, null, null);
    this.tail = new ListNode<T>(null, null, null);
  }

  size(): number {
    return this.length;
  }

  contains(element: T): boolean {
    return this.indexOf(element) > -1;
  }

  append(element: T): void {
    // append when empty
    if (this.length === 0) {
      this.tail = new ListNode<T>(element, null, null);
      this.head = this.tail;
    } else {
      const oldTail = this.tail;
      this.tail = new ListNode<T>(element, null, null);
      this.tail.prev = oldTail;
      oldTail.next = this.tail;
    }

    this.length += 1;
  }

  add(index: number, element: T): void {
    if (index === this.length) {
      return this.append(element);
    }

    const current: ListNode<T> = this.getNode(index);

    const prev = current.prev;
    const newNode = new ListNode<T>(element, current, prev);

    // unshift
    if (prev == null) {
      this.head = newNode;
    } else {
      prev.next = newNode;
    }
    current.prev = newNode;

    this.length += 1;
  }

  get(index: number): T | null {
    const node: ListNode<T> = this.getNode(index);

    return node.element;
  }

  set(index: number, element: T): T | null {
    const node: ListNode<T> = this.getNode(index);

    const oldVal = node.element;
    node.element = element;

    return oldVal;
  }

  remove(index: number): T | null {
    const node = this.getNode(index);

    const { prev, next } = node;

    if (!next) {
      // last
      const prevNode = prev || this.head;
      prevNode.next = null;
    } else if (prev) {
      prev.next = next;
      next.prev = prev;
    } else {
      // first
      this.head = next;
      this.head.prev = null;
    }

    this.length -= 1;

    return node.element;
  }

  indexOf(element: T): number {
    let node = this.head;
    for (let i = 0; i < this.length; i += 1) {
      if (element === node.element) return i;
      if (node.next) node = node.next;
    }

    return -1;
  }

  clear(): void {
    this.length = 0;
    this.head.next = null;
  }

  last(): T | null {
    return this.tail.element;
  }
}