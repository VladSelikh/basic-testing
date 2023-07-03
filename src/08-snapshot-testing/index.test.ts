// Uncomment the code below and write your tests
import { generateLinkedList } from './index';

describe('generateLinkedList', () => {
  // Check match by expect(...).toStrictEqual(...)
  test('should generate linked list from values 1', () => {
    const linkedList = generateLinkedList(['first', null]);
    expect(linkedList).toStrictEqual({
      next: {
        next: {
          next: null,
          value: null,
        },
        value: null,
      },
      value: 'first',
    });
  });

  // Check match by comparison with snapshot
  test('should generate linked list from values 2', () => {
    const linkedList = generateLinkedList([true, 20, 'element', {}]);
    expect(linkedList).toMatchSnapshot();
  });
});
