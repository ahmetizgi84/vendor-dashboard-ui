const DEFAULT_CACHE_STORAGE = "local";

interface ICachedObject {
  data: any;
}
let cachedObjects: Record<string, ICachedObject> = {};

function cacheGet(key: string, storageName = DEFAULT_CACHE_STORAGE): any {
  try {
    let cachedObject: ICachedObject | null = null;

    if (Object.prototype.hasOwnProperty.call(cachedObjects, key)) cachedObject = cachedObjects[key];

    if (cachedObject == null) {
      const dataStr = getStorage(storageName).getItem(key);
      if (dataStr != null)
        try {
          cachedObject = JSON.parse(dataStr);
        } catch (e) {
          console.error(e);
        }
    }

    if (cachedObject) {
      cachedObjects[key] = cachedObject;
      return cachedObject.data;
    }
    // else console.log('Specified key does not exists in cache !', key, storageName);
  } catch (error) {
    console.error(error);
  }
  return null;
}

function cacheSet(key: string, object: any, storageName = DEFAULT_CACHE_STORAGE) {
  try {
    if (key && object) {
      const temp = {
        data: object,
      };

      cachedObjects[key] = temp;

      getStorage(storageName).setItem(key, JSON.stringify(temp));

      return true;
    }
  } catch (error) {
    console.error(error);
  }
  return false;
}

function cacheDelete(key: string, storageName = DEFAULT_CACHE_STORAGE) {
  try {
    delete cachedObjects[key];

    getStorage(storageName).removeItem(key);

    return true;
  } catch (error) {
    console.error(error);
  }
  return false;
}

function getStorage(storageName: string) {
  switch (storageName) {
    case "local":
      return localStorage;
    case "session":
    default:
      return sessionStorage;
  }
}

export { cacheGet, cacheSet, cacheDelete };
