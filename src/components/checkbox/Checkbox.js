import React, { Component } from 'react';
import { Field } from "redux-form";
import PropTypes from 'prop-types';

export default class CheckboxGroup extends Component {

  static propTypes = {
    options: PropTypes.arrayOf(PropTypes.shape({
      label: PropTypes.string.isRequired,
      sub_label: PropTypes.string,
      value: PropTypes.string.isRequired
    })).isRequired
  };

  field = ({input, meta, options}) => {

    const {name, onChange, onBlur, onFocus} = input;
    const {touched, error} = meta;
    const inputValue = input.value;

    const checkboxes = options.map(( {label, sub_label, value }, index) => {

      const handleChange = (event) => {
        const arr = [...inputValue];
        if (event.target.checked) {
          arr.push(value);
        }
        else {
          arr.splice(arr.indexOf(value), 1);
        }
        onBlur(arr);
        return onChange(arr);
      };
      const checked = inputValue.includes(value);
      return (
        <div className="checkbox-component" key={`checkbox-${index}`}>
          <label className={checked? "selected" : ""}>
            <input
                type="checkbox"
                className={checked ? 'checked' : ''}
                name={`${name}[${index}]`}
                value={value}
                checked={checked}
                onChange={handleChange}
                onFocus={onFocus}
              />
            <span>{label}</span>
            {sub_label ? <p className="extra_text">{sub_label}</p> : null}
          </label>
        </div>
      );
    });

    return (
      <div>
        <div>{checkboxes}</div>
        {touched && error && <p className="error-block">{error}</p>}
      </div>
    );
  };

  render() {
    return <Field {...this.props} type="checkbox" component={this.field} />;
  }
}