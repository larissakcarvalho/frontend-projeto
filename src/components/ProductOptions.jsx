export default function ProductOptions({
  title,
  options,
  value,
  onChange,
  shape = 'square',
  type = 'text',
  radius = '3px',
  error,
  describedBy,
  action,
}) {
  const optionClassName = shape === 'circle' ? 'color-options' : 'size-options'

  return (
    <div className={`size-selector${shape === 'circle' ? ' color-selector' : ''}`}>
      <div className="size-title">
        <strong>{title}</strong>
        {shape === 'circle' && <span>{value}</span>}
        {action}
      </div>
      <div className={optionClassName} role="group" aria-label={title}>
        {options.map((option) => (
          <button
            key={option}
            type="button"
            className={value === option ? 'selected' : ''}
            style={{
              ...(type === 'color' ? { backgroundColor: option } : {}),
              ...(shape === 'square' ? { borderRadius: radius } : {}),
            }}
            aria-label={type === 'color' ? `${title}: ${option}` : undefined}
            aria-pressed={value === option}
            aria-describedby={error ? describedBy : undefined}
            onClick={() => onChange(option)}
          >
            {type === 'text' ? option : null}
          </button>
        ))}
      </div>
      {error && <p id={describedBy} className="field-error" role="alert">{error}</p>}
    </div>
  )
}
