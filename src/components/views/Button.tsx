interface IButtonProps {
  className: string;
  text: string;
  type: "button" | "submit" | "reset" | undefined;
  onClick?: () => void;
}
const Button = ({ className, onClick, text, type }: IButtonProps) => {
  return (
    <>
      <button type={type} className={className} onClick={onClick}>
        {text}
      </button>
    </>
  );
};

export default Button;
