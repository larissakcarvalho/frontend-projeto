export default function FilterGroup({
  title,
  inputType = 'checkbox',
  options,
  name,
  selectedValues = [],
  onChange,
}) {
  return (
    <div className="filter-group">
      <strong>{title}</strong>
      {options.map((option) => {
        const value = option.value ?? option.text
        const selected = selectedValues.includes(value)
        return (
          <label key={value} className={selected ? 'selected' : ''}>
            <input
              type={inputType}
              name={name}
              value={value}
              checked={selected}
              onChange={() => onChange(value)}
            />
            <span className="filter-category-name">{option.text}</span>
            {option.count != null && <span className="filter-count">{option.count}</span>}
          </label>
        )
      })}
    </div>
  )
}
