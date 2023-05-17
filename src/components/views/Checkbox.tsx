interface ICheckboxProps {
  id: string;
  name: string;
  type: string;
  value: string;
  checked: boolean;
  onChange: (target: any) => void;
}
const Checkbox = ({
  id,
  name,
  type,
  value,
  onChange,
  checked,
}: ICheckboxProps) => {
  return (
    <div>
      <input
        type={type}
        id={id}
        name={name}
        value={value}
        onChange={onChange}
        checked={checked}
      />
      <label htmlFor={id}>{value}</label>
    </div>
  );
};

export default Checkbox;
