import classNames from "classnames";
import React from "react";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, ...props }, ref) => {
    return (
      <input
        ref={ref}
        autoCorrect="off"
        autoComplete="off"
        spellCheck={false}
        className={classNames(
          "px-5 py-2 rounded-full border-[1.5px] border-neutral-400 bg-neutral-400/40 placeholder:text-neutral-500 outline-none selection:bg-yellow-500/50 leading-normal",
          className
        )}
        {...props}
      />
    );
  }
);
Input.displayName = "Input";

export default Input;
