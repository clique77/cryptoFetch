export class LocalStorageWorker {
    private static readonly PREFIX = 'cryptoFetch_';
  
    public static isAvailable(): boolean {
      try {
        const testKey = '__localStorage_test__';
        localStorage.setItem(testKey, 'test');
        localStorage.removeItem(testKey);
        return true;
      } catch (error) {
        console.warn('localStorage is not available:', error);
        return false;
      }
    }
  
    private static getFullKey(key: string): string {
      return this.PREFIX + key;
    }
  
    public static setItem(key: string, value: unknown): boolean {
      if (!this.isAvailable()) {
        console.error('localStorage is not available');
        return false;
      }
  
      try {
        const fullKey = this.getFullKey(key);
        
        const stringValue = typeof value === 'string' 
          ? value 
          : JSON.stringify(value);
        
        localStorage.setItem(fullKey, stringValue);
        return true;
      } catch (error) {
        console.error(`Error setting item "${key}" in localStorage:`, error);
        return false;
      }
    }
  
    public static getItem<T>(key: string): T | null {
      if (!this.isAvailable()) {
        return null;
      }
  
      try {
        const fullKey = this.getFullKey(key);
        const item = localStorage.getItem(fullKey);
        
        if (item === null) {
          return null;
        }
  
        try {
          return JSON.parse(item) as T;
        } catch {
          return item as T;
        }
      } catch (error) {
        console.error(`Error getting item "${key}" from localStorage:`, error);
        return null;
      }
    }
  
    public static removeItem(key: string): boolean {
      if (!this.isAvailable()) {
        return false;
      }
  
      try {
        const fullKey = this.getFullKey(key);
        localStorage.removeItem(fullKey);
        return true;
      } catch (error) {
        console.error(`Error removing item "${key}" from localStorage:`, error);
        return false;
      }
    }
  
    public static clear(): boolean {
      if (!this.isAvailable()) {
        return false;
      }
  
      try {
        const keys = this.getAllKeys();
        keys.forEach(key => this.removeItem(key));
        return true;
      } catch (error) {
        console.error('Error clearing localStorage:', error);
        return false;
      }
    }
  
    public static hasItem(key: string): boolean {
      if (!this.isAvailable()) {
        return false;
      }
  
      try {
        const fullKey = this.getFullKey(key);
        return localStorage.getItem(fullKey) !== null;
      } catch (error) {
        console.error(`Error checking item "${key}" in localStorage:`, error);
        return false;
      }
    }
  
    public static getAllKeys(): string[] {
      if (!this.isAvailable()) {
        return [];
      }
  
      try {
        const keys: string[] = [];
        
        for (let i = 0; i < localStorage.length; i++) {
          const key = localStorage.key(i);
          
          if (key && key.startsWith(this.PREFIX)) {
            keys.push(key.substring(this.PREFIX.length));
          }
        }
        
        return keys;
      } catch (error) {
        console.error('Error getting all keys from localStorage:', error);
        return [];
      }
    }
  
    public static getSize(): number {
      if (!this.isAvailable()) {
        return 0;
      }

      try {
        let size = 0;
        for (let i = 0; i < localStorage.length; i++) {
          const fullKey = localStorage.key(i);
          if (fullKey && fullKey.startsWith(this.PREFIX)) {
            const value = localStorage.getItem(fullKey);
            if (value) {
              const keyBlob = new Blob([fullKey]);
              const valueBlob = new Blob([value]);
              size += keyBlob.size + valueBlob.size;
            }
          }
        }
        return size;
      } catch (error) {
        console.error('Error calculating localStorage size:', error);
        return 0;
      }
    }
  
    public static setItemWithExpiry(
      key: string, 
      value: unknown, 
      ttl: number
    ): boolean {
      const now = new Date().getTime();
      
      const item = {
        value: value,
        expiry: now + ttl
      };
      
      return this.setItem(key, item);
    }
  
    public static getItemWithExpiry<T>(key: string): T | null {
      const item = this.getItem<{ value: T; expiry: number }>(key);
      
      if (!item) {
        return null;
      }
  
      const now = new Date().getTime();
      
      if (now > item.expiry) {
        this.removeItem(key);
        return null;
      }
      
      return item.value;
    }
  }