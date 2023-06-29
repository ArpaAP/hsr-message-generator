interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {}

const Button: React.FC<ButtonProps> = ({ onClick, children }) => {
  return (
    <button
      type="button"
      className="bg-[#dfdfdf] rounded-full"
      onClick={onClick}
    >
      <div className="w-72 m-1 py-2 rounded-full border border-black/20 text-[1.4rem]">
        {children}
      </div>
    </button>
  );
};

export default Button;
