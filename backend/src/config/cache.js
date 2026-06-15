class CacheInterface {
  async get(key) { throw new Error("Method not implemented"); }
  async set(key, value, ttlSeconds) { throw new Error("Method not implemented"); }
  async del(key) { throw new Error("Method not implemented"); }
  async clear() { throw new Error("Method not implemented"); }
}

class MemoryCacheProvider extends CacheInterface {
  constructor() {
    super();
    this.cache = new Map();
  }
  
  async get(key) {
    const entry = this.cache.get(key);
    if (!entry) return null;
    if (entry.expiry && entry.expiry < Date.now()) {
      this.cache.delete(key);
      return null;
    }
    return entry.value;
  }
  
  async set(key, value, ttlSeconds) {
    const expiry = ttlSeconds ? Date.now() + (ttlSeconds * 1000) : null;
    this.cache.set(key, { value, expiry });
  }
  
  async del(key) {
    this.cache.delete(key);
  }
  
  async clear() {
    this.cache.clear();
  }
}

class RedisCacheProvider extends CacheInterface {
  constructor(redisClient) {
    super();
    this.client = redisClient;
  }
  
  async get(key) {
    if (!this.client) return null;
    const val = await this.client.get(key);
    return val ? JSON.parse(val) : null;
  }
  
  async set(key, value, ttlSeconds) {
    if (!this.client) return;
    const valStr = JSON.stringify(value);
    if (ttlSeconds) {
      await this.client.set(key, valStr, "EX", ttlSeconds);
    } else {
      await this.client.set(key, valStr);
    }
  }
  
  async del(key) {
    if (!this.client) return;
    await this.client.del(key);
  }
  
  async clear() {
    if (!this.client) return;
    await this.client.flushdb();
  }
}

class CacheManager {
  constructor() {
    // Default to In-Memory Cache Provider
    this.provider = new MemoryCacheProvider();
  }
  
  setProvider(provider) {
    this.provider = provider;
  }
  
  async get(key) {
    return this.provider.get(key);
  }
  
  async set(key, value, ttlSeconds) {
    return this.provider.set(key, value, ttlSeconds);
  }
  
  async del(key) {
    return this.provider.del(key);
  }
  
  async clear() {
    return this.provider.clear();
  }
}

const cache = new CacheManager();

module.exports = {
  cache,
  CacheManager,
  MemoryCacheProvider,
  RedisCacheProvider
};
