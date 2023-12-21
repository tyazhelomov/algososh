import { Direction } from "../../../types/direction";
import { bubbleSorting, choiceSorting } from "./utils";
import { expect } from '@jest/globals';

describe('Тест алгоритма сортировки выбором:', () => {
  it('Тест с пустым массивом по возрастанию', () => {
    expect(choiceSorting([], Direction.Ascending)).toEqual([]);
  });
  
  it('Тест с пустым массивом по убыванию', () => {
    expect(choiceSorting([], Direction.Descending)).toEqual([]);
  });

  it('Тест массива из одного элемента по возрастанию', () => {
    expect(choiceSorting([1], Direction.Ascending)).toEqual([1]);
  });

  it('Тест массива из одного элемента по убыванию', () => {
    expect(choiceSorting([1], Direction.Descending)).toEqual([1]);
  });

  it('Тест массива из нескольких элементов по убыванию', () => {
    expect(choiceSorting([5,2,4,3,1], Direction.Descending)).toEqual([5,4,3,2,1]);
  });

  it('Тест массива из нескольких элементов по возрастанию', () => {
    expect(choiceSorting([5,2,4,3,1], Direction.Ascending)).toEqual([1,2,3,4,5]);
  });
});

describe('Тест алгоритма сортировки пузырьком:', () => {
  it('Тест с пустым массивом по возрастанию', () => {
    expect(bubbleSorting([], Direction.Ascending)).toEqual([]);
  });
  
  it('Тест с пустым массивом по убыванию', () => {
    expect(bubbleSorting([], Direction.Descending)).toEqual([]);
  });

  it('Тест массива из одного элемента по возрастанию', () => {
    expect(bubbleSorting([1], Direction.Ascending)).toEqual([1]);
  });

  it('Тест массива из одного элемента по убыванию', () => {
    expect(bubbleSorting([1], Direction.Descending)).toEqual([1]);
  });

  it('Тест массива из нескольких элементов по убыванию', () => {
    expect(bubbleSorting([5,2,4,3,1], Direction.Descending)).toEqual([5,4,3,2,1]);
  });

  it('Тест массива из нескольких элементов по возрастанию', () => {
    expect(bubbleSorting([5,2,4,3,1], Direction.Ascending)).toEqual([1,2,3,4,5]);
  });
});
