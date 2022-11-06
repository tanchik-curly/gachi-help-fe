class LocalStorage {
  // eslint-disable-next-line @typescript-eslint/ban-types
  private readonly events: { [key: number]: Function };

  constructor() {
    this.events = {};
  }

  // eslint-disable-next-line @typescript-eslint/ban-types
  subscribe(func: Function) {
    const id = Object.keys(this.events).length;
    this.events[id] = func;
    return id;
  }

  unsubscribe(id: number): boolean {
    if (this.events[id]) {
      delete this.events[id];
      return true;
    }

    return false;
  }

  static getItem(key: string): string | null {
    return localStorage.getItem(key);
  }

  setItem(key: string, value: string): void {
    localStorage.setItem(key, value);
    Object.values(this.events).forEach(func => func(key, value));
  }

  removeItem(key: string): void {
    localStorage.removeItem(key);
    Object.values(this.events).forEach(func => func(key));
  }
}

const localStorageSingleton = new LocalStorage();
export default localStorageSingleton;
