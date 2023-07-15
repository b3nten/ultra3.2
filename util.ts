export function safe<T extends (...args: any) => any>(
  fn: T,
): ReturnType<T> | Error {
  try {
    return fn();
  } catch (err) {
    if (err instanceof Error) {
      return err;
    } else {
      return new Error(err);
    }
  }
}

export async function safeAsync<T extends (...args: any) => Promise<any>>(
  fn: T,
): Promise<ReturnType<T> | Error> {
  try {
    return await fn();
  } catch (err) {
    if (err instanceof Error) {
      return err;
    } else {
      return new Error(err);
    }
  }
}


