export function saveToLocalStorage(key: string, data: any) {
  try {
    let stringData = typeof data === "object" ? JSON.stringify(data) : data;
    localStorage.setItem(key, stringData);
  } catch (e) {
    console.warn(e);
  }
}
