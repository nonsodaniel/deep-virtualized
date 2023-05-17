interface IInputProps {
  id: string;
  className: string;
  type: string;
  placeholder: string;
  value: string;
  required: boolean;
  onChange: (target: any) => void;
}

const Input = ({
  id,
  className,
  type,
  placeholder,
  value,
  onChange,
  required,
}: IInputProps) => {
  return (
    <div className="form-group">
      <input
        type={type}
        className={className}
        id={id}
        placeholder={placeholder}
        value={value}
        maxLength={35}
        onChange={onChange}
        required={required}
      />
    </div>
  );
};

export default Input;
