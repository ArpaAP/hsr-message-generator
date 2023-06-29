import classNames from "classnames";

type InputProps = React.InputHTMLAttributes<HTMLInputElement>;

const Input: React.FC<InputProps> = ({ className, ...props }) => {
  return (
    <input
      className={classNames(
        "px-5 py-2 rounded-full border-[1.5px] border-gray-500/75 bg-neutral-300/75 outline-none selection:bg-yellow-500/50 leading-normal",
        className
      )}
      {...props}
    />
  );
};

export default Input;
