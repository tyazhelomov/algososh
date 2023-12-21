import { TLinkedListForm } from "../../hooks/useForm.types"
import { CircleProps } from "../ui/circle/circle"

type TLoading = 'isButtonAddHeadLoading'
| 'isButtonAddTailLoading'
| 'isButtonRemoveHeadLoading'
| 'isButtonRemoveTailLoading'
| 'isButtonAddIndexLoading'
| 'isButtonRemoveIndexLoading';

export const blockFields = (config: TLinkedListForm<CircleProps>, loading: TLoading) => {
  config.isInputDisabled = true;
  config.isInputIndexDisabled = true;
  config.isButtonAddHeadDisabled = true;
  config.isButtonAddTailDisabled = true;
  config.isButtonRemoveHeadDisabled = true;
  config.isButtonRemoveTailDisabled = true;
  config.isButtonAddIndexDisabled = true;
  config.isButtonRemoveIndexDisabled = true;
  config[loading] = true;

  return config;
};

export const unblockFields = (config: TLinkedListForm<CircleProps>, loading: TLoading) => {
  config.text = '';
  config.index = '';
  config.circlesConfig = {};
  config.isInputDisabled = false;
  config.isInputIndexDisabled = false;
  config.isButtonAddHeadDisabled = false;
  config.isButtonAddTailDisabled = false;
  config.isButtonRemoveHeadDisabled = false;
  config.isButtonRemoveTailDisabled = false;
  config.isButtonAddIndexDisabled = false;
  config.isButtonRemoveIndexDisabled = false;
  config[loading] = false;
}