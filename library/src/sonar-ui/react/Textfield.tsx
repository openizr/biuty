/**
 * Copyright (c) Matthieu Jabbour. All Rights Reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import * as React from 'react';
import PropTypes, { InferProps } from 'prop-types';
import buildClass from 'sonar-ui/helpers/buildClass';
import generateRandomId from 'sonar-ui/helpers/generateRandomId';

const propTypes = {
  id: PropTypes.string,
  min: PropTypes.number,
  max: PropTypes.number,
  step: PropTypes.number,
  onBlur: PropTypes.func,
  icon: PropTypes.string,
  size: PropTypes.number,
  value: PropTypes.string,
  label: PropTypes.string,
  helper: PropTypes.string,
  onChange: PropTypes.func,
  readonly: PropTypes.bool,
  maxlength: PropTypes.number,
  modifiers: PropTypes.string,
  placeholder: PropTypes.string,
  name: PropTypes.string.isRequired,
  iconPosition: PropTypes.oneOf(['left', 'right']),
  type: PropTypes.oneOf(['text', 'email', 'number', 'password', 'search', 'tel', 'url']),
};

const defaultProps = {
  id: null,
  min: null,
  max: null,
  value: '',
  step: null,
  size: null,
  icon: null,
  label: null,
  helper: null,
  type: 'text',
  modifiers: '',
  onBlur: null,
  onChange: null,
  readonly: false,
  maxlength: null,
  placeholder: null,
  iconPosition: 'left',
};

/**
 * Textfield.
 */
export default function UITextfield(props: InferProps<typeof propTypes>): JSX.Element {
  const {
    id, modifiers, label, helper, onChange, value, name, readonly, step,
    placeholder, iconPosition, icon, onBlur, type, size, max, min, maxlength,
  } = props;
  const [randomId] = React.useState(generateRandomId());
  const [currentValue, setCurrentValue] = React.useState(value);
  const className = buildClass('ui-textfield', (modifiers as string).split(' '));

  // Updates current value each time the `value` property is changed.
  React.useEffect(() => {
    setCurrentValue(value);
  }, [value]);

  const changeValue = (event: React.ChangeEvent<HTMLInputElement>): void => {
    setCurrentValue(event.target.value);
    if (onChange !== undefined && onChange !== null) {
      onChange(event.target.value);
    }
  };

  const blurField = (event: React.ChangeEvent<HTMLInputElement>): void => {
    if (onBlur !== undefined && onBlur !== null) {
      onBlur(event.target.value);
    }
  };

  const children = [
    (icon !== null) ? <i key="icon" className="ui-textfield__icon">{icon}</i> : null,
    <input
      key="input"
      name={name}
      id={randomId}
      onBlur={blurField}
      max={max as number}
      min={min as number}
      step={step as number}
      type={type as string}
      size={size as number}
      value={currentValue as string}
      readOnly={readonly as boolean}
      maxLength={maxlength as number}
      className="ui-textfield__field"
      placeholder={placeholder as string}
      onChange={(readonly === false) ? changeValue : undefined}
      tabIndex={((modifiers as string).includes('disabled') ? -1 : 0)}
    />,
  ];

  return (
    <div
      id={id as string}
      className={className}
    >
      {(label !== null) ? <label className="ui-textfield__label" htmlFor={randomId}>{label}</label> : null}
      {(iconPosition === 'left') ? children : children.reverse()}
      {(helper !== null) ? <span className="ui-textfield__helper">{helper}</span> : null}
    </div>
  );
}

UITextfield.propTypes = propTypes;
UITextfield.defaultProps = defaultProps;
UITextfield.displayName = 'UITextfield';
