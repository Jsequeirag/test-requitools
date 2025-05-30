export const saveLocalStorage = (itemName, value) => {
  localStorage.setItem(itemName, JSON.stringify(value));
};
export const getLocalStorageItem = (itemName) => {
  return localStorage.getItem(itemName);
};

export const removeLocalStorageItem = (itemName) => {
  return localStorage.removeItem(itemName);
};

export const getLocalStorageKeyValue = (itemName, key) => {
  const object = JSON.parse(localStorage.getItem(itemName));
  return object[key];
};
//website Config
