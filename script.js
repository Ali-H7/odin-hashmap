class hashMap {
  constructor() {
    this.bucket = new Array(16);
    this.capcity = 16;
    this.loadFactor = 0.75;
    this.entries = 0;
  }

  hash(key) {
    let hashCode = 0;

    const primeNumber = 31;
    for (let i = 0; i < key.length; i++) {
      hashCode = primeNumber * hashCode + key.charCodeAt(i);
      hashCode %= 16;
    }

    return hashCode;
  }

  set(key, value) {
    const index = this.hash(key);
    this.insert(index, key, value);
  }

  insert(index, key, value) {
    const newNode = new node(key, value);

    if (this.bucket[index] === undefined) {
      const head = { head: null };
      this.bucket[index] = head;
    }

    if (this.bucket[index].head === null) {
      this.bucket[index].head = newNode;
      this.entries++;
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
    this.entries++;
  }
}

class node {
  constructor(key = null, value = null, nextNode = null) {
    this.key = key;
    this.value = value;
    this.nextNode = nextNode;
  }
}

const test = new hashMap();
test.set('apple', 'red');
test.set('banana', 'yellow');
test.set('carrot', 'orange');
test.set('dog', 'brown');
test.set('elephant', 'gray');
test.set('frog', 'green');
test.set('grape', 'purple');
test.set('hat', 'black');
test.set('hat', 'black');
test.set('ice cream', 'white');
test.set('jacket', 'blue');
test.set('kite', 'pink');
test.set('lion', 'golden');
console.log(test.bucket);
console.log(test.entries);
