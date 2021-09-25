export class MapArray<K, V> {
  private map: Map<K, Array<V>> = new Map();

  public push(key: K, value: V) {
    const array = this.map.get(key);
    if (array !== undefined) {
      array.push(value);
    } else {
      this.map.set(key, [value]);
    }
  }

  public concat(key: K, values: Array<V>) {
    const array = this.map.get(key);
    if (array !== undefined) {
      for (const value of values) {
        array.push(value);
      }
    } else {
      this.map.set(key, values);
    }
  }

  public keys() {
    return this.map.keys();
  }

  public list(key: K) {
    return this.map.get(key);
  }

  public clear() {
    return this.map.clear();
  }

  public forEach(cb: (value: Array<V>, key: K) => void) {
    return this.map.forEach(cb);
  }
}
