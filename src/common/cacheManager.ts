function cacheGet(key: string, storageName = "local") {
  try {
    let cachedObject = null;

    if (cachedObject == null) {
      const dataStr = getStorage(storageName).getItem(key);
      if (dataStr != null)
        try {
          cachedObject = JSON.parse(dataStr);
        } catch (e) {
          console.error(e);
        }
    }
  } catch (error) {
    console.error(error);
  }
  return null;
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

export { cacheGet };
