export default function FilterGroup({
  title,
  inputType = 'checkbox',
  options,
  name,
  selectedValues = [],
  onChange,
  className = '',
}) {
  return (
    <fieldset className={`filter-group ${className}`.trim()}>
      <legend>{title}</legend>
      {options.map((option) => {
        const value = option.value ?? option.text
        const checked = selectedValues.includes(value)

        return (
          <label key={value} className={checked ? 'selected' : ''}>
            <input
              type={inputType}
              name={name}
              value={value}
              checked={checked}
              onChange={() => onChange(value)}
            />
            <span className="filter-category-name">{option.text}</span>
            {option.count !== undefined && <span className="filter-count">{option.count}</span>}
          </label>
        )
      })}
    </fieldset>
  )
}
