import type { MouseEventHandler } from "react";

export type ButtonProps = {
  className?: string;
  text?: string;
  disabled?: boolean;
  size?: "xs" | "sm" | "md" | "lg" | "xl";
  color?: "green" | "orange" | "black";
  type?: "button" | "submit" | "reset";
  children?: JSX.Element | string;
  onClick?: MouseEventHandler<HTMLButtonElement>;
};
