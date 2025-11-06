type ButtonProps = {
  onClick: () => void;
  buttonText: string;
};

const Button = ({ onClick, buttonText }: ButtonProps) => {
  return (
    <button
      className="text-center bg-black text-red-700 w-50 h-10"
      onClick={onClick}
    >
      {buttonText}
    </button>
  );
};

export default Button;
