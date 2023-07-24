import { useState } from "react";
import { XcircleSolidIcon } from "../Icons";

const inputClassName =
  "w-full rounded border border-gray-500 px-2 py-1 text-lg dark:text-black";
const errorClassName =
  "pt-1 flex items-center gap-1 text-red-700 dark:text-red-400";

/* eslint-disable react/prop-types */
export default function TextArea({
  label,
  maxLength,
  placeholder,
  clsNInput,
  rows,
  error,
  ref,
  name,
  required,
  children,
  ...moreProps
}) {
  const [text, setText] = useState("");

  return (
    <div className="mt-6">
      {label && <label className="block text-lg font-medium">{label}</label>}
      <textarea
        data-testid="TextArea"
        ref={ref}
        required={required || false}
        onChange={(evt) => setText(evt.target.value)}
        className={`${inputClassName} ${clsNInput}`}
        name={name}
        maxLength={maxLength || 250}
        placeholder={placeholder}
        {...moreProps}
        rows={rows}
      ></textarea>

      {error ? (
        <div className={errorClassName}>
          <XcircleSolidIcon />
          {error}
        </div>
      ) : (
        <span className="block mb-2 text-right mt-1 text-sm text-gray-500">
          {text.length}/{maxLength || 250}
        </span>
      )}
      {children}
    </div>
  );
}
