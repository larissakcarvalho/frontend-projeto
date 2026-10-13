import { useState } from 'react'

export default function ProductOptions({
  options,
  radius = '4px',
  shape = 'square',
  type = 'text',
  value,
  onChange,
  label,
}) {
  const [internalValue, setInternalValue] = useState('')
  const selectedValue = value ?? internalValue

  const selectOption = (option) => {
    if (value === undefined) setInternalValue(option)
    onChange?.(option)
  }

  return (
    <div className={`${type === 'color' ? 'color-options' : 'size-options'} product-options-${shape}`} role="group" aria-label={label}>
      {options.map((option) => {
        const optionValue = String(option)
        const selected = selectedValue === optionValue
        return (
          <button
            key={optionValue}
            type="button"
            className={`product-option${selected ? ' selected' : ''}`}
            style={{
              borderRadius: shape === 'square' ? radius : undefined,
              backgroundColor: type === 'color' ? optionValue : undefined,
            }}
            aria-label={type === 'color' ? `Selecionar cor ${optionValue}` : `Selecionar ${optionValue}`}
            aria-pressed={selected}
            onClick={() => selectOption(optionValue)}
          >
            {type === 'text' ? optionValue : null}
          </button>
        )
      })}
    </div>
  )
}
