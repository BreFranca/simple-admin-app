import React from "react"

const InputField = ({
  input,
  label,
  type,
  maxlength,
  validate,
  meta: { touched, error, warning }
}) => {
  if (type === "text" || type === "password" || type === "email") {
    return (
      <div>
        <input {...input} type={type} placeholder={label} validate={validate} maxLength={maxlength} />
        {touched &&
          ((error && <span className="validate-error">{error}</span>) ||
            (warning && <span>{warning}</span>))}
      </div>
    )
  } else {
    return (
      <div>
        <label htmlFor={`input-${input.name}`}>
          <input {...input} id={`input-${input.name}`} type={type} validate={validate} />{" "}
          {label}</label>
        {touched &&
          ((error && <span className="validate-error">{error}</span>) ||
            (warning && <span>{warning}</span>))}
      </div>
    )
  }
}

export default InputField
