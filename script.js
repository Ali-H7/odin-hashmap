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
}
