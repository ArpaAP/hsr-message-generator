import classNames from "classnames";
import { TbPlus } from "react-icons/tb";

interface NewCharacterIconButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {}

const NewCharacterIconButton: React.FC<NewCharacterIconButtonProps> = ({
  className,
  ...props
}) => {
  return (
    <button
      type="button"
      className={classNames(
        "rounded-full border-2 border-neutral-400/75 text-neutral-600/75 flex justify-center items-center border-dashed",
        className
      )}
      {...props}
    >
      <TbPlus />
    </button>
  );
};

export default NewCharacterIconButton;
