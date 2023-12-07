import { ChangeEvent, FormEvent, useState } from "react";

export const useForm = <T>(inputValues: T) => {
  const [values, setValues] = useState<T>(inputValues);

  const handleChange = (e: ChangeEvent<HTMLInputElement> | FormEvent<HTMLInputElement>): void => {
    const target = e.target as HTMLButtonElement;
    const {value, name} = target;
    setValues({...values, [name]: value});
  };
  return { values, handleChange, setValues };
}