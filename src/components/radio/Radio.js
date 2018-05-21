
import React, { Component } from 'react';
import { Field } from "redux-form";
import PropTypes from 'prop-types';

export default class RadioComponent extends Component {
  static propTypes = {
    group: PropTypes.string.isRequired,
    options: PropTypes.arrayOf(PropTypes.shape({
      label: PropTypes.string.isRequired,
      sub_label: PropTypes.string,
      value: PropTypes.string.isRequired
    })).isRequired
  };

  field = ({input, meta, group, options}) =>{
    const {onChange, onBlur, onFocus} = input;
    const {touched, error} = meta;
    const inputValue = input.value;

    const radios = options.map(({ label, sub_label, value }, index) => {
      const checked = (inputValue === value)
      return (
        <div key={`radio-${index}`}>
          <label className={checked? "selected" : ""}>
            <input
                type="radio"
                checked={checked}
                name={group}
                value={value}
                onClick={ (ev) => onChange(ev.target.value) }
                onChange={onChange}
              />
            <span>{label}</span>
            {sub_label ? <p className="extra_text">{sub_label}</p> : null}
          </label>
        </div>
      )
    });

    return (
      <div className="intake-radio-component">
        <div className="radio" style={{ display: 'inline-block'}}>
          {radios}
        </div>
        {error && <p className="error-block">{error}</p>}
      </div>
    );
  };

  render() {
    console.log("re-render the RADIO!", this.props)
    return <Field {...this.props} component={this.field} />
  }
}