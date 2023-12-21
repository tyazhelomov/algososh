export interface IStack<T> {
  push: (el: T) => void;
  pop: () => void;
  clear: () => void;
  size: number;
  items: Array<T>;
}

export class Stack<T> implements IStack<T> {
  private stack: Array<T> = [];
  push (el: T) {
    this.stack.push(el);
  };
  
  pop () {
    this.stack.pop();
  };

  clear() {
    this.stack = [];
  };

  get size() {
    return this.stack.length;
  }

  get items() {
    return this.stack;
  }
}