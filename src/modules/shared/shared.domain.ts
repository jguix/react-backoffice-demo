const repeatedItemsComparator = <T>(value: T, index: number, self: Array<T>): boolean => {
  return self.indexOf(value) === index;
};

export const arrayDistinct = <T>(input: Array<T>): Array<T> =>
  input.filter(repeatedItemsComparator);
