interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  leadingIcon?: React.ReactNode;
}

const Button: React.FC<ButtonProps> = ({ onClick, leadingIcon, children }) => {
  return (
    <button
      type="button"
      className="bg-[#dfdfdf] rounded-full"
      onClick={onClick}
    >
      <div className="flex justify-center items-center flex-grow-0 gap-3 w-80 m-1 py-2 rounded-full border border-black/20 text-[1.4rem]">
        {leadingIcon && (
          <div className="bg-neutral-800 text-yellow-300/75 border border-yellow-300/75 p-0.5 rounded-full text-[20px]">
            {leadingIcon}
          </div>
        )}
        <div>{children}</div>
      </div>
    </button>
  );
};

export default Button;
