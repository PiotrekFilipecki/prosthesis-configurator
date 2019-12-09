import React from 'react'

export const FormField = (props) => {
  return (
    <div className="custom-form__wrapper">
      {
        <label for={props.key} className="custom-form__label">{props.label}</label>
      }
      <input type={props.type}
        className="custom-form__input"
        id={props.id}
        // placeholder={props.label}
        onChange={(e) => props.onChange(props.id, e.target.value)}
      />
      {props.units &&
        <span>&nbsp;cm</span>
      }
      {
        (props.touched && !props.valid )&&  <p className="error">This field is required. Please provide data in [cm] unit.</p>
      }
    </div>
  )
}

export const FormFieldOrder = (props) => {
  return (
    <div className="custom-form__wrapper">
      {
        <label for={props.key} className="custom-form__label">{props.label}</label>
      }
      <input type={props.type}
        className="custom-form__input"
        id={props.id}
        // placeholder={props.label}
        onChange={(e) => props.onChange(props.id, e.target.value)}

      />
      {/* {
        props.touched &&  <p className="error">This field is required. Please provide data in [cm] unit.</p>
      } */}
    </div>
  )
}

export const FormWrapper = (props) => {
  return (
    <div className="form-wrapper">
      <form className="custom-form" noValidate>
        {props.children}
      </form>
    </div>
  )
}
