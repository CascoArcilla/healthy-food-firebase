import type { ChangeEventHandler } from "react";

export type TextFieldProps = {
  isInvalid?: true | false;
  label?: string;
  icon?: JSX.Element;
  required?: true | false;
  autoFocus?: true | false;
  name: string;
  value?: string;
  type: string;
  autoComplete?: string;
  error?: string | null | undefined;
  children?: JSX.Element | never[] | string;
  onChange?: ChangeEventHandler<HTMLInputElement>;
  placeholder?: string;
  pattern?: string;
};
