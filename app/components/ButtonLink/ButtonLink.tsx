import { Link } from "@remix-run/react";
import type { ButtonLinkProps } from "./ButtonLink.d";

const colorButtonLink = {
  green: "bg-pw-green text-white hover:bg-pw-green/80",
  orange: "bg-pw-orange text-white hover:bg-pw-orange/80",
  black: "bg-pw-black text-white hover:bg-pw-black/80",
  default: "bg-transparent",
};

const sizeButtonLink = {
  xs: "px-3 py-2 text-xs",
  sm: "px-3 py-2 text-sm",
  md: "px-5 py-2.5 text-base",
  lg: "px-5 py-3 text-base",
  xl: "px-6 py-3.5 text-base",
};

export default function ButtonLink({
  to,
  color,
  size = "md",
  content,
  className,
  target,
  children,
  ...moreProps
}: ButtonLinkProps) {
  const buttonLinkClassName = `font-semibold text-center border border-1 rounded-lg ${
    colorButtonLink[color || "default"]
  } ${sizeButtonLink[size]} ${className ? className : ""}`;

  return (
    <Link
      target={target}
      className={buttonLinkClassName}
      data-testid="button-link"
      to={to}
      {...moreProps}
    >
      {content && <span>{content}</span>}
      {children}
    </Link>
  );
}
