export const pick = <T extends Record<string, unknown>, k extends keyof T>(
  obj: T,
  keys: k[]
) => {
  const finalObj: Partial<T> = {};

  keys.forEach(key => {
    if (obj && Object.hasOwnProperty.call(obj, key)) {
      finalObj[key] = obj[key];
    }
  });

  return finalObj;
};
