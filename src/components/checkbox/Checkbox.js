import React from 'react'

export default ({ input, label, meta: { touched, error } }) => (
  <div className="checkbox-component">
    <label className="checkbox-title">
      <input
          {...input}
          className={input.value ? 'checked' : ''}
          type="checkbox"
        />
      <span>{label}</span>
    </label>
    {touched && error && <p className="error-block">{error}</p>}
  </div>
)