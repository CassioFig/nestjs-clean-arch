type RemoveFunctionFromClass<T> = {
    [K in keyof T]: T[K] extends Function ? never : K;
  }[keyof T];

export type EntityType<T> = Pick<T, RemoveFunctionFromClass<T>>;