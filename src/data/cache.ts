type CacheKey = "date" | "category" | "subcategory";

export namespace Cache {
  export const get = (key: CacheKey) => CacheService.getScriptCache().get(key);

  export const set = (key: CacheKey, data: string) =>
    CacheService.getScriptCache().put(key, data.trim());

  export const clear = (key: CacheKey) =>
    CacheService.getScriptCache().remove(key);
}
