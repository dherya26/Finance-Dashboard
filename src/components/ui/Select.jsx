function Select({ value, onChange, options, label, className = "" }) {
  return (
    <div className="flex flex-col gap-2">
      {label && <label className="text-sm font-medium text-theme-muted">{label}</label>}
      <select
        value={value}
        onChange={onChange}
        className={`ui-select ${className}`}
      >
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
}

export default Select;
