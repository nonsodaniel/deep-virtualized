interface ISelectProps {
  id: string;
  className: string;
  options: { value: string; id: number }[];
  value: string;
  ariaLabel: string;
  label: string;
  htmlFor: string;
  description: string;
  dataTestId: string;
  onChange: (target: any) => void;
}

const Select = ({
  id,
  className,
  value,
  onChange,
  options,
  ariaLabel,
  htmlFor,
  label,
  description,
  dataTestId,
}: ISelectProps) => {
  return (
    <>
      <label htmlFor={htmlFor} className="sort-label">
        {label}
      </label>
      <select
        id={id}
        className={className}
        aria-label={ariaLabel}
        onChange={onChange}
        data-testid={dataTestId}
      >
        <option value={value}>{description} </option>
        {options.map((option: any) => {
          let { id, value } = option;
          return (
            <option key={id} value={value}>
              {value}
            </option>
          );
        })}
      </select>
    </>
  );
};

export default Select;
