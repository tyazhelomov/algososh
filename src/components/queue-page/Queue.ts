export interface IQueue<T> {
  enqueue: (item: T) => void;
  dequeue: () => void;
  clear: () => void;
  isEmpty: boolean;
  elements: Array<T>;
  head: number;
  tail: number;
}

interface IQueueNode<T> {
  items: Array<T>;
  head: number;
  tail: number;
}

export class Queue<T> implements IQueue<T> {
  private queue: IQueueNode<T> = {
    items: new Array(this.maxLen).fill(null),
    head: -1,
    tail: -1,
  };

  enqueue(item: T) {
    if (this.tail >= this.maxLen - 1) {
      return;
    }

    if ((this.queue.items[this.head] && this.queue.items[this.tail]) || this.tail < 0) {
      if (this.tail < 0 || (this.head === this.tail && !this.queue.items[this.head])) {
        this.queue.head++;
      }
  
      this.queue.tail++;
    }

    this.queue.items[this.tail] = item;
  };

  dequeue() {
    if (this.head <= this.tail && this.queue.items[this.head]) {
      this.queue.items[this.head] = null as T;

      if (this.head === this.tail && !this.queue.items[this.tail]) {
        this.queue.tail++;
      }
      this.queue.head++;
    }
  };

  clear() {
    this.queue = {
      items: new Array(this.maxLen).fill(null),
      head: -1,
      tail: -1,
    };
  };

  get isEmpty() {
    return this.queue.items.length === 0;
  }

  get elements() {
    return this.queue.items;
  }

  get head() {
    return this.queue.head;
  }

  get tail() {
    return this.queue.tail;
  }

  get maxLen() {
    return 8;
  }
}