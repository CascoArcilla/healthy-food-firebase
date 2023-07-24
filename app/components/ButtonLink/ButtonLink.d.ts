export type ButtonLinkProps = {
  to: string;
  color?: "green" | "orange" | "black";
  className?: string;
  target?: "_blank" | "_parent" | "_self" | "_top" | undefined;
  size?: "xs" | "sm" | "md" | "lg" | "xl";
  children?: JSX.Element | string;
  content?: string | JSX.Element;
};
