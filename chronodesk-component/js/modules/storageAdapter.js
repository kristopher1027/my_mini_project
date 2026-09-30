export const StorageAdapter = {
  get(key, fallback = null) {
    try {
      const item = localStorage.getItem(`cd_${key}`);
      return item ? JSON.parse(item) : fallback;
    } catch (e) {
      console.warn('StorageAdapter Read Error:', e);
      return fallback;
    }
  },

  set(key, value) {
    try {
      localStorage.setItem(`cd_${key}`, JSON.stringify(value));
    } catch (e) {
      console.warn('StorageAdapter Write Error:', e);
    }
  }
};