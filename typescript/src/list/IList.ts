export default interface IAbstractList<T> {
  size(): number;
  contains(element: T): boolean;
  append(element: T): void;
  add(index: number, element: T): void;
  get(index: number): T | null;
  set(index: number, element: T): T | null;
  remove(index: number): T | null;
  indexOf(element: T): number;
  clear(): void;
  last(): T | null;
}