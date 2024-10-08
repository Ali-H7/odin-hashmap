class HashMap {
  constructor() {
    this.bucket = new Array(16);
    this.capcity = 16;
    this.loadFactor = 0.75;
    this.size = 0;
  }

  hash(key) {
    let hashCode = 0;

    const primeNumber = 31;
    for (let i = 0; i < key.length; i++) {
      hashCode = primeNumber * hashCode + key.charCodeAt(i);
      hashCode %= this.capcity;
    }

    return hashCode;
  }

  set(key, value) {
    const index = this.hash(key);
    this.insert(index, key, value);
  }

  get(key) {
    const index = this.hash(key);

    if (this.bucket[index] === undefined) return null;
    let currentNode = this.bucket[index].head;

    while (currentNode != null) {
      if (currentNode.key === key) break;
      currentNode = currentNode.nextNode;
    }

    if (currentNode === null) return null;
    return currentNode.value;
  }

  has(key) {
    const index = this.hash(key);

    if (this.bucket[index] === undefined) return false;
    let currentNode = this.bucket[index].head;

    while (currentNode != null) {
      if (currentNode.key === key) return true;
      currentNode = currentNode.nextNode;
    }

    if (currentNode === null) return false;
  }

  keys() {
    const keysArray = new Array();

    this.bucket.forEach((key) => {
      let currentNode = key.head;

      while (currentNode != null) {
        keysArray.push(currentNode.key);
        currentNode = currentNode.nextNode;
      }
    });

    return keysArray;
  }

  values() {
    const valuesArray = new Array();

    this.bucket.forEach((value) => {
      let currentNode = value.head;

      while (currentNode != null) {
        valuesArray.push(currentNode.value);
        currentNode = currentNode.nextNode;
      }
    });

    return valuesArray;
  }

  entries() {
    const entriesArray = new Array();

    this.bucket.forEach((value) => {
      let currentNode = value.head;

      while (currentNode != null) {
        const tempArray = new Array();
        tempArray.push(currentNode.key);
        tempArray.push(currentNode.value);
        entriesArray.push(tempArray);
        currentNode = currentNode.nextNode;
      }
    });

    return entriesArray;
  }

  grow() {
    const currentLoad = this.capcity * this.loadFactor;
    if (this.size > currentLoad) {
      const tempArray = this.entries();
      this.capcity *= 2;
      this.size = 0;

      this.bucket = new Array(this.capcity);
      tempArray.forEach((arr) => {
        this.set(arr[0], arr[1]);
      });
    }
  }

  remove(key) {
    let count = 0;
    const index = this.hash(key);
    let currentNode = this.bucket[index].head;
    let lastNode = this.bucket[index].head;
    if (this.bucket[index] === undefined) return false;

    while (currentNode != null) {
      if (currentNode.key === key) break;
      lastNode = currentNode;
      currentNode = currentNode.nextNode;
      count++;
    }

    if (currentNode.key === key && count === 0) {
      this.bucket[index].head = currentNode.nextNode;
      this.size--;
      return true;
    }
    if (currentNode.key === key) {
      lastNode.nextNode = currentNode.nextNode;
      this.size--;
      return true;
    }
    if (currentNode === null) return false;
  }

  insert(index, key, value) {
    const newNode = new node(key, value);

    if (this.bucket[index] === undefined) {
      const head = { head: null };
      this.bucket[index] = head;
    }

    if (this.bucket[index].head === null) {
      this.bucket[index].head = newNode;
      this.size++;
      this.grow();
      return;
    }

    if (this.bucket[index].head.key === key) {
      this.bucket[index].head.value = value;
      return;
    }

    let currentNode = this.bucket[index].head;

    while (currentNode.nextNode != null) {
      if (currentNode.nextNode.key === key) {
        currentNode.nextNode.value = value;
        return;
      }

      currentNode = currentNode.nextNode;
    }

    if (currentNode.nextNode != null) {
      newNode.nextNode = currentNode.nextNode;
    }

    currentNode.nextNode = newNode;
    this.size++;
    this.grow();
  }

  length() {
    return this.size;
  }

  clear() {
    this.bucket = new Array(16);
    this.capcity = 16;
    this.size = 0;
  }
}

class node {
  constructor(key = null, value = null, nextNode = null) {
    this.key = key;
    this.value = value;
    this.nextNode = nextNode;
  }
}

const test = new HashMap();

test.set('apple', 'red');
test.set('banana', 'yellow');
test.set('carrot', 'orange');
test.set('dog', 'brown');
test.set('elephant', 'gray');
test.set('frog', 'green');
test.set('grape', 'purple');
test.set('hat', 'black');
test.set('ice cream', 'white');
test.set('jacket', 'blue');
test.set('kite', 'pink');
test.set('lion', 'golden');
test.set('elephant', 'pink');
test.set('hat', 'cyan');
test.set('moon', 'silver');

console.log(test.bucket);
