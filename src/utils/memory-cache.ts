interface CacheItem<T = unknown> {
  data: T;
  timestamp: number;
}

class MemoryCache {
  private readonly cache = new Map<string, CacheItem>();

  set<T>(key: string, data: T): void {
    this.cache.set(key, {
      data,
      timestamp: Date.now(),
    });
  }

  get<T>(key: string): T | null {
    const item = this.cache.get(key);

    if (!item) return null;

    return item.data as T;
  }

  has(key: string): boolean {
    return !!this.cache.get(key);
  }

  size(): number {
    return this.cache.size;
  }
}

// Export singleton instance
export const cache = new MemoryCache();
