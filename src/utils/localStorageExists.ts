function localStorageExist() {
  try {
    var storage = window["localStorage"]
    return storage? true:false;
  } catch (error) {
    return false;
  }
};

export { localStorageExist };