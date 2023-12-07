import { ElementStates } from "../../types/element-states";
import { CircleProps } from "../ui/circle/circle";

export function getReversingString(sourceString: string): Array<CircleProps> {
  return sourceString.split('').map((letter: string) => ({ letter, state: ElementStates.Default }));
}

export const reverseString = (array: Array<CircleProps>, firstIndex: number, secondIndex: number) => {
  return [array[firstIndex], array[secondIndex]] = [array[secondIndex], array[firstIndex]];
};