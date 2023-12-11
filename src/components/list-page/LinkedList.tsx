interface ILinkedListNode<T> {
  value: T;
  next: ILinkedListNode<T> | undefined;
};

export interface ILinkedList<T> {
  prepend: (item: T) => void;
  append: (item: T) => void;
  addByIndex: (item: T, index: number) => void;
  deleteByIndex: (index: number) => void;
  deleteHead: () => void;
  deleteTail: () => void;
  toArray: () => Array<T>;
}

class LinkedListNode<T> implements ILinkedListNode<T> {
  value: T;
  next: ILinkedListNode<T> | undefined;

  constructor(value: T, next: ILinkedListNode<T> | undefined = undefined) {
    this.value = value;
    this.next = next;
  }
}

export class LinkedList<T> implements ILinkedList<T> {
  private head: ILinkedListNode<T> | undefined;
  
  constructor() {
    this.head = undefined;
  }

  prepend(item: T) {
    const newNode = new LinkedListNode(item);

    newNode.next = this.head;
    this.head = newNode;
  };

  append(item: T) {
    const newNode = new LinkedListNode(item);
    let curr = this.head;

    if (!curr) {
      this.prepend(item);

      return;
    }

    while (curr.next) {
      curr = curr.next
    }

    curr.next = newNode;
  };

  addByIndex(item: T, index: number) {
    if (!this.head || index === 0) {
      this.prepend(item);

      return;
    }

    const newNode = new LinkedListNode(item);
    let curr = this.head;

    for (let i = 0; i < index - 1 && curr.next; i++) {
      curr = curr.next;
    }

    newNode.next = curr.next;
    curr.next = newNode;
  };

  deleteByIndex(index: number) {
    if (!this.head) {
      return;
    }

    if (index === 0) {
      this.head = this.head.next;

      return;
    }

    let curr = this.head;
    for (let i = 0; i < index - 1 && curr.next; i++) {
      curr = curr.next;
    }

    if (!curr.next) {
      return;
    }

    curr.next = curr.next.next;
  };

  deleteHead() {
    if (!this.head) {
      return;
    }

    this.head = this.head.next;
  };

  deleteTail() {

    if (!this.head) {
      return;
    }

    if (!this.head.next) {
      this.head = undefined;

      return;
    }

    let curr = this.head;
    while (curr.next && curr.next.next) {
      curr = curr.next
    }

    curr.next = undefined;
  };

  toArray() {
    const arr: Array<T> = [];
    let curr = this.head;

    if (!curr) {
      return arr;
    }

    if (!curr.next) {
      arr.push(curr.value);

      return arr;
    }

    while (curr) {
      arr.push(curr.value);
      curr = curr.next;
    }

    return arr;
  };
}

