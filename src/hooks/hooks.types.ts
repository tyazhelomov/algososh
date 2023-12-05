export interface IState {
  array?: Array<JSX.Element>;
  number?: number;
  text?: string;
  index?: string;
  isButtonLoading?: boolean;
  isButtonDisabled?: boolean;
  isButtonAddDisabled?: boolean;
  isButtonClearDisabled?: boolean;
  isInputDisabled?: boolean;
  isInputIndexDisabled?: boolean;
  circleElements?: Array<JSX.Element>;
  radioInput?: Radio.Choice | Radio.Bubble;
  head?: number,
  tail?: number,
  isButtonAddHeadDisabled?: boolean,
  isButtonAddTailDisabled?: boolean,
  isButtonRemoveHeadDisabled?: boolean,
  isButtonRemoveTailDisabled?: boolean,
  isButtonRemoveDisabled?: boolean,
  isButtonAddIndexDisabled?: boolean,
  isButtonRemoveIndexDisabled?: boolean,
  isButtonAddHeadLoading?: boolean,
  isButtonAddTailLoading?: boolean,
  isButtonRemoveHeadLoading?: boolean,
  isButtonRemoveTailLoading?: boolean,
  isButtonAddIndexLoading?: boolean,
  isButtonRemoveIndexLoading?: boolean,
}

export enum Radio {
  Choice = 'choice',
  Bubble = 'bubble',
}
