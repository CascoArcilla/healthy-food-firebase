import { useId, forwardRef } from "react";
import type { ForwardedRef } from "react";
import { XcircleSolidIcon } from "../Icons";
import type { TextFieldProps } from "./TextField.d";

const inputClassNameDefault = "bg-white border border-black w-full p-2.5";
const labelClassNameDefault = "block mb-1";
const iconClassNameDefault = "absolute inset-y-0 flex items-center pl-3";

export default forwardRef(TextField);

function TextField(
  {
    isInvalid,
    label,
    icon,
    required,
    autoFocus,
    name,
    value,
    type,
    autoComplete,
    error,
    children,
    placeholder,
    pattern,
    ...moreProps
  }: TextFieldProps,
  ref: ForwardedRef<HTMLInputElement>,
) {
  const id = useId();
  const ariaId = `${id}-${name}`;
  let inputClassName: string;

  inputClassName = `${inputClassNameDefault} ${icon && "pl-10"}`;

  return (
    <div data-testid="TextField" className="mb-6">
      {label ? (
        <label
          htmlFor={id}
          className={`${labelClassNameDefault}`}
          data-testid="label-text-field"
        >
          {label}
        </label>
      ) : null}

      <div className="relative">
        {icon ? (
          <div className={iconClassNameDefault} data-testid="icon-text-field">
            {icon}
          </div>
        ) : null}

        <input
          ref={ref}
          id={id}
          required={required}
          autoFocus={autoFocus}
          name={name}
          type={type}
          value={value}
          autoComplete={autoComplete}
          aria-invalid={isInvalid}
          aria-describedby={ariaId}
          className={`${inputClassName}`}
          placeholder={placeholder}
          {...moreProps}
        />
      </div>

      {error && (
        <div id={ariaId} data-testid="error-text-field">
          <XcircleSolidIcon />
          {error}
        </div>
      )}
      {children}
    </div>
  );
}
