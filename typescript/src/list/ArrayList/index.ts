import IList from '../IList';

export default class ArrayList<T> implements IList<T> {
  private elements: T[];
  private length: number = 0;

  private ensureCapacity() {
    const len = this.elements.length;
    if (this.length + 1 < len) return;

    const elements = new Array(len + (len >> 1));
    for (let i = 0; i < len; i += 1) {
      elements[i] = this.elements[i];
    }

    this.elements = elements;
  }

  constructor(capacity: number = 10) {
    this.elements = new Array<T>(capacity);
  }

  contains(element: T): boolean {
    return this.indexOf(element) > -1;
  }

  append(element: T): void {
    this.ensureCapacity();
    this.elements[this.length++] = element;
  }

  add(index: number, element: T): void {
    if (index < 0 || index > this.length) {
      throw new RangeError(`index: ${index}, size: ${this.length}`);
    }

    this.ensureCapacity();
    for (let i = this.length; i > index; i -= 1) {
      this.elements[i] = this.elements[i - 1];
    }
    this.elements[index] = element;
    this.length += 1;
  }

  get(index: number): T {
    if (index < 0 || index >= this.length) {
      throw new RangeError(`index: ${index}, size: ${this.length}`);
    }

    return this.elements[index];
  }

  set(index: number, element: T): T {
    const oldVal = this.get(index);
    this.elements[index] = element;
    this.length += 1;

    return oldVal;
  }

  remove(index: number): T {
    const oldVal = this.get(index);
    for (let i = index; i < this.length; i += 1) {
      this.elements[i] = this.elements[i + 1];
    }
    delete this.elements[this.length--];

    return oldVal;
  }

  indexOf(element: T): number {
    let result = -1;
    for (let i = 0; i < this.length; i += 1) {
      if (this.elements[i] === element) return i;
    }

    return result;
  }

  clear(): void {
    this.elements = new Array<T>(this.elements.length);
    // or just disable for primitive types
    this.length = 0;
  }

  size() {
    return this.length;
  }

  last() {
    return this.get(this.length - 1);
  }
}
