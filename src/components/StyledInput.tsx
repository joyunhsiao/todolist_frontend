// StyledInput
import React, { ChangeEvent } from 'react'

interface StyledInputProps {
  id: string;
  label: string;
  type: string;
  value: string;
  placeholder?: string;
  errorMessage?: string;
  onChange: (value: string) => void;
}

export const StyledInput: React.FC<StyledInputProps> = ({ id, label, type, value, placeholder, errorMessage, onChange }) => {

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    onChange(e.target.value)
  }

  return (
    <div className='input_container'>
      <label
        className='input_label'
        htmlFor={id}
      >{label}</label>
      <input
        className='input'
        type={type}
        id={id}
        placeholder={placeholder || ''}
        value={value}
        onChange={handleChange}
      />
      {errorMessage && <span className='input_error'>{errorMessage}</span>}
    </div>
  )
}