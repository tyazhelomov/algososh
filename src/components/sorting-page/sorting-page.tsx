import React from "react";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import { useForm } from "../../hooks/useForm";
import styles from './sorting-page.module.css';
import { RadioInput } from "../ui/radio-input/radio-input";
import { Button } from "../ui/button/button";
import { Direction } from "../../types/direction";
import { Column, ColumnProps } from "../ui/column/column";
import { Radio, TSortingForm } from "../../hooks/useForm.types";
import { bubbleSorting, choiceSorting, createNewArray } from "./utils";

export const SortingPage: React.FC = () => {
  const initValues: TSortingForm = {
    array: [],
    isButtonLoading: false,
    isButtonDisabled: false,
    isInputDisabled: false,
    radioInput: Radio.Choice,
  };
  const { values, handleChange, setValues } = useForm(initValues);

  const startProcess = async (type: string) => {
    const config: TSortingForm = {
      ...values,
      isButtonLoading: true,
      isButtonDisabled: true,
      isInputDisabled: true,
    };

    setValues({ ...config })

    if (values.radioInput === Radio.Choice) {
      await choiceSorting(type, config, setValues);
    } else {
      await bubbleSorting(type, config, setValues);
    }

    config.isButtonLoading = false;
    config.isButtonDisabled = false;
    config.isInputDisabled = false;

    setValues({ ...config });
  }

  return (
    <SolutionLayout title="Сортировка массива">
      <div className={styles.block}>
        <form className={styles.form}>
          <div className={styles.radio}>
            <RadioInput label={'Выбор'} name={'radioInput'} value={'choice'} disabled={values.isInputDisabled} onClick={(e) => handleChange(e)} checked={values.radioInput === Radio.Choice}/>
            <RadioInput label={'Пузырёк'} name={'radioInput'} value={'bubble'}  disabled={values.isInputDisabled} onClick={(e) => handleChange(e)} checked={values.radioInput === Radio.Bubble}/>
          </div>
          <div className={styles.sorting}>
            <Button 
              text = 'По возрастанию'
              type = "button"
              sorting={Direction.Ascending}
              disabled={values.isButtonDisabled}
              onClick={() => startProcess(Direction.Ascending)}
            />
            <Button 
              text = 'По убыванию'
              type = "button"
              sorting={Direction.Descending}
              disabled={values.isButtonDisabled}
              onClick={() => startProcess(Direction.Descending)}
            />
          </div>
          <Button 
            text = 'Новый массив'
            type = "button"
            isLoader={values.isButtonLoading}
            onClick={() => createNewArray(values, setValues)}
          />
        </form>

        <div className={styles.columns}>
          { values.array.map((el: ColumnProps, index: number) => {
              return (
                <li key={index}>
                  <Column state={el.state} index={el.index} />
                </li>
              )
          })}
        </div>
      </div>
    </SolutionLayout>
  );
};
